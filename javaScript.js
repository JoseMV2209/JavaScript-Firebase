
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
        resultId.innerHTML = "<p>"+docRef.id+"</p>";
        zoneResultId.style.display = "block";
        getMessages();
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        console.log("catch");
        document.getElementById("formulario").reset();
        resultId.innerHTML = "<p>"+id+"</p>";
        zoneResultId.style.display = "block";
        getMessages();
    });

}

function makeid() {

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for ( var i = 0; i < 20; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

function sendData(url){

    id = document.getElementById("idMensaje");

    localStorage.setItem("id",id.value);
    document.getElementById("formulario").reset();
    location.href=url;

}
