// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    uint256 private _batchIds;

    enum Category { FreshProduce, GrainsCereals, LivestockMeat, DairyProducts, ProcessedFoods, OrganicSpecialty, SeedsAgriculturalInputs, CoffeeTea, SpicesSeasonings }
    enum BatchStatus { Created, InTransit, Processed, Packaged, ForSale, Sold, Recalled }

    struct BatchCore {
        uint256 id;
        string batchId;
        string certificateId;
        Category category;
        string crop;
        string origin;
        uint256 harvestTimestamp; 
        string harvestDate;       
        address creator;
        BatchStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Logistics {
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

    event BatchCreated(uint256 indexed id, address indexed creator, string batchId, Category category, string harvestDate);
    event BatchStatusUpdated(uint256 indexed id, BatchStatus status);

    function createBatch(
        string memory _batchId,
        string memory _certificateId,
        Category _category,
        string memory _crop,
        string memory _origin,
        uint256 _harvestTimestamp,
        string memory _harvestDate
    ) external {
        require(batchIdToIndex[_batchId] == 0, "Batch ID already exists");
        require(bytes(_batchId).length > 0, "Batch ID cannot be empty");
        require(bytes(_certificateId).length > 0, "Certificate ID cannot be empty");
        require(_harvestTimestamp <= block.timestamp, "Harvest date cannot be in future");
        require(bytes(_harvestDate).length > 0, "Harvest date string cannot be empty");

        _batchIds++;
        uint256 id = _batchIds;

        batchCore[id] = BatchCore({
            id: id,
            batchId: _batchId,
            certificateId: _certificateId,
            category: _category,
            crop: _crop,
            origin: _origin,
            harvestTimestamp: _harvestTimestamp, 
            harvestDate: _harvestDate,           
            creator: msg.sender,
            status: BatchStatus.Created,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        batchIdToIndex[_batchId] = id;
        emit BatchCreated(id, msg.sender, _batchId, _category, _harvestDate);
    }

    function setLogistics(
        uint256 _id,
        string memory _destination,
        string memory _storageConditions
    ) external {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        logistics[_id].destination = _destination;
        logistics[_id].storageConditions = _storageConditions;
        batchCore[_id].updatedAt = block.timestamp;
    }

    function updateBatchStatus(uint256 _id, BatchStatus _status) external {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        batchCore[_id].status = _status;
        batchCore[_id].updatedAt = block.timestamp;
        emit BatchStatusUpdated(_id, _status);
    }

    function updateRetailInfo(
        uint256 _id,
        uint256 _packagingDate,
        uint256 _arrivalDate,
        uint256 _stockQuantity,
        uint256 _sellingPrice,
        bool _certificationVerified,
        uint256 _weight,
        string memory _quality
    ) external {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        
        retail[_id].packagingDate = _packagingDate;
        retail[_id].arrivalDate = _arrivalDate;
        retail[_id].stockQuantity = _stockQuantity;
        retail[_id].sellingPrice = _sellingPrice;
        retail[_id].certificationVerified = _certificationVerified;
        retail[_id].weight = _weight;
        retail[_id].quality = _quality;
        
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