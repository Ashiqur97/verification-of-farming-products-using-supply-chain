// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract supplychain is AccessControl {
    uint256 private _batchIds;

    bytes32 public constant FARMER_ROLE = keccak256("FAMER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    enum BatchStatus {
        Created,
        InTransit,
        Processed,
        Packaged,
        ForSale,
        Sold,
        Recalled
    }

    struct Batch {
        uint256 id;
        string batchId;
        string certificateId;
        string crop;
        string origin;
        uint256 harvestDate;
        address farmer;
        address distributor;
        address retailer;
        address consumer;
        uint256 weight;
        string quality;
        BatchStatus status;
        uint256 createdAt;
        uint256 updatedAt;
        string storageConditions;
        string destination;
        string farmerName;
        string retailerName;
        uint256 packagingDate;
        uint256 arrivalDate;
        uint256 stockQuantity;
        uint256 sellingPrice;
        bool certificationVerified;
    }


    mapping (uint256 => Batch) public batches;
    mapping (string => uint256) public batchToIndex;

    event BatchCreated(uint256 indexed batchId, address indexed farmer, string batchIdentifier);
    event BatchTransit(uint256 indexed batchId, address indexed from, address indexed distributor);
    event Processed(uint256 indexed batchId, address indexed distributor);
    event BatchPackaged(uint256 indexed batchId,address indexed retailer);
    event BatchForSale(uint256 indexed batchId, address indexed retailer);
    event BatchForSold(uint256 indexed batchId, address indexed consumer);
    event BatchRecalled(uint256 indexed batchId,address indexed initiator,string reason);
    event PackagingDetailsUpdated(uint256 indexed batchId, uint256 packagingDate, string storageConditions);
    event RetailDetailsUpdated(uint256 indexed batchId, uint256 arrivalDate, uint256 stockQuantity, uint256 sellingPrice);
    event CertificationVerified(uint256 indexed batchId, bool verified);


    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE,msg.sender);
        _grantRole(ADMIN_ROLE,msg.sender);
    }

    
    
}
