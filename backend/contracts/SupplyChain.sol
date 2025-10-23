// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    uint256 private _batchIds;

    enum Category { 
        FreshProduce, GrainsCereals, LivestockMeat, DairyProducts, 
        ProcessedFoods, OrganicSpecialty, SeedsAgriculturalInputs, 
        CoffeeTea, SpicesSeasonings 
    }
    
    enum BatchStatus { Created, InTransit, Processed, Packaged, ForSale, Sold }

    struct BatchCore {
        uint256 id;
        string batchId;
        string certificateId;
        Category category;
        string crop;
        string origin;
        string harvestDate;
        address creator;
        BatchStatus status;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Logistics {
        string destination;
        string storageConditions;
        string processor;
        string processingDate;
    }

    struct RetailInfo {
        string brand;
        string packagingDate;
        uint256 weight;
        string quality;
        uint256 sellingPrice;
        bool certificationVerified;
        string certifications;
    }

    mapping(uint256 => BatchCore) public batchCore;
    mapping(uint256 => Logistics) public logistics;
    mapping(uint256 => RetailInfo) public retail;

    event BatchCreated(uint256 indexed id, address indexed creator, string batchId);
    event BatchStatusUpdated(uint256 indexed id, BatchStatus status);
    event LogisticsUpdated(uint256 indexed id, string processor);
    event RetailInfoUpdated(uint256 indexed id, string brand);

    function createBatch(
        string memory _batchId,
        string memory _certificateId,
        Category _category,
        string memory _crop,
        string memory _origin,
        string memory _harvestDate
    ) external {
        require(bytes(_batchId).length > 0, "Batch ID required");
        require(bytes(_certificateId).length > 0, "Certificate ID required");

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
            creator: msg.sender,
            status: BatchStatus.Created,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });

        emit BatchCreated(id, msg.sender, _batchId);
    }

    function updateLogistics(
        uint256 _id,
        string memory _destination,
        string memory _storageConditions,
        string memory _processor,
        string memory _processingDate
    ) external {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        
        logistics[_id] = Logistics({
            destination: _destination,
            storageConditions: _storageConditions,
            processor: _processor,
            processingDate: _processingDate
        });

        batchCore[_id].status = BatchStatus.InTransit;
        batchCore[_id].updatedAt = block.timestamp;
        
        emit LogisticsUpdated(_id, _processor);
        emit BatchStatusUpdated(_id, BatchStatus.InTransit);
    }

    function updateRetailInfo(
        uint256 _id,
        string memory _brand,
        string memory _packagingDate,
        uint256 _weight,
        string memory _quality,
        uint256 _sellingPrice,
        bool _certificationVerified,
        string memory _certifications
    ) external {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        
        retail[_id] = RetailInfo({
            brand: _brand,
            packagingDate: _packagingDate,
            weight: _weight,
            quality: _quality,
            sellingPrice: _sellingPrice,
            certificationVerified: _certificationVerified,
            certifications: _certifications
        });

        batchCore[_id].status = BatchStatus.Packaged;
        batchCore[_id].updatedAt = block.timestamp;
        
        emit RetailInfoUpdated(_id, _brand);
        emit BatchStatusUpdated(_id, BatchStatus.Packaged);
    }

    function updateBatchStatus(uint256 _id, BatchStatus _status) external {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        batchCore[_id].status = _status;
        batchCore[_id].updatedAt = block.timestamp;
        emit BatchStatusUpdated(_id, _status);
    }

    function getFullBatch(uint256 _id) external view returns (
        BatchCore memory,
        Logistics memory,
        RetailInfo memory
    ) {
        require(_id > 0 && _id <= _batchIds, "Invalid batch ID");
        return (batchCore[_id], logistics[_id], retail[_id]);
    }

    function totalBatches() external view returns (uint256) {
        return _batchIds;
    }

    function test() external pure returns (string memory) {
        return "SupplyChain contract is working!";
    }
}