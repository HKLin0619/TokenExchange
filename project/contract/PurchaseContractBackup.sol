// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSaleContract {
    address public owner;
    uint256 public totalSupply;
    uint256 public tokensAvailable;

    mapping(address => mapping(string => uint256)) public balances;
    mapping(string => address) public ownersByTokenName;

    event TokensMinted(address indexed owner, string tokenName, uint256 amount);
    event TokensPurchased(
        address indexed buyer,
        string tokenName,
        uint256 amount
    );
    event TokensBurned(
        address indexed owner,
        string tokenName,
        uint256 amount,
        string awardID,
        string buyerID,
        string supplierID,
        uint256 awardAmount,
        uint256 award_Doc_Hash,
        string financerID,
        uint256 funded_int
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor(uint256 _totalSupply) {
        owner = msg.sender;
        totalSupply = _totalSupply;
        tokensAvailable = _totalSupply;
        ownersByTokenName["default"] = owner;
        balances[owner]["default"] = _totalSupply;
    }

    function mint(
        string calldata tokenName,
        uint256 amount
    ) external onlyOwner {
        require(
            tokensAvailable >= amount,
            "Not enough tokens available for minting"
        );

        // If the token name is not registered, associate it with the owner
        if (ownersByTokenName[tokenName] == address(0)) {
            ownersByTokenName[tokenName] = owner;
        }

        // Mint tokens to the specified owner and token name
        balances[ownersByTokenName[tokenName]][tokenName] += amount;
        tokensAvailable -= amount;

        emit TokensMinted(ownersByTokenName[tokenName], tokenName, amount);
    }

    function purchase(
        string calldata tokenName,
        uint256 amount
    ) external payable {
        require(amount > 0, "Purchase amount must be greater than 0");
        require(
            balances[ownersByTokenName[tokenName]][tokenName] >= amount,
            "Not enough tokens available for purchase"
        );
        //Remember to change back 1 ether, we now testing so we set as 0.01 ether
        // require(msg.value == amount * 1 ether, "Incorrect Ether amount sent");
        require(
            msg.value == amount * 10000000 gwei,
            "Incorrect Ether amount sent"
        );
        require(
            tokensAvailable >= amount,
            "Not enough tokens available for purchase"
        );

        // Transfer tokens from owner to buyer
        balances[ownersByTokenName[tokenName]][tokenName] -= amount;
        balances[msg.sender][tokenName] += amount;

        // Transfer Ether to owner
        payable(ownersByTokenName[tokenName]).transfer(msg.value);

        emit TokensPurchased(msg.sender, tokenName, amount);
    }

    // Additional functions for checking balances, total supply, and owner by token name
    function getBalance(
        address account,
        string calldata tokenName
    ) external view returns (uint256) {
        return balances[account][tokenName];
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }

    function getOwnerByTokenName(
        string calldata tokenName
    ) external view returns (address) {
        return ownersByTokenName[tokenName];
    }

    // New function to burn tokens and write data to the blockchain
    function WriteData(
        string calldata tokenName,
        uint256 amount,
        string memory awardID,
        string memory buyerID,
        string memory supplierID,
        uint256 awardAmount,
        uint256 award_Doc_Hash,
        string memory financerID,
        uint256 funded_int
    ) external {
        require(
            balances[msg.sender][tokenName] >= amount,
            "Not enough tokens to burn"
        );

        // Burn tokens
        balances[msg.sender][tokenName] -= amount;
        tokensAvailable += amount;

        // Emit event for the burned tokens
        emit TokensBurned(
            msg.sender,
            tokenName,
            amount,
            awardID,
            buyerID,
            supplierID,
            awardAmount,
            award_Doc_Hash,
            financerID,
            funded_int
        );
    }
}
