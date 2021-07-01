pragma experimental ABIEncoderV2;
pragma solidity >=0.4.22 <0.9.0;

contract Land {    

	struct PropertyDetail {
	    uint landID;
		uint value;
		address currOwner;
		string city;
		string measurement;
		string status;
	}
	
    mapping(uint => PropertyDetail) public properties;
    uint[] public propertiesIDs;
    uint[] public propertiesValues;
    address[] public propertiesAddress;
    string[] public propertiesCity;
    string[] public propertiesMeasurement;
    string[] public propertiesStatus;
    
	// Create Property
    function createProperty(uint _propId, uint _value, address _owner, string memory _city, string memory _measurement) public returns (bool)  {
		properties[_propId] = PropertyDetail(_propId, _value, _owner, _city, _measurement,"Not-Available-For-Sale");
		propertiesIDs.push(_propId);
		propertiesValues.push(_value);
		propertiesAddress.push(_owner);
		propertiesCity.push(_city);
		propertiesMeasurement.push(_measurement);
		propertiesStatus.push("Not-Available-For-Sale");
		return true;
	}
	
	// Get the property details.
	 function getPropertyDetails(uint _propId) view public returns (uint, uint, address)  {
		return (properties[_propId].landID, properties[_propId].value, properties[_propId].currOwner);
	}
	
    // Get the property details.
	 function getAllDetails() view public returns (uint[] memory, uint[] memory, address[] memory, string[] memory, string[] memory, string[] memory)  {
		return (propertiesIDs, propertiesValues, propertiesAddress, propertiesCity, propertiesMeasurement,propertiesStatus);
	}

}