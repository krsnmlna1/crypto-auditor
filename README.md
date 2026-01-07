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

## 📄 Example Output

```text
==========================================
💀 RUTHLESS AUDIT REPORT: target.pdf
==========================================

Alright, let's tear this so-called "Bitcoin" whitepaper apart. My skepticism is already tingling.

1.  🚩 MAJOR RED FLAGS:

    *   "As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain": This is a HUGE assumption. What happens when a malevolent actor controls 51% of the network hash rate? The entire system is compromised. This is naive. This assumes humans will be good actors when incentives promote the OPPOSITE.
    *   "The network itself requires minimal structure. Messages are broadcast on a best effort basis". No structure? This is a recipe for chaos, network congestion, and denial-of-service attacks. 'Best Effort' is not a security protocol. In a real world scenario, you want GUARANTEES, not just HOPES.
    *   "Privacy is maintained by keeping public keys anonymous". What privacy?!? This paper implies privacy because "you can't know who owns which public key". But ALL these transactions are public. If your wallet can ever be linked to your real world identity, ALL transactions from that wallet are unmasked. This privacy model is pathetic.

2.  📉 TOKENOMICS ANALYSIS:

    *   "The steady addition of a constant of amount of new coins is analogous to gold miners expending resources to add gold to circulation." Okay, I see what you did there with the gold comparison (inflation). But Who benefits from the NEW coins? It's just given to whoever calculates the Proof of Work faster. That's not distributed, that's centralization around those with more "CPU power".
    *   There's ZERO discussion of initial distribution, who "got" the first bitcoins, etc. If a small group of people hoarded all the initial supply, they can manipulate the market at will. No information on distribution is a HUGE red flag. It should be in the TITLE.

3.  🧠 GAME THEORY CHECK:

    *   The incentive structure relies on the assumption that it's always more profitable for miners to play by the rules than to attack the system. This incentive crumbles once an attacker gains a significant amount of power. Then it is always profitable to 51% attack. This is not a secure system, it is a fragile house of cards based on the premise "people will play nice".
    *   From a rational-actor perspective, it incentives short-term profit at the expense of long-term integrity. It looks like a Ponzischeme where early adopters are rewarded at the expense of later investors. Very similar to a pyramid scheme where the people at the top have too much power.

4.  ⚖️ VERDICT (SCORE 25/100):

     This is NOT a secure system. Naive privacy models, incentive structures encourage centralization, and the assumption that "most people will behave" is straight-up dumb. I would not recommend buying into this tech.

5.  💡 ADVICE: Run away. RUN FAR AWAY. This system is flawed and bound to be exploited. I can see this failing once mass adoption occurs.
```

## ⚠️ Disclaimer

**This tool is for educational and entertainment purposes only.**
The "Skeptical Auditor" persona is designed to be critical and harsh. Do not take financial advice from an AI. Always do your own research (DYOR) before investing in any cryptocurrency.

## 📄 License

ISC
