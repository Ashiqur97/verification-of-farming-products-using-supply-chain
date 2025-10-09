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
    mapping (string => uint256) public batchIdToIndex;

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

      function addFarmer(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(FARMER_ROLE, account);
    }

    function addDistributor(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(DISTRIBUTOR_ROLE, account);
    }

    function addRetailer(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(RETAILER_ROLE, account);
    }

    function addConsumer(address account) public onlyRole(ADMIN_ROLE) {
        _grantRole(CONSUMER_ROLE, account);
    }

    function CreateBatch(
        string memory _batchId,
        string memory _certificateId,
        string memory _crop,
        string memory _origin,
        uint256  _harvestDate,
        string memory _quality,
        uint256 _weight,
        string memory _storageConditions,
        string memory _destination,
        string memory _farmerName
    ) public onlyRole(FARMER_ROLE) {
        require(batchIdToIndex[_batchId] == 0, "Batch ID already exists");

        _batchIds++;
        uint256 newBatchId = _batchIds;

        batches[newBatchId] = Batch({
            id: newBatchId,
            batchId: _batchId,
            certificateId: _certificateId,
            crop:_crop,
            origin:_origin,
            harvestDate: _harvestDate,
            farmer: msg.sender,
            distributor: address(0),
            retailer: address(0),
            consumer: address(0),
            weight: _weight,
            quality: _quality,
            status: BatchStatus.Created,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            storageConditions: _storageConditions,
            destination: _destination,
            farmerName : _farmerName,
            retailerName: "",
            packagingDate:0,
            arrivalDate:0,
            stockQuantity:0,
            sellingPrice:0,
            certificationVerified:false
        });

        batchIdToIndex[_batchId] = newBatchId;
        emit BatchCreated(newBatchId,msg.sender,_batchId);

    }
 
}
