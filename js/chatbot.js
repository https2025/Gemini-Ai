// chatbot.js

const chatForm = document.getElementById('chat-form'); const userInput = document.getElementById('user-input'); const chatbox = document.getElementById('chatbox');

const API_KEY = 'AIzaSyD9bCkRAb7rGuXTBUcfdg1Sl52GYv3CVN0';

chatForm.addEventListener('submit', async (e) => { e.preventDefault(); const message = userInput.value.trim(); if (!message) return;

appendMessage('user', message); userInput.value = '';

try { const response = await fetch(https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ contents: [{ parts: [{ text: message }] }], }) });

const data = await response.json();
const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Maaf, tidak bisa menjawab saat ini.';
appendMessage('bot', reply);

} catch (err) { appendMessage('bot', 'Terjadi kesalahan saat menghubungi AI.'); console.error(err); } });

function appendMessage(sender, text) { const msg = document.createElement('div'); msg.className = sender === 'user' ? 'user-message' : 'bot-message'; msg.textContent = text; chatbox.appendChild(msg); chatbox.scrollTop = chatbox.scrollHeight; }

