import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCqOrQ1MT3oox_xGyazcSI2Xm4hkusfbFA",
    authDomain: "blockchainlandrecords.firebaseapp.com",
    projectId: "blockchainlandrecords",
    storageBucket: "blockchainlandrecords.appspot.com",
    messagingSenderId: "1066010921263",
    appId: "1:1066010921263:web:ed76780a14ea814f3b39da",
    measurementId: "G-N9R2Z7LYTE"
};

const fire = firebase.initializeApp(firebaseConfig);

export default fire;