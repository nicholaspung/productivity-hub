import * as firebase from "firebase/app";
import "firebase/auth";

// Google Log-In
export const signInWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithRedirect(provider);
    return {
      token: result.credential.accessToken,
      user: result.user,
    };
  } catch (err) {
    return {
      error: {
        code: err.code,
        message: err.message,
        email: err.email,
        credential: err.credential,
      },
    };
  }
};

// firebase
//   .auth()
//   .getRedirectResult()
//   .then((res) => {
//     if (res.credential) {
//       const token = res.credential.accessToken;
//     }
//     const user = res.user;
//   })
//   .catch((err) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.email;
//     const credential = error.credential;
//   });

// Sign In Anonymously
// firebase
//   .auth()
//   .signInAnonymously()
//   .catch((err) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     const email = error.email;
//     const credential = error.credential;
//   });

// Auth State Changed
// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     const isAnonymous = user.isAnonymous;
//     const uid = user.uid;
//   } else {
//     // User is signed out
//   }
// });

// Link anonymous account with Google
// const credential = firebase.auth.GoogleAuthProvider.credential(
//   googleUser.getAuthResponse().id_token
// );
// firebase.auth.currentUser
//   .linkWithCredential(credential)
//   .then((usercred) => {
//     const user = usercred.user;
//     console.log("Anonymous account successfully upgraded", user);
//   })
//   .catch((err) => {
//     console.log("Error upgrading anonymous account", error);
//   });
