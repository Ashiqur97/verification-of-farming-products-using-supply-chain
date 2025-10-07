// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract SupplyChain is AccessControl {

  using Couunters for Counters.Counter;
  Counters.Counter public Counter._batchIds;

  bytes32 public constant FARMER_ROLE = kechack256("FARMER_ROLE");
  bytes32 public constant DISTRIBUUTOR_ROLE = kechack256("DISTRIBUUTOR_ROLE");
  bytes32 public constant CONSUMER_ROLE = kechack256("CONSUMER_ROLE");
}
