const lessons = [
    // Level 1: Brain Development (OOP)
    {
        type: 'theory',
        title: 'Επίπεδο 1: Ανάπτυξη Εγκεφάλου',
        text: 'Η έκθεση σε μαθησιακό περιβάλλον διεγείρει τους νευρώνες. Η ικανότητα του εγκεφάλου για δομική αλλαγή ονομάζεται πλαστικότητα. Αναλογία: Δημιουργία νέων Objects και σύνδεσή τους με Pointers/References.'
    },
    {
        type: 'write-code',
        title: 'Άσκηση',
        question: 'Πώς ονομάζεται η αλλαγή στη δομή όταν συνδέεις δύο αντικείμενα Neuron;',
        expectedKeyword: 'πλαστικότητα'
    },
    
    // Level 2: Piaget Cognitive Development (Oracle SQL)
    {
        type: 'theory',
        title: 'Επίπεδο 2: Γνωστική Ανάπτυξη Piaget',
        text: 'Τα Σχήματα είναι βασικές νοητικές δομές. Η αφομοίωση ενσωματώνει νέα γεγονότα. Η ανισορροπία είναι γνωστική σύγκρουση. Η συμμόρφωση αλλάζει το υπάρχον σχήμα. Αναλογία: Tables, INSERT, SQL Errors, ALTER TABLE.'
    },
    {
        type: 'fill-in-blanks',
        title: 'Άσκηση',
        question: 'Η αφομοίωση μοιάζει με την εντολή [        ].',
        expectedKeyword: 'INSERT'
    },
    {
        type: 'multiple-choice',
        title: 'Άσκηση',
        question: 'Τι προκαλεί ένα ORA-Error (Ανισορροπία);',
        options: [
            'Ένα ασύμβατο δεδομένο με το υπάρχον Σχήμα',
            'Η διαγραφή ενός πίνακα',
            'Η επιτυχής εισαγωγή δεδομένων'
        ],
        correctIndex: 0
    },

    // Level 3: Vygotsky Sociocultural (Pair Programming)
    {
        type: 'theory',
        title: 'Επίπεδο 3: Κοινωνικογνωστική Vygotsky',
        text: 'Στη Ζώνη Εγγύτερης Ανάπτυξης μαθαίνουμε με την υποστήριξη ειδικού. Η φθίνουσα υποστήριξη μειώνει σταδιακά τη βοήθεια. Αναλογία: Pair programming και παροχή hints στο terminal.'
    },
    {
        type: 'multiple-choice',
        title: 'Άσκηση',
        question: 'Ο Junior έκανε λάθος. Ως Senior, πώς εφαρμόζεις φθίνουσα υποστήριξη;',
        options: [
            'Γράφω εγώ όλο τον κώδικα για να τελειώνουμε',
            'Δίνω ένα μικρό hint, όχι όλο τον έτοιμο κώδικα',
            'Τον αφήνω να το βρει μόνος του χωρίς καμία βοήθεια'
        ],
        correctIndex: 1
    },

    // Level 4: Language Development (Compiler Errors)
    {
        type: 'theory',
        title: 'Επίπεδο 4: Γλωσσική Ανάπτυξη',
        text: 'Η σύνταξη αφορά τη δομή. Η σημασιολογία αφορά το νόημα. Αναλογία: Λάθη μεταγλωττιστή (Compiler Errors).'
    },
    {
        type: 'fill-in-blanks',
        title: 'Άσκηση: Ταξινόμηση 1/2',
        question: 'Αν λείπει ένα ;, είναι λάθος [        ].',
        expectedKeyword: 'Σύνταξης'
    },
    {
        type: 'fill-in-blanks',
        title: 'Άσκηση: Ταξινόμηση 2/2',
        question: 'Αν διαιρείς με String, είναι λάθος [        ].',
        expectedKeyword: 'Σημασιολογίας'
    }
];

let currentCardIndex = 0;
const cardContainer = document.getElementById('card-container');
const progressBar = document.getElementById('progress-bar');

function renderCard() {
    if (currentCardIndex >= lessons.length) {
        cardContainer.innerHTML = `
            <div class="card">
                <h2>Συγχαρητήρια!</h2>
                <p>Ολοκληρώσατε επιτυχώς το Cognitive Debugging.</p>
                <button class="next-btn" onclick="location.reload()">Επανεκκίνηση</button>
            </div>
        `;
        updateProgress();
        return;
    }

    const cardData = lessons[currentCardIndex];
    let cardHTML = `<div class="card">
        <h2>${cardData.title}</h2>`;

    if (cardData.type === 'theory') {
        cardHTML += `
            <p id="card-text">${cardData.text}</p>
            <button class="read-btn" onclick="speakText('${cardData.text.replace(/'/g, "\\'")}')">Ανάγνωση 🔊</button>
            <button class="next-btn" onclick="nextCard()">Επόμενο</button>
        `;
    } else if (cardData.type === 'multiple-choice') {
        cardHTML += `
            <p id="card-text">${cardData.question}</p>
            <button class="read-btn" onclick="speakText('${cardData.question.replace(/'/g, "\\'")}')">Ανάγνωση 🔊</button>
            <div class="options-container">
                ${cardData.options.map((opt, index) => 
                    `<button class="option-btn" onclick="checkMultipleChoice(${index}, this)">${opt}</button>`
                ).join('')}
            </div>
            <div id="feedback" class="feedback"></div>
        `;
    } else if (cardData.type === 'fill-in-blanks' || cardData.type === 'write-code') {
        cardHTML += `
            <p id="card-text">${cardData.question}</p>
            <button class="read-btn" onclick="speakText('${cardData.question.replace(/'/g, "\\'")}')">Ανάγνωση 🔊</button>
            <div class="input-container">
                <input type="text" id="answer-input" placeholder="Πληκτρολόγησε εδώ...">
                <button class="submit-btn" onclick="checkInput()">Υποβολή</button>
            </div>
            <div id="feedback" class="feedback"></div>
        `;
    }

    cardHTML += `</div>`;
    cardContainer.innerHTML = cardHTML;
    updateProgress();
}

function updateProgress() {
    const progress = (currentCardIndex / lessons.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'el-GR';
        speechSynthesis.speak(utterance);
    } else {
        alert("Το πρόγραμμα περιήγησής σας δεν υποστηρίζει την ανάγνωση κειμένου.");
    }
}

function nextCard() {
    currentCardIndex++;
    renderCard();
}

function checkMultipleChoice(selectedIndex, btnElement) {
    const cardData = lessons[currentCardIndex];
    const feedbackEl = document.getElementById('feedback');
    const allBtns = document.querySelectorAll('.option-btn');
    
    // Disable all buttons after click
    allBtns.forEach(btn => btn.disabled = true);

    if (selectedIndex === cardData.correctIndex) {
        btnElement.classList.add('correct');
        feedbackEl.textContent = 'Σωστό!';
        feedbackEl.className = 'feedback correct';
        setTimeout(nextCard, 1500);
    } else {
        btnElement.classList.add('incorrect');
        allBtns[cardData.correctIndex].classList.add('correct');
        feedbackEl.textContent = 'Λάθος...';
        feedbackEl.className = 'feedback incorrect';
        setTimeout(nextCard, 2500);
    }
}

function checkInput() {
    const cardData = lessons[currentCardIndex];
    const inputEl = document.getElementById('answer-input');
    const feedbackEl = document.getElementById('feedback');
    const submitBtn = document.querySelector('.submit-btn');
    
    const userAnswer = inputEl.value.trim().toLowerCase();
    const expected = cardData.expectedKeyword.toLowerCase();

    inputEl.disabled = true;
    submitBtn.disabled = true;

    if (userAnswer === expected) {
        inputEl.style.borderColor = 'var(--correct-color)';
        feedbackEl.textContent = 'Σωστό!';
        feedbackEl.className = 'feedback correct';
        setTimeout(nextCard, 1500);
    } else {
        inputEl.style.borderColor = 'var(--incorrect-color)';
        feedbackEl.textContent = `Λάθος. Η σωστή απάντηση είναι: ${cardData.expectedKeyword}`;
        feedbackEl.className = 'feedback incorrect';
        setTimeout(nextCard, 3000);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', renderCard);
