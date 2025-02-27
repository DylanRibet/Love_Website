let nonCount = 0;
let lastNonQuestionId = null;
let riddleAttempts = 0;
let indiceAffiche = false;

// Démarrer le décompte de 10 secondes
setTimeout(() => {
    if (!indiceAffiche) {
        afficherIndice();
    }
}, 10000);

// Afficher l'indice
function afficherIndice() {
    document.getElementById('indice').classList.remove('hidden');
    indiceAffiche = true;
}

// Vérifier l'énigme
function checkRiddle() {
    const answer = document.getElementById('riddleAnswer').value.toLowerCase();
    if (answer.includes('futur') || answer.includes('avenir')) {
        document.getElementById('cover').classList.add('hidden');
        document.getElementById('questionnaire').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('question1').classList.add('visible');
        }, 100); // Délai de 100ms pour l'affichage de la première question
    } else {
        riddleAttempts++;
        if (riddleAttempts >= 2) {
            afficherIndice();
        }
        alert('Presque ! Réessaye 😉');
    }
}

// Afficher la question suivante
function showNextQuestion(currentQuestionId) {
    const currentQuestion = document.getElementById(currentQuestionId);
    const nextQuestion = currentQuestion.nextElementSibling;

    if (nextQuestion && nextQuestion.classList.contains('question')) {
        currentQuestion.classList.remove('visible');
        setTimeout(() => {
            currentQuestion.classList.add('hidden');
            nextQuestion.classList.remove('hidden');
            setTimeout(() => nextQuestion.classList.add('visible'), 50);
        }, 500);
    } else {
        currentQuestion.classList.remove('visible');
        setTimeout(() => {
            currentQuestion.classList.add('hidden');
            document.getElementById('message').classList.remove('hidden');
            setTimeout(() => document.getElementById('message').classList.add('visible'), 50);
        }, 500);
    }
}

// Lancer des confettis
function lancerConfettis() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Répondre aux questions
function repondre(reponse, questionId) {
    const nonButton = document.querySelector(`#${questionId} button[onclick*="Non"]`);

    if (reponse === 'Oui') {
        lancerConfettis(); // Lancer des confettis quand elle répond "Oui"
        showNextQuestion(questionId);
    } else if (reponse === 'Non') {
        nonCount++;
        lastNonQuestionId = questionId;

        // Effets visuels pour "Non"
        if (nonCount === 1) {
            nonButton.textContent = 'Non ? Sérieusement ?';
            nonButton.style.animation = 'shake 0.5s ease';
        } else if (nonCount === 2) {
            nonButton.textContent = 'Non ?! Tu es sûre ?';
            nonButton.style.animation = 'shake 0.5s ease';
        } else if (nonCount === 3) {
            nonButton.textContent = 'NON ?! 😱';
            nonButton.style.animation = 'shake 0.5s ease';
        } else {
            // Plot twist après 3 clics sur "Non"
            document.getElementById(questionId).classList.remove('visible');
            setTimeout(() => {
                document.getElementById(questionId).classList.add('hidden');
                document.getElementById('plotTwist').classList.remove('hidden');
                setTimeout(() => document.getElementById('plotTwist').classList.add('visible'), 50);
            }, 500);
            nonCount = 0; // Réinitialiser le compteur
        }

        // Réinitialiser l'animation après qu'elle se termine
        setTimeout(() => nonButton.style.animation = '', 500);
    }
}

// Retour à la question où elle a répondu "Non"
function retourQuestion() {
    document.getElementById('plotTwist').classList.remove('visible');
    setTimeout(() => {
        document.getElementById('plotTwist').classList.add('hidden');
        document.getElementById(lastNonQuestionId).classList.remove('hidden');
        setTimeout(() => document.getElementById(lastNonQuestionId).classList.add('visible'), 50);
    }, 500);
}