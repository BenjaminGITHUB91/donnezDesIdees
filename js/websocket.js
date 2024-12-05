import * as gererIdees from '/js/gererIdees.js';

//const url = "http://kevin-chapron.fr:8090/ws"
const url = "ws://localhost:8090";
let ws = new WebSocket(url);
 

ws.onopen = function(event) {
    ws.send(JSON.stringify({ app: "donnez_des_idees" })); // Remplacez par votre identifiant
};

ws.onerror = function(error) {
    console.error("Erreur WebSocket :", error);
};

ws.onclose = function(event) {
    console.log("Connexion fermée :", event);
};

ws.onmessage = function(event) {
    let jsonMessage = JSON.parse(event.data);
    if (!(jsonMessage.hasOwnProperty("status"))) {
        console.log("pas un message de connexion",jsonMessage);
        gererIdees.ajouterIdee(event.data);
    }
    else {
        console.log("message de connexion",jsonMessage);
    }    
};

export function envoyerUneIdee(jsonInfosIdee){
    ws.send(jsonInfosIdee);
}