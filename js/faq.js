document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question, .faq-question-text');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            const card = this.closest('.faq-card');
            
            // Close all other cards
            document.querySelectorAll('.faq-card').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
        });
    });
});
