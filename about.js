document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector('.about-section');

    // Apply initial transition effect on page load
    aboutSection.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    aboutSection.style.opacity = 0;
    aboutSection.style.transform = 'translateY(20px)';

    setTimeout(() => {
        aboutSection.style.opacity = 1;
        aboutSection.style.transform = 'translateY(0)';
    }, 200);

    const form = document.getElementById('contactForm');
    const submitButton = form.querySelector('button[type="submit"]');
    const resetButton = form.querySelector('button[type="reset"]');
    const inputs = form.querySelectorAll('input, textarea, button[type="reset"]');

    // Function to validate form inputs
    function validateForm() {
        let valid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                input.style.borderColor = 'red';
                valid = false;
            } else {
                input.style.borderColor = '#83bff0'; // Reset to default border color
            }
        });
        return valid;
    }

    // Function to display success message and hide buttons after form submission
    function displaySuccessMessage() {
        const successMessage = document.createElement('p');
        successMessage.textContent = 'FORM SUBMITTED SUCCESSFULLY 🗹';
        successMessage.style.color = 'green';
        successMessage.style.fontWeight = 'bold';
        successMessage.style.marginTop = '-45px'; // Adjust margin for positioning

        // Append success message to the form
        form.appendChild(successMessage);

        // Remove submit and reset buttons
        submitButton.style.display = 'none';
        resetButton.style.display = 'none';
    }

    // Reset form inputs and styles after form reset
    form.addEventListener('reset', () => {
        inputs.forEach(input => {
            input.style.borderColor = '#83bff0'; // Reset to default border color
        });
    });

    // Event listener for form submission
    form.addEventListener('submit', event => {
        event.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            // Simulate form submission (replace with actual submission logic)
            displaySuccessMessage();
            // Uncomment below to submit the form to Formspree (or your endpoint)
            // form.submit();
        }
    });
});
