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
            model: "google/gemini-2.0-flash-001",
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

// --- FITUR BARU: SMART CONTRACT AUDIT ---

// Middleware untuk JSON body parsing (penting buat req.body)
app.use(express.json());

app.post('/audit-contract', async (req, res) => {
    try {
        const { contractAddress } = req.body;
        
        if (!contractAddress) {
            return res.status(400).json({ error: "Mana alamat kontraknya bro?" });
        }

        console.log(`🔍 Mengintip Etherscan untuk: ${contractAddress}`);

        // 1. Tarik Kode dari Etherscan
        const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
        // Default ke API Key gratisan kalau env kosong (fallback darurat)
        const apiKey = etherscanApiKey || "YourEtherscanAPIKey"; 
        
        const url = `https://api.etherscan.io/api?module=contract&action=getsourcecode&address=${contractAddress}&apikey=${apiKey}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.message !== 'OK' || !data.result[0].SourceCode) {
            throw new Error("Gagal ambil kode. Mungkin contract belum diverifikasi atau alamat salah.");
        }

        let sourceCode = data.result[0].SourceCode;
        
        // Bersihin kode dikit biar gak kepanjangan
        if (sourceCode.startsWith('{{')) {
            sourceCode = sourceCode.replace(/[{}]/g, ''); 
        }
        
        // Potong kalau kepanjangan
        const cleanCode = sourceCode.substring(0, 100000); 

        console.log("🕵️  Kode dapat! Mengirim ke Auditor AI...");

        // 2. Kirim ke AI (Prompt Khusus Coding)
        const prompt = `
        ROLE: Kamu adalah Smart Contract Security Auditor & Hacker Topi Putih yang SANGAT JELI.
        
        TASK: Audit kode Solidity di bawah ini. Cari celah keamanan fatal, backdoor, atau fungsi yang mencurigakan.
        JANGAN PEDULIKAN FITUR MARKETING. Fokus ke KODE.
        
        OUTPUT FORMAT (Markdown):
        1. 🐛 CRITICAL VULNERABILITIES: (Cari Reentrancy, Overflow, Unchecked Return, dll).
        2. 🍯 HONEYPOT CHECK: (Apakah owner bisa memblacklist user? Apakah user bisa jual tokennya? Cari fungsi 'onlyOwner' yang berbahaya).
        3. ⚖️ VERDICT (0-100): (Skor Keamanan).
        4. 💡 SARAN AUDITOR: (Aman di-deploy atau perlu ditulis ulang?).
        
        CODE SNIPPET (Solidity):
        ${cleanCode}
        `;

        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.0-flash-001", // Pakai Gemini Flash biar cepat & stabil
            messages: [{ role: "user", content: prompt }]
        });

        const result = completion.choices[0].message.content;
        console.log("✅ Audit Contract Selesai!");
        
        res.json({ success: true, report: result });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Gagal audit contract: " + error.message });
    }
});

const PORT = process.env.PORT || 7860;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    });
}

module.exports = app;