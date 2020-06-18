
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

    db.collection("mensajes").get().then((querySnapshot) => {
        querySnapshot.forEach((element) => {
            this.mensajes.push(element.data());
        });
    });

}

function getMessage(){

    var result = "";
    var encontrado = false;
    var mensaje = {};
    var id = document.getElementById("idMensaje").value;
    var resultMessages = document.getElementById("resultMessages");

    if(id == ""){
        resultMessages.innerHTML = "";
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
        result += '<input class="persoButton" type="button" onclick="deleteMessage(\''+mensajes[i].id +'\')">';

        result += "</div>";

        resultMessages.innerHTML = result ;
    }
}

function searchMessage(){

    var encontrado = false;
    var mensaje = {};
    var id = document.getElementById("idMensajeUpdate");
    var contenido = document.getElementById("contenido");
    var titulo = document.getElementById("titulo");

    if(id.value == ""){
        document.getElementById("formulario").reset();
    }else{
        for (let i = 0; i < mensajes.length && !encontrado; i++) {
            
            if(mensajes[i].id == id.value){

                mensaje = mensajes[i];
                encontrado = true;

            }
            
        }

        contenido.value = mensaje.contenido;
        titulo.value = mensaje.titular;
    }

}

function addOrUpdateMessages(){

    var contenido = document.getElementById("contenido");
    var titulo = document.getElementById("titulo");
    var id = document.getElementById("idMensajeUpdate");
    var resultId = document.getElementById("resultId");
    var zoneResultId =document.getElementById("zoneResultId");

    var fecha = date.getDate() + "/" + (date.getMonth()+1) + "/" + date.getFullYear();
    var hora = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


    if(id.value == ""){
        id = makeid();
    }else{
        id = id.value;
    }

    db.collection("mensajes").doc(id).set({
        contenido: contenido.value,
        fecha: fecha,
        hora: hora,
        id: id,
        titular: titulo.value,
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        console.log("then");
        document.getElementById("formulario").reset();
        resultId.innerHTML += "<p>"+docRef.id+"</p>";
        zoneResultId.style.display = "block";
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        console.log("catch");
        document.getElementById("formulario").reset();
        resultId.innerHTML += "<p>"+id+"</p>";
        zoneResultId.style.display = "block";
    });

}

function toShowMessages(){

    var result = "";
    var resultMessages = document.getElementById("resultMessages");

    for (var i = 0; i < mensajes.length; i++) {

        result += "<div class='col-5 borderPersoMessa'>";

        result += "<div> <h4>" + mensajes[i].titular + "</h4> </div>";
        result += "<div> <p>ID: " + mensajes[i].id + "</p> </div>";
        result += "<div> <p>" + mensajes[i].contenido + "</p> </div>";
        result += "<div> <p>" + mensajes[i].fecha + " " + mensajes[i].hora + "</p> </div>";
        result += '<input class="persoButton" type="button" onclick="deleteMessage(\''+mensajes[i].id +'\')">';

        result += "</div>";
        
    }

    resultMessages.innerHTML = result;

}

function toHideMessages(){

    var resultMessages = document.getElementById("resultMessages");

    resultMessages.innerHTML = "";

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

    console.log(id);

    db.collection("mensajes").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });

}
