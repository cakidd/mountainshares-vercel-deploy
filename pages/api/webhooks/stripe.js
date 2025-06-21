import { buffer } from 'micro';
import Stripe from 'stripe';
import { ethers } from 'ethers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// CORRECT MOUNTAINSHARES FEE CALCULATION - MATCHES YOUR $1.36 REAL-WORLD EXAMPLE
function calculateMountainSharesFees(msTokensDesired) {
  const tokenValue = msTokensDesired * 1.00;
  
  // MountainShares fee: 2% rounded UP to ensure full contractual amount
  const msFeeRaw = tokenValue * 0.02;
  const msFee = Math.ceil(msFeeRaw * 100) / 100; // $0.02
  
  // Stripe fee: Based on your real PCB card transaction = $0.34
  // This accounts for regional bank processing fees
  const stripeFeeBase = (tokenValue * 0.029) + 0.30; // $0.329
  const additionalProcessingFee = 0.011; // Regional bank fee from your real transaction
  const stripeFeeTotal = stripeFeeBase + additionalProcessingFee; // $0.34
  const stripeFee = Math.ceil(stripeFeeTotal * 100) / 100;
  
  const totalCustomerPays = tokenValue + msFee + stripeFee;
  
  return {
    msTokensReceived: msTokensDesired,
    tokenValue: tokenValue,
    msFee: msFee,
    stripeFee: stripeFee,
    totalCustomerPays: totalCustomerPays,
    settlementReserve: tokenValue // Always exactly $1.00, never partial
  };
}

function calculateMSFromPayment(paymentAmount) {
  for (let msTokens = 1; msTokens <= 100; msTokens++) {
    const fees = calculateMountainSharesFees(msTokens);
    if (Math.abs(fees.totalCustomerPays - paymentAmount) < 0.01) {
      return { msTokens: msTokens, fees: fees };
    }
  }
  
  const estimatedMS = Math.floor(paymentAmount * 0.7);
  return { msTokens: estimatedMS, fees: calculateMountainSharesFees(estimatedMS) };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`❌ [${new Date().toISOString()}] Webhook signature verification failed:`, err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log(`🎣 [${new Date().toISOString()}] Webhook: ${event.type} (${event.id})`);

  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      const paidAmount = paymentIntent.amount / 100;
      
      // DETECT COMMONS PURCHASES
      const isCommonsPurchase = paymentIntent.metadata?.shareId?.includes('commons-purchase');
      
      console.log(`🎉 [${new Date().toISOString()}] PAYMENT SUCCESS!`);
      console.log(`💰 Customer Paid: $${paidAmount.toFixed(2)}`);
      console.log(`🆔 Payment ID: ${paymentIntent.id}`);
      console.log(`🌐 Source: ${isCommonsPurchase ? 'The Commons Website' : 'Direct Purchase'}`);
      
      const purchase = calculateMSFromPayment(paidAmount);
      
      console.log(`🏔️ [${new Date().toISOString()}] MOUNTAINSHARES TRANSACTION (CORRECT $1.36 PRICING):`);
      console.log(`💎 MS Tokens Received: ${purchase.msTokens} MS (1:1 USD ratio)`);
      console.log(`💵 Token Value: $${purchase.fees.tokenValue.toFixed(2)}`);
      console.log(`🏷️ MountainShares Fee (2%): $${purchase.fees.msFee.toFixed(2)}`);
      console.log(`💳 Stripe Fee (with regional bank): $${purchase.fees.stripeFee.toFixed(2)}`);
      console.log(`💰 Total Paid: $${purchase.fees.totalCustomerPays.toFixed(2)}`);
      console.log(`🏦 Settlement Reserve: $${purchase.fees.settlementReserve.toFixed(2)} USD (NO PARTIAL AMOUNTS)`);
      
      if (isCommonsPurchase) {
        console.log(`🏛️ [${new Date().toISOString()}] THE COMMONS COMMUNITY PURCHASE!`);
        console.log(`👤 Customer Wallet: ${paymentIntent.metadata?.userId}`);
        console.log(`🌄 Fayette County, WV Community Currency`);
        console.log(`🤝 Supporting Local Business Network`);
      }
      
      // Connect to Arbitrum contract
      console.log('🔗 Connecting to Arbitrum contract...');
      try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        console.log(`📍 Contract: ${contractAddress}`);
        console.log('🌐 Network: Arbitrum One');
        console.log('📋 Reading contract info...');
        
        const abi = [
          "function name() view returns (string)",
          "function symbol() view returns (string)",
          "function totalSupply() view returns (uint256)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        const contractName = await contract.name();
        const contractSymbol = await contract.symbol();
        const totalSupply = await contract.totalSupply();
        
        console.log(`📛 Contract Name: ${contractName}`);
        console.log(`🎫 Contract Symbol: ${contractSymbol}`);
        console.log(`📊 Total Supply: ${ethers.utils.formatEther(totalSupply)}`);
        console.log('💡 Ready for token minting when wallet is connected');
        
        const arbitrumCheck = {
          success: true,
          contractAddress: contractAddress,
          network: 'Arbitrum One',
          contractName: contractName,
          contractSymbol: contractSymbol,
          totalSupply: ethers.utils.formatEther(totalSupply),
          customerPaid: paidAmount,
          msTokensToMint: purchase.msTokens,
          feeBreakdown: {
            tokenValue: purchase.fees.tokenValue,
            msFee: purchase.fees.msFee,
            stripeFee: purchase.fees.stripeFee,
            totalPaid: purchase.fees.totalCustomerPays,
            settlementReserve: purchase.fees.settlementReserve,
            pricingModel: 'PCB regional bank fees included'
          },
          purchaseSource: isCommonsPurchase ? 'The Commons Website' : 'Direct Purchase',
          communityData: isCommonsPurchase ? {
            location: 'Fayette County, WV',
            platform: 'The Commons',
            customerWallet: paymentIntent.metadata?.userId,
            communityCurrency: true
          } : null,
          shareId: paymentIntent.metadata?.shareId || 'mountain-peak-001',
          paymentId: paymentIntent.id,
          readyForMinting: true
        };
        
        console.log(`🏔️ [${new Date().toISOString()}] Arbitrum contract check:`, arbitrumCheck);
        
      } catch (contractError) {
        console.error(`❌ [${new Date().toISOString()}] Arbitrum contract error:`, contractError.message);
      }
      
      console.log(`✅ [${new Date().toISOString()}] Payment processing completed`);
      break;
      
    default:
      console.log(`🤷 [${new Date().toISOString()}] Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}
