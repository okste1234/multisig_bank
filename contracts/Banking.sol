// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./interfaces/IToken.sol";

contract CooperateBank {
    address TokenAddress;

    uint256 allAmout;

    uint counts;

    address[] members;
    uint8 signers;

    struct Transactions {
        uint id;
        address creator;
        uint amount;
        bool isApproved;
        uint signersCount;
    }

    constructor(
        address _tokenAddress,
        address[] memory _members,
        uint8 _signers
    ) {
        TokenAddress = _tokenAddress;
        signers = _signers;

        for (uint8 i = 0; i < _members.length; i++) {
            require(_members[i] != address(0), "no zero address");

            isValidMember[_members[i]] = true;
        }
        members = _members;
    }

    mapping(address => bool) isValidMember;

    mapping(uint => Transactions) transactions;

    mapping(address => bool) hasSigned;

    Transactions[] allTransactions;

    function deposit(uint256 _amount) external {
        require(msg.sender != address(0), "no zero address call");

        require(_amount > 0, "can't deposit zero");

        require(
            IToken(TokenAddress).balanceOf(msg.sender) >= _amount,
            "insufficient tokens"
        );

        require(
            IToken(TokenAddress).transferFrom(
                msg.sender,
                address(this),
                _amount
            ),
            "unsuccessful"
        );

        allAmout = allAmout + _amount;
    }

    function initiateWithdrawal(uint256 _amount) external {
        require(msg.sender != address(0), "no zero address call");

        require(isValidMember[msg.sender], "Not a valid memeber");

        require(_amount > 0, "can't withdraw zero");

        require(allAmout >= _amount, "insufficient balance to withdraw");

        uint _id = counts + 1;

        Transactions storage newTx = transactions[_id];

        newTx.id = _id;
        newTx.amount = _amount;
        newTx.creator = msg.sender;
        newTx.signersCount = newTx.signersCount + 1;

        hasSigned[msg.sender] = true;

        allTransactions.push(newTx);

        counts++;
    }

    function approvedWithdrawal(uint _id) external returns (bool) {
        require(_id <= counts, "tx id not found");

        require(isValidMember[msg.sender], "not authorized");

        require(!hasSigned[msg.sender], "can't sign twice");

        Transactions storage Tx = transactions[_id];

        require(!Tx.isApproved, "transaction already approved");

        Tx.signersCount++;

        hasSigned[msg.sender] = true;

        if (Tx.signersCount == signers) {
            IToken(TokenAddress).transfer(Tx.creator, Tx.amount);
        }

        return Tx.isApproved = true;
    }
}
