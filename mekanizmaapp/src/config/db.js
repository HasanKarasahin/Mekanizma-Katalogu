import Firebase from 'firebase';
let config = {
    apiKey: "AIzaSyBY08nzwcZlQ47b6JnWByFe1Q3PAim4kkA",
    authDomain: "mekanizmaapp.firebaseapp.com",
    databaseURL: "https://mekanizmaapp.firebaseio.com",
    projectId: "mekanizmaapp",
    storageBucket: "",
    messagingSenderId: "579842797161",
    appId: "1:579842797161:web:92040041c344b219a4fcf8",
    measurementId: "G-M6JVLG02DL"
};
let app = Firebase.initializeApp(config);
export const db = app.database();