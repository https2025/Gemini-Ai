// File: api/gemini.js // Gunakan di Vercel sebagai API route backend proxy

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const API_KEY = 'AIzaSyD9bCkRAb7rGuXTBUcfdg1Sl52GYv3CVN0';

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }],
      }),
    });

    const data = await response.json();
    return res.status(200).json({
      reply: data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada jawaban.',
    });
  } catch (error) {
    console.error('Gemini error:', error);
    return res.status(500).json({ error: 'Gagal menghubungi Gemini' });
  }
};
/*
export default async function handler(req, res) { if (req.method !== 'POST') { return res.status(405).json({ error: 'Method not allowed' }); }

const { message } = req.body; const API_KEY = 'AIzaSyD9bCkRAb7rGuXTBUcfdg1Sl52GYv3CVN0';

try { const response = await fetch(https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}, { method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ contents: [{ parts: [{ text: message }] }], }) });

const data = await response.json();
return res.status(200).json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada jawaban.' });

} catch (error) { console.error('Gemini error:', error); return res.status(500).json({ error: 'Gagal menghubungi Gemini' }); } }


curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY" \
  -H 'Content-Type: application/json' \
  -X POST \
  -d '{
    "contents": [
      {
        "parts": [
          {
            "text": "Explain how AI works in a few words"
          }
        ]
      }
    ]
  }'
*/
