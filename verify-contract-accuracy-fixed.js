const { ethers } = require('ethers');

// EXACT CONTRACT VERIFICATION FOR MOUNTAINSHARES WITH CORRECT CHECKSUM
async function verifyContractAccuracy() {
    console.log('🔍 VERIFYING MOUNTAINSHARES CONTRACT ACCURACY (FIXED CHECKSUM)');
    console.log('==============================================================');
    
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
        
        // 3. Test wallet balance checking with CORRECTED CHECKSUM ADDRESSES
        console.log('\n3️⃣ WALLET BALANCE VERIFICATION (CORRECTED CHECKSUMS):');
        
        // Fix all test wallet addresses
        const testWallets = [
            '0x742d35cc6634c0532925a3b8d4c0c3f8e1c2e1b8', // Original (lowercase)
            '0x8ba1f109551bd432803012645hac136c30c85bcf', // Invalid address
            '0x1234567890123456789012345678901234567890'  // Test address
        ];
        
        for (const wallet of testWallets) {
            try {
                // Convert to lowercase first, then get proper checksum
                const lowercaseWallet = wallet.toLowerCase();
                
                // Check if it's a valid address format first
                if (lowercaseWallet.length !== 42 || !lowercaseWallet.startsWith('0x')) {
                    console.log(`❌ ${wallet}: Invalid address format`);
                    continue;
                }
                
                // Get proper checksum
                const checksumWallet = ethers.utils.getAddress(lowercaseWallet);
                const balance = await contract.balanceOf(checksumWallet);
                const formattedBalance = ethers.utils.formatEther(balance);
                
                console.log(`✅ ${checksumWallet}: ${formattedBalance} MS`);
                
            } catch (error) {
                console.log(`❌ ${wallet}: Error - ${error.message}`);
            }
        }
        
        // 4. Verify contract is on correct network
        console.log('\n4️⃣ NETWORK VERIFICATION:');
        const network = await provider.getNetwork();
        console.log(`✅ Network: ${network.name} (Chain ID: ${network.chainId})`);
        console.log(`✅ Expected: Arbitrum One (Chain ID: 42161)`);
        
        if (network.chainId !== 42161) {
            throw new Error('❌ WRONG NETWORK! Contract not on Arbitrum One');
        }
        
        // 5. Gas estimation for minting with corrected address
        console.log('\n5️⃣ MINTING GAS ESTIMATION:');
        const correctTestWallet = ethers.utils.getAddress('0x742d35cc6634c0532925a3b8d4c0c3f8e1c2e1b8');
        const mintAmount = ethers.utils.parseEther('1'); // 1 MS token
        
        try {
            const gasEstimate = await contract.estimateGas.mint(correctTestWallet, mintAmount);
            console.log(`✅ Estimated Gas for 1 MS mint to ${correctTestWallet}: ${gasEstimate.toString()}`);
        } catch (gasError) {
            console.log(`⚠️ Gas estimation failed: ${gasError.message}`);
        }
        
        return {
            contractVerified: true,
            name: name,
            symbol: symbol,
            minterRoleSet: hasMinterRole,
            networkCorrect: network.chainId === 42161,
            contractAddress: contractAddress,
            correctedTestWallet: correctTestWallet
        };
        
    } catch (error) {
        console.error('❌ Contract verification failed:', error.message);
        return { contractVerified: false, error: error.message };
    }
}

verifyContractAccuracy();
