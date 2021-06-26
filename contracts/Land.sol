pragma solidity >=0.4.22 <0.9.0;

contract Land {
    struct PropertyDetail {
        uint256 value;
        address currOwner;
    }

    mapping(uint256 => PropertyDetail) public properties;
    uint256[] public propertiesValues;
    address[] public propertiesAddress;

    // Create Property
    function createProperty(
        uint256 _propId,
        uint256 _value,
        address _owner
    ) public returns (bool) {
        properties[_propId] = PropertyDetail(_value, _owner);
        propertiesValues.push(_value);
        propertiesAddress.push(_owner);
        return true;
    }

    // Get the property details.
    function getPropertyDetails(uint256 _propId)
        public
        view
        returns (uint256, address)
    {
        return (properties[_propId].value, properties[_propId].currOwner);
    }

    // Get the property details.
    function getAllDetails()
        public
        view
        returns (uint256[] memory, address[] memory)
    {
        return (propertiesValues, propertiesAddress);
    }
}
