document.addEventListener("DOMContentLoaded", () => {


    document.getElementById("boutonEnvoi").addEventListener("click", envoiIdee);
    document.getElementById("idee").addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            envoiIdee();
        }
    })

    function envoiIdee() {
        const nom = document.getElementById("nom").value;
        const mail = document.getElementById("mail").value;
        const idee = document.getElementById("idee").value;

        if(!nom){
            return;
        }

        emailjs.init("KYWOF4whp8CaKVW5a");

        emailjs.send("service_f4zjy6p", "template_e56mqi8",
            {
                from_name: nom,
                from_mail: mail,
                message: idee
            }
        ).then(function(response) {
                console.log("Email bien envoyé", response);
            }, function(error) {
                console.log("Erreur : ", error);
            }
        );
    }
});