document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Booking Buttons & Test Pre-selection Functionality
    const heroForm = document.getElementById('hero-form');
    const testSelect = document.getElementById('testSelect');

    function scrollToForm() {
        if (!heroForm) return;
        const header = document.querySelector('.header');
        const headerOffset = header ? header.offsetHeight + 20 : 90;
        const elementPosition = heroForm.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    function selectTestOption(testName) {
        if (!testSelect || !testName) return;

        let matched = false;
        const cleanTarget = testName.trim().toLowerCase();

        for (let i = 0; i < testSelect.options.length; i++) {
            const option = testSelect.options[i];
            if (option.text.trim().toLowerCase() === cleanTarget || option.value.trim().toLowerCase() === cleanTarget) {
                testSelect.selectedIndex = i;
                matched = true;
                break;
            }
        }

        // Partial match fallback if exact match wasn't found
        if (!matched) {
            for (let i = 0; i < testSelect.options.length; i++) {
                const option = testSelect.options[i];
                if (option.text.toLowerCase().includes(cleanTarget) || cleanTarget.includes(option.text.toLowerCase())) {
                    testSelect.selectedIndex = i;
                    matched = true;
                    break;
                }
            }
        }

        if (matched) {
            testSelect.dispatchEvent(new Event('change', { bubbles: true }));
            testSelect.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    // Event delegation for booking buttons
    document.addEventListener('click', function(e) {
        const bookingBtn = e.target.closest('[data-test], [data-package], [data-book-test], a[href="#hero-form"]');
        if (!bookingBtn) return;

        // Prevent default anchor jump if it's a link
        if (bookingBtn.tagName === 'A' && bookingBtn.getAttribute('href') === '#hero-form') {
            e.preventDefault();
        }

        const testName = bookingBtn.getAttribute('data-test') || bookingBtn.getAttribute('data-package');

        if (testName) {
            selectTestOption(testName);
        }

        scrollToForm();
    });
});

