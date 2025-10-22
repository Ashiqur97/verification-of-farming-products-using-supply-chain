// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SupplyChain {
    uint256 private _batchIds;

    enum Category { 
        FreshProduce, GrainsCereals, LivestockMeat, DairyProducts, 
        ProcessedFoods, OrganicSpecialty, SeedsAgriculturalInputs, 
        CoffeeTea, SpicesSeasonings 
    }
    
    enum BatchStatus { Created, InTransit, Processed, Packaged, ForSale, Sold, Recalled }

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

    event BatchCreated(uint256 indexed id, address indexed creator, string batchId);

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
        require(batchIdToIndex[_batchId] == 0, "Batch ID exists");

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

        batchIdToIndex[_batchId] = id;
        emit BatchCreated(id, msg.sender, _batchId);
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