import { initializeApp } 
from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";

import { getDatabase, set, update, ref } 
from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} 
from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";

import {firebaseConfig} from "./firebase.js";
import { createRegLoginForm, createLogOutIcon} from "./register_form.js";


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

//const register_user = document.getElementById('user_register');


// register user function
const register_new_user = (e) => {
    e.preventDefault();

    const user_email = document.getElementById('user_email').value;
    const user_passwd = document.getElementById('user_passwd').value;

    createUserWithEmailAndPassword(auth, user_email, user_passwd)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(`new user created ${user}`)

    const loginTime = new Date();
    set(ref(database, 'users/' + user.uid), {
        email: user_email,
        role: "simple_user",
        timestamp : `${loginTime}`
      });
    
  })
  .catch((error) => {
      console.log(error);
  });

}



// login existing user
const loginUser = () => {
    const login_email = document.getElementById('login_email').value;
    const login_password = document.getElementById('login_password').value;

    signInWithEmailAndPassword(auth, login_email, login_password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            const loginTime = new Date()
            update(ref(database, 'users/' + user.uid), {
                last_login: loginTime

            });
            console.log(user, "Login successful!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
        });
}


const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(user)
        console.log(user.uid)
        console.log("user logged in: ", user);

        createLogOutIcon();

    } else {

        createRegLoginForm();

        const loginBtn = document.getElementById('user_login');
        const registerBtn = document.getElementById('user_register');

        registerBtn.addEventListener('click', register_new_user);
        loginBtn.document.getElementById('user_login').addEventListener('click', loginUser);

        console.log("user logged out");
    }
});

//sign-out
document.getElementById('signOut').addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });
})