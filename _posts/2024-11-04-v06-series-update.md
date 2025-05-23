---
layout: post
title: "Understanding Salvium's v0.6 Series - Improved Difficulty Algorithm"
date: 2024-11-04 12:00:00 +0200
categories: Technology
image: /images/blog/difficulty-algo.webp
excerpt: "Introducing key improvements in Salvium v0.6, featuring a new difficulty adjustment algorithm for better network stability."
---

As we approach our upcoming network upgrade, we want to explain the journey of our v0.6 series and why these changes were made. Since releasing v0.6.0, community feedback and testing have led to several refinements, culminating in our latest release, v0.6.3.

Improved Difficulty Adjustments
-------------------------------

A key improvement in this upgrade is our transition to the Linearly Weighted Moving Average (LWMA) difficulty adjustment algorithm. While Salvium continues to use RandomX as its proven Proof of Work algorithm, LWMA changes how we adjust mining difficulty between blocks.

#### Why This Matters:

*   More stable block times through better difficulty adjustments
*   Improved response to hashrate fluctuations
*   Better resistance against block timing manipulation
*   More predictable and consistent block intervals

The Evolution of v0.6
---------------------

Our journey to v0.6.3 has been driven by community feedback and real-world testing:

#### v0.6.0: The Foundation

*   Introduced LWMA difficulty adjustments
*   Implemented new consensus rules (HF1)
*   Established base protocol improvements

#### v6.0.1-v6.0.2: Refinement

*   Enhanced wallet performance
*   Improved transaction handling
*   Fixed minor operational issues

#### v0.6.3: The Complete Package

*   Increased transaction input limit from 18 to 120+
*   Enhanced exchange integration capabilities
*   Resolved return\_payment function issues
*   Final optimizations for upcoming Hard Fork 2

Impact for Different Users
--------------------------

#### For Miners

While RandomX remains unchanged as our mining algorithm, the new difficulty adjustment system will provide more consistent block times and better handling of network hashrate changes. This means more predictable mining conditions for all participants.

#### For Exchanges

The increased transaction input limit (now 120+) directly addresses feedback from exchanges, allowing for more efficient handling of withdrawals and better overall integration.

#### For Regular Users

You'll experience more reliable transactions, better wallet performance, and more consistent block times. The improvements in difficulty adjustments mean more predictable transaction confirmation times.

Looking Forward
---------------

These updates fine-tune Salvium's existing strengths. The improved difficulty adjustments, enhanced transaction capabilities, and overall stability improvements position us well for the upcoming Hard Fork 2 and beyond.

#### Action Required

All users must upgrade to v0.6.3 before block height 89,800 (expected Tuesday, November 5th, GMT). This upgrade is mandatory to maintain network consensus. Download the latest version: [github.com/salvium/salvium/releases/tag/v0.6.3](https://github.com/salvium/salvium/releases/tag/v0.6.3) We're grateful for our community's patience and feedback throughout this process. These improvements reflect our commitment to building a robust, fair, and efficient privacy-focused blockchain. _The Salvium Core Team_
=======


The v0.6 series brings significant improvements to Salvium's difficulty adjustment algorithm, enhancing network stability and mining efficiency. This update represents a major step forward in our ongoing commitment to network optimization and security.

Our new difficulty algorithm introduces faster adjustment responses to hash rate changes, enhanced stability against time-warp attacks, and more precise difficulty targeting. These improvements ensure a more reliable and efficient mining experience for all participants.

The updated algorithm uses a rolling window of block times and implements weighted averaging that prioritizes recent blocks while considering historical data. We've also added guard rails to prevent extreme difficulty swings, making the network more stable and predictable.

These improvements translate into a more stable mining experience with better rewards distribution. Miners will see more consistent block times, improved profitability through predictable mining rewards, and reduced orphan rates thanks to better block time consistency.
