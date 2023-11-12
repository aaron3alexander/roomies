// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Roommate {
    struct Person {
        string name;
        string email;
        uint256 rent; // Share of the rent
    }

    Person public person1;
    Person public person2;
    uint256 public totalRent;

    // Set details of person 1
    function setPerson1(string memory _name, string memory _email) external {
        person1.name = _name;//"Tubby";
        person1.email = _email;//"tubby.tuberson@gmail.com";
    }

    // Set details of person 2
    function setPerson2(string memory _name, string memory _email) external {
        person2.name = _name;//"Erika";
        person2.email = _email;//"erika.gibson@gmal.com";
    }

    // Set total rent and calculate each person's share
    function setTotalRent(uint256 _rent) external {
        totalRent = _rent;//1200;
        person1.rent = totalRent / 2;
        person2.rent = totalRent / 2;
    }

    function getPerson1Name() public view returns(string memory){
        return person1.name;
    }

    function getPerson1Rent() public view returns(uint256) {
        return person1.rent;
    }

    function getPerson2Name() public view returns(string memory){
        return person2.name;
    }
    
    function getPerson2rent() public view returns(uint256){
        return person2.rent;
    }
}