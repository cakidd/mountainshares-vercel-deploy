// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract MountainSharesComplianceFramework is ERC20, AccessControl, Pausable, ReentrancyGuard {

    bytes32 public constant COMPLIANCE_OFFICER_ROLE = keccak256("COMPLIANCE_OFFICER_ROLE");
    bytes32 public constant REGULATORY_LIAISON_ROLE = keccak256("REGULATORY_LIAISON_ROLE");
    bytes32 public constant EMERGENCY_RESPONDER_ROLE = keccak256("EMERGENCY_RESPONDER_ROLE");
    bytes32 public constant AML_ANALYST_ROLE = keccak256("AML_ANALYST_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    struct KYCProfile {
        bool isVerified;
        bool isEmergencyResponder;
        string jurisdiction;
        uint256 verificationExpiry;
        bool hasFEMARegistration;
    }

    mapping(address => KYCProfile) public kycProfiles;
    mapping(address => uint256) public culturalContributions;
    
    uint256 public foundationPhaseEnd;
    bool public foundationPhaseActive = true;
    uint256 public constant FOUNDATION_LOCK_PERIOD = 365 days;
    
    event KYCVerified(address indexed user, string jurisdiction);
    event EmergencyResponderAuthorized(address indexed responder, bool hasFEMA);
    event CulturalContributionRewarded(address indexed contributor, uint256 amount);
    event ComplianceViolationReported(address indexed violator, string reason);

    constructor() ERC20("MountainShares", "MS") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(COMPLIANCE_OFFICER_ROLE, msg.sender);
        foundationPhaseEnd = block.timestamp + FOUNDATION_LOCK_PERIOD;
    }

    function mint(address to, uint256 amount) public onlyRole(DEFAULT_ADMIN_ROLE) whenNotPaused {
        _mint(to, amount);
    }

    function verifyKYC(
        address user, 
        string memory jurisdiction, 
        uint256 expiryTimestamp,
        bool isEmergencyResponder,
        bool hasFEMARegistration
    ) external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        require(bytes(jurisdiction).length > 0, "Jurisdiction required");
        require(expiryTimestamp > block.timestamp, "Invalid expiry");
        
        kycProfiles[user] = KYCProfile({
            isVerified: true,
            isEmergencyResponder: isEmergencyResponder,
            jurisdiction: jurisdiction,
            verificationExpiry: expiryTimestamp,
            hasFEMARegistration: hasFEMARegistration
        });
        
        emit KYCVerified(user, jurisdiction);
        
        if (isEmergencyResponder) {
            _grantRole(EMERGENCY_RESPONDER_ROLE, user);
            emit EmergencyResponderAuthorized(user, hasFEMARegistration);
        }
    }

    function rewardCulturalContribution(address contributor, uint256 amount) 
        external 
        onlyRole(COMPLIANCE_OFFICER_ROLE) 
        whenNotPaused 
    {
        require(kycProfiles[contributor].isVerified, "KYC required");
        culturalContributions[contributor] += amount;
        _mint(contributor, amount);
        emit CulturalContributionRewarded(contributor, amount);
    }

    function emergencyPause() external onlyRole(EMERGENCY_RESPONDER_ROLE) {
        _pause();
    }

    function emergencyUnpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function endFoundationPhase() external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(block.timestamp >= foundationPhaseEnd, "Foundation period not ended");
        foundationPhaseActive = false;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        if (foundationPhaseActive && from != address(0)) {
            require(
                hasRole(EMERGENCY_RESPONDER_ROLE, from) || 
                hasRole(COMPLIANCE_OFFICER_ROLE, from),
                "Foundation phase: transfers restricted"
            );
        }
        super._beforeTokenTransfer(from, to, amount);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC20, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function getKYCStatus(address user) external view returns (
        bool isVerified,
        bool isEmergencyResponder,
        string memory jurisdiction,
        uint256 verificationExpiry,
        bool hasFEMARegistration
    ) {
        KYCProfile memory profile = kycProfiles[user];
        return (
            profile.isVerified,
            profile.isEmergencyResponder,
            profile.jurisdiction,
            profile.verificationExpiry,
            profile.hasFEMARegistration
        );
    }
}
