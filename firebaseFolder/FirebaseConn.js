import React, { Component } from 'react';
import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDRAJShYBtDm-_lxHyKNplBZA78zmMA_cE",
    authDomain: "itemlister-7fc68.firebaseapp.com",
    databaseURL: "https://itemlister-7fc68.firebaseio.com",
    projectId: "itemlister-7fc68"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

//const rootRef = firebase.database().ref();
//const goalRef = rootRef.child('goal');

module.exports.firebaseApp = firebaseApp.database();