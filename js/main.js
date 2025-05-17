

AOS.init({
    once: true // Animation runs only once
});


// Navbar Loader
function loadComponent(url, elementId) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById(elementId).innerHTML = this.responseText;
        } else if (this.readyState === 4) {
            console.error(`Error loading ${url}`);
        }
    };
    xhr.send();
}

document.addEventListener('DOMContentLoaded', function () {
    loadComponent('navbar.html', 'NavAdder');
    // loadComponent('solar-calculator.html', 'SolarCalculatorLoader');
    loadComponent('footer.html', 'FooterLoader', function () {
        setupStatsObserver();  // ✅ call after footer loaded
    });

    // FaQ ka code
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


    setUpCalculator();


});

// Navbar Loader
function loadComponent(url, elementId, callback = null) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById(elementId).innerHTML = this.responseText;
            if (callback) callback();  // ✅ run after load
        } else if (this.readyState === 4) {
            console.error(`Error loading ${url}`);
        }
    };
    xhr.send();
}


// Media JS
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    // const contactBtn = document.getElementById('contactBtn');
    navLinks.classList.toggle('show');
    // contactBtn.classList.toggle('show');
}


// Add hover effects to cards
const cards = document.querySelectorAll('.contact-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.classList.add('shadow-lg');
    });
    card.addEventListener('mouseleave', function () {
        this.classList.remove('shadow-lg');
    });
});

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



function setUpCalculator() {
    // Solar Calculator Logic
    CalCBtn = document.getElementById('calculateBtn');
    CalCBtn.addEventListener('click', function () {
        // Get input values


        const roofArea = parseFloat(document.getElementById('roofArea').value) || 0;
        const monthlyConsumption = parseFloat(document.getElementById('monthlyConsumption').value) || 0;
        const monthlyBill = parseFloat(document.getElementById('monthlyBill').value) || 0;
        const connectionType = document.getElementById('connectionType').value;

        // Simple calculation logic (would be more complex in a real implementation)
        let systemSize = 0;
        let annualGeneration = 0;
        let annualSavings = 0;
        let carbonOffset = 0;
        let paybackPeriod = 0;

        // Calculate system size based on consumption (simplified)
        if (monthlyConsumption > 0) {
            // Assume 1 kW system produces about 120 kWh per month in India
            systemSize = (monthlyConsumption / 120).toFixed(2) + ' kW';

            // Calculate annual generation
            const systemSizeVal = parseFloat(systemSize);
            annualGeneration = (systemSizeVal * 120 * 12).toFixed(0) + ' kWh';

            // Calculate annual savings
            annualSavings = '₹' + (monthlyBill * 12).toFixed(0);

            // Calculate carbon offset (average CO2 emission per kWh in India is about 0.82 kg)
            carbonOffset = ((systemSizeVal * 120 * 12 * 0.82) / 1000).toFixed(2) + ' tons of CO2';

            // Calculate payback period (assuming ₹60,000 per kW installation cost)
            paybackPeriod = ((systemSizeVal * 60000) / (monthlyBill * 12)).toFixed(1) + ' years';
        } else if (roofArea > 0) {
            // Alternatively calculate based on roof area (simplified)
            // Assume 10 sqft per 100W of solar panels
            systemSize = (roofArea / 100).toFixed(2) + ' kW';

            // Use the system size to calculate other metrics
            const systemSizeVal = parseFloat(systemSize);
            annualGeneration = (systemSizeVal * 120 * 12).toFixed(0) + ' kWh';
            annualSavings = '₹' + (systemSizeVal * 120 * 12 * (monthlyBill / monthlyConsumption || 8)).toFixed(0);
            carbonOffset = ((systemSizeVal * 120 * 12 * 0.82) / 1000).toFixed(2) + ' tons of CO2';
            paybackPeriod = ((systemSizeVal * 60000) / (systemSizeVal * 120 * 12 * (monthlyBill / monthlyConsumption || 8))).toFixed(1) + ' years';
        }

        // Update result fields
        document.getElementById('systemSize').textContent = systemSize;
        document.getElementById('annualGeneration').textContent = annualGeneration;
        document.getElementById('annualSavings').textContent = annualSavings;
        document.getElementById('carbonOffset').textContent = carbonOffset;
        document.getElementById('paybackPeriod').textContent = paybackPeriod;

        // Show results
        document.getElementById('calculatorResult').style.display = 'block';

        // Animate the result section
        document.getElementById('calculatorResult').classList.add('animate__animated', 'animate__fadeIn');
    });

    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn-submit, .btn-calculate');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            setTimeout(() => {
                this.innerHTML = this.innerHTML.replace('<i class="fas fa-spinner fa-spin"></i> Processing...', this.originalHTML);
            }, 2000);
        });

        // Store original HTML
        button.originalHTML = button.innerHTML;
    });
}


function setupStatsObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Stats section in view - starting animations");

                const experience = document.getElementById('experience');
                const customers = document.getElementById('customers');
                const installations = document.getElementById('installations');

                if (experience) countUp(experience, 0, 7, 2000, '+');
                if (customers) countUp(customers, 0, 1500, 2500, '+');
                if (installations) countUp(installations, 0, 8000, 3000, '+');

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        console.log("Stats section found - setting up observer");
        observer.observe(statsSection);
    } else {
        console.error("Stats section not found in DOM");
    }
}

function countUp(element, start, end, duration, suffix = '') {
    let startTime = null;
    const step = timestamp => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + suffix;

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}



