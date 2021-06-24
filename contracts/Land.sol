pragma solidity >=0.4.22 <0.9.0;

contract Land {    

	struct PropertyDetail {
		uint value;
		address currOwner;
	}
	

    mapping(uint => PropertyDetail) public properties;

    	// Create a new Property.
    function createProperty(uint _propId, uint _value, address _owner) public returns (bool)  {
		properties[_propId] = PropertyDetail(_value, _owner);
		return true;
	}
}