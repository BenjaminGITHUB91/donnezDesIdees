import * as ws from '/js/websocket.js';

document.addEventListener("DOMContentLoaded", () => {

    (function() {
        emailjs.init({
            publicKey: "KYWOF4whp8CaKVW5a"
        });
    })();

    function validerFormulaireVide(event){
        // Recup du form
        const name = document.querySelector('input[name="from_name"]').value;
        const email = document.querySelector('input[name="from_mail"]').value;
        const message = document.querySelector('textarea[name="message"]').value;
        //verif des champs vides
        if(!name || !email || !message){
            event.preventDefault(); //pas de soumission ici
            alert("Tous les champs doivent être remplis !");
            return false; 
        }
        return true;
    }

    document.getElementById("envoiMail").addEventListener("submit", function(event) {
        if (!validerFormulaireVide(event)) {
            return; // si un des champs du form est vide, on empeche l'envoi pour pas spam
        }
        
        event.preventDefault();

            
        // emailjs.sendForm("service_f4zjy6p", "template_e56mqi8", this)
        //     .then(() => {
        //             console.log("Email bien envoyé");
        //         },(error) => {
        //             console.log("Erreur : ", error);
        //         }
        //     );

        //on recupere les infos envoyees et on l'envoie au websocket
        let jsonInfosIdee = {nom : this.from_name.value , email : this.from_mail.value , idee : this.message.value};
        ws.envoyerUneIdee(JSON.stringify(jsonInfosIdee));
    })
});