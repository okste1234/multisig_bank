// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

interface IBank {
    function deposit(uint256 _amount) external;

    function initiateWithdrawal(uint256 _amount) external;

    function approvedWithdrawal(uint _id) external returns (bool);
}
