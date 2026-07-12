---
layout: post
title: "Implementing Transaction Proofs for Carrot Addresses in Salvium"
date: 2025-12-13 12:00:00 +0000
categories: Updates
image: /images/blog/carrot-tx-proofs.jpg
author: Salvium Team
excerpt: "New technical paper detailing our implementation of Carrot transaction proofs"
---

We've published a new technical paper detailing our implementation of transaction proofs for Carrot addresses:

[Carrot_TX_Proofs.pdf](https://github.com/salvium/salvium_library/blob/18221895fd9ccdc207901020d23758b071731b64/preprints/Carrot_TX_Proofs.pdf)

This functionality is available in [CLI v1.0.7](https://github.com/salvium/salvium/releases/tag/v1.0.7).

Transaction proofs (such as `get_tx_proof` in the CLI) provide zero-knowledge verification that a specific wallet address received funds in a given transaction. While not frequently invoked, these proofs serve a critical function—particularly for exchanges resolving deposit disputes, where mathematical confirmation of fund delivery is required without view key disclosure.

Salvium One requires this functionality for Carrot addresses. Below is a summary of the challenge and our approach; the paper contains the full technical specification.

## The Curve Conversion Challenge

Carrot introduced a dual-curve architecture to CryptoNote addressing. Rather than relying exclusively on Ed25519, Carrot employs X25519 (an ECDH protocol over Curve25519) for certain shared secret derivations.

Salvium relies on this functionality for Carrot addresses became a priority.

The relevant curve representations:

* **Curve25519**: Montgomery form expressed as (u,v) coordinates on v² = u³ + 486662u² + u (mod p)  
* **X25519**: The encoded u-coordinate of a Curve25519 point (v is discarded)  
* **Ed25519**: Compressed (x,y) points on the twisted Edwards curve

Carrot's design converts Ed25519 → X25519 for specific operations. A birational mapping exists between Curve25519(u,v) and Ed25519(x,y), but Carrot's implementation only required the one-way conversion—discarding v in the process.

## Technical Obstacle

Reconstructing v from u requires computing modular square roots in a finite field, specifically involving √(−1) mod p. Standard cryptographic libraries do not expose this functionality directly.

Initial approaches focused on restructuring the proof to demonstrate equivalent properties, or passing additional data between prover and verifier. These alternatives either failed to preserve the proof's validity or risked leaking information that should remain private to the prover—an unacceptable compromise.

## Resolution

The solution required implementing the necessary field arithmetic to recover v from u, enabling full bidirectional birational conversion between (u,v) and (x,y) coordinate systems.

This implementation allows Salvium to generate valid transaction proofs compatible with Carrot's addressing scheme, maintaining expected privacy guarantees while providing the verification tools required for exchange compliance and dispute resolution.
