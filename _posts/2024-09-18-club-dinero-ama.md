---
layout: post
title: "Club Dinero AMA"
date: 2024-09-18 09:51:00 +0200
categories: Community
image: /images/optimized/ama-club-d.webp
excerpt: "Full transcript of our AMA session with the Club Dinero community discussing Salvium's vision and technology."
---
## 1. What inspired the creation of Salvium, and how does it differ from other privacy-focused DeFi projects?

Salvium's origins can be traced to insights gained at MoneroKon 2019, particularly from Pedro Moreno-Sánchez's presentation on enabling payment channels in Monero. This sparked our interest in exploring the balance between privacy, scalability, and functionality in cryptocurrencies. Initially, we called the project "Fulmo," meaning "lightning" in Esperanto, but as we delved deeper into conditional payments and asynchronous transactions, we realized we were creating something much more powerful – an approach that enabled smart contracts while maintaining privacy. That's when Salvium was born. 

What sets Salvium apart is our unique approach to integrating privacy with DeFi. Our protocol_tx mechanism allows for more sophisticated transaction types than traditional privacy coins. We've developed features like Transactional Imbalances and Asynchronous Transactions that enable complex DeFi operations within a privacy-preserving framework. In addition, without compromising privacy, we have built-in compliance features like refundable transactions and selective disclosure. This means that we can meet new Mica rules for listing on centralized exchanges.

## 2. How is Salvium striking a balance between maintaining user privacy and adhering to regulations, without compromising its privacy features?

The first thing to understand is that we haven't compromised any of Monero's native privacy features. We have enhanced them. The compliance features don't interfere with privacy, they provide optional features on top, so there is no compromise with privacy. 

To achieve compliance, we have added refundable transactions that allow exchanges to return funds, without compromising the privacy of the original sender. We are also developing a view key mechanism using a dual-key system that enables authorized entities to view transaction history and balances without the ability to spend funds or link transactions to external identities. But it's the holder who chooses who to authorize. And which wallet to authorize. This approach allows us to operate in regulated environments while still providing robust privacy for most users and transactions.

## 3. How does Salvium fit into the broader DeFi ecosystem? What kind of DeFi applications do you envision being built on Salvium?

We see Salvium as a foundational layer for privacy-preserving DeFi applications. Our goal is to enable complex financial operations with built-in privacy features, something that's unique in the current DeFi landscape. 

As for the types of DeFi applications we envision, there's a wide range. We're excited about the potential for private AMM DEXes that could leverage our Asynchronous Transactions to enable swaps without revealing trade sizes or user identities. We also see great potential for privacy-preserving lending protocols, using our Transactional Imbalances to manage collateralization and liquidations privately. 

Other possibilities include anonymous yield farming, private options and derivatives, confidential stablecoins, and even privacy-focused prediction markets. Salvium could support anonymous governance systems, enabling private voting for DAO-like structures. The key advantage here is that all these applications would benefit from Salvium's native privacy features, compliance capabilities, and advanced transaction types. This allows for services that are challenging or impossible to implement on other platforms while maintaining strong privacy guarantees.

## 4. Are there partnerships or integrations planned with other DeFi platforms or projects?

Partnerships and integrations will be a core part of our growth strategy. Our current focus is to meet all the requirements for listing on centralized exchanges in the EU. The bulk of the development for this has been done, but the ability to view the wallet needs to be completed. This will unlock our first major CEX. 

We are constantly having discussions around the potential of DeFi - but the real conversations won't take shape until after the view wallet work is complete.

## 5. What are the major advantages of using Salvium for DeFi protocols compared to other platforms, particularly in terms of privacy?

Yes, privacy is the feature that differentiates us in DeFi. And nobody shouldn't underestimate how seriously we take this, we are still building Privacy features now, and following developments in the Monero community very closely. 

But our biggest advantage is that we embrace 3 big concepts in crypto. Privacy, compliance and DeFi. We published a Venn diagram recently that explains our unique position in crypto. Coins that comply with crypto regulations will have far greater reach - so we believe compliant privacy will be dominant in the future. We are tipped to become one of the first compliant, private defi projects.

## 6. What are the key milestones on the Salvium roadmap, and what should we expect from the upcoming 0.6 release?

0.6 is a relatively minor update. The next significant milestone is Salvium 1.0 - as this will be when we meet the Mica Regulations. The return address is already live, but we will have "exchange mode" - which is where an enhanced view key option will give users options to share wallet details with exchanges. 

This will be included in Salvium 1.0 which will enable our first listing on a regulated CEX. This is a huge milestone as it will demonstrate the power of compliant privacy. Devs are working on the maths now, we plan to conduct another audit before writing the code and intend to launch it in the new year.

## 7. Can you elaborate on the hard fork that's part of the 0.6 release? What changes or improvements can users expect?

Yes, it will be a hard fork that enables support for multiple outputs, it will make things easier for the pool operators. However, the main event will be 1.0 - when full compliance becomes a reality. But we do expect wallets to be updated before then. This will enable multi-sig, required by some bigger exchanges. And hopefully a Mac OS and even an Android GUI.

## 8. Are there plans to expand Salvium's use cases beyond privacy-focused DeFi?

Private DeFi is our core focus, which in itself is incredibly broad. This alone could keep us busy for decades. That said, we are very aware of the applications for this kind of privacy technology outside of finance. 

We have discussed voting systems. Our anonymous yet verifiable transaction structure could be used to create secure, private voting mechanisms - which I hope will form a core part of Salvium's governance going forward. Our encryption and identity protection features have potential applications in secure, private communication platforms. 

There are also applications in supply-chain management, where our verifiable transaction system could be used for tracking goods while maintaining business confidentiality. Healthcare data management is likely to leverage blockchain technology to handle sensitive medical data. Gaming and digital collectibles too, where we could create platforms for tradeable digital assets with privacy features. 

We've even considered how our cryptographic primitives could be used in privacy-preserving machine learning systems and confidential IoT data management. That said, DeFi will be our focus. Expansion must align with our core competencies and not dilute our primary focus. But as privacy becomes increasingly important across various sectors, we believe Salvium's technology could find numerous applications beyond DeFi. And as a decentralized and open source project, we'd encourage anyone with an interest in any of these areas to take the initiative and run with it.

## 9. We've heard discussions about a wrapped SAL (wSAL). How will this function, and will there be a bridge for seamless onboarding from Ethereum back to native SAL? Additionally, how will this benefit Salvium in the long term?

The wrapped SAL (wSAL) is an important initiative for expanding Salvium's ecosystem and improving interoperability. Essentially, wSAL will be an ERC-20 token on Ethereum that represents native SAL at a 1:1 ratio. We want to develop a decentralized bridge to facilitate the wrapping and unwrapping process. Users will be able to lock native SAL and mint an equivalent amount of wSAL, or burn wSAL to release native SAL. 

In terms of long-term benefits, there are several key advantages. First, wSAL can be traded on Ethereum DEXes, which could potentially increase overall liquidity for SAL. It also means users can interact with SAL through familiar Ethereum wallets and interfaces, broadening our accessibility. 

Perhaps most excitingly, wSAL can be used in Ethereum's vast DeFi ecosystem, which significantly expands the use cases for SAL. This also lays the groundwork for future cross-chain applications and interoperability. Listing on Ethereum-based DEXes could increase visibility for Salvium and attract new users to our ecosystem. We're really seeing this as a way to position Salvium as a bridge between privacy-focused and mainstream blockchain ecosystems.

## 10. Monero is planning to implement FCMP++. Does Salvium have any plans to adopt this technology? If so, how could Salvium potentially benefit from its implementation in the future?

We are in discussions with Kayaba regarding the early adoption of certain aspects of the FCMP++ implementation into Salvium. In particular, the FCMP++ solution for output view keys appears to be a perfect fit for Salvium's need to allow authorized viewing of a wallet's transaction history. The most likely scenario is that FCMP++ will have a phased adoption into Salvium, and there is a good chance this will happen ahead of its' deployment within Monero.

## 11. Are there any plans to introduce mobile or hardware wallets for Salvium? We've heard about potential integration with Cake Wallet, can you provide an update on how that's progressing and whether it's likely to happen in the near future?

We've recently launched a desktop GUI wallet for Windows and Linux. It's built on a re-skinned fork of the Monero GUI wallet with additional staking functionality. Users can gain 20% of the block reward in private with a few clicks in the wallet. This has given us a Windows and Linux wallet - and we expect Mac OS version soon - and hopefully an Android version too. 

Cake Wallet would be fantastic. We have reached out to the Cake Wallet team and are very willing to put in the development work to make this happen. Nothing has been confirmed yet. On the hardware wallet front, we haven't progressed this yet, but it's definitely on the wish list. 

Our goal is to ensure that Salvium users have a range of secure, user-friendly wallet options that cater to different needs and preferences. We recognise that expanding our wallet ecosystem is crucial for wider adoption and accessibility of Salvium.

## 12. Are there any plans for Salvium to be integrated with Serai Dex in the future?

It's certainly on our wish list! Ultimately it is down to Serai to decide what coins to include in their DEX, but we do believe that a regulatory-compliant privacy coin has a place in a leading-edge privacy project like Serai.

## 13. Where do you see Salvium and its ecosystem in the next 24 months?

With a clear and straightforward plan, we aim to become the go-to private and compliant blockchain for Layer-2 decentralized applications (dApps) - this can be achieved within 24 months. This will allow us to be listed on regulated exchanges, setting us apart from most other privacy coins. 

We aim to have a user-friendly experience that allows developers to use Salvium as a base coin in Layer-2 dApps. This introduces a crucial concept: Layer 2 tokens can inherit key properties from the Salvium base layer coin. While the specific features will depend on the chosen implementation, developers will have the flexibility to incorporate compliant privacy into their dApps if desired. This effectively represents the emergence of a new class of tokens, tailored for both privacy and regulatory compliance. 

Many privacy-focused projects will struggle with the new regulations. With Salvium's base coin, teams will be able to develop tokens and Apps that offer both privacy benefits and meet the rules that allow a major CEX listing. This fills a significant gap in crypto. 

In parallel, we aim to assemble an exceptional team, a vibrant community, and strategic partners who will help us grow.
