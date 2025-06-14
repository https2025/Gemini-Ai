const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatbox = document.getElementById('chatbox');

// Load riwayat chat saat halaman dibuka
window.addEventListener('DOMContentLoaded', () => {
  const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  history.forEach(({ sender, text }) => appendMessage(sender, text));
});

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage('user', message);
  userInput.value = '';

  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    const reply = data.reply || 'Maaf, tidak ada jawaban.';
    appendMessage('bot', reply);
  } catch (err) {
    appendMessage('bot', 'Terjadi kesalahan saat menghubungi AI.');
    console.error(err);
  }
});

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = sender === 'user' ? 'user-message' : 'bot-message';
  msg.textContent = text;
  chatbox.appendChild(msg);
  chatbox.scrollTop = chatbox.scrollHeight;

  // Simpan ke localStorage
  const history = JSON.parse(localStorage.getItem('chatHistory')) || [];
  history.push({ sender, text });
  localStorage.setItem('chatHistory', JSON.stringify(history));
}

function clearChatHistory() {
  localStorage.removeItem('chatHistory');
  chatbox.innerHTML = '';
}
