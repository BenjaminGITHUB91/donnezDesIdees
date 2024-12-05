document.addEventListener("DOMContentLoaded", () => {

    (function() {
        emailjs.init({
            publicKey: "KYWOF4whp8CaKVW5a"
        });
    })();

    document.getElementById("envoiMail").addEventListener("submit", function(event) {
        event.preventDefault();

        emailjs.sendForm("service_f4zjy6p", "template_e56mqi8", this)
            .then(() => {
                    console.log("Email bien envoyé");
                },(error) => {
                    console.log("Erreur : ", error);
                }
            );
    })
});