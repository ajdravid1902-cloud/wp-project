// Save selected mood to localStorage
function setMood(mood) {
  localStorage.setItem('mood', mood);
  document.body.className = mood;
}

// On load, apply saved mood theme
window.addEventListener('DOMContentLoaded', () => {
  const mood = localStorage.getItem('mood') || 'home';
  document.body.classList.add(mood);

  if (document.getElementById('entries')) {
    loadEntries();
  }
});

// Save journal entry
function saveEntry() {
  const text = document.getElementById('entry').value.trim();
  if (!text) {
    alert('Please write something!');
    return;
  }

  const mood = localStorage.getItem('mood') || 'happy';
  const date = new Date().toLocaleDateString();
  const entry = { mood, text, date };

  let entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));

  alert('Entry saved!');
  document.getElementById('entry').value = '';
}

// Load journal entries
function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('entries')) || [];
  const container = document.getElementById('entries');
  container.innerHTML = '';

  entries.reverse().forEach(entry => {
    const div = document.createElement('div');
    div.className = `entry-card entry-${entry.mood}`;
    div.innerHTML = `
      <strong>${entry.date} (${entry.mood})</strong>
      <p>${entry.text}</p>
    `;
    container.appendChild(div);
  });
}