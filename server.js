// server.js
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const pdf = require('pdf-parse');
const OpenAI = require("openai");
const cors = require('cors');

const app = express();
const upload = multer(); // Penyimpanan file sementara di RAM
app.use(cors());
app.use(express.static('public')); // Folder untuk file HTML nanti

// Setup AI
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "Crypto Ruthless Auditor",
  }
});

app.post('/audit', upload.single('whitepaper'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "Mana filenya bro?" });
        }

        console.log("📂 Menerima file:", req.file.originalname);

        // 1. Baca PDF dari Buffer (RAM)
        const pdfData = await pdf(req.file.buffer);
        const text = pdfData.text.replace(/\n\s*\n/g, '\n').substring(0, 100000); // Limit karakter

        console.log("🕵️  Mengirim ke AI...");

        // 2. Kirim ke AI
        const prompt = `
        ROLE: Kamu adalah Senior Blockchain Security Auditor & Pakar Game Theory yang SANGAT SKEPTIS dan KEJAM.
        
        TASK: Audit isi whitepaper crypto yang saya berikan. Cari celah scam, kelemahan logika, tokenomics yang curang, atau "red flags".
        JANGAN MENJADI SOPAN. Hancurkan argumen mereka jika tidak logis.
        
        OUTPUT FORMAT (Gunakan Markdown/Bold untuk penekanan):
        1. 🚩 RED FLAGS UTAMA: (Minimal 3 poin kritikal).
        2. 📉 ANALISIS TOKENOMICS: (Apakah sustainable? Siapa yang pegang supply terbanyak?).
        3. 🧠 GAME THEORY CHECK: (Apakah skema ini Ponzi? Apa insentif user sebenarnya?).
        4. ⚖️ VERDICT (SKOR 0-100): (0 = Sampah, 100 = Bagus). 
        5. 💡 SARAN: (Lari atau Beli?).
        
        DATA WHITEPAPER:
        "${text}"
        `;

        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-r1-distill-llama-70b",
            messages: [{ role: "user", content: prompt }]
        });

        const result = completion.choices[0].message.content;
        console.log("✅ Audit Selesai!");
        
        // Kirim balik ke Frontend
        res.json({ success: true, report: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "AI sedang lelah atau error: " + error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});