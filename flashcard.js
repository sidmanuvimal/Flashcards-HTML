let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function renderTable() {
  const tableBody = document.getElementById("flashcardTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // clear table
  flashcards.forEach((card, index) => {
    const row = tableBody.insertRow();
    const numCell = row.insertCell(0); // Number column
    const qCell = row.insertCell(1);
    const aCell = row.insertCell(2);
    const actionCell = row.insertCell(3); // New cell for delete button

    numCell.textContent = index + 1; // Show 1-based index
    qCell.textContent = card.question;
    aCell.textContent = card.answer;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function() {
      flashcards.splice(index, 1);
      localStorage.setItem("flashcards", JSON.stringify(flashcards));
      renderTable();
    };
    actionCell.appendChild(deleteBtn);
  });
}

function addCard() {
  const question = document.getElementById("questionInput").value.trim();
  const answer = document.getElementById("answerInput").value.trim();

  if (question && answer) {
    flashcards.push({ question, answer });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    renderTable();

    // Scroll to the bottom ONLY after adding
    const container = document.querySelector('.table-container');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }


    // Clear input fields
    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";

    // Move cursor to question input
    document.getElementById("questionInput").focus();
  } else {
    alert("Please enter both a question and an answer.");
  }
}

// Add these event listeners after your functions
document.getElementById("questionInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        document.getElementById("answerInput").focus();
    }
});

document.getElementById("answerInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addCard();
    }
});

// Load existing flashcards
renderTable();
