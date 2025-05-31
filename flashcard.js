
let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function renderTable() {
  const tableBody = document.getElementById("flashcardTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // clear table
  flashcards.forEach(card => {
    const row = tableBody.insertRow();
    const qCell = row.insertCell(0);
    const aCell = row.insertCell(1);
    qCell.textContent = card.question;
    aCell.textContent = card.answer;
  });
}

function addCard() {
  const question = document.getElementById("questionInput").value.trim();
  const answer = document.getElementById("answerInput").value.trim();

  if (question && answer) {
    flashcards.push({ question, answer });
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
    renderTable();

    // Clear input fields
    document.getElementById("questionInput").value = "";
    document.getElementById("answerInput").value = "";
  } else {
    alert("Please enter both a question and an answer.");
  }
}

// Load existing flashcards
renderTable();

