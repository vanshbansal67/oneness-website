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
    loadComponent('solar-calculator.html', 'SolarCalculatorLoader');
    loadComponent('footer.html', 'FooterLoader');


});

// 
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    // const contactBtn = document.getElementById('contactBtn');
    navLinks.classList.toggle('show');
    // contactBtn.classList.toggle('show');
}



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



// Solar Calculator Logic
document.getElementById('calculateBtn').addEventListener('click', function () {
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

// Number Animation for statistics
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

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