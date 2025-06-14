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
        uint256 verificationTimestamp;
        uint256 verificationExpiry;
        address verifiedBy;
        string kycLevel;
    }
    
    mapping(address => KYCProfile) public kycProfiles;
    mapping(string => bool) public approvedJurisdictions;
    
    struct EmergencyAuthorization {
        bool isAuthorized;
        string femaRegistrationNumber;
        string[] authorizedStates;
        uint256 authorizationExpiry;
        string responderType;
        bool isActive;
    }
    
    mapping(address => EmergencyAuthorization) public emergencyAuthorizations;
    
    struct TransactionRecord {
        address from;
        address to;
        uint256 amount;
        uint256 timestamp;
        string transactionType;
        string jurisdiction;
        bool flaggedForReview;
        bool investigated;
        string investigationNotes;
    }
    
    mapping(bytes32 => TransactionRecord) public transactionRecords;
    mapping(address => uint256) public dailyTransactionVolume;
    mapping(address => uint256) public lastTransactionDate;
    mapping(address => uint256) public lockedBalances;
    mapping(address => uint256) public culturalContributions;
    mapping(string => bool) public statePaused;
    mapping(string => bool) public stateAuthorized;
    
    uint256 public constant DAILY_LIMIT = 10000 * 10**18;
    uint256 public constant SUSPICIOUS_THRESHOLD = 5000 * 10**18;
    uint256 public constant VELOCITY_THRESHOLD = 3;
    uint256 public totalLockedTokens;
    bool public foundationPhaseUnlocked = false;
    
    struct AuditEvent {
        address actor;
        string action;
        string details;
        uint256 timestamp;
        bytes32 transactionHash;
    }
    
    AuditEvent[] public auditTrail;
    
    struct ComplianceReport {
        uint256 reportingPeriod;
        uint256 totalTokensIssued;
        uint256 emergencyRewards;
        uint256 culturalRewards;
        uint256 activeUsers;
        uint256 suspiciousTransactions;
        uint256 investigatedCases;
        string[] affectedJurisdictions;
    }
    
    mapping(uint256 => ComplianceReport) public quarterlyReports;
    
    event KYCStatusUpdated(address indexed user, bool verified, string jurisdiction);
    event EmergencyAuthorizationGranted(address indexed responder, string femaNumber);
    event SuspiciousActivityDetected(address indexed from, address indexed to, uint256 amount, string reason);
    event ComplianceReportGenerated(uint256 quarter, uint256 totalTransactions);
    event RegulatoryPauseActivated(string reason, address pausedBy);
    event AuditEventLogged(address indexed actor, string action, uint256 timestamp);
    event LockedTokensIssued(address indexed user, uint256 amount, string reason);
    event FoundationPhaseUnlocked(uint256 totalUnlocked, uint256 affectedUsers);
    
    constructor() ERC20("MountainShares", "MS") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(COMPLIANCE_OFFICER_ROLE, msg.sender);
        
        stateAuthorized["WV"] = true;
        stateAuthorized["PA"] = true;
        stateAuthorized["VA"] = true;
        stateAuthorized["KY"] = true;
        stateAuthorized["TN"] = true;
        stateAuthorized["NC"] = true;
        
        approvedJurisdictions["US-WV"] = true;
        approvedJurisdictions["US-PA"] = true;
        approvedJurisdictions["US-VA"] = true;
        approvedJurisdictions["US-KY"] = true;
        approvedJurisdictions["US-TN"] = true;
        approvedJurisdictions["US-NC"] = true;
    }
    
    modifier onlyKYCVerified() {
        require(kycProfiles[msg.sender].isVerified, "KYC verification required");
        require(kycProfiles[msg.sender].verificationExpiry > block.timestamp, "KYC expired");
        _;
    }
    
    modifier onlyEmergencyResponder() {
        require(emergencyAuthorizations[msg.sender].isAuthorized, "Emergency responder authorization required");
        require(emergencyAuthorizations[msg.sender].authorizationExpiry > block.timestamp, "Authorization expired");
        require(emergencyAuthorizations[msg.sender].isActive, "Emergency responder inactive");
        _;
    }
    
    modifier onlyApprovedJurisdiction(string memory jurisdiction) {
        require(approvedJurisdictions[jurisdiction], "Jurisdiction not approved");
        require(bytes(kycProfiles[msg.sender].jurisdiction).length > 0, "No jurisdiction assigned");
        _;
    }
    
    modifier whenStateNotPaused(string memory state) {
        require(!statePaused[state], "Operations paused in this state");
        _;
    }
    
    modifier amlCompliant(address to, uint256 amount) {
        require(!_isTransactionSuspicious(msg.sender, to, amount), "Transaction flagged for AML review");
        _;
    }
    
    function setKYCStatus(
        address user,
        bool verified,
        string memory jurisdiction,
        string memory kycLevel,
        uint256 expiryDays
    ) external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        kycProfiles[user] = KYCProfile({
            isVerified: verified,
            isEmergencyResponder: false,
            jurisdiction: jurisdiction,
            verificationTimestamp: block.timestamp,
            verificationExpiry: block.timestamp + (expiryDays * 1 days),
            verifiedBy: msg.sender,
            kycLevel: kycLevel
        });
        
        _logAuditEvent("KYC_STATUS_UPDATE", "User verified");
        emit KYCStatusUpdated(user, verified, jurisdiction);
    }
    
    function setEmergencyResponderAuthorization(
        address responder,
        bool authorized,
        string memory femaNumber,
        string[] memory authorizedStates,
        uint256 expiryDays,
        string memory responderType
    ) external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        emergencyAuthorizations[responder] = EmergencyAuthorization({
            isAuthorized: authorized,
            femaRegistrationNumber: femaNumber,
            authorizedStates: authorizedStates,
            authorizationExpiry: block.timestamp + (expiryDays * 1 days),
            responderType: responderType,
            isActive: authorized
        });
        
        kycProfiles[responder].isEmergencyResponder = authorized;
        _logAuditEvent("EMERGENCY_AUTH_UPDATE", femaNumber);
        emit EmergencyAuthorizationGranted(responder, femaNumber);
    }
    
    function mintEmergencyReward(
        address responder,
        uint256 amount,
        string memory jurisdiction,
        bytes32 emergencyEventId,
        string memory alertType
    ) external 
        onlyRole(EMERGENCY_RESPONDER_ROLE)
        whenNotPaused()
        whenStateNotPaused(jurisdiction)
        nonReentrant() {
        
        require(kycProfiles[responder].isVerified, "Responder must be KYC verified");
        require(emergencyAuthorizations[responder].isAuthorized, "Responder not authorized");
        
        _recordTransaction(address(0), responder, amount, "EMERGENCY_REWARD", jurisdiction);
        _mint(responder, amount);
        _logAuditEvent("EMERGENCY_REWARD_ISSUED", alertType);
    }
    
    function mintCulturalContribution(
        address contributor,
        uint256 amount,
        string memory culturalAssetId,
        bool isLocked
    ) external onlyRole(COMPLIANCE_OFFICER_ROLE) whenNotPaused() nonReentrant() {
        require(kycProfiles[contributor].isVerified, "Contributor must be KYC verified");
        
        if (isLocked && !foundationPhaseUnlocked) {
            lockedBalances[contributor] += amount;
            totalLockedTokens += amount;
            culturalContributions[contributor] += amount;
            _logAuditEvent("LOCKED_TOKENS_ISSUED", culturalAssetId);
            emit LockedTokensIssued(contributor, amount, culturalAssetId);
        } else {
            _recordTransaction(address(0), contributor, amount, "CULTURAL_REWARD", kycProfiles[contributor].jurisdiction);
            _mint(contributor, amount);
            _logAuditEvent("CULTURAL_REWARD_ISSUED", culturalAssetId);
        }
    }
    
    function _recordTransaction(address from, address to, uint256 amount, string memory transactionType, string memory jurisdiction) internal {
        bytes32 txId = keccak256(abi.encodePacked(from, to, amount, block.timestamp, block.number));
        bool flagged = _isTransactionSuspicious(from, to, amount);
        
        transactionRecords[txId] = TransactionRecord({
            from: from, to: to, amount: amount, timestamp: block.timestamp,
            transactionType: transactionType, jurisdiction: jurisdiction,
            flaggedForReview: flagged, investigated: false, investigationNotes: ""
        });
        
        if (flagged) {
            _logAuditEvent("SUSPICIOUS_TRANSACTION", "AUTOMATED_DETECTION");
            emit SuspiciousActivityDetected(from, to, amount, "AUTOMATED_DETECTION");
        }
    }
    
    function _isTransactionSuspicious(address from, address to, uint256 amount) internal view returns (bool) {
        if (amount >= SUSPICIOUS_THRESHOLD) return true;
        if (dailyTransactionVolume[from] + amount > DAILY_LIMIT) return true;
        if (lastTransactionDate[from] == block.timestamp) return true;
        if (!kycProfiles[to].isVerified && amount > 1000 * 10**18) return true;
        return false;
    }
    
    function pauseSystem(string memory reason) external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        _pause();
        _logAuditEvent("SYSTEM_PAUSED", reason);
        emit RegulatoryPauseActivated(reason, msg.sender);
    }
    
    function unpauseSystem() external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        _unpause();
        _logAuditEvent("SYSTEM_UNPAUSED", "System operations resumed");
    }
    
    function pauseState(string memory state, string memory reason) external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        statePaused[state] = true;
        _logAuditEvent("STATE_PAUSED", state);
    }
    
    function unpauseState(string memory state) external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        statePaused[state] = false;
        _logAuditEvent("STATE_UNPAUSED", state);
    }
    
    function unlockFoundationPhase() external onlyRole(COMPLIANCE_OFFICER_ROLE) {
        require(!foundationPhaseUnlocked, "Foundation phase already unlocked");
        foundationPhaseUnlocked = true;
        uint256 totalUnlocked = totalLockedTokens;
        _logAuditEvent("FOUNDATION_UNLOCK", "Foundation phase unlocked");
        emit FoundationPhaseUnlocked(totalUnlocked, 0);
    }
    
    function claimUnlockedTokens() external {
        require(foundationPhaseUnlocked, "Foundation phase not yet unlocked");
        require(lockedBalances[msg.sender] > 0, "No locked tokens to claim");
        
        uint256 amount = lockedBalances[msg.sender];
        lockedBalances[msg.sender] = 0;
        totalLockedTokens -= amount;
        _mint(msg.sender, amount);
        _logAuditEvent("TOKENS_CLAIMED", "Locked tokens claimed");
    }
    
    function generateQuarterlyReport(uint256 quarter) external onlyRole(COMPLIANCE_OFFICER_ROLE) returns (ComplianceReport memory) {
        string[] memory jurisdictions = new string[](6);
        jurisdictions[0] = "US-WV"; jurisdictions[1] = "US-PA"; jurisdictions[2] = "US-VA";
        jurisdictions[3] = "US-KY"; jurisdictions[4] = "US-TN"; jurisdictions[5] = "US-NC";
        
        ComplianceReport memory report = ComplianceReport({
            reportingPeriod: quarter, totalTokensIssued: totalSupply(), emergencyRewards: 0,
            culturalRewards: 0, activeUsers: 0, suspiciousTransactions: 0,
            investigatedCases: 0, affectedJurisdictions: jurisdictions
        });
        
        quarterlyReports[quarter] = report;
        _logAuditEvent("COMPLIANCE_REPORT", "Quarterly report generated");
        emit ComplianceReportGenerated(quarter, report.totalTokensIssued);
        return report;
    }
    
    function _logAuditEvent(string memory action, string memory details) internal {
        auditTrail.push(AuditEvent({
            actor: msg.sender, action: action, details: details,
            timestamp: block.timestamp,
            transactionHash: keccak256(abi.encodePacked(block.timestamp, msg.sender, action))
        }));
        emit AuditEventLogged(msg.sender, action, block.timestamp);
    }
    
    function getAuditTrailLength() external view returns (uint256) { return auditTrail.length; }
    function getAuditEvent(uint256 index) external view returns (AuditEvent memory) {
        require(index < auditTrail.length, "Index out of bounds");
        return auditTrail[index];
    }
    function getUserKYCStatus(address user) external view returns (KYCProfile memory) { return kycProfiles[user]; }
    function getUserEmergencyAuth(address user) external view returns (EmergencyAuthorization memory) { return emergencyAuthorizations[user]; }
    function getLockedBalance(address user) external view returns (uint256) { return lockedBalances[user]; }
    function isJurisdictionApproved(string memory jurisdiction) external view returns (bool) { return approvedJurisdictions[jurisdiction]; }
    function isStatePaused(string memory state) external view returns (bool) { return statePaused[state]; }
    
    function transfer(address to, uint256 amount) public override whenNotPaused() returns (bool) {
        require(kycProfiles[msg.sender].isVerified, "Sender must be KYC verified");
        require(!_isTransactionSuspicious(msg.sender, to, amount), "Transaction flagged for review");
        _recordTransaction(msg.sender, to, amount, "TRANSFER", kycProfiles[msg.sender].jurisdiction);
        return super.transfer(to, amount);
    }
    
    function transferFrom(address from, address to, uint256 amount) public override whenNotPaused() returns (bool) {
        require(!_isTransactionSuspicious(from, to, amount), "Transaction flagged for review");
        _recordTransaction(from, to, amount, "TRANSFER_FROM", kycProfiles[from].jurisdiction);
        return super.transferFrom(from, to, amount);
    }
}
