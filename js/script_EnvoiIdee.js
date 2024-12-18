import * as ws from '/js/websocket.js';
import * as gererIdees from '/js/gererIdees.js';

document.addEventListener("DOMContentLoaded", () => {

    (function() {
        emailjs.init({
            publicKey: "KYWOF4whp8CaKVW5a"
        });
    })();

    document.getElementById("Formulaire").addEventListener("submit", function(event) {
        event.preventDefault();

        const nom = this.from_name.value;
        const mail = this.from_mail.value;
        const idee = this.message.value;

        if(!nom || !mail || !idee){
            document.getElementById("messageErreur").style.display = "block";
            document.getElementById("messageBravo").style.display = "none";
            gsap.fromTo(
                '#messageErreur',
                { x: -3 },
                {
                  x: 3, 
                  duration: 0.1,
                  opacity: 1,
                  ease: "linear",
                  repeat: 3, 
                  yoyo: true, 
                  onComplete: () => {
                    gsap.to('#messageErreur', { x: 0, ease: "linear" }); 
                  }
                }
              );
        }else{            
            emailjs.sendForm("service_f4zjy6p", "template_e56mqi8", this)
            .then(() => {
                    console.log("Email bien envoyé");
                    document.getElementById("messageErreur").style.display = "none";
                    document.getElementById("messageBravo").style.display = "block";
                    this.reset();
                    gsap.from('#messageBravo', {
                        y: -20,
                        opacity: 0,
                        duration: 0.5,
                        ease: "ease"
                    });
                },(error) => {
                    console.log("Erreur : ", error);
                }
            );
        }
            let jsonInfosIdee = {nom : this.from_name.value , email : this.from_mail.value , idee : this.message.value};
            gererIdees.envoyerIdee(jsonInfosIdee);
            ws.envoyerUneIdee(JSON.stringify(jsonInfosIdee));
    })
});