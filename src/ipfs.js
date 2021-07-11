const IPFS = require('ipfs-api');
const IPFS_HOST = 'ipfs.infura.io';
const IPFS_PORT = '5001';
const PROTOCOL = 'https';
// ipfs connection
const ipfs = new IPFS({host: IPFS_HOST, port: IPFS_PORT, protocol: PROTOCOL});

export default ipfs;
