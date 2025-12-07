document.addEventListener('DOMContentLoaded', () => {

  
  const firebaseConfig = {
  apiKey: "AIzaSyDMz3-SDfo6rbKfBHTAg3dxuLHk-peKMaM",
  authDomain: "abdul-wasay-rais.firebaseapp.com",
  databaseURL: "https://abdul-wasay-rais-default-rtdb.firebaseio.com",
  projectId: "abdul-wasay-rais",
  storageBucket: "abdul-wasay-rais.appspot.com",
  messagingSenderId: "301358166047",
  appId: "1:301358166047:web:f6dd23c70da1670e06252a"
};

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();



    var map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var userMarkers = {};    
    var myMarker = null;    


    function updateUserLocation(lat, lng) {
        const user = JSON.parse(localStorage.getItem("user"))
        db.ref("users/" + user.uid).set({
            lat: lat,
            lng: lng,
            name: user.username,
            email : user.email,
            type: user.type,
            uid: user.uid,
            updatedAt: Date.now()
        });
    }


    function showMyMarker(lat, lng) {
        if (myMarker) {
            myMarker.setLatLng([lat, lng]);
        } else {
            myMarker = L.marker([lat, lng], { title: "You" })
                .addTo(map)
                .bindPopup("You are here");
        }
    }

   
    db.ref("users").on("value", (snapshot) => {
        const users = snapshot.val();
        if (!users) return;

        for (let id in users) {
            let u = users[id];

            if (!u.lat || !u.lng) continue;

            if (id === userId) continue;

            if (userMarkers[id]) {
                userMarkers[id].setLatLng([u.lat, u.lng]);
            } else {
                userMarkers[id] = L.marker([u.lat, u.lng])
                    .addTo(map)
                    .bindPopup(u.name || "User");
            }
        }
    });

    navigator.geolocation.watchPosition((pos) => {
        let lat = pos.coords.latitude;
        let lng = pos.coords.longitude;

        map.setView([lat, lng], 15);

        updateUserLocation(lat, lng);

        showMyMarker(lat, lng);
    });

});
