// Load flashcards from localStorage
// This retrieves the flashcards data stored in the browser's localStorage.
// If no data is found, it defaults to an empty array.
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

// Check if the current page is the main page
// The main page is identified by the presence of an element with the ID 'flashcardTable'.
const isMainPage = !!document.getElementById('flashcardTable');

// Check if the current page is the QA page
// The QA page is identified by the presence of an element with the class 'flashcard-container'.
const isQAPage = !!document.querySelector('.flashcard-container');

const logo = document.querySelector('.logo');
const slide = document.querySelector('.slide');


if (logo && slide) {
  logo.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    slide.classList.add('active'); // Add fade-out class to trigger animation
    setTimeout(() => {
      window.location.href = 'Main_page.html'; // Redirect after fade-out
    }, 900); // Match this duration with the CSS transition duration'
  })
}



// --- MAIN PAGE LOGIC ---
if (isMainPage) {
  // Welcome text interactivity: Reacts to mouse movement
  const welcomeText = document.querySelector('.welcome-text');


  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e; // Get mouse position
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = welcomeText; // Get text position

    // Calculate the distance between the mouse and the center of the text
    const x = clientX - (offsetLeft + offsetWidth / 2);
    const y = clientY - (offsetTop + offsetHeight / 2);

    // Apply a transform to move the text slightly away from the mouse
    const moveX = x / 300; // Divide by a factor to reduce movement intensity
    const moveY = y / 300;

    welcomeText.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  // Render the flashcard table
  // This function dynamically creates rows in the table to display flashcards.
  function renderTable() {
    const tableBody = document.querySelector("#flashcardTable tbody");
    tableBody.innerHTML = ""; // Clear the table before rendering

    flashcards.forEach((card, index) => {
      const row = tableBody.insertRow(); // Create a new row
      row.insertCell(0).textContent = index + 1; // Add index number
      row.insertCell(1).textContent = card.question; // Add question
      row.insertCell(2).textContent = card.answer; // Add answer

      // Add delete button
      const deleteCell = row.insertCell(3);
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        flashcards.splice(index, 1); // Remove the flashcard from the array
        localStorage.setItem("flashcards", JSON.stringify(flashcards)); // Update localStorage
        renderTable(); // Re-render the table
      };
      deleteCell.appendChild(deleteBtn);
    });
  }

  // Add a new flashcard
  // This function adds a new flashcard to the array and updates the table.
  function addCard() {
    const questionInput = document.getElementById("questionInput");
    const answerInput = document.getElementById("answerInput");
    const question = questionInput.value.trim();
    const answer = answerInput.value.trim();
    const logo = document.querySelector('.logo');
    const fade = document.querySelector('.fade');


    if (logo && fade) {
      logo.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        fade.classList.add('active'); // Add fade-out class to trigger animation
        setTimeout(() => {
          window.location.href = 'Main_page.html'; // Redirect after fade-out
        }, 900); // Match this duration with the CSS transition duration'
      })
    }

    // Validate input length
    if (question.length > 600 || answer.length > 600) {
      alert("Question and answer must be less than 600 characters each.");
      return;
    }

    // Add flashcard if both question and answer are provided
    if (question && answer) {
      flashcards.push({ question, answer }); // Add to array
      localStorage.setItem("flashcards", JSON.stringify(flashcards)); // Update localStorage
      renderTable(); // Re-render the table

      // Clear inputs and refocus
      questionInput.value = "";
      answerInput.value = "";
      questionInput.focus();

      // Scroll to the bottom of the table
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

  // Handle Enter key in question input
  document.getElementById("questionInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("answerInput").focus(); // Move focus to answer input
    }
  });

  // Handle Enter key in answer input
  document.getElementById("answerInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCard(); // Add the flashcard
    }
  });

  // Render the table on page load
  renderTable();
}

// --- QA PAGE LOGIC ---
if (isQAPage) {
  const flashcard = document.querySelector('.flashcard');
  const questionElem = document.getElementById('card-question');
  const answerElem = document.getElementById('card-answer');
  const nextBtn = document.getElementById('done-button');
  const correctBtn = document.getElementById('correct-button');
  const wrongBtn = document.getElementById('wrong-button');
  const frontElem = flashcard.querySelector('.front');
  const flipBtn = document.getElementById('flip-button');

  // Disable and hide buttons initially
  correctBtn.disabled = true;
  wrongBtn.disabled = true;
  correctBtn.classList.add('hidden');
  wrongBtn.classList.add('hidden');

  // Shuffle flashcards for random order
  shuffleArray(flashcards);

  const tooltip = document.querySelector('.logo-tooltip');
  if (tooltip) {
    tooltip.classList.add('show'); // Make it visible

    // Hide after 4 seconds
    setTimeout(() => {
      tooltip.classList.remove('show');
    }, 4000);
  }

  
  
  let currentIndex = 0;
  let correctCount = 0; // Track correct answers
  let wrongCount = 0; // Track wrong answers

  // Welcome text interactivity: Reacts to mouse movement
  const welcomeText = document.querySelector('.welcome-text');

  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e; // Get mouse position
    const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = welcomeText; // Get text position

    // Calculate the distance between the mouse and the center of the text
    const x = clientX - (offsetLeft + offsetWidth / 2);
    const y = clientY - (offsetTop + offsetHeight / 2);

    // Apply a transform to move the text slightly away from the mouse
    const moveX = x / 300; // Divide by a factor to reduce movement intensity
    const moveY = y / 300;

    welcomeText.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });

  // Show the current flashcard
  function showFlashcard(index) {
    if (flashcards.length === 0) {
      questionElem.textContent = "No flashcards found!";
      answerElem.textContent = "";
      flashcard.classList.remove('flipped');
      correctBtn.classList.add('hidden');
      wrongBtn.classList.add('hidden');
      return;
    }
    questionElem.textContent = flashcards[index].question;
    answerElem.textContent = flashcards[index].answer;
    flashcard.classList.remove('flipped');
    correctBtn.classList.add('hidden');
    wrongBtn.classList.add('hidden');
  }

  // Flip card on click
  flashcard.addEventListener('click', () => {
    if (flashcards.length > 0) {
      flashcard.classList.toggle('flipped');

      // Show and enable buttons when card is flipped
      if (flashcard.classList.contains('flipped')) {
        correctBtn.classList.remove('hidden');
        wrongBtn.classList.remove('hidden');
        correctBtn.disabled = false;
        wrongBtn.disabled = false;
      } else {
        correctBtn.classList.add('hidden');
        wrongBtn.classList.add('hidden');
        correctBtn.disabled = true;
        wrongBtn.disabled = true;
      }
    }
  });

  // Next button logic
  nextBtn.addEventListener('click', () => {
    if (flashcards.length === 0) return;

    flashcard.classList.remove('flipped');
    frontElem.classList.add('fade');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % flashcards.length;
      showFlashcard(currentIndex);
      frontElem.classList.remove('fade');
    }, 200);
  });

  flipBtn.addEventListener('click', () => {
    if (flashcards.length === 0) return;

    flashcard.classList.toggle('flipped');

    // Show and enable buttons when card is flipped
    if (flashcard.classList.contains('flipped')) {
      correctBtn.classList.remove('hidden');
      wrongBtn.classList.remove('hidden');
      correctBtn.disabled = false;
      wrongBtn.disabled = false;
    } else {
      correctBtn.classList.add('hidden');
      wrongBtn.classList.add('hidden');
      correctBtn.disabled = true;
      wrongBtn.disabled = true;
    }
  });

  // Helper function for next card animation
  function animateToNextCard() {
    flashcard.classList.remove('flipped');
    frontElem.classList.add('fade');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % flashcards.length;
      showFlashcard(currentIndex);
      frontElem.classList.remove('fade');
    }, 200);
  }

  // Update progress bar
  function updateProgressBar() {
    const correctBar = document.querySelector('.progress-bar-correct');
    const wrongBar = document.querySelector('.progress-bar-wrong');
    const correctLabel = document.querySelector('.progress-bar-correct-label');
    const wrongLabel = document.querySelector('.progress-bar-wrong-label');
    const total = correctCount + wrongCount;
    const correctPercent = total > 0 ? (correctCount / total) * 100 : 0;
    const wrongPercent = total > 0 ? (wrongCount / total) * 100 : 0;

    correctBar.style.width = correctPercent + "%";
    wrongBar.style.width = wrongPercent + "%";
    correctLabel.textContent = correctCount;
    wrongLabel.textContent = wrongCount;
  }

  // Correct button logic
  correctBtn.addEventListener('click', () => {
    correctCount++;
    updateProgressBar();

    if (flashcards.length === 0) return;

    animateToNextCard();

    correctBtn.disabled = true;
    wrongBtn.disabled = true;
    correctBtn.classList.add('hidden');
    wrongBtn.classList.add('hidden');
  });

  // Wrong button logic
  wrongBtn.addEventListener('click', () => {
    wrongCount++;
    updateProgressBar();

    if (flashcards.length === 0) return;

    animateToNextCard();

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