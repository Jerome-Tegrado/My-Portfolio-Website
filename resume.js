// resume.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.sidebar nav ul li');
    const sections = document.querySelectorAll('.content .section');

    // Function to show the section and reset scroll position
    function showSection(sectionId) {
        // Remove 'active' class from all sections
        sections.forEach(section => section.classList.remove('active'));

        // Add 'active' class to the clicked section
        const activeSection = document.getElementById(sectionId);
        activeSection.classList.add('active');

        // Reset scroll position of the .content container
        document.querySelector('.content').scrollTop = 0;
    }

    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);

            // Update active class for navigation links
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Initialize the first section as active
    if (navLinks.length > 0) {
        const firstSectionId = navLinks[0].getAttribute('data-section');
        showSection(firstSectionId);
    }
});
