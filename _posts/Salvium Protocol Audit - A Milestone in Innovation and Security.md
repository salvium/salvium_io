We are excited to announce the successful completion of a comprehensive audit of the Salvium protocol by Cypher Stack, a team of experts with experience in Monero protocol research and development. This audit represents a significant milestone in Salvium's development, providing robust validation of our core innovations and setting the stage for our next phase of growth. **Download the review from here: [Salvium\_Review.pdf](https://salvium.io/wp-content/uploads/2024/07/salvium_review.pdf)**

### **Scope of the Audit**

Cypher Stack conducted an in-depth review of two key Salvium innovations:

1.  Return Functionality: Our approach to enabling compliant refunds while maintaining privacy.
2.  Expanded Transaction Types: Including burn, convert, yield, and protocol transactions that go beyond simple transfers.

The audit involved a thorough examination of the mathematical foundations, logical structure, and security implications of these features. Note that the scope of the audit by Cypher Stack did not include any consideration of legal appropriateness or status of the design, only the technical applicability and functionality.

### **Key Findings**

We are pleased to report that Cypher Stack's analysis did not identify any critical issues with the overall approach adopted by Salvium, although they did identify important findings relating to consensus rules and wallet behaviour that require careful consideration. Specifically, they found:

1.  Return Functionality: The auditors confirmed that our design "meets the informal design requirements" and successfully achieves its goals. They verified that the protocol allows for refunds while preserving transaction privacy and unlinkability to similar levels as those found in Monero.
2.  Expanded Transaction Types: Cypher Stack validated that our approach "appears to meet its goals" of enabling more complex financial operations within the privacy-preserving framework (whilst bearing in mind the aforementioned important findings).
3.  Security Model: The auditors noted that our protocol extensions maintain the strong security properties inherited from Monero, while adding new capabilities.

### **Recommendations and Optimisations**

Cypher Stack provided valuable insights for further enhancing Salvium:

1.  Efficiency Improvements: They suggested a simplified construction for additional data in convert/yield transactions, which we plan to implement in our next update.
2.  Risk Mitigation: The audit highlighted potential risks related to output key reuse across different transaction types. We will be implementing additional safeguards as recommended.
3.  Subaddress Handling: Cypher Stack proposed optimisations for subaddress management, which will improve performance in future releases.

### **Next Steps**

We are already working on incorporating Cypher Stack's recommendations:

1.  Protocol Considerations: Our development team is reviewing the suggested efficiency improvements and risk mitigations for potential inclusion in future updates.
2.  Extended Testing: We will be conducting extensive testing of the optimised protocol to ensure seamless integration of the new features.
3.  Documentation: We're enhancing our technical documentation to reflect the audited protocol design and upcoming changes.

### **Conclusion**

This audit by Cypher Stack marks a crucial step in Salvium's journey. It provides strong validation of our innovative approach to privacy-preserving, compliant blockchain technology. While there is always more work to be done in the evolving landscape of cryptocurrency, we are confident that Salvium is on the right path. We extend our sincere thanks to the Cypher Stack team for their rigorous analysis and constructive feedback. Their expertise has been invaluable in refining and strengthening the Salvium protocol. We encourage our community to review the full audit report, which we've made publicly available in the spirit of transparency. As always, we welcome your questions, feedback, and continued support as we work together to build the future of private, compliant blockchain technology.