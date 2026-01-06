# 💀 Crypto Ruthless Auditor

> **An AI-powered tool that brutally analyzes crypto whitepapers, exposing scams, weak tokenomics, and logical fallacies.**

## 🚀 Overview

This tool uses **Google's Gemini 2.0 Flash** (via OpenRouter) to read PDF whitepapers and perform a "ruthless" audit. It adopts a skeptical, no-nonsense persona to tear down weak projects and highlight red flags that you might miss.

**Why use this?**

- Most whitepapers are fluff. This tool cuts through the noise.
- It identifies **Ponzi schemes**, **centralized supply**, and **vague promises**.
- It gives you a clear **0-100 verdict**.

## 📦 Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/crypto-auditor.git
    cd crypto-auditor
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory and add your OpenRouter API key:
    ```env
    OPENROUTER_API_KEY=your_openrouter_api_key_here
    ```

## 🛠️ Usage

1.  **Prepare your Whitepaper:**
    Download the whitepaper you want to audit and rename it to `target.pdf`.
    Place it in the project root folder.

2.  **Run the Auditor:**

    ```bash
    npm start
    ```

    _Or run directly with node:_

    ```bash
    node audit.js
    ```

3.  **Read the Report:**
    The AI will analyze the document and output a brutal report in your terminal.

## ⚠️ Disclaimer

**This tool is for educational and entertainment purposes only.**
The "Skeptical Auditor" persona is designed to be critical and harsh. Do not take financial advice from an AI. Always do your own research (DYOR) before investing in any cryptocurrency.

## 📄 License

ISC
