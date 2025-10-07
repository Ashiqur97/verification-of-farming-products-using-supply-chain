// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChain is AccessControl {
    uint256 private _batchIds;
    
    // Define roles
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
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

    mapping(uint256 => Batch) public batches;
    mapping(string => uint256) public batchIdToIndex;

      event BatchCreated(uint256 indexed batchId, address indexed farmer, string batchIdentifier);
    event BatchTransit(uint256 indexed batchId, address indexed from, address indexed distributor);
    event Processed(uint256 indexed batchId, address indexed distributor);
    event BatchPackaged(uint256 indexed batchId,address indexed retailer);

}