// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChain is AccessControl {
    // STATE VARIABLES
    uint256 private _batchIds;
    
    // ROLES
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    // AGRICULTURE & FOOD CATEGORIES
    enum Category {
        FreshProduce,       // fruits, vegetables, herbs
        GrainsCereals,      // wheat, rice, corn, oats
        LivestockMeat,      // cattle, poultry, pork, seafood
        DairyProducts,      // milk, cheese, yogurt, butter
        ProcessedFoods,     // packaged goods, beverages, snacks
        OrganicSpecialty,    // gluten-free, vegan, kosher, halal
        SeedsAgriculturalInputs, // fertilizers, pesticides, equipment
        CoffeeTea,          // bean/leaf origin to cup
        SpicesSeasonings    // spices and seasonings
    }
    
    // BATCH STATUS
    enum BatchStatus {
        Created,
        InTransit,
        Processed,
        Packaged,
        ForSale,
        Sold,
        Recalled
    }
    
    // BATCH STRUCT
    struct Batch {
        uint256 id;
        string batchId;
        string certificateId;
        Category category;
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
    
    // MAPPINGS
    mapping(uint256 => Batch) public batches;
    mapping(string => uint256) public batchIdToIndex;
    
    // EVENTS
    event BatchCreated(uint256 indexed batchId, address indexed farmer, string batchIdString, Category category);
    event BatchInTransit(uint256 indexed batchId, address indexed distributor);
    event BatchProcessed(uint256 indexed batchId, address indexed distributor);
    event BatchPackaged(uint256 indexed batchId, address indexed retailer);
    event BatchForSale(uint256 indexed batchId, address indexed retailer);
    event BatchSold(uint256 indexed batchId, address indexed consumer);
    event BatchRecalled(uint256 indexed batchId, address indexed initiator, string reason);
    event PackagingDetailsUpdated(uint256 indexed batchId, uint256 packagingDate, string storageConditions);
    event RetailDetailsUpdated(uint256 indexed batchId, uint256 arrivalDate, uint256 stockQuantity, uint256 sellingPrice);
    event CertificationVerified(uint256 indexed batchId, bool verified);

    // CONSTRUCTOR
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }
    
    // ROLE MANAGEMENT FUNCTIONS
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
    
    // CORE SUPPLY CHAIN FUNCTIONS
    function createBatch(
        string memory _batchId,
        string memory _certificateId,
        Category _category,
        string memory _crop,
        string memory _origin,
        uint256 _harvestDate,
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
            category: _category,
            crop: _crop,
            origin: _origin,
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
            farmerName: _farmerName,
            retailerName: "",
            packagingDate: 0,
            arrivalDate: 0,
            stockQuantity: 0,
            sellingPrice: 0,
            certificationVerified: false
        });

        batchIdToIndex[_batchId] = newBatchId;
        emit BatchCreated(newBatchId, msg.sender, _batchId, _category);
    }

    function shipBatch(uint256 _batchId, address _distributor) public onlyRole(FARMER_ROLE) {
        require(_batchId > 0 && _batchId <= _batchIds, "Invalid batch ID");
        require(batches[_batchId].status == BatchStatus.Created, "Batch not in created state");

        batches[_batchId].distributor = _distributor;
        batches[_batchId].status = BatchStatus.InTransit;
        batches[_batchId].updatedAt = block.timestamp;

        emit BatchInTransit(_batchId, msg.sender);
    }

    function processBatch(uint256 _batchId) public onlyRole(DISTRIBUTOR_ROLE) {
        require(_batchId > 0 && _batchId <= _batchIds, "Invalid batch ID");
        require(batches[_batchId].status == BatchStatus.InTransit, "Batch not in transit");

        batches[_batchId].status = BatchStatus.Processed;
        batches[_batchId].updatedAt = block.timestamp;

        emit BatchProcessed(_batchId, msg.sender);
    }

    function updatePackagingDetails(
        uint256 _batchId,
        uint256 _packagingDate,
        string memory _storageConditions
    ) public onlyRole(DISTRIBUTOR_ROLE) {
        require(_batchId > 0 && _batchId <= _batchIds, "Invalid batch ID");
        require(batches[_batchId].status == BatchStatus.Processed, "Batch not in processed state");

        batches[_batchId].packagingDate = _packagingDate;
        batches[_batchId].storageConditions = _storageConditions;
        batches[_batchId].updatedAt = block.timestamp;
        
        emit PackagingDetailsUpdated(_batchId, _packagingDate, _storageConditions);
    }

    function packageBatch(uint256 _batchId, address _retailer) public onlyRole(DISTRIBUTOR_ROLE) {
        require(_batchId > 0 && _batchId <= _batchIds, "Invalid batch ID");
        require(batches[_batchId].status == BatchStatus.Processed, "Batch not in processed state");

        batches[_batchId].retailer = _retailer;
        batches[_batchId].status = BatchStatus.Packaged;
        batches[_batchId].updatedAt = block.timestamp;

        emit BatchPackaged(_batchId, msg.sender);
    }

    function updateRetailDetails(
        uint256 _batchId,
        uint256 _arrivalDate,
        uint256 _stockQuantity,
        uint256 _sellingPrice,
        string memory _retailerName
    ) public onlyRole(RETAILER_ROLE) {
        require(_batchId > 0 && _batchId <= _batchIds, "Invalid batch ID");
        require(batches[_batchId].retailer == msg.sender, "Not the designated retailer");

        batches[_batchId].arrivalDate = _arrivalDate;
        batches[_batchId].stockQuantity = _stockQuantity;
        batches[_batchId].sellingPrice = _sellingPrice;
        batches[_batchId].retailerName = _retailerName;
        batches[_batchId].updatedAt = block.timestamp;

        emit RetailDetailsUpdated(_batchId, _arrivalDate, _stockQuantity, _sellingPrice);
    }
}