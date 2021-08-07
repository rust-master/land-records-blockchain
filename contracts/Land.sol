pragma solidity >=0.4.0 <0.6.0;

//Land Details
contract Land {
    struct landDetails {
        string state;
        string district;
        string village;
        uint256 surveyNumber;
        address payable CurrentOwner;
        uint256 marketValue;
        string measurement;
        string ipfsHash;
        string landType;
        bool isAvailable;
        address requester;
        reqStatus requestStatus;
        address createByGovt;
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
        string memory _village,
        uint256 _surveyNumber,
        address payable _OwnerAddress,
        uint256 _marketValue,
        uint256 id,
        string memory _measurement,
        string memory _ipfsHash,
        string memory _landType,
        address payable _createByGovt
    ) public returns (bool) {
        require(superAdmin[_village] == msg.sender || owner == msg.sender);
        land[id].state = _state;
        land[id].district = _district;
        land[id].village = _village;
        land[id].surveyNumber = _surveyNumber;
        land[id].CurrentOwner = _OwnerAddress;
        land[id].marketValue = _marketValue;
        land[id].measurement = _measurement;
        land[id].landType = _landType;
        land[id].ipfsHash = _ipfsHash;
        land[id].createByGovt = _createByGovt;
        profile[_OwnerAddress].assetList.push(id);
        propertiesIDs.push(id);
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
            uint256,
            bool,
            uint256,
            string memory
        )
    {
        return (
            land[id].state,
            land[id].district,
            land[id].village,
            land[id].surveyNumber,
            land[id].isAvailable,
            land[id].marketValue,
            land[id].measurement
        );
    }

    function remainingDetail(uint256 id)
        public
        view
        returns (string memory, string memory, address)
    {
        return (land[id].ipfsHash, land[id].landType, land[id].createByGovt);
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
            uint256,
            string memory
        )
    {
        return (
            land[id].CurrentOwner,
            land[id].state,
            land[id].district,
            land[id].village,
            land[id].surveyNumber,
            land[id].marketValue,
            land[id].measurement
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
            reqStatus
        )
    {
        return (
            land[id].CurrentOwner,
            land[id].marketValue,
            land[id].isAvailable,
            land[id].requester,
            land[id].requestStatus
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

    //processing request for the land by accepting or rejecting
    function processRequest(uint256 property, reqStatus status) public {
        require(land[property].CurrentOwner == msg.sender);
        land[property].requestStatus = status;
        if (status == reqStatus.reject) {
            land[property].requester = address(0);
            land[property].requestStatus = reqStatus.Default;
        }
    }

    //availing land for sale.
    function makeAvailable(uint256 property) public {
        require(land[property].CurrentOwner == msg.sender);
        land[property].isAvailable = true;
    }

    function showMarketValue(uint256 id) public view returns (uint256) {
        return land[id].marketValue;
    }

    // change the market value after some years
    function changeMarketValue(uint256 property, uint256 _marketValue) public {
        uint256 marketValueGet = showMarketValue(property);
        land[property].marketValue = marketValueGet + _marketValue;
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
                land[id].measurement,
                id
            );
        }
    }

    // show marked Available
    function viewMarkdedRemainingData(uint256 id)
        public
        view
        returns (string memory, uint256)
    {
        if (land[id].isAvailable) {
            return (land[id].village, land[id].surveyNumber);
        }
    }

    // make chages to send Ether
    //
    //buying the approved property
    function buyProperty(uint256 property) public payable {
        require(land[property].requestStatus == reqStatus.approved);
        require(msg.value >= land[property].marketValue);
        land[property].CurrentOwner.transfer(msg.value);
        removeOwnership(land[property].CurrentOwner, property);
        land[property].CurrentOwner = msg.sender;
        land[property].isAvailable = false;
        land[property].requester = address(0);
        land[property].requestStatus = reqStatus.Default;
        profile[msg.sender].assetList.push(property); //adds the property to the asset list of the new owner.
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
