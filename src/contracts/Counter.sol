//SPDX-License-Identifier: MIT
pragma solidity >=0.4.0 <0.6.0;

library Counters {
    struct Counter {
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {  
        counter._value += 1;
    }
}
