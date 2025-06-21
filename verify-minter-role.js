const { ethers } = require('ethers');

async function verifyMinterRole() {
    console.log('✅ VERIFYING MINTER ROLE GRANT');
    console.log('=============================');
    
    try {
        const provider = new ethers.providers.JsonRpcProvider('https://arb1.arbitrum.io/rpc');
        const contractAddress = '0xE8A9c6fFE6b2344147D886EcB8608C5F7863B20D';
        const minterAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
        
        const abi = [
            "function hasRole(bytes32 role, address account) view returns (bool)",
            "function MINTER_ROLE() view returns (bytes32)",
            "function name() view returns (string)",
            "function symbol() view returns (string)",
            "function mint(address to, uint256 amount) external"
        ];
        
        const contract = new ethers.Contract(contractAddress, abi, provider);
        
        // Verify contract
        const name = await contract.name();
        const symbol = await contract.symbol();
        console.log(`📍 Contract: ${name} (${symbol})`);
        console.log(`🎯 Minter: ${minterAddress}`);
        
        // Check minter role
        const MINTER_ROLE = await contract.MINTER_ROLE();
        const hasMinterRole = await contract.hasRole(MINTER_ROLE, minterAddress);
        
        console.log(`🔑 MINTER_ROLE: ${MINTER_ROLE}`);
        console.log(`✅ Minter Role Status: ${hasMinterRole ? 'GRANTED ✅' : 'NOT GRANTED ❌'}`);
        
        if (hasMinterRole) {
            console.log(`\n🎉 SUCCESS! Minter role is properly granted!`);
            console.log(`🏭 ${minterAddress} can now mint MountainShares tokens`);
            
            // Test gas estimation for minting
            try {
                const testWallet = '0x742D35Cc6634C0532925a3b8D4C0C3F8e1C2e1B8';
                const mintAmount = ethers.utils.parseEther('1');
                const gasEstimate = await contract.estimateGas.mint(testWallet, mintAmount);
                console.log(`⛽ Mint Gas Estimate: ${gasEstimate.toString()}`);
                console.log(`✅ Minting capability confirmed!`);
            } catch (gasError) {
                console.log(`⚠️ Gas estimation failed: ${gasError.message}`);
            }
            
            console.log(`\n🚀 YOUR MOUNTAINSHARES SYSTEM IS NOW READY FOR PRODUCTION MINTING!`);
        } else {
            console.log(`\n❌ Minter role not granted. Run the grant script first.`);
        }
        
        return hasMinterRole;
        
    } catch (error) {
        console.error('❌ Verification failed:', error.message);
        return false;
    }
}

verifyMinterRole();
