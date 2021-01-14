// Your web app's Firebase configuration

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
document.getElementById("user_name_wel").innerHTML = "Welcome " + user_name + " !";

function add_chat() {
      chat_name = document.getElementById("chat_name").value;

      firebase.database().ref("/").child(chat_name).update({
            purpose: "to add chat"
      });
      localStorage.setItem("chat_name", chat_name);
      window.location = "chatter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(" Chat - " + Room_names);
                  row = "<div class='chat_name' id=" + Room_names + " onclick='redirectToChatName(this.id)'>#" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}
getData();

function redirectToChatName(name) {
      console.log(name);
      localStorage.setItem("chat_name", name);
      window.location = "chatter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("chat_name");
      window.location = "index.html";
}