
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
var mensajes = new Array();

function getMessages(){

    db.collection("mensajes").get().then((querySnapshot) => {
        querySnapshot.forEach((element) => {
            this.mensajes.push(element.data());
        });

        if(localStorage.getItem("id") != ""){
            getMessage(localStorage.getItem("id"));
            localStorage.setItem("id","");
        }else{
            toShowMessages();
        }

    });

}

function getMessage(id){

    var result = "";
    var encontrado = false;
    var mensaje = {};
    var resultMessages = document.getElementById("resultMessages");

    if(id.value == ""){
        toShowMessages();
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
        result += '<input class="persoButton" type="button" onclick="deleteMessage(\''+mensajes.id +'\')">';

        result += "</div>";

        resultMessages.innerHTML = result ;
    }
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
        /* result += '<input class="persoButtonSave" type="button" onclick="saveMessage(\''+mensajes[i].id +'\')">'; */
        result += '<a href="" class="link" download="'+mensajes[i].titular +'.txt" onclick="saveMessage(\''+mensajes[i].id +'\')">Descargar</a>';
        result += '<input class="persoButton" type="button" onclick="deleteMessage(\''+mensajes[i].id +'\')">';

        result += "</div>";
        
    }

    resultMessages.innerHTML = result;

}

function toHideMessages(){

    var resultMessages = document.getElementById("resultMessages");

    resultMessages.innerHTML = "";

}

function deleteMessage(id){

    console.log(id);

    db.collection("mensajes").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        getMessages();
        location.reload();
    })
    .catch(function(error) {
        console.error("Error removing document: ", error);
        location.reload();
    });

}

function saveMessage(id){

    var mensaje = "";
    var mensajeSelec = {};
    var encontrado = false;

    for (let i = 0; i < this.mensajes.length && !encontrado; i++) {
            
        if(this.mensajes[i].id == id){

            mensajeSelec = this.mensajes[i];
            encontrado = true;

        }
    }


    mensaje += mensajeSelec.titular + "\r\n";
    mensaje += "\r\nId: " + mensajeSelec.id + "\r\n";
    mensaje += "\r\n" + mensajeSelec.contenido + "\r\n";
    mensaje += "\r\n" + mensajeSelec.fecha + " ";
    mensaje += mensajeSelec.hora + "\r\n";


    var link = document.getElementById("link");

    link.setAttribute("href", ('data:text/plain;charset=utf-8,' + encodeURIComponent(mensaje)));
}
