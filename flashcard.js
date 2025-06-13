// Load flashcards from localStorage
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

const isMainPage = !!document.getElementById('flashcardTable');
const isQAPage = !!document.querySelector('.flashcard-container');

if (isMainPage) {
  // --- MAIN PAGE: Add/View/Delete Flashcards ---

  function renderTable() {
    const tableBody = document.querySelector("#flashcardTable tbody");
    tableBody.innerHTML = "";

    flashcards.forEach((card, index) => {
      const row = tableBody.insertRow();
      row.insertCell(0).textContent = index + 1;
      row.insertCell(1).textContent = card.question;
      row.insertCell(2).textContent = card.answer;

      const deleteCell = row.insertCell(3);
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        flashcards.splice(index, 1);
        localStorage.setItem("flashcards", JSON.stringify(flashcards));
        renderTable();
      };
      deleteCell.appendChild(deleteBtn);
    });
  }

  function addCard() {
    const questionInput = document.getElementById("questionInput");
    const answerInput = document.getElementById("answerInput");
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();

    if(question.length>600 || answer.length>600){
      alert("Question and answer must be less than 600 characters each.");
      return;
    }

    if (question && answer) {
      flashcards.push({ question, answer });
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
      renderTable();

      // Clear and refocus
      questionInput.value = "";
      answerInput.value = "";
      questionInput.focus();

      // Scroll to bottom
      const container = document.querySelector('.table-container');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    } else {
      alert("Please enter both a question and an answer.");
    }
  }

  // Hook addCard function to button and Enter key
  window.addCard = addCard;

  document.getElementById("questionInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("answerInput").focus();
    }
  });

  document.getElementById("answerInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCard();
    }
  });

  renderTable();
}

if (isQAPage) {
  // --- QA PAGE: Flashcard Viewer with Flip and Next ---
  const flashcard = document.querySelector('.flashcard');
  const questionElem = document.getElementById('card-question');
  const answerElem = document.getElementById('card-answer');
  const nextBtn = document.getElementById('done-button');
  const correctBtn = document.getElementById('correct-button'); // Correct button
  const wrongBtn = document.getElementById('wrong-button');
  const frontElem = flashcard.querySelector('.front'); // Get the front element

  // Disable buttons initially
  correctBtn.disabled = true;
  wrongBtn.disabled = true;

  // Hide buttons initially
  correctBtn.classList.add('hidden');
  wrongBtn.classList.add('hidden');

  // Load flashcards from storage
  let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

  // Shuffle the flashcards for random order BEFORE showing any card
  shuffleArray(flashcards);

  let currentIndex = 0;
  let correctCount = 0; // Track correct answers
  let wrongCount = 0; // Track wrong answers

  function showFlashcard(index) {
    if (flashcards.length === 0) {
      questionElem.textContent = "No flashcards found!";
      answerElem.textContent = "";
      flashcard.classList.remove('flipped');
      correctBtn.classList.add('hidden'); // Hide buttons
      wrongBtn.classList.add('hidden'); // Hide buttons
      return;
    }
    questionElem.textContent = flashcards[index].question;
    answerElem.textContent = flashcards[index].answer;
    flashcard.classList.remove('flipped'); // Always show front first
    correctBtn.classList.add('hidden'); // Hide buttons until flipped
    wrongBtn.classList.add('hidden');// Disable buttons until flipped
  }

  // Flip card on click
  flashcard.addEventListener('click', () => {
    if (flashcards.length > 0) {
      flashcard.classList.toggle('flipped');

      // Show and enable buttons when card is flipped
      if (flashcard.classList.contains('flipped')) {
        correctBtn.classList.remove('hidden'); // Show buttons
        wrongBtn.classList.remove('hidden'); // Show buttons
        correctBtn.disabled = false; // Enable buttons
        wrongBtn.disabled = false; // Enable buttons
      } else {
        correctBtn.classList.add('hidden'); // Hide buttons
        wrongBtn.classList.add('hidden'); // Hide buttons
        correctBtn.disabled = true; // Disable buttons
        wrongBtn.disabled = true; // Disable buttons
      }
    }
  });

  // Next button logic
  nextBtn.addEventListener('click', () => {
    if (flashcards.length === 0) return;

    // Hide answer and start fade out on front only
    flashcard.classList.remove('flipped');
    frontElem.classList.add('fade');

    setTimeout(() => {
        // Change to next card after fade out
        currentIndex = (currentIndex + 1) % flashcards.length;
        showFlashcard(currentIndex);

        // Fade in front
        frontElem.classList.remove('fade');
    }, 200); // 0.2 seconds
  });

  // Correct button logic
  correctBtn.addEventListener('click', () => {
    if (flashcards.length === 0) return;
  
    correctCount++; // Increment correct answers
    console.log(`Correct answers: ${correctCount}`);
    
    // Move to the next flashcard
    currentIndex = (currentIndex + 1) % flashcards.length;
    showFlashcard(currentIndex);

    // Disable buttons after moving to the next card
    correctBtn.disabled = true;
    wrongBtn.disabled = true;
    correctBtn.classList.add('hidden');
    wrongBtn.classList.add('hidden');
  });
  
  // Wrong button logic
  wrongBtn.addEventListener('click', () => {
    if (flashcards.length === 0) return;
  
    wrongCount++; // Increment wrong answers
    console.log(`Wrong answers: ${wrongCount}`);
    
    // Move to the next flashcard
    currentIndex = (currentIndex + 1) % flashcards.length;
    showFlashcard(currentIndex);

    // Disable buttons after moving to the next card
    correctBtn.disabled = true;
    wrongBtn.disabled = true;
    correctBtn.classList.add('hidden');
    wrongBtn.classList.add('hidden');
  });
  

  // Initialize first card AFTER shuffling
  showFlashcard(currentIndex);
}

// Shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}