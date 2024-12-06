const fichierIdees = "/js/json/idees.json";

// Fonction pour charger les idées
function chargerIdees() {
    if (!fs.existsSync(fichierIdees)) {
        return [];
    }
    const donnees = fs.readFileSync(fichierIdees, 'utf8');
    return JSON.parse(donnees || '[]');
}


function sauvegarderIdees(idees) {
    fs.writeFileSync(fichierIdees, JSON.stringify(idees, null, 2), 'utf8');
}


function ajouterIdeeJSON(nom, email, texte) {
    const idees = chargerIdees(); // Charger les idées existantes
    const nouvelleIdee = { nom, email, texte }; // Nouvelle idée
    idees.push(nouvelleIdee); // Ajouter l'idée au tableau
    sauvegarderIdees(idees); // Sauvegarder les idées
    console.log("Idée ajoutée avec succès !");
}

//ajouterIdeeJSON('Kevin', 'kevin@example.com', 'Créer une application géniale !');


export function ajouterIdee(jsonInfosIdee){
    const listeIdees = document.getElementById('listeIdees');

    if (listeIdees){ 
        jsonInfosIdee = JSON.parse(jsonInfosIdee);


        let nom = jsonInfosIdee.nom;
        let email = jsonInfosIdee.email;
        let idee = jsonInfosIdee.idee;

        

        const uneIdee = document.createElement('div');
        uneIdee.id = 'uneIdee';

        const infoDestinataire = document.createElement('div');
        infoDestinataire.id = 'infoDestinataire';

        const nomPara = document.createElement('p');
        nomPara.textContent = `Nom : ${nom}`;
        infoDestinataire.appendChild(nomPara);

        const emailPara = document.createElement('p');
        emailPara.textContent = `Email : ${email}`;
        infoDestinataire.appendChild(emailPara);

        uneIdee.appendChild(infoDestinataire);

        const textePara = document.createElement('p');
        textePara.textContent = idee;
        uneIdee.appendChild(textePara);

        listeIdees.appendChild(uneIdee);
    }
}