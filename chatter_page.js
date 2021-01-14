var firebaseConfig = {
    apiKey: "AIzaSyBlNaCE8tt44aEw1yeAUuEHXVjV0qbU8M4",
    authDomain: "the-chatter-4922b.firebaseapp.com",
    databaseURL: "https://the-chatter-4922b-default-rtdb.firebaseio.com",
    projectId: "the-chatter-4922b",
    storageBucket: "the-chatter-4922b.appspot.com",
    messagingSenderId: "308856808728",
    appId: "1:308856808728:web:50405c99b206be82d22a6d"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("chat_name");

function send_message() {

    msg = document.getElementById("msg").value;

    firebase.database().ref(room_name).push({
        name: user_name,
        message: msg,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function getData() {
    firebase.database().ref("/" + room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;

                console.log(firebase_message_id);
                console.log(message_data);

                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];

                name_with_tag = "<h4>" + name + "</h4>";
                message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";

                like_with_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updatelikes(this.id)'>"
                span_with_tag = "<span class=' glyphicon glyphicon-thumbs-up'> LIKE: " + like + "</span></button><hr>"

                row = name_with_tag + message_with_tag + like_with_button + span_with_tag;
                document.getElementById("output").innerHTML += row;
            }
        });
    });
}
getData();

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}

function updatelikes(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);


    firebase.database().ref(room_name).child(message_id).update({
        like: updated_likes
    });
}