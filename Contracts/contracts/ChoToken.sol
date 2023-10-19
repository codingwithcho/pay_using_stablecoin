// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// ECR20Capped is used here so that we can have an upper limit for our token
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
// Ownable is used here so that we can easily get the owner of the contract, transfer ownership, use OnlyOwner modifier etc
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChoToken is Ownable, ERC20Capped {
    constructor(uint256 cap, address owner) ERC20("ChoToken","CHT") ERC20Capped(cap) Ownable(owner) {
        // We want to receive a certain amount of our token when we are deploying the token
        ERC20._mint(msg.sender, 10000*10**18);
    }

}