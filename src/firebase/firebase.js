import app from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAdf7fvaONI4rTAKmk20_izlsjMZv5qAgA",
    authDomain: "react-uni-project.firebaseapp.com",
    databaseURL: "https://react-uni-project.firebaseio.com",
    projectId: "react-uni-project",
    storageBucket: "react-uni-project.appspot.com",
    messagingSenderId: "811406092216",
    appId: "1:811406092216:web:d3248ca1f285caba5d514d"
};

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig);

        this.auth = app.auth();
    }

    // *** Auth API ***
 
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
}
   
export default Firebase;