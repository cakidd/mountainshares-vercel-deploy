const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MountainShares Compliance Framework", function () {
    let contract;
    let owner;
    let user1;
    let user2;

    beforeEach(async function () {
        [owner, user1, user2] = await ethers.getSigners();
        
        const MountainSharesCompliance = await ethers.getContractFactory("MountainSharesComplianceFramework");
        contract = await MountainSharesCompliance.deploy();
        await contract.deployed();
    });

    describe("Deployment", function () {
        it("Should set the right name and symbol", async function () {
            expect(await contract.name()).to.equal("MountainShares");
            expect(await contract.symbol()).to.equal("MS");
        });

        it("Should grant compliance officer role to deployer", async function () {
            const COMPLIANCE_OFFICER_ROLE = await contract.COMPLIANCE_OFFICER_ROLE();
            expect(await contract.hasRole(COMPLIANCE_OFFICER_ROLE, owner.address)).to.be.true;
        });

        it("Should approve initial jurisdictions", async function () {
            expect(await contract.isJurisdictionApproved("US-WV")).to.be.true;
            expect(await contract.isJurisdictionApproved("US-PA")).to.be.true;
        });
    });

    describe("KYC Functionality", function () {
        it("Should allow compliance officer to set KYC status", async function () {
            await contract.setKYCStatus(
                user1.address,
                true,
                "US-WV",
                "BASIC",
                365
            );

            const kycProfile = await contract.getUserKYCStatus(user1.address);
            expect(kycProfile.isVerified).to.be.true;
            expect(kycProfile.jurisdiction).to.equal("US-WV");
        });

        it("Should prevent non-compliance officers from setting KYC", async function () {
            await expect(
                contract.connect(user1).setKYCStatus(
                    user2.address,
                    true,
                    "US-WV",
                    "BASIC",
                    365
                )
            ).to.be.reverted;
        });
    });

    describe("Emergency Responder Authorization", function () {
        it("Should allow setting emergency responder authorization", async function () {
            await contract.setEmergencyResponderAuthorization(
                user1.address,
                true,
                "FEMA-12345",
                ["WV", "PA"],
                365,
                "FIRST_RESPONDER"
            );

            const auth = await contract.getUserEmergencyAuth(user1.address);
            expect(auth.isAuthorized).to.be.true;
            expect(auth.femaRegistrationNumber).to.equal("FEMA-12345");
        });
    });

    describe("Audit Trail", function () {
        it("Should log audit events", async function () {
            await contract.setKYCStatus(
                user1.address,
                true,
                "US-WV",
                "BASIC",
                365
            );

            const auditLength = await contract.getAuditTrailLength();
            expect(auditLength).to.be.gt(0);

            const auditEvent = await contract.getAuditEvent(0);
            expect(auditEvent.action).to.equal("KYC_STATUS_UPDATE");
        });
    });

    describe("Regulatory Controls", function () {
        it("Should allow compliance officer to pause system", async function () {
            await contract.pauseSystem("Testing pause functionality");
            expect(await contract.paused()).to.be.true;
        });

        it("Should allow compliance officer to pause specific states", async function () {
            await contract.pauseState("WV", "Testing state pause");
            expect(await contract.isStatePaused("WV")).to.be.true;
        });
    });
});
