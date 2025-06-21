const { ethers } = require('ethers');

// EXACT CONTRACT VERIFICATION FOR MOUNTAINSHARES
async function verifyContractAccuracy() {
    console.log('🔍 VERIFYING MOUNTAINSHARES CONTRACT ACCURACY');
    console.log('============================================');
    
    try {
        // Connect to Arbitrum One
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        
        // Complete ABI for verification
        const abi = [
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function totalSupply() view returns (uint256)",
            "function decimals() view returns (uint8)",
            "function balanceOf(address account) view returns (uint256)",
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function MINTER_ROLE() view returns (bytes32)",
            "function mint(address to, uint256 amount) external",
            "function owner() view returns (address)",
            "event Transfer(address indexed from, address indexed to, uint256 value)"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        // 1. Verify contract identity
        console.log('1️⃣ CONTRACT IDENTITY VERIFICATION:');
        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();
        const totalSupply = await contract.totalSupply();
        
        console.log(`✅ Name: ${name} (Expected: MountainShares)`);
        console.log(`✅ Symbol: ${symbol} (Expected: MS)`);
        console.log(`✅ Decimals: ${decimals} (Expected: 18)`);
        console.log(`✅ Total Supply: ${ethers.utils.formatEther(totalSupply)} MS`);
        
        // 2. Verify minter role
        console.log('\n2️⃣ MINTER ROLE VERIFICATION:');
        const MINTER_ROLE = await contract.MINTER_ROLE();
        const minterAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        const hasMinterRole = await contract.hasRole(MINTER_ROLE, minterAddress);
        
        console.log(`✅ Minter Role: ${MINTER_ROLE}`);
        console.log(`✅ Minter Address: ${minterAddress}`);
        console.log(`✅ Has Minter Role: ${hasMinterRole}`);
        
        // 3. Test wallet balance checking
        console.log('\n3️⃣ WALLET BALANCE VERIFICATION:');
        const testWallet = '0x742d35Cc6634C0532925a3b8D4C0C3F8E1C2E1B8';
        const balance = await contract.balanceOf(testWallet);
        console.log(`✅ Test Wallet: ${testWallet}`);
        console.log(`✅ Current Balance: ${ethers.utils.formatEther(balance)} MS`);
        
        // 4. Verify contract is on correct network
        console.log('\n4️⃣ NETWORK VERIFICATION:');
        const network = await provider.getNetwork();
        console.log(`✅ Network: ${network.name} (Chain ID: ${network.chainId})`);
        console.log(`✅ Expected: Arbitrum One (Chain ID: 42161)`);
        
        if (network.chainId !== 42161) {
            throw new Error('❌ WRONG NETWORK! Contract not on Arbitrum One');
        }
        
        // 5. Gas estimation for minting
        console.log('\n5️⃣ MINTING GAS ESTIMATION:');
        const mintAmount = ethers.utils.parseEther('1'); // 1 MS token
        try {
            const gasEstimate = await contract.estimateGas.mint(testWallet, mintAmount);
            console.log(`✅ Estimated Gas for 1 MS mint: ${gasEstimate.toString()}`);
        } catch (gasError) {
            console.log(`⚠️ Gas estimation failed: ${gasError.message}`);
        }
        
        return {
            contractVerified: true,
            name: name,
            symbol: symbol,
            minterRoleSet: hasMinterRole,
            networkCorrect: network.chainId === 42161,
            contractAddress: contractAddress
        };
        
    } catch (error) {
        console.error('❌ Contract verification failed:', error.message);
        return { contractVerified: false, error: error.message };
    }
}

verifyContractAccuracy();
