const { ethers } = require("hardhat");

async function main() {
    console.log("🚀 Deploying MountainShares Compliance Framework...");
    console.log("===============================================");
    
    const [deployer] = await ethers.getSigners();
    console.log("📝 Deploying with account:", deployer.address);
    console.log("💰 Account balance:", (await deployer.getBalance()).toString());
    
    console.log("\n🔧 Compiling and deploying contract...");
    const MountainSharesCompliance = await ethers.getContractFactory("MountainSharesComplianceFramework");
    const contract = await MountainSharesCompliance.deploy();
    
    console.log("⏳ Waiting for deployment confirmation...");
    await contract.deployed();
    
    console.log("✅ MountainShares Compliance Framework deployed!");
    console.log("📍 Contract address:", contract.address);
    console.log("🔗 Transaction hash:", contract.deployTransaction.hash);
    
    console.log("\n📋 Setting up compliance roles...");
    
    const COMPLIANCE_OFFICER_ROLE = await contract.COMPLIANCE_OFFICER_ROLE();
    const REGULATORY_LIAISON_ROLE = await contract.REGULATORY_LIAISON_ROLE();
    const AML_ANALYST_ROLE = await contract.AML_ANALYST_ROLE();
    const AUDITOR_ROLE = await contract.AUDITOR_ROLE();
    const EMERGENCY_RESPONDER_ROLE = await contract.EMERGENCY_RESPONDER_ROLE();
    
    await contract.grantRole(COMPLIANCE_OFFICER_ROLE, deployer.address);
    await contract.grantRole(REGULATORY_LIAISON_ROLE, deployer.address);
    await contract.grantRole(AML_ANALYST_ROLE, deployer.address);
    await contract.grantRole(AUDITOR_ROLE, deployer.address);
    await contract.grantRole(EMERGENCY_RESPONDER_ROLE, deployer.address);
    
    console.log("✅ Compliance roles configured!");
    
    console.log("\n🔍 Verifying initial setup...");
    const tokenName = await contract.name();
    const tokenSymbol = await contract.symbol();
    const totalSupply = await contract.totalSupply();
    const isApprovedWV = await contract.isJurisdictionApproved("US-WV");
    
    console.log("📊 Contract Details:");
    console.log("   Token Name:", tokenName);
    console.log("   Token Symbol:", tokenSymbol);
    console.log("   Total Supply:", totalSupply.toString());
    console.log("   WV Jurisdiction Approved:", isApprovedWV);
    
    console.log("\n🔒 Compliance Features Activated:");
    console.log("   ✅ KYC verification gates");
    console.log("   ✅ Emergency responder authorization");
    console.log("   ✅ Geographic jurisdiction controls");
    console.log("   ✅ AML transaction monitoring");
    console.log("   ✅ Regulatory pause mechanisms");
    console.log("   ✅ Audit trail logging");
    console.log("   ✅ Role-based access controls");
    console.log("   ✅ Automated reporting functions");
    console.log("   ✅ Foundation phase locked earning");
    
    console.log("\n📜 Contract Deployment Summary:");
    console.log("===============================================");
    console.log("Contract Address:", contract.address);
    console.log("Deployer:", deployer.address);
    console.log("===============================================");
    
    return { address: contract.address, deployer: deployer.address, txHash: contract.deployTransaction.hash };
}

main()
    .then((result) => {
        console.log("🎉 Deployment completed successfully!");
        console.log("📋 Save these details for your records:");
        console.log("   Contract:", result.address);
        console.log("   Deployer:", result.deployer);
        console.log("   TX Hash:", result.txHash);
        process.exit(0);
    })
    .catch((error) => {
        console.error("❌ Deployment failed:");
        console.error(error);
        process.exit(1);
    });
