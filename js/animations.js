// Testimonial Slider
const testimonials = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));

    if (index < 0) {
        currentSlide = testimonials.length - 1;
    } else if (index >= testimonials.length) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }

    testimonials[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

// Auto slide testimonials
setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);
// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');

    if (window.scrollY > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'white';
        header.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});
