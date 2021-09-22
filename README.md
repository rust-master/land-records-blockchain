# Blockchain based Land Records System

# Screens

<img src="Main Splash.PNG" alt="Splash Screen" />

## Requirements to Use this Project

### Step 1:

Download and Install Node.js: 
 - <a href="https://nodejs.org/en/download/" > Download Node.js </a>

Download and Install Visual Studio Code:
 - <a href="https://code.visualstudio.com/download" > Download Visual Studio Code </a>

Install Truffle:
 - open cmd and install `npm install -g truffle`

Download and Install Ganache:
 - <a href="https://www.trufflesuite.com/ganache" > Download Ganache </a>

Download and Install MetaMask extension:
 - <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" > Install MetaMask </a>

### Step 2:

- Download Project and open in VSCode.
- Open Terminal in VSCode.
  - Key Shorcut: `ctrl + ~`
- Type `npm install` and enter then it start downloading the node modules.
- After installing the in terminal type `cd src`
- After changing the directory to src then type `truffle compile`
- When compilation done, open Ganache and click on quick start
- Now type `truffle deploy` in terminal
- When Smart contract deployed
- close the terminal
- Opne terminal again and type `npm start` to run the project

### Step 3:

- Connect with MetaMask
- Signup by Goverment with using first account of ganache
- Login Goverment and create land, update land etc.

- Signup By User with second account or any account expect first account
- Login and view land, mark land, view land at map, view detail, search to buy etc.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `truffle compile`

Compile the contracts

### `truffle migrate`

Run migrations 

### `truffle deploy`

Deploy the smart contracts on theblockchain

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


### Truffle framework

 You can learn more about truffle [Overview of Truffle](https://www.trufflesuite.com/docs/truffle/overview)

Truffle Installation [Installation](https://www.trufflesuite.com/docs/truffle/getting-started/installation)

### `npm install -g truffle`


### Ganache

 You can learn more about Ganache  [Overview of Ganache](https://www.trufflesuite.com/docs/ganache/overview)

[Download Ganache](https://github.com/trufflesuite/ganache/releases)

### Solidity

 You can learn more about Solidity  [Solidity Docs](https://docs.soliditylang.org)

### MetaMask

MetaMask is the easiest way to interact with dapps in a browser. It is an extension for Chrome or Firefox that connects to an Ethereum network without running a full node on the browser's machine. It can connect to the main Ethereum network, any of the testnets (Ropsten, Kovan, and Rinkeby), or a local blockchain such as the one created by Ganache or Truffle Develop.

#### Installing MetaMask

 You can install [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn)

#### Detecting MetaMask's web3 injection

```if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
  web3 = new Web3(App.web3Provider);
}
```

### Formatter.js Bug
Formatter.js Bug removed
<a href="https://stackoverflow.com/questions/66374242/web3-formatter-js-loading-issue">Solution Link</a>

<hr>

<h2 align="center">Project Development Team</h2>

### Project Supervisor
- Mr. Amir Ali Rizvi (Blockchain Expert)
- Lecturer at COMSATS Sahiwal
- <a href="https://web.facebook.com/amir.a.rizvi1">Facebook Profile</a> 

### Project Student Members
- Muhammad Zaryab Rafique
- - <a href="https://www.linkedin.com/in/zaryab-programmer">LindedIn Profile</a> 
- - <a href="https://mzaryabrafique.live/">Website</a> 
- Muhammad Zohiab Arshad
