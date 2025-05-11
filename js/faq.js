
// FAQ Accordion Functionality
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', function () {
        const isOpen = item.classList.contains('open');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('open');
            faq.querySelector('.faq-answer').style.display = 'none';
            faq.querySelector('.FAQ-icon').textContent = '+';
        });

        // If not already open, open this one
        if (!isOpen) {
            item.classList.add('open');
            item.querySelector('.faq-answer').style.display = 'block';
            item.querySelector('.FAQ-icon').textContent = '−';
        }
    });
});