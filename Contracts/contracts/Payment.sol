// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

// Ownable is used here so that we can easily get the owner of the contract, transfer ownership, use OnlyOwner modifier etc
import "@openzeppelin/contracts/access/Ownable.sol";
// The IECR20 intercase is used to get access to common erc20 functions such as approve, balanceof the token etc
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Payment is Ownable {
    mapping(address => bool) public allowedTokenAddress;
    mapping(address => uint256) public amountPaidByAddress;

    event tokenAddressAllowed(address _address, bool _bool);
    event paymentSuccesfully(address _from, address _to, uint256 _amount);
    constructor(address owner) Ownable(owner) {
        
    }

    // This function is to allow/block stable coins
    function allowStableCoinAddress(address _token, bool _isAllowed) public onlyOwner {
        allowedTokenAddress[_token] = _isAllowed;
        emit tokenAddressAllowed(_token, _isAllowed);
    }

    // This the deposit function
    function depositPayment(address _token, address _to, uint256 _amount) public {
        // we check if the token address in allowed
        require(allowedTokenAddress[_token] == true, "This stable coin is not allowed");
        // We check if this our smart contract has been giving approval to withdraw x amount of token form the clients wallet
        require(IERC20(_token).allowance(msg.sender, address(this)) >= _amount, "Contract cannot spend ffrom this wallet");
        // The contract can now transferFrom the clients waller
        bool success = IERC20(_token).transferFrom(msg.sender, _to, _amount);
        require(success, "Failed to deposit payment");
        emit paymentSuccesfully(msg.sender, _to, _amount);
    }

    // If you want to track those who paid and how much
    function depositPaymentWithTracking(address _token, address _to, uint256 _amount) public {
        // we check if the token address in allowed
        require(allowedTokenAddress[_token] == true, "This stable coin is not allowed");
        // We check if this our smart contract has been giving approval to withdraw x amount of token form the clients wallet
        require(IERC20(_token).allowance(msg.sender, address(this)) >= _amount, "Contract cannot spend ffrom this wallet");
        // The contract can now transferFrom the clients waller
        bool success = IERC20(_token).transferFrom(msg.sender, _to, _amount);
        require(success, "Failed to deposit payment");
        // putting it under the transferFrom so as to prevent hackers from hacking your contract
        amountPaidByAddress[msg.sender] += _amount;
        emit paymentSuccesfully(msg.sender, _to, _amount);
    }

    // Then we can have a function to get the amount of a specific client
    function getPaidAmount(address _address) public view returns(uint256) {
        return amountPaidByAddress[_address];
    }

    // Lets add our receive and fallback functions
    receive() external payable {}
    fallback() external payable {}
}