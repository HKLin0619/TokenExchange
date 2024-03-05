module.exports =  [
	{
	  inputs: [],
	  stateMutability: "nonpayable",
	  type: "constructor",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "updater",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "newFundedInt",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "bytes32",
		  name: "hashedAwardID",
		  type: "bytes32",
		},
	  ],
	  name: "FundedIntUpdated",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "awardID",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "buyerID",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "supplierID",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "awardAmount",
		  type: "uint256",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "award_Doc_Hash",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "financerID",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "funded_int",
		  type: "uint256",
		},
	  ],
	  name: "TokensBurned",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "owner",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "TokensMinted",
	  type: "event",
	},
	{
	  anonymous: false,
	  inputs: [
		{
		  indexed: true,
		  internalType: "address",
		  name: "buyer",
		  type: "address",
		},
		{
		  indexed: false,
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  indexed: false,
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "TokensPurchased",
	  type: "event",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "awardID",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "buyerID",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "supplierID",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "awardAmount",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "award_Doc_Hash",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "financerID",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "funded_int",
		  type: "uint256",
		},
	  ],
	  name: "WriteData",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "awardAmounts",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "awardDocHashes",
	  outputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "awardIDByTokenName",
	  outputs: [
		{
		  internalType: "bytes32",
		  name: "",
		  type: "bytes32",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "balances",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "buyerIDs",
	  outputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "callFunction",
	  outputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "awardID",
		  type: "string",
		},
		{
		  internalType: "address",
		  name: "thirdPerson",
		  type: "address",
		},
	  ],
	  name: "designateThirdPerson",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "financerIDs",
	  outputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "bytes32",
		  name: "",
		  type: "bytes32",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "fundedInt",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "address",
		  name: "account",
		  type: "address",
		},
		{
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
	  ],
	  name: "getBalance",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "awardID",
		  type: "string",
		},
	  ],
	  name: "getData",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "buyerID",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "supplierID",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "awardAmount",
		  type: "uint256",
		},
		{
		  internalType: "uint256",
		  name: "award_Doc_Hash",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "financerID",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "funded_int",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "getNumber",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "pure",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
	  ],
	  name: "getOwnerByTokenName",
	  outputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "getTotalSupply",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "mint",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "myFunction",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "owner",
	  outputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "ownersByTokenName",
	  outputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  internalType: "uint256",
		  name: "amount",
		  type: "uint256",
		},
	  ],
	  name: "purchase",
	  outputs: [],
	  stateMutability: "payable",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  name: "supplierIDs",
	  outputs: [
		{
		  internalType: "string",
		  name: "",
		  type: "string",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "bytes32",
		  name: "",
		  type: "bytes32",
		},
	  ],
	  name: "thirdPersonByAwardID",
	  outputs: [
		{
		  internalType: "address",
		  name: "",
		  type: "address",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "tokensAvailable",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [],
	  name: "totalSupply",
	  outputs: [
		{
		  internalType: "uint256",
		  name: "",
		  type: "uint256",
		},
	  ],
	  stateMutability: "view",
	  type: "function",
	},
	{
	  inputs: [
		{
		  internalType: "string",
		  name: "tokenName",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "awardID",
		  type: "string",
		},
		{
		  internalType: "string",
		  name: "newFundedInt",
		  type: "string",
		},
		{
			internalType: "string",
			name: "newFinancerID",
			type: "string"
		}
	  ],
	  name: "updateFundedInt",
	  outputs: [],
	  stateMutability: "nonpayable",
	  type: "function",
	},
];