---
layout: post
title: "T-CLSAG Submitted for Cryptographic Audit"
date: 2025-06-07 09:00:00 +0000
categories: Updates
image: /images/blog/maths-audit.png
excerpt: " T-CLSAG signature scheme has been submitted to Cypher Stack for formal cryptographic audit for audit."
---

## Introduction

Today marks a significant milestone in Salvium's development journey. We are proud to announce that our research paper "Two-scalar CLSAG Signature Scheme for Monero's Carrot Addressing (T-CLSAG)" has been submitted to Cypher Stack for formal cryptographic audit. This represents not just a technical achievement, but a crucial step toward implementing some of the most advanced privacy features in the cryptocurrency space.

## Understanding Preprints and Why They Matter

Before diving into the technical details, it's important to understand what a preprint represents in the world of cryptographic research. A preprint is an academic paper that has been prepared for peer review but has not yet undergone formal publication. In the cryptocurrency and cryptography fields, preprints serve several critical functions:

1. **Transparency**: They allow the community to examine proposed protocols before implementation  
2. **Peer Review**: They enable expert cryptographers to identify potential vulnerabilities or improvements  
3. **Academic Rigor**: They demonstrate commitment to following established scientific protocols  
4. **Security Validation**: Independent audits verify that mathematical claims hold under scrutiny

For a privacy-focused protocol like Salvium, submitting our work for independent audit by specialists like Cypher Stack is not just best practice—it's essential. Cypher Stack brings extensive expertise in Monero security and cryptographic research, making them the ideal choice to validate our innovations.

## The Technical Innovation: T-CLSAG Explained

### What is CLSAG?

CLSAG (Concise Linkable Spontaneous Anonymous Group signatures) is the current signature scheme used by Monero to provide privacy and prevent double-spending. Traditional CLSAG allows a user to prove they know one secret key \( x \) corresponding to a public key \( K = xG \), where \( G \) is a standard elliptic curve generator.

### The Carrot Addressing Challenge

The proposed Carrot addressing scheme introduces a more sophisticated public key format:

\[ K_o = xG + yT \]

Where \( G \) and \( T \) are two distinct elliptic curve generators. This dual-generator approach enables powerful new features like forward secrecy and enhanced privacy protections. However, it also presents a significant cryptographic challenge: how do you prove knowledge of both secrets \( x \) and \( y \) while maintaining all the privacy and efficiency guarantees of the original CLSAG scheme?

### Our Solution: T-CLSAG

Our T-CLSAG scheme solves this challenge elegantly by:

1. **Extending the Challenge Chain**: We modify CLSAG's iterative challenge computation to account for both scalar secrets  
2. **Preserving Key Images**: We maintain the traditional key image structure \( L = x \cdot H_p(K_o) \), ensuring backward compatibility  
3. **Aggregate Proof Structure**: We use cryptographic aggregation to prove knowledge of both secrets efficiently  
4. **Domain Separation**: We employ careful domain separators to prevent cryptographic mixing between different contexts

The mathematical elegance lies in how we extend the existing proof system without compromising any of its security properties. The signature remains concise, the anonymity set is preserved, and double-spend protection functions exactly as before.

## Why This Represents a Major Milestone

### Development Completion

The submission of this preprint represents the culmination of extensive development work. The bulk of our implementation is complete—we're not starting from scratch or proposing theoretical concepts. Instead, we're validating the mathematical foundations of a working system. This puts us in an enviable position where the cryptographic audit is the primary remaining step before deployment.

### Collaborative Achievement

This work has been in collaboration with Cypher Stack's cryptographers. Their expertise in Monero's cryptographic foundations has been invaluable in refining our approach. We want to express our sincere gratitude for their ongoing support and partnership in advancing the state of privacy-preserving blockchain technology.

### Industry Leadership

While the broader Monero ecosystem continues to explore advanced addressing schemes and signature protocols, Salvium is taking the lead in practical implementation. Our T-CLSAG scheme represents original research that advances the entire field of privacy-focused cryptocurrencies.

## How This Advances Salvium's Mission

Salvium's core mission centers on creating a privacy-first blockchain that can comply with emerging regulatory frameworks while maintaining the strong privacy guarantees that users expect. T-CLSAG and Carrot addressing are crucial components of this vision:

### Regulatory Compliance

The enhanced cryptographic flexibility provided by dual-secret proofs enables features like selective transparency and compliance-friendly privacy. Users can maintain strong privacy by default while having the option to provide specific disclosures when required by regulation.

### Forward Secrecy

T-CLSAG enables forward secrecy properties that protect user privacy even against future cryptographic advances, including potential quantum computing threats. This future-proofing is essential for a long-term privacy strategy.

### DeFi Integration

The advanced cryptographic capabilities unlocked by T-CLSAG provide the foundation for sophisticated DeFi applications that maintain privacy. This aligns with Salvium's goal of becoming the leading platform for private decentralized finance.

## The Broader Context: Monero's Development

It's worth acknowledging the broader ecosystem context. The Monero project has been instrumental in supporting research into advanced addressing schemes and signature protocols. Projects like FCMP++ (Full-Chain Membership Proofs) and various addressing proposals have created a rich research environment.

Salvium's approach differs in crucial ways:

1. **Implementation Focus**: While much of the ecosystem work remains theoretical, Salvium is implementing practical solutions  
2. **Regulatory Awareness**: Our development is guided by real-world regulatory requirements  
3. **DeFi Integration**: We're building specifically for decentralized finance applications  
4. **Innovation Speed**: Our focused approach allows us to move quickly from research to implementation

## What Comes Next

The Cypher Stack audit will thoroughly examine our mathematical proofs, implementation considerations, and security claims. This process typically involves:

1. **Mathematical Verification**: Confirming that our proofs are sound and complete  
2. **Security Analysis**: Identifying potential attack vectors or vulnerabilities  
3. **Implementation Review**: Ensuring that the theoretical scheme can be securely implemented  
4. **Performance Evaluation**: Assessing computational and storage requirements

Upon successful completion of the audit, we'll be ready to integrate T-CLSAG into Salvium's mainnet, representing a significant advancement in blockchain privacy technology.

## Technical Deep Dive: Key Innovations

### Aggregate Public Keys

We define aggregate public keys that combine multiple inputs:

\[ W_i = \sum H_n(T_j, R, L_1, \ldots, L_m) \cdot K_{i,j} \]

This aggregation allows us to prove knowledge of secrets across multiple inputs efficiently while maintaining the ring signature's anonymity properties.

### Challenge Chain Extension

The iterative challenge computation becomes:

\[ c_{i+1} = H_n(T_c, R, m, [r_{x,i}G + r_{y,i}T + c_i W_i], [r_{x,i} H_p(K_i) + c_i \widetilde{W}]) \]

This extension ensures that both scalar secrets must be known to complete the proof, while the challenge chain maintains its essential security properties.

### Backward Compatibility

Crucially, our key image computation remains:

\[ L_j = x_j \cdot H_p(K_{\pi,j}) \]

This ensures that existing double-spend detection mechanisms continue to function without modification.

## Conclusion

The submission of our T-CLSAG preprint for cryptographic audit represents more than a technical milestone—it demonstrates Salvium's commitment to rigorous security standards and innovative privacy technology. By extending proven cryptographic techniques to support advanced addressing schemes, we're building the foundation for the next generation of privacy-preserving blockchain applications.

As we await the results of the Cypher Stack audit, we remain committed to transparency, security, and pushing the boundaries of what's possible in private blockchain technology. The future of decentralized finance is private, compliant, and built on solid mathematical foundations.

We'll continue to update the community as the audit progresses and look forward to sharing the validated T-CLSAG implementation in the near future.

---

*For technical readers interested in the full mathematical details, the complete T-CLSAG preprint will be made available following the completion of the cryptographic audit.*
