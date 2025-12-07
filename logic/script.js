const firebaseConfig = {
  apiKey: "AIzaSyDMz3-SDfo6rbKfBHTAg3dxuLHk-peKMaM",
  authDomain: "abdul-wasay-rais.firebaseapp.com",
  databaseURL: "https://abdul-wasay-rais-default-rtdb.firebaseio.com",
  projectId: "abdul-wasay-rais",
  storageBucket: "abdul-wasay-rais.appspot.com",
  messagingSenderId: "301358166047",
  appId: "1:301358166047:web:f6dd23c70da1670e06252a"
};

const app = firebase.initializeApp(firebaseConfig);
let userCredentials = JSON.parse(localStorage.getItem("user")) || {};
let userDetails = {};

function googleAuth() {

    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {

                var user = result.user;
                userDetails = user;

                // Save to localStorage with lat/lng
                localStorage.setItem("user", JSON.stringify({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    img: user.photoURL,
                    type: document.getElementById("type").value,
                    lat: latitude,
                    lng: longitude
                }));

                // Save to Firebase DB
                firebase.database().ref('users/' + user.uid).set({
                    uid: user.uid,
                    username: user.displayName,
                    email: user.email,
                    img: user.photoURL,
                    type: document.getElementById("type").value,
                    lat: latitude,
                    lng: longitude
                });

                document.getElementById('name').value = userDetails.displayName;
                document.getElementById('email').value = userDetails.email;

                console.log("User saved with location:", latitude, longitude);
                window.location.replace("http://127.0.0.1:5500/")

            }).catch((error) => {
                console.error("Google Auth Error:", error.message);
            });

    }, (error) => {
        console.error("Geolocation error:", error);
        alert("Enable location permission to save your location!");
    });
}

function saveRides(){}