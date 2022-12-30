import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA8rQ2YzTtljK3pFZub0Ml_868XlGSg48Q",
  authDomain: "meuapp-8421e.firebaseapp.com",
  databaseURL: "https://meuapp-8421e-default-rtdb.firebaseio.com",
  projectId: "meuapp-8421e",
  storageBucket: "meuapp-8421e.appspot.com",
  messagingSenderId: "1041528115688",
  appId: "1:1041528115688:web:a5520247acd845241ad45d",
  measurementId: "G-V1C7BEBYV7"
};


export const firebase = initializeApp(firebaseConfig);

