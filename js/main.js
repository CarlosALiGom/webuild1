document.addEventListener('DOMContentLoaded', () => {
    // ─── Smooth scroll for links ───
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ─── Form validation & AJAX submission ───
    const form = document.querySelector('.contact-form form');
    if (form) {
        // Create notification div if it doesn't exist
        let notificationBox = document.getElementById('form-status');
        if (!notificationBox) {
            notificationBox = document.createElement('div');
            notificationBox.id = 'form-status';
            notificationBox.className = 'form-notification';
            form.appendChild(notificationBox);
        }

        // Elements
        const submitBtn = form.querySelector('.form-submit');
        const formFields = form.querySelectorAll('.form-input, .form-textarea');
        const originalBtnContent = submitBtn.innerHTML;

        // Reset error state on input
        formFields.forEach(field => {
            field.addEventListener('input', () => {
                const parent = field.closest('.form-field');
                if (parent.classList.contains('error')) {
                    parent.classList.remove('error');
                    const errorMsg = parent.querySelector('.error-message');
                    if (errorMsg) errorMsg.remove();
                }
            });
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Clear previous notification
            notificationBox.className = 'form-notification';
            notificationBox.innerHTML = '';
            notificationBox.style.display = 'none';

            // Validate fields
            let hasErrors = false;
            
            // Name validation
            const nameField = document.getElementById('f-name');
            if (nameField && !nameField.value.trim()) {
                showFieldError(nameField, 'Name is required');
                hasErrors = true;
            }

            // Email validation
            const emailField = document.getElementById('f-email');
            if (emailField) {
                const emailVal = emailField.value.trim();
                if (!emailVal) {
                    showFieldError(emailField, 'Email is required');
                    hasErrors = true;
                } else if (!isValidEmail(emailVal)) {
                    showFieldError(emailField, 'Please enter a valid email address');
                    hasErrors = true;
                }
            }

            // Message validation
            const messageField = document.getElementById('f-message');
            if (messageField && !messageField.value.trim()) {
                showFieldError(messageField, 'Message is required');
                hasErrors = true;
            }

            if (hasErrors) {
                // Scroll to the first error field
                const firstError = form.querySelector('.form-field.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }

            // Honeypot spam check (bot-field)
            const botField = form.querySelector('input[name="bot-field"]');
            if (botField && botField.value.trim() !== '') {
                // Silent reject: pretend it worked to deceive spambots
                showLoadingState(true);
                await new Promise(resolve => setTimeout(resolve, 1000));
                showLoadingState(false);
                showSuccess('Thank you! Your message has been sent successfully. We will get back to you shortly.');
                form.reset();
                return;
            }

            // Prepare form data
            const formData = new FormData(form);
            formData.append('form-name', 'contact');
            
            // Netlify forms serialization
            const urlEncodedData = new URLSearchParams(formData).toString();

            try {
                showLoadingState(true);

                // If running locally, simulate successful submission
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:') {
                    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
                    showSuccess('Thank you! [Local Simulation Mode] Your message has been sent successfully. (Note: Netlify Forms triggers in production).');
                    form.reset();
                } else {
                    // Production submission to Netlify
                    const response = await fetch('/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: urlEncodedData
                    });

                    if (response.ok) {
                        showSuccess('Thank you! Your message has been sent successfully. We will get back to you shortly.');
                        form.reset();
                    } else {
                        throw new Error('Form submission failed');
                    }
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                showError('Something went wrong. Please try again or contact us directly at carlosgliz.work@gmail.com.');
            } finally {
                showLoadingState(false);
            }
        });

        // Helper functions
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function showFieldError(inputElement, message) {
            const parent = inputElement.closest('.form-field');
            parent.classList.add('error');
            
            // Avoid duplicates
            let errorMsg = parent.querySelector('.error-message');
            if (!errorMsg) {
                errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                parent.appendChild(errorMsg);
            }
            errorMsg.textContent = message;
        }

        function showLoadingState(isLoading) {
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
                formFields.forEach(field => field.disabled = true);
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                formFields.forEach(field => field.disabled = false);
            }
        }

        function showSuccess(message) {
            notificationBox.className = 'form-notification success';
            notificationBox.textContent = message;
            notificationBox.style.display = 'block';
        }

        function showError(message) {
            notificationBox.className = 'form-notification error';
            notificationBox.textContent = message;
            notificationBox.style.display = 'block';
        }
    }
});
