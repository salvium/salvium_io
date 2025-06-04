---
layout: post
title: "Salvium One: Countdown to Mainnet"
date: 2025-06-05 09:00:00 +0000
categories: Updates
image: /images/blog/salvium-one-countdown.png
excerpt: "Mainnet is almost here: the team hits a major milestone as Salvium One enters its final countdown."
---

*A progress update for the Salvium community*

## **What is Salvium One?**

Salvium One is the next major version of the Salvium network. It blends our existing privacy features (inherited from CryptoNote) with two new building-blocks:

**Carrot addressing scheme:** An improved stealth address scheme that uses two independent “base points”. Carrot adds new privacy and usability features, whilst remaining backwards compatible. It also makes it harder for attackers to break, and prepares us for future upgrades. An updated version of the CLSAG signature scheme—**T-CLSAG**—has been developed in-house, and is also included. [Learn more](https://docs.salvium.io/knowledge-base/carrot-addressing)

**SPARC proof suite:** A family of cryptographic proofs that lets a sender prove control of an output without revealing any private-key information.  
[Knowledge-base overview ›](https://docs.salvium.io/THE%20PROJECT/sparc/) | [Plain-language blog post ›](https://salvium.io/blog/2025/05/08/salviums-innovative-solution/)

These tools let us **aim for selective transparency**: ordinary users keep their full privacy, while businesses and exchanges can reveal *just enough* information to satisfy regulations when required.

## **Key Features at a Glance**

| Feature                          | Why it matters (for everyone)                                                                                                                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Encrypted return payments**    | A recipient can return funds to the exact output they came from—so exchanges can reject or refund deposits without exposing either party’s history.                                                                |
| **Spend-authority proofs**       | A lightweight proof that confirms the spender really owns the output, protecting against forged transactions.                                                                                                      |
| **Programmable privacy options** | Wallets will be able to share optional “view keys,” helping us move **toward** regulatory compliance without dropping privacy for typical users.                                                                   |
| **Polyseed recovery**            | Shorter (16-word) seed phrases that still offer more entropy than the old 25-word list, plus an embedded “birthday” height so wallets sync faster. |
| **Native staking, upgraded**     | The existing yield system continues, now protected by the new T-CLSAG signatures.                                                                                                                                  |

This isn’t just an incremental upgrade—it’s the point where Salvium becomes a production-ready foundation for compliant private DeFi.

## **Where We Stand**

* **Mathematics under review** – The complete SPARC pre-print (Carrot, encrypted returns, T-CLSAG, and privacy-selection logic) is complete and will be delivered to **Cypher Stack** for an independent audit.
* **Code nearing completion** – Internal test code can already sign, verify, and stake with the new proofs.
* **Test-net preparations underway** – Public testing and the final preparation for mainnet will start as soon as audits are complete.

## **What Happens Over the Coming Weeks**

1. **Cypher Stack feedback** – We share the full report and patch anything they raise.
2. **Public test-net** – Open chain, faucet, explorer, and CLI tools so anyone can try Carrot + SPARC transactions and Polyseed restores. A small bug-bounty will run alongside.
3. **White-paper publication** – A single document for Salvium One that explains—step by step—the three pillars of SPARC: return payments, spend-authority proofs, and optional transparency.
4. **Main-network activation** – After a stable test-net run and a green audit, we set a fork height and notify miners and service operators well in advance.

## **How You Can Help**

* **Read the pre-print** when the link is posted; ask questions in Discord.
* **Join the test-net** and try everything you can think of—edge cases welcome.
* **Report bugs** through GitHub issues or the Discord **#testnet** channel.
* **Spread the word** – the more eyes we have, the stronger Salvium One will be.

Thank you for supporting Salvium. Stay tuned on Discord and **@salvium\_io** for real-time updates as we move through these final steps toward Salvium One.
