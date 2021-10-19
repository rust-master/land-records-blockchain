pragma solidity >=0.4.0 <0.6.0;

import {Auth} from "../contracts/Auth.sol";
import "../contracts/Counter.sol";

contract Land is Auth {

    using Counters for Counters.Counter;
    Counters.Counter private _landIds;

    struct landDetails {
        uint256 landID;
        string state;
        string district;
        string villageTown;
        uint256 khataNumber;
        uint256 khatooniNumber;
        address payable CurrentOwner;
        string ownerName;
        address previousOwner;
        uint256 marketValue;
        string landType;
        string squareFoots;
        string inches;
        string lat;
        string lng;
        string north;
        string south;
        string east;
        string west;
        address payable requester;
        bool isAvailable;
        reqStatus requestStatus;
        address payable createByGovt;
        string orderEndTime;
    }

    uint256[] public propertiesIDs;

    //request status
    enum reqStatus {
        Default,
        pending,
        reject,
        approved
    }

    //profile of a client
    struct profiles {
        uint256[] assetList;
    }

    mapping(uint256 => landDetails) land;
    address owner;
    mapping(string => address) superAdmin;
    mapping(address => profiles) profile;

    //contract owner
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    //adding village admins
    function addSuperAdmin(address _superAdmin, string memory _village)
        public
        onlyOwner
    {
        superAdmin[_village] = _superAdmin;
    }

    //Registration of land details.
    function Registration(
        string memory _state,
        string memory _district,
        string memory _villageTown,
        uint256 _khataNumber,
        uint256 _khatooniNumber,
        address payable _OwnerAddress,
        string memory _ownerName,
        address _previousOwner,
        uint256 _marketValue,
        string memory _squareFoots,
        string memory _inches,
        string memory _landType,
        address payable _createByGovt
    ) public returns (bool) {
        require(superAdmin[_villageTown] == msg.sender || owner == msg.sender);

        _landIds.increment();
        uint256 newLandId = _landIds.current();

        require(land[newLandId].landID != newLandId);

        land[newLandId].landID = newLandId;
        land[newLandId].state = _state;
        land[newLandId].district = _district;
        land[newLandId].villageTown = _villageTown;
        land[newLandId].khataNumber = _khataNumber;
        land[newLandId].khatooniNumber = _khatooniNumber;
        land[newLandId].CurrentOwner = _OwnerAddress;
        land[newLandId].ownerName = _ownerName;
        land[newLandId].previousOwner = _previousOwner;
        land[newLandId].marketValue = _marketValue;
        land[newLandId].squareFoots = _squareFoots;
        land[newLandId].inches = _inches;
        land[newLandId].landType = _landType;
        land[newLandId].createByGovt = _createByGovt;
        profile[_OwnerAddress].assetList.push(newLandId);
        propertiesIDs.push(newLandId);
        return true;
    }

    // Updating land details. Polyline
    function registerLandPolyline(
        string memory _lat,
        string memory _lng,
        string memory _north,
        string memory _south,
        string memory _east,
        string memory _west
    ) public returns (bool) {
        uint256 newLandId = _landIds.current();

        land[newLandId].lat = _lat;
        land[newLandId].lng = _lng;
        land[newLandId].north = _north;
        land[newLandId].south = _south;
        land[newLandId].east = _east;
        land[newLandId].west = _west;
        return true;
    }

    //to view details of land for the owner
    function landInfoOwner(uint256 id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            bool,
            uint256,
            string memory,
            string memory
        )
    {
        return (
            land[id].state,
            land[id].district,
            land[id].villageTown,
            land[id].isAvailable,
            land[id].marketValue,
            land[id].squareFoots,
            land[id].inches
        );
    }

    function remainingDetail(uint256 id)
        public
        view
        returns (
            address,
            address,
            address,
            uint256,
            uint256,
            string memory
        )
    {
        return (
            land[id].createByGovt,
            land[id].CurrentOwner,
            land[id].previousOwner,
            land[id].khataNumber,
            land[id].khatooniNumber,
            land[id].landType
        );
    }

    function remainingMoreDetail(uint256 id)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        return (
            land[id].lat,
            land[id].lng,
            land[id].north,
            land[id].south,
            land[id].east,
            land[id].west,
            land[id].ownerName
        );
    }

    function showAllLands(uint256 id)
        public
        view
        returns (
            address,
            string memory,
            string memory,
            string memory,
            uint256,
            string memory,
            string memory
        )
    {
        return (
            land[id].CurrentOwner,
            land[id].state,
            land[id].district,
            land[id].villageTown,
            land[id].marketValue,
            land[id].squareFoots,
            land[id].inches
        );
    }

    //to view details of land for the buyer
    function landInfoUser(uint256 id)
        public
        view
        returns (
            address,
            uint256,
            bool,
            address,
            reqStatus,
            uint256,
            uint256
        )
    {
        return (
            land[id].CurrentOwner,
            land[id].marketValue,
            land[id].isAvailable,
            land[id].requester,
            land[id].requestStatus,
            land[id].khataNumber,
            land[id].khatooniNumber
        );
    }

    // to compute id for a land.
    function computeId(
        string memory _state,
        string memory _district,
        string memory _village,
        uint256 _surveyNumber
    ) public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(_state, _district, _village, _surveyNumber)
                )
            ) % 10000000000000;
    }

    //push a request to the land owner
    function requstToLandOwner(uint256 id) public {
        require(land[id].isAvailable);
        require(msg.sender.balance >= land[id].marketValue);
        land[id].requester = msg.sender;
        land[id].isAvailable = false;
        land[id].requestStatus = reqStatus.pending; //changes the status to pending.
    }

    //will show assets of the function caller
    function viewAssets() public view returns (uint256[] memory) {
        return (profile[msg.sender].assetList);
    }

    //viewing request for the lands
    function viewRequest(uint256 property) public view returns (address) {
        return (land[property].requester);
    }

    //availing land for sale.
    function markAvailable(uint256 property) public {
        require(land[property].CurrentOwner == msg.sender);
        land[property].isAvailable = true;
    }

    function unMarkLand(uint256 property) public {
        require(land[property].CurrentOwner == msg.sender);
        land[property].requester = address(0);  
        land[property].requestStatus = reqStatus.Default;
        land[property].isAvailable = false;
    }

    function showMarketValue(uint256 id) public view returns (uint256) {
        return land[id].marketValue;
    }

    // change the market value after some years
    function changeMarketValue(string memory _landType, uint256 _marketValue)
        public
    {
        // update all land values
        for (uint256 i = 0; i < propertiesIDs.length; i++) {
            if (
                land[propertiesIDs[i]].marketValue > 0 &&
                keccak256(abi.encodePacked(land[propertiesIDs[i]].landType)) ==
                keccak256(abi.encodePacked(_landType))
            ) {
                land[propertiesIDs[i]].marketValue =
                    land[propertiesIDs[i]].marketValue +
                    _marketValue;
            }
        }
    }

    // Get all the lands ids.
    function getAllLands() public view returns (uint256[] memory) {
        return (propertiesIDs);
    }

    // show marked Available
    function viewMarkded(uint256 id)
        public
        view
        returns (
            string memory,
            address,
            string memory,
            bool,
            uint256,
            string memory,
            uint256
        )
    {
        if (land[id].isAvailable) {
            return (
                land[id].state,
                land[id].CurrentOwner,
                land[id].district,
                land[id].isAvailable,
                land[id].marketValue,
                land[id].squareFoots,
                id
            );
        }
    }

    // show marked Available
    function viewMarkdedRemainingData(uint256 id)
        public
        view
        returns (
            string memory,
            uint256,
            uint256,
            string memory
        )
    {
        if (land[id].isAvailable) {
            return (
                land[id].villageTown,
                land[id].khataNumber,
                land[id].khatooniNumber,
                land[id].inches
            );
        }
    }

    //processing request for the land by accepting or rejecting
    function processRequest(uint256 property, reqStatus status) public {
        require(land[property].CurrentOwner == msg.sender);
        land[property].requestStatus = status;
        if (status == reqStatus.reject) {
            land[property].requester = address(0);
            land[property].requestStatus = reqStatus.Default;
        }
    }

    //buying the approved property
    function buyProperty(uint256 property) public payable {
        require(land[property].requestStatus == reqStatus.approved);
        require(msg.value >= land[property].marketValue);

        uint256 totalValue = msg.value;
        uint256 taxFee = 1000000000000000000;

        if (msg.value <= 16000000000000000000) {
            totalValue = totalValue - taxFee;
        } else {
            taxFee = (msg.value * 6) / uint256(100);
            totalValue = totalValue - taxFee;
        }

        land[property].createByGovt.transfer(taxFee);
        land[property].CurrentOwner.transfer(totalValue);

        removeOwnership(land[property].CurrentOwner, property);
        land[property].previousOwner = land[property].CurrentOwner;
        land[property].CurrentOwner = msg.sender;
        land[property].ownerName = getUserName(msg.sender);
        land[property].isAvailable = false;
        land[property].requester = address(0);
        land[property].requestStatus = reqStatus.Default;
        profile[msg.sender].assetList.push(property); //adds the property to the asset list of the new owner.
    }

    function refuseToBuy(uint256 property) public {
        require(land[property].requester == msg.sender);
        land[property].requester = address(0);  
        land[property].requestStatus = reqStatus.Default;
    }

    //removing the ownership of seller for the land. and it is called by the buyProperty function
    function removeOwnership(address previousOwner, uint256 id) private {
        uint256 index = findId(id, previousOwner);
        profile[previousOwner].assetList[index] = profile[previousOwner]
            .assetList[profile[previousOwner].assetList.length - 1];
        delete profile[previousOwner].assetList[
            profile[previousOwner].assetList.length - 1
        ];
        profile[previousOwner].assetList.length--;
    }

    //for finding the index of a perticular id
    function findId(uint256 id, address user) public view returns (uint256) {
        uint256 i;
        for (i = 0; i < profile[user].assetList.length; i++) {
            if (profile[user].assetList[i] == id) return i;
        }
        return i;
    }
}
