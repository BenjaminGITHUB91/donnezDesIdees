document.addEventListener("DOMContentLoaded", () => {
    // Charger les idées depuis le fichier JSON
    fetch('/js/json/idees.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        return response.json(); // Convertir en JSON
      })
      .then((ideas) => {
        initializeTournament(ideas);
      })
      .catch((error) => {
        console.error(error);
        document.getElementById('game-area').innerHTML = '<p>Erreur lors du chargement des idées.</p>';
      });
  });
  
  
  // Fonction principale pour initialiser et démarrer le tournoi
  function initializeTournament(ideas) {
    const gameArea = document.getElementById('game-area');
    const restartButton = document.getElementById('restartButton');
  
    // Filtrer les idées pour enlever les doublons et les entrées vides
    const uniqueIdeas = [...new Map(ideas.map((item) => [item.idee, item])).values()].filter(
      (idea) => idea.idee.trim() !== ''
    );
  
    // Vérifier s'il y a des idées valides
    if (uniqueIdeas.length === 0) {
      gameArea.innerHTML = '<p>Aucune idée valide trouvée.</p>';
      return;
    }
  
    // Fonction pour lancer un tour
    function playRound(ideas) {
      if (ideas.length === 1) {
        displayWinner(ideas[0]);
        return;
      }
  
      // Sélectionner deux idées pour ce tour
      const [idea1, idea2, ...remainingIdeas] = ideas;
  
      // Afficher les deux idées
      gameArea.innerHTML = `
        <div class="idea" data-index="1">${idea1.idee}</div>
        <div id="versus">VS</div>
        <div class="idea" data-index="2">${idea2.idee}</div>
      `;
  
      // Ajouter des événements pour le choix
      document.querySelectorAll('.idea').forEach((element) => {
        element.addEventListener('click', (e) => {
          const chosenIndex = parseInt(e.target.dataset.index, 10);
          const winner = chosenIndex === 1 ? idea1 : idea2;
          playRound([...remainingIdeas, winner]);
        });
      });
    }
  
    // Afficher le gagnant final
    function displayWinner(winner) {
      gameArea.innerHTML = `
        <p class="final">🎉 L'idée gagnante est : <strong>${winner.idee}</strong> par ${winner.nom} 🎉</p>
      `;
      restartButton.style.display = 'block';
    }
  
    // Démarrer le tournoi
    playRound(uniqueIdeas);
  
    // Activer le bouton "Recommencer"
    restartButton.addEventListener('click', () => {
      playRound(uniqueIdeas); // Redémarrer le tournoi
    });
  }
  