export function envoyerIdee(jsonInfosIdee) {
    // Envoyer la requête POST à l'API
    fetch('http://localhost:3000/api/idees', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonInfosIdee) // Convertir les données en JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        return response.json(); // Convertir la réponse en JSON
    })
    .then(data => {
        console.log('Idée envoyée avec succès:', data);
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi de l\'idée:', error);
    });
}


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

async function recupererIdees() {
    try {
        const response = await fetch('http://localhost:3000/api/idees'); // URL de votre API
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }

        const idees = await response.json(); // Convertir la réponse en JSON
        idees.forEach(idee => {
            console.log(idee);
            ajouterIdee(JSON.stringify(idee));
        });

    }catch(err){console.log(err);}
}

recupererIdees()