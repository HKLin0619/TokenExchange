// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSaleContract {
    address public owner;
    uint256 public totalSupply;
    uint256 public tokensAvailable;

    mapping(address => mapping(string => uint256)) public balances;
    mapping(string => address) public ownersByTokenName;
    mapping(string => bytes32) public awardIDByTokenName;
    

    event TokensMinted(address indexed owner, string tokenName, uint256 amount);
    event TokensPurchased(address indexed buyer, string tokenName, uint256 amount);
    event TokensBurned(address indexed owner, string tokenName, uint256 amount, string awardID, string buyerID,string supplierID,uint256 awardAmount,string award_Doc_Hash,string financerID,string funded_int);
    
    // Assume you have additional mappings to store buyerID, supplierID, awardAmount, awardDocHash, financerID, and fundedInt
    mapping(string => mapping(string => string)) public buyerIDs;
    mapping(string => mapping(string => string)) public supplierIDs;
    mapping(string => mapping(string => uint256)) public awardAmounts;
    mapping(string => mapping(string => string)) public awardDocHashes;
    mapping(string => mapping(string => string)) public financerIDs;
    mapping(bytes32 => mapping(string => string)) public fundedInt;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        totalSupply = 2000000;
        tokensAvailable = totalSupply;
        ownersByTokenName["default"] = owner;
        balances[owner]["default"] = totalSupply;
    }


    function mint(string calldata tokenName, uint256 amount) external onlyOwner {
        require(tokensAvailable >= amount, "Not enough tokens available for minting");
        
        // If the token name is not registered, associate it with the owner
        if (ownersByTokenName[tokenName] == address(0)) {
            ownersByTokenName[tokenName] = owner;
        }

        // Mint tokens to the specified owner and token name
        balances[ownersByTokenName[tokenName]][tokenName] += amount;
        tokensAvailable -= amount;

        emit TokensMinted(ownersByTokenName[tokenName], tokenName, amount);
    }


    function purchase(string calldata tokenName, uint256 amount) external payable {
        require(amount > 0, "Purchase amount must be greater than 0");
        require(balances[ownersByTokenName[tokenName]][tokenName] >= amount, "Not enough tokens available for purchase");
        require(msg.value == amount * 0 ether, "Incorrect Ether amount sent");
        require(tokensAvailable >= amount, "Not enough tokens available for purchase");


        // Transfer tokens from owner to buyer
        balances[ownersByTokenName[tokenName]][tokenName] -= amount;
        balances[msg.sender][tokenName] += amount;

        // Transfer Ether to owner
        payable(ownersByTokenName[tokenName]).transfer(msg.value);

        emit TokensPurchased(msg.sender, tokenName, amount);
    }

    // New function to burn tokens and write data to the blockchain
    function WriteData(string calldata tokenName, uint256 amount, string memory awardID, string memory buyerID,string memory supplierID,uint256 awardAmount,string memory award_Doc_Hash,string memory financerID,string memory funded_int) external {
        // Hash awardID to bytes32
        bytes32 hashedAwardID = keccak256(abi.encodePacked(awardID));

        buyerIDs[tokenName][awardID] = buyerID;
        supplierIDs[tokenName][awardID] = supplierID;
        awardAmounts[tokenName][awardID] = awardAmount;
        awardDocHashes[tokenName][awardID] = award_Doc_Hash;
        financerIDs[tokenName][awardID] = financerID;
        fundedInt[hashedAwardID][tokenName] = funded_int;
        
        require(balances[msg.sender][tokenName] >= amount, "Not enough tokens to burn");

        // Burn tokens
        balances[msg.sender][tokenName] -= amount;
        tokensAvailable += amount;

        // Emit event for the burned tokens
        emit TokensBurned(msg.sender, tokenName, amount, awardID, buyerID,supplierID,awardAmount,award_Doc_Hash,financerID,funded_int);
    }

    function getData(string calldata tokenName, string calldata awardID) external view returns (
    uint256 amount,
    string memory supplierID,
    uint256 awardAmount,
    string memory award_Doc_Hash,
    string memory financerID,
    string memory funded_int
    ) {
    //hash awardID to bytes32
    bytes32 hashedAwardID = keccak256(abi.encodePacked(awardID));

    // Retrieve data based on tokenName and awardID
    amount = balances[msg.sender][tokenName];
    // buyerID = buyerIDs[tokenName][awardID];
    supplierID = supplierIDs[tokenName][awardID];
    awardAmount = awardAmounts[tokenName][awardID];
    award_Doc_Hash = awardDocHashes[tokenName][awardID];
    financerID = financerIDs[tokenName][awardID];
    funded_int = fundedInt[hashedAwardID][tokenName];
    }
    
    function getBalance(address account, string calldata tokenName) external view returns (uint256) {
        return balances[account][tokenName];
    }

    


    function updateFundedInt(string calldata tokenName, string calldata awardID, string calldata newFundedInt,string calldata newFinancerID) external {
    bytes32 hashedAwardID = keccak256(abi.encodePacked(awardID));

    require(
        msg.sender == ownersByTokenName[tokenName] || 
        msg.sender == thirdPersonByAwardID[hashedAwardID], 
        "Only the token owner or designated third person can update funded_int" 
    );
    
    fundedInt[hashedAwardID][tokenName] = newFundedInt;
    //update financerID with new value
    financerIDs[tokenName][awardID] = newFinancerID;

    emit FundedIntUpdated(msg.sender, tokenName, newFundedInt, hashedAwardID);
    }

    mapping(bytes32 => address) public thirdPersonByAwardID;

    event FundedIntUpdated(address indexed updater, string tokenName, string newFundedInt, bytes32 hashedAwardID);
    
    function designateThirdPerson(string calldata awardID, address thirdPerson) external onlyOwner {
    bytes32 hashedAwardID = keccak256(abi.encodePacked(awardID));

    
    require(msg.sender == owner, "Only the contract owner can designate a third person");
    
    thirdPersonByAwardID[hashedAwardID] = thirdPerson;
    }
    
}