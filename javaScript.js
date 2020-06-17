
// Your web app's Firebase configuration

var firebaseConfig = {
    apiKey: "AIzaSyB2q17o6bPeWKeyB8MjWFT0bVejrTBYuOE",
    authDomain: "javascriptfirebase-d7a71.firebaseapp.com",
    databaseURL: "https://javascriptfirebase-d7a71.firebaseio.com",
    projectId: "javascriptfirebase-d7a71",
    storageBucket: "javascriptfirebase-d7a71.appspot.com",
    messagingSenderId: "1046302700296",
    appId: "1:1046302700296:web:d27cb226453faf60d2f2bd"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var date = new Date();
var mensajes = new Array();

function getMessages(){

    var id = document.getElementById("idMensaje").value;

    db.collection("mensajes").get().then((querySnapshot) => {
        querySnapshot.forEach((element) => {
            this.mensajes.push(element.data());
        });

        toShowMessages();

    });

}

function getMessage(){

    var result = "";
    var encontrado = false;
    var mensaje = {};
    var id = document.getElementById("idMensaje").value;
    var resultMessages = document.getElementById("resultMessages");

    if(id == ""){
        toShowMessages()
    }else{
        for (let i = 0; i < mensajes.length && !encontrado; i++) {
            
            if(mensajes[i].id == id){

                mensaje = mensajes[i];
                encontrado = true;

            }
            
        }

        result += "<div class='col-5 borderPersoMessa'>";

        result += "<div> <h4>" + mensaje.titular + "</h4> </div>";
        result += "<div> <p>" + mensaje.contenido + "</p> </div>";
        result += "<div> <p>" + mensaje.fecha + " " + mensaje.hora + "</p> </div>";
        result += "<button class='persoButton' type='button' onclick='deleteMessage("+mensaje.id +")'><img src='image/iconoEliminar.png' alt='imageDelete'/></button>"

        result += "</div>";

        resultMessages.innerHTML = result ;
    }
}

function addMessages(){

    var contenido = document.getElementById("contenido").value;
    var titulo = document.getElementById("titulo").value;
    var id = makeid();

    var fecha = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    var hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    db.collection("mensajes").doc(id).set({
        contenido: contenido,
        fecha: fecha,
        hora: hora,
        id: id,
        titular: titulo,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        location.reload();
        document.getElementById("contenido").value = "";
        document.getElementById("titulo").value = "";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        location.reload();
        document.getElementById("contenido").value = "";
        document.getElementById("titulo").value = "";
    });

}

function toShowMessages(){

    var result = "";
    var resultMessages = document.getElementById("resultMessages");

    for (var i = 0; i < mensajes.length; i++) {

        result += "<div class='col-5 borderPersoMessa'>";

        result += "<div> <h4>" + mensajes[i].titular + "</h4> </div>";
        result += "<div> <p>" + mensajes[i].contenido + "</p> </div>";
        result += "<div> <p>" + mensajes[i].fecha + " " + mensajes[i].hora + "</p> </div>";
        result += "<button class='persoButton' type='button' onclick='deleteMessage("+mensajes[i].id +")'><img src='image/iconoEliminar.png' alt='imageDelete'/></button>"

        result += "</div>";
        
    }

    resultMessages.innerHTML = result;

}

function makeid() {

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( var i = 0; i < 20; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

function deleteMessage(id){

    console.log(typeof id);
/*  
    db.collection("mensajes").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        location.reload();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
*/
}
