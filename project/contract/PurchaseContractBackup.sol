// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenSaleContract {
    address public owner;
    uint256 public totalSupply;
    uint256 public tokensAvailable;

    mapping(address => mapping(string => uint256)) public balances;
    mapping(string => address) public ownersByTokenName;

    event TokensMinted(address indexed owner, string tokenName, uint256 amount);
    event TokensPurchased(address indexed buyer, string tokenName, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
        totalSupply = 1000000; // Set total supply directly to 1 million
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
        require(msg.value == amount * 1 ether, "Incorrect Ether amount sent");
        require(tokensAvailable >= amount, "Not enough tokens available for purchase");


        // Transfer tokens from owner to buyer
        balances[ownersByTokenName[tokenName]][tokenName] -= amount;
        balances[msg.sender][tokenName] += amount;

        // Transfer Ether to owner
        payable(ownersByTokenName[tokenName]).transfer(msg.value);

        emit TokensPurchased(msg.sender, tokenName, amount);
    }

    // Additional functions for checking balances, total supply, and owner by token name
    function getBalance(address account, string calldata tokenName) external view returns (uint256) {
        return balances[account][tokenName];
    }

    function getTotalSupply() external view returns (uint256) {
        return totalSupply;
    }

    function getOwnerByTokenName(string calldata tokenName) external view returns (address) {
        return ownersByTokenName[tokenName];
    }

    
}