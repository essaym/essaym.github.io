// Tab functionality for features section
document.addEventListener('DOMContentLoaded', function() {
    // Feature tabs
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.querySelector(`[data-content="${targetTab}"]`).classList.add('active');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-item, .solution-item, .testimonial, .pricing-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for hero stats
    const counters = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = counter.innerText;
            const isPercentage = target.includes('%');
            const isTime = target.includes('s');
            const isMB = target.includes('MB');
            
            let finalValue = parseFloat(target.replace(/[^0-9.]/g, ''));
            let current = 0;
            const increment = finalValue / 30;
            
            const updateCounter = () => {
                if (current < finalValue) {
                    current += increment;
                    let displayValue = Math.min(current, finalValue);
                    
                    if (isPercentage) {
                        counter.innerText = displayValue.toFixed(1) + '%';
                    } else if (isTime) {
                        counter.innerText = '<' + Math.ceil(displayValue) + 's';
                    } else if (isMB) {
                        counter.innerText = Math.round(displayValue) + 'MB';
                    } else {
                        counter.innerText = displayValue.toFixed(1);
                    }
                    
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target; // Reset to original value
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateCounters, 500);
                heroObserver.unobserve(entry.target);
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Form handling (for future implementation)
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.innerText.toLowerCase();
            
            if (buttonText.includes('trial') || buttonText.includes('demo')) {
                e.preventDefault();
                
                // Create a simple modal or redirect to signup
                console.log('CTA clicked:', buttonText);
                
                // For now, just show an alert - replace with actual form/modal
                if (buttonText.includes('trial')) {
                    alert('Free trial signup would open here!\n\nFeatures:\n• 30-day free trial\n• No credit card required\n• Full platform access\n• Priority support');
                } else if (buttonText.includes('demo')) {
                    alert('Demo scheduling would open here!\n\nWhat you\'ll see:\n• Live platform walkthrough\n• Custom use case discussion\n• ROI calculator\n• Implementation planning');
                }
            }
        });
    });

    // Mobile menu toggle (for responsive design)
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar .container');
        const navLinks = document.querySelector('.nav-links');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                const menuBtn = document.createElement('button');
                menuBtn.className = 'mobile-menu-btn';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                menuBtn.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    color: var(--text-primary);
                    cursor: pointer;
                    display: none;
                `;
                
                navbar.appendChild(menuBtn);
                
                menuBtn.addEventListener('click', () => {
                    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
                    navLinks.style.flexDirection = 'column';
                    navLinks.style.position = 'absolute';
                    navLinks.style.top = '100%';
                    navLinks.style.left = '0';
                    navLinks.style.right = '0';
                    navLinks.style.backgroundColor = 'white';
                    navLinks.style.padding = '1rem';
                    navLinks.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                });
            }
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Testimonial rotation (optional enhancement)
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;
    
    const rotateTestimonials = () => {
        testimonials.forEach((testimonial, index) => {
            if (index === currentTestimonial) {
                testimonial.style.transform = 'scale(1.05)';
                testimonial.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
            } else {
                testimonial.style.transform = 'scale(1)';
                testimonial.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            }
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    };

    // Auto-rotate testimonials every 5 seconds
    if (testimonials.length > 1) {
        setInterval(rotateTestimonials, 5000);
    }

    // Loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Initialize Calculator
    if (document.getElementById('clients')) {
        initSavingsCalculator();
    }
});

// Savings Calculator functionality (without competitor names)
function initSavingsCalculator() {
    const clientsInput = document.getElementById('clients');
    const cost350El = document.getElementById('cost-350');
    const cost450El = document.getElementById('cost-450');
    const cost550El = document.getElementById('cost-550');
    const ourCostEl = document.getElementById('our-cost');
    const maxSavingsEl = document.getElementById('max-savings');

    function calculateSavings() {
        const clients = parseInt(clientsInput.value) || 100;
        
        // Annual costs per client
        const ourCostPerClient = 2.99 * 12; // $35.88/year
        const cost350PerClient = 3.50 * 12;  // $42/year  
        const cost450PerClient = 4.50 * 12; // $54/year
        const cost550PerClient = 5.50 * 12;  // $66/year

        // Calculate total annual costs
        const ourTotalCost = Math.round(clients * ourCostPerClient);
        const total350Cost = Math.round(clients * cost350PerClient);
        const total450Cost = Math.round(clients * cost450PerClient);
        const total550Cost = Math.round(clients * cost550PerClient);

        // Update cost displays
        ourCostEl.textContent = ourTotalCost.toLocaleString();
        cost350El.textContent = total350Cost.toLocaleString();
        cost450El.textContent = total450Cost.toLocaleString();
        cost550El.textContent = total550Cost.toLocaleString();

        // Calculate maximum savings (vs highest cost option)
        const maxSavings = total550Cost - ourTotalCost;
        maxSavingsEl.textContent = maxSavings.toLocaleString();
    }

    // Initial calculation
    calculateSavings();

    // Recalculate on input change
    clientsInput.addEventListener('input', calculateSavings);
} 