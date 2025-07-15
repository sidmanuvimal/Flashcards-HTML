// Load flashcards from localStorage
// This retrieves the flashcards data stored in the browser's localStorage.
// If no data is found, it defaults to an empty array.
let flashcardQuestions = JSON.parse(localStorage.getItem("flashcard-questions")) || [];

// Check if the current page is the main page
// The main page is identified by the presence of an element with the ID 'flashcardTable'.
const isMainPage = !!document.getElementById('flashcardTable');

// Check if the current page is the QA page
// The QA page is identified by the presence of an element with the class 'flashcard-container'.
const isQAPage = !!document.querySelector('.flashcard-container');

const flashcardData = {
  Maths: [
    { question: "What is 2+2?", answer: "4" },
    { question: "What is 5x3?", answer: "15" },
    { question: "Solve for x: 2x=10.", answer: "x=5" },
    { question: "What is the square root of 16?", answer: "4" },
    { question: "What is 12 divided by 4?", answer: "3" },
    { question: "What is the area of a rectangle with length 5 and width 3?", answer: "15" },
    { question: "What is the perimeter of a square with side length 6?", answer: "24" },
    { question: "What is 7x8?", answer: "56" },
    { question: "What is the value of π (pi) approximately?", answer: "3.14" },
    { question: "What is 10% of 200?", answer: "20" }
  ],
  English: [
    { question: "Synonym for 'happy'?", answer: "Joyful" },
    { question: "Antonym for 'big'?", answer: "Small" },
    { question: "Define 'metaphor'.", answer: "A figure of speech comparing two things." },
    { question: "What is the plural of 'child'?", answer: "Children" },
    { question: "What is the past tense of 'run'?", answer: "Ran" },
    { question: "What is the opposite of 'beautiful'?", answer: "Ugly" },
    { question: "What is a noun?", answer: "A word that represents a person, place, or thing." },
    { question: "What is an adjective?", answer: "A word that describes a noun." },
    { question: "What is the synonym for 'fast'?", answer: "Quick" },
    { question: "What is the antonym for 'dark'?", answer: "Bright" }
  ],
  Geography: [
    { question: "Capital of France?", answer: "Paris" },
    { question: "Largest ocean?", answer: "Pacific Ocean" },
    { question: "What is a plateau?", answer: "A flat elevated landform." },
    { question: "What is the longest river in the world?", answer: "Nile River" },
    { question: "Which continent is Australia in?", answer: "Australia" },
    { question: "What is the tallest mountain in the world?", answer: "Mount Everest" },
    { question: "What is the smallest country in the world?", answer: "Vatican City" },
    { question: "What is the largest desert in the world?", answer: "Sahara Desert" },
    { question: "What is the capital of Japan?", answer: "Tokyo" },
    { question: "What is the name of Earth's outermost layer?", answer: "Crust" }
  ],
  SocialStudies: [
    { question: "Who was Gandhi?", answer: "Leader of Indian independence." },
    { question: "What is democracy?", answer: "Rule by the people." },
    { question: "Define 'constitution'.", answer: "A set of fundamental principles." },
    { question: "Who was Martin Luther King Jr.?", answer: "A civil rights leader." },
    { question: "What is the United Nations?", answer: "An international organization promoting peace." },
    { question: "What is the Cold War?", answer: "A period of political tension between the USA and USSR." },
    { question: "What is feudalism?", answer: "A medieval system of land ownership and hierarchy." },
    { question: "What is the Industrial Revolution?", answer: "A period of rapid industrial growth in the 18th century." },
    { question: "What is the Magna Carta?", answer: "A document limiting the power of the king." },
    { question: "What is globalization?", answer: "The process of interconnected economies and cultures." }
  ],
  PE: [
    { question: "Benefits of exercise?", answer: "Improves health and fitness." },
    { question: "Define 'cardio'.", answer: "Exercise for heart health." },
    { question: "What is yoga?", answer: "A practice for body and mind." },
    { question: "What is strength training?", answer: "Exercise to build muscle strength." },
    { question: "What is flexibility?", answer: "The ability to move joints through a full range of motion." },
    { question: "What is endurance?", answer: "The ability to sustain physical activity over time." },
    { question: "What is the recommended daily exercise time?", answer: "30 minutes." },
    { question: "What is BMI?", answer: "Body Mass Index." },
    { question: "What is hydration?", answer: "Maintaining adequate water levels in the body." },
    { question: "What is aerobic exercise?", answer: "Exercise that improves oxygen flow." }
  ],
  Science: [
    { question: "H2O is?", answer: "Water" },
    { question: "What is gravity?", answer: "Force pulling objects down." },
    { question: "Define 'atom'.", answer: "Basic unit of matter." },
    { question: "What is photosynthesis?", answer: "Process by which plants make food using sunlight." },
    { question: "What is the speed of light?", answer: "Approximately 300,000 km/s." },
    { question: "What is the boiling point of water?", answer: "100°C or 212°F." },
    { question: "What is the chemical symbol for gold?", answer: "Au" },
    { question: "What is the largest planet in the solar system?", answer: "Jupiter" },
    { question: "What is the powerhouse of the cell?", answer: "Mitochondria" },
    { question: "What is the formula for force?", answer: "Force = Mass x Acceleration" }
  ]
};

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


const slideTriggers = document.querySelectorAll('.slide-trigger');

slideTriggers.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    slide.classList.add('active');
    setTimeout(() => {
      window.location.href = "QA.html"; // Redirect to QA page after fade-out
    }, 900); // Match your CSS transition duration
  });
});


const sliderTriggers = document.querySelectorAll('.slider-trigger');

sliderTriggers.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    slide.classList.add('active');
    setTimeout(() => {
      window.location.href = "Manage.html"; // Redirect to QA page after fade-out
    }, 900); // Match your CSS transition duration
  });
});

const slidTriggers = document.querySelectorAll('.slid-trigger');

slidTriggers.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    slide.classList.add('active');
    setTimeout(() => {
      window.location.href = "Main_page.html"; // Redirect to QA page after fade-out
    }, 900); // Match your CSS transition duration
  });
});

const tooltip = document.querySelector('.logo-tooltip');
if (tooltip) {
  tooltip.classList.add('show'); // Make it visible

  // Hide after 4 seconds
  setTimeout(() => {
    tooltip.classList.remove('show');
  }, 4000);
}

// Replace localStorage with selected flashcards
document.querySelectorAll('.flashcard-box').forEach(box => {
  box.addEventListener('click', () => {
    const subject = box.dataset.subject;
    // Show confirmation popup
    const confirmed = confirm(`Are you sure you want to load the "${subject}" flashcards? This will replace your current set.`);
    if (!confirmed) return;
    localStorage.setItem('flashcards', JSON.stringify(flashcardData[subject]));
    alert(`${subject} flashcards have been loaded!`);
  });
});

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

    flashcardQuestions.forEach((card, index) => {
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
        flashcardQuestions.splice(index, 1); // Remove the flashcard from the array
        localStorage.setItem("flashcard-questions", JSON.stringify(flashcardQuestions)); // Update localStorage
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
      flashcardQuestions.push({ question, answer }); // Add to array
      localStorage.setItem("flashcard-questions", JSON.stringify(flashcardQuestions)); // Update localStorage
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
  shuffleArray(flashcardQuestions);
  
  
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
    if (flashcardQuestions.length === 0) {
      questionElem.textContent = "No flashcards found!";
      answerElem.textContent = "";
      flashcard.classList.remove('flipped');
      correctBtn.classList.add('hidden');
      wrongBtn.classList.add('hidden');
      return;
    }
    questionElem.textContent = flashcardQuestions[index].question;
    answerElem.textContent = flashcardQuestions[index].answer;
    flashcard.classList.remove('flipped');
    correctBtn.classList.add('hidden');
    wrongBtn.classList.add('hidden');
  }


  // Next button logic
  nextBtn.addEventListener('click', () => {
    if (flashcardQuestions.length === 0) return;

    flashcard.classList.remove('flipped');
    frontElem.classList.add('fade');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % flashcardQuestions.length;
      showFlashcard(currentIndex);
      frontElem.classList.remove('fade');
    }, 200);
  });

  flipBtn.addEventListener('click', () => {
    if (flashcardQuestions.length === 0) return;

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
    // Flip card on click
  flashcard.addEventListener('click', () => {
    if (flashcardQuestions.length > 0) {
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



  // Helper function for next card animation
  function animateToNextCard() {
    flashcard.classList.remove('flipped');
    frontElem.classList.add('fade');

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % flashcardQuestions.length;
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

    if (flashcardQuestions.length === 0) return;

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

    if (flashcardQuestions.length === 0) return;

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