import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
require('dotenv').config()
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIM,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_MESSAGING_SERVER_ID,
    appId: process.env.REACT_APP_APP_ID
  };
  // Initialize Firebase
 app.initializeApp(firebaseConfig);
  const auth = app.auth();
  const  db = app.firestore()
  

  export {db, auth}
