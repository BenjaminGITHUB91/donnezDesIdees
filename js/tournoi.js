document.addEventListener("DOMContentLoaded", () => {
    fetch('/js/json/idees.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des données');
        }
        return response.json(); 
      })
      .then((idée) => {
        initializeTournament(idée);
      })
      .catch((error) => {
        console.error(error);
        document.getElementById('game-area').innerHTML = '<p>Erreur lors du chargement des idées.</p>';
      });
  });
  

  function initializeTournament(idée) {
    const gameArea = document.getElementById('game-area');
    const restartButton = document.getElementById('restartButton');
  
    const idéeUnique = [...new Map(idée.map((item) => [item.idee, item])).values()].filter(
      (idea) => idea.idee.trim() !== ''
    );
  
    if (idéeUnique.length === 0) {
      gameArea.innerHTML = '<p>Aucune idée valide trouvée.</p>';
      return;
    }
  
    function playRound(idée) {
      if (idée.length === 1) {
        displayWinner(idée[0]);
        return;
      }
  
      // Sélectionner deux idées pour ce tour
      const [idea1, idea2, ...idéesRestantes] = idée;
  
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
          playRound([...idéesRestantes, winner]);
        });
      });
    }
  
    // Afficher le gagnant final
    function displayWinner(winner) {
      gameArea.innerHTML = `
        <p class="final"> L'idée gagnante est : " <strong>${winner.idee}</strong> " par ${winner.nom}. </p>
      `;
      restartButton.style.display = 'block';
    }
  
    // Démarrer le tournoi
    playRound(idéeUnique);
  
    // Activer le bouton "Recommencer"
    restartButton.addEventListener('click', () => {
      playRound(idéeUnique); // Redémarrer le tournoi
    });
  }
  