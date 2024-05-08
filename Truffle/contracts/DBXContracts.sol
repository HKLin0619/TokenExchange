// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSaleContract {
    address public owner;
    uint256 public totalSupply;
    uint256 public tokensAvailable;

    mapping(address => mapping(string => uint256)) public balances;
    mapping(string => address) public ownersByTokenName;
    mapping(string => bytes32) public awardIDByTokenName;
    
    // Additional mappings for TenderNo and TenderDate
    mapping(string => mapping(string => string)) public tenderNos;
    mapping(string => mapping(string => string)) public tenderDates;
    mapping(string => mapping(string => string)) public awardDocIPFSURLs;

    event TokensMinted(address indexed owner, string tokenName, uint256 amount);
    event TokensPurchased(address indexed buyer, string tokenName, uint256 amount);
    event TokensBurned(address indexed owner, string tokenName, uint256 amount, string awardID, string buyerID, string supplierID, uint256 awardAmount, string award_Doc_Hash, string tenderNo, string tenderDate);
    
    // Assume you have additional mappings to store buyerID, supplierID, awardAmount, awardDocHash, financerID, and fundedInt
    mapping(string => mapping(string => string)) public buyerIDs;
    mapping(string => mapping(string => string)) public supplierIDs;
    mapping(string => mapping(string => uint256)) public awardAmounts;
    mapping(string => mapping(string => string)) public awardDocHashes;
    mapping(string => mapping(string => string)) public financerIDs;
    mapping(bytes32 => mapping(string => string)) public fundedInt;
    mapping(string => mapping(string => string)) public buyerNames;
    mapping(string => mapping(string => string)) public supplierNames;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        totalSupply = 1000;
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
    function WriteData(
        string memory awardID,
        string memory buyerID,
        string memory supplierID,
        uint256 awardAmount,
        string memory award_Doc_IPFS_URL,
        string memory award_Doc_Hash,
        string memory tenderNo,
        string memory tenderDate,
        string memory buyerName,
        string memory supplierName
    ) external {
        string memory tokenName = "DBX"; // Default token name

        // Ensure the caller has at least one token to burn
        require(balances[msg.sender][tokenName] > 0, "You do not have any tokens to burn");

        // Burn one token
        balances[msg.sender][tokenName] -= 1;
        tokensAvailable += 1;

        // Store data including TenderNo and TenderDate
        buyerIDs[tokenName][awardID] = buyerID;
        supplierIDs[tokenName][awardID] = supplierID;
        awardAmounts[tokenName][awardID] = awardAmount;
        awardDocIPFSURLs[tokenName][awardID] = award_Doc_IPFS_URL;
        awardDocHashes[tokenName][awardID] = award_Doc_Hash;
        tenderNos[tokenName][awardID] = tenderNo;
        tenderDates[tokenName][awardID] = tenderDate;
        buyerNames[tokenName][awardID] = buyerName;
        supplierNames[tokenName][awardID] = supplierName;

        // Emit event for the burned token
        emit TokensBurned(msg.sender, tokenName, 1, awardID, buyerID, supplierID, awardAmount, award_Doc_Hash, tenderNo, tenderDate);
    }

    function getData(string calldata awardID) external view returns (
        uint256 amount,
        string memory supplierID,
        uint256 awardAmount,
        string memory award_Doc_Hash,
        string memory financerID,
        string memory funded_int
    ) {
        string memory tokenName = "DBX"; // Default token name
        bytes32 hashedAwardID = keccak256(abi.encodePacked(awardID));

        // Retrieve data based on tokenName and awardID
        amount = balances[msg.sender][tokenName];
        supplierID = supplierIDs[tokenName][awardID];
        awardAmount = awardAmounts[tokenName][awardID];
        award_Doc_Hash = awardDocHashes[tokenName][awardID];
        financerID = financerIDs[tokenName][awardID];
        funded_int = fundedInt[hashedAwardID][tokenName];
    }
    
    function getBalance(address account, string calldata tokenName) external view returns (uint256) {
        return balances[account][tokenName];
    }
}
