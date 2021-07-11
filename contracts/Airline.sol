// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Ownable.sol";

contract Airline is Ownable {
    struct Customer {
        uint256 loyaltyPoints;
        uint256 totalFlights;
    }

    struct Flight {
        string name;
        uint256 price;
    }

    uint256 etherPerPoint = 0.5 ether;

    Flight[] public flights;

    mapping(address => Customer) public customers;
    mapping(address => Flight[]) public customerFlights;
    mapping(address => uint256) public customersTotalFlights;

    event FlightPurchased(address indexed customer, uint256 price);

    constructor() {
        flights.push(Flight("Tokio", 4 ether));
        flights.push(Flight("Germany", 1 ether));
        flights.push(Flight("Madrid", 2 ether));
    }

    function buyFlight(uint256 flightIndex) public payable {
        Flight memory flight = flights[flightIndex];
        require(msg.value == flight.price, "Balance not available");

        Customer storage customer = customers[msg.sender];
        customer.loyaltyPoints += 5;
        customer.totalFlights += 1;
        customerFlights[msg.sender].push(flight);
        customersTotalFlights[msg.sender]++;

        emit FlightPurchased(msg.sender, flight.price);
    }

    function totalFlights() public view returns (uint256) {
        return flights.length;
    }

    function redeemLoyaltyPoints() public {
        Customer storage customer = customers[msg.sender];
        uint256 ethertoRefund = etherPerPoint * customer.loyaltyPoints;
        payable(msg.sender).transfer(ethertoRefund);
        customer.loyaltyPoints = 0;
    }

    function getRefundableEther() public view returns (uint256) {
        return etherPerPoint * customers[msg.sender].loyaltyPoints;
    }

    function getAirlineBalance() public view isOwner returns (uint256) {
        address airlineAddress = address(this);
        return airlineAddress.balance;
    }
}
