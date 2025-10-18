// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChain is AccessControl {
    uint256 private _batchIds;

    
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    bytes32 public constant CONSUMER_ROLE = keccak256("CONSUMER_ROLE");

   
    enum Category { FreshProduce, GrainsCereals, LivestockMeat, DairyProducts, ProcessedFoods, OrganicSpecialty, SeedsAgriculturalInputs, CoffeeTea, SpicesSeasonings }
    enum BatchStatus { Created, InTransit, Processed, Packaged, ForSale, Sold, Recalled }

   
    struct BatchCore {
        uint256 id;
        string batchId;
        string certificateId;
        Category category;
        string crop;
        string origin;
        uint256 harvestDate;
        address farmer;
        BatchStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    
    struct Logistics {
        address distributor;
        address retailer;
        address consumer;
        string destination;
        string storageConditions;
    }

    
    struct RetailInfo {
        string farmerName;
        string retailerName;
        uint256 packagingDate;
        uint256 arrivalDate;
        uint256 stockQuantity;
        uint256 sellingPrice;
        bool certificationVerified;
        uint256 weight;
        string quality;
    }

    
    mapping(uint256 => BatchCore) public batchCore;
    mapping(uint256 => Logistics) public logistics;
    mapping(uint256 => RetailInfo) public retail;
    mapping(string => uint256) public batchIdToIndex;

   
    event BatchCreated(uint256 indexed id, address indexed farmer, string batchId, Category category);
    event BatchStatusUpdated(uint256 indexed id, BatchStatus status);

   
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender); 
    }

  

    function createBatch(
        string memory _batchId,
        string memory _certificateId,
        Category _category,
        string memory _crop,
        string memory _origin,
        uint256 _harvestDate
    ) external onlyRole(FARMER_ROLE) {
        require(batchIdToIndex[_batchId] == 0, "Batch already exists");

        _batchIds++;
        uint256 id = _batchIds;

        batchCore[id] = BatchCore({
            id: id,
            batchId: _batchId,
            certificateId: _certificateId,
            category: _category,
            crop: _crop,
            origin: _origin,
            harvestDate: _harvestDate,
            farmer: msg.sender,
            status: BatchStatus.Created,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        batchIdToIndex[_batchId] = id;
        emit BatchCreated(id, msg.sender, _batchId, _category);
    }

    function setLogistics(
        uint256 _id,
        string memory _destination,
        string memory _storageConditions
    ) external onlyRole(FARMER_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        logistics[_id].destination = _destination;
        logistics[_id].storageConditions = _storageConditions;
        batchCore[_id].updatedAt = block.timestamp;
    }

    function assignDistributor(uint256 _id, address _distributor) external onlyRole(FARMER_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        require(_distributor != address(0), "Invalid distributor");

        logistics[_id].distributor = _distributor;
        batchCore[_id].status = BatchStatus.InTransit;
        batchCore[_id].updatedAt = block.timestamp;
        emit BatchStatusUpdated(_id, BatchStatus.InTransit);
    }

    

    function markProcessed(uint256 _id) external onlyRole(DISTRIBUTOR_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        batchCore[_id].status = BatchStatus.Processed;
        batchCore[_id].updatedAt = block.timestamp;
        emit BatchStatusUpdated(_id, BatchStatus.Processed);
    }

    function packageBatch(uint256 _id, address _retailer) external onlyRole(DISTRIBUTOR_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        require(_retailer != address(0), "Invalid retailer");

        logistics[_id].retailer = _retailer;
        batchCore[_id].status = BatchStatus.Packaged;
        batchCore[_id].updatedAt = block.timestamp;
        emit BatchStatusUpdated(_id, BatchStatus.Packaged);
    }

    

    function updateRetailInfo(
        uint256 _id,
        uint256 _arrivalDate,
        uint256 _stockQuantity,
        uint256 _sellingPrice,
        string memory _retailerName
    ) external onlyRole(RETAILER_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");

        RetailInfo storage r = retail[_id];
        r.arrivalDate = _arrivalDate;
        r.stockQuantity = _stockQuantity;
        r.sellingPrice = _sellingPrice;
        r.retailerName = _retailerName;

        batchCore[_id].updatedAt = block.timestamp;
    }

    function putForSale(uint256 _id) external onlyRole(RETAILER_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        batchCore[_id].status = BatchStatus.ForSale;
        batchCore[_id].updatedAt = block.timestamp;
        emit BatchStatusUpdated(_id, BatchStatus.ForSale);
    }

    function sell(uint256 _id, address _consumer) external onlyRole(RETAILER_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        require(_consumer != address(0), "Invalid consumer");

        logistics[_id].consumer = _consumer;
        batchCore[_id].status = BatchStatus.Sold;
        batchCore[_id].updatedAt = block.timestamp;
        emit BatchStatusUpdated(_id, BatchStatus.Sold);
    }

    
    function verifyCertification(uint256 _id, bool _verified) external onlyRole(RETAILER_ROLE) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        retail[_id].certificationVerified = _verified;
        batchCore[_id].updatedAt = block.timestamp;
    }

    

    function getFullBatch(uint256 _id)
        external
        view
        returns (BatchCore memory, Logistics memory, RetailInfo memory)
    {
        return (batchCore[_id], logistics[_id], retail[_id]);
    }

    function totalBatches() external view returns (uint256) {
        return _batchIds;
    }
}
