---
layout: post
title: "Salvium Assets Go Live — Hard Fork at Block 465,000"
date: 2026-03-24 12:00:00 +0000
categories: Updates
image: /images/blog/new-dawn.webp
author: Salvium Team
excerpt: "Salvium is hard forking at block 465,000 (~April 13th) to activate on-chain token creation. Here's what's shipping, how it works, and what you need to do."
---

Salvium is hard forking to activate on-chain token creation. Here's what's shipping, how it works, and what you need to do.

## The hard fork

HF11 activates at block 465,000, estimated around April 13th at approximately 2:00 PM UTC. This is a mandatory upgrade — all node operators, miners, exchanges, and wallet users must update their software before that block height.

Release binaries and upgrade instructions will be published this week once the code freeze is complete and the final version is tagged. Watch the Discord and this blog for the release announcement.

## What's new: Salvium Assets

Salvium Assets lets anyone create tokens on the Salvium chain — NFTs, real-world asset representations, invoice tokens, governance proposals, or anything else you want to represent on-chain. Every token inherits Salvium's full privacy stack: RingCT, stealth addresses, and confidential transactions. There is no public ledger of who holds what.

This has been the central deliverable of Milestone One, and HF11 is the mainnet activation.

## How it works

The system uses a three-tier metadata architecture designed to keep transactions lightweight while supporting rich, structured data.

**Tier 1 is on-chain.** Every token transaction carries four fields: a human-readable name, a URI pointing to off-chain metadata, a SHA-256 hash of that metadata, and its byte size. This is enough to identify the token and cryptographically verify its metadata hasn't been tampered with — without bloating the chain.

**Tier 2 is the off-chain metadata blob** hosted at the Tier 1 URI. It contains the full description, a unique identifier, the declared standard (ERC-721 for NFTs, ERC-3643 for real-world assets, ERC-1400 for securities, CIP-108 for governance), and a creation timestamp. The hash in Tier 1 binds the on-chain token to this document — if the metadata changes, the hash breaks.

**Tier 3 sits inside the Tier 2 blob** as extension objects. An `rwa{}` block for property valuations and jurisdiction data. An `nft{}` block for images and trait attributes. A `governance{}` block for proposal text and voting parameters. A `compliance{}` block for MiCAR classification, LEI codes, and whitepaper hashes. The protocol doesn't need to know about any of this — it's pure application-layer convention, which means the system can support new token types without protocol changes.

To create a token, you call `create_token` on the wallet RPC with a 4-character ticker, a supply, and optionally your metadata — either as individual fields, a hex-encoded payload, or a file path. That's it. The transaction broadcasts, confirms, and the token is live.

## Why this matters

Privacy chains have historically been single-asset systems. You get a private native coin and that's it. Salvium Assets changes that. You can now represent any asset on a chain where transactions are private by default — and where the metadata architecture is designed to be compatible with the standards that institutional tooling already understands.

The use of ERC-721, ERC-3643, and ERC-1400 as metadata conventions means wallets, marketplaces, and compliance systems that parse Ethereum-style metadata can interpret Salvium tokens without custom integration. Salvium has no EVM and no smart contracts — these are metadata labels, not contract interfaces — but the interoperability at the data layer is deliberate.

The compliance extension is equally deliberate. Any token can optionally declare its MiCAR classification, issuer LEI, and whitepaper hash. This doesn't make the token "regulated" — that's a legal determination, not a protocol one — but it gives issuers the tooling to make the disclosures that regulators expect, on a chain that doesn't force them to sacrifice privacy to do it.

## The Meta Generator

Building token metadata by hand is tedious and error-prone. The hash has to match the exact compact JSON encoding. The hex payload can't have a `0x` prefix. One byte of whitespace difference and the integrity check fails.

The Salvium Meta Generator is a web tool that handles all of this. Select your token standard, fill in the fields, and it produces the compact JSON, the hex payload, the SHA-256 hash, and the byte size — ready to paste into a `create_token` call or pass to the SDK.

It supports all four token types out of the box: NFTs with image URIs and trait attributes, real-world assets with valuations and legal document hashes, invoice tokens, and governance proposals. The optional compliance section is available for any type.

The Meta Generator is live now at [meta-generator.salvium.io](https://meta-generator.salvium.io) and the source is on GitHub.

## Developer resources

We've published a full documentation set covering the token protocol, the SDK, the RPC interface, and step-by-step setup guides:

- [**Salvium Assets Overview**](https://docs.salvium.io/TOKENS/) — what you can tokenise, how the system works, and where to start
- [**Tokens Documentation Hub**](https://docs.salvium.io/TOKENS/) — the complete reference: protocol spec, metadata schema, SDK, middleware, and RPC methods
- [**Getting Started Guide**](https://docs.salvium.io/TOKENS/getting-started/) — set up a testnet, fund a wallet, and mint your first token from scratch

These are designed to get developers building from day one. The TypeScript SDK handles encoding, hashing, and RPC authentication automatically. A middleware proxy is included for browser-based applications that can't do Digest auth natively. And a demo UI shows the full lifecycle — marketplace browsing, token creation, and on-chain verification — backed by a real testnet.

## What you need to do

**Node operators and miners:** Update to the new release as soon as binaries are published. The hard fork is at block 465,000. Nodes running old software will fork off the network.

**Exchange operators:** Update your daemon and wallet-rpc binaries before block 465,000. The new RPC methods (`create_token`, `get_tokens`, `get_token_info`) are additive — existing wallet operations are unaffected.

**Wallet users:** Update your GUI or CLI wallet when the new version is available. Your funds and addresses are unchanged.

**Developers:** Start with the [Getting Started guide](https://docs.salvium.io/TOKENS/getting-started/) on testnet now. Everything you build will work identically on mainnet after the fork.

---

April 13th. Block 465,000. Salvium Assets go live.

The Salvium Team
