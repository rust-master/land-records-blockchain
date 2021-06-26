pragma solidity >=0.4.22 <0.9.0;

contract Land {    

	struct PropertyDetail {
		uint value;
		address currOwner;
	}
	
    mapping(uint => PropertyDetail) public properties;
    uint[] public propertiesValues;
    address[] public propertiesAddress;
    
	// Create Property
    function createProperty(uint _propId, uint _value, address _owner) public returns (bool)  {
		properties[_propId] = PropertyDetail(_value, _owner);
		propertiesValues.push(_value);
		propertiesAddress.push(_owner);
		return true;
	}
	
	// Get the property details.
	 function getPropertyDetails(uint _propId) view public returns (uint, address)  {
		return (properties[_propId].value, properties[_propId].currOwner);
	}
	
    // Get the property details.
	 function getAllDetails() view public returns (uint[] memory, address[] memory)  {
		return (propertiesValues,propertiesAddress);
	}

}