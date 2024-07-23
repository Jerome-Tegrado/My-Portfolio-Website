document.addEventListener('DOMContentLoaded', function () {
    // Select all categories
    const categories = document.querySelectorAll('.category');

    // Loop through each category
    categories.forEach(category => {
        // Select navigation buttons and project items within each category
        const prevButton = category.querySelector('.nav-button[id^="prevButton"]');
        const nextButton = category.querySelector('.nav-button[id^="nextButton"]');
        const projectItems = category.querySelectorAll('.project-item');
        let currentIndex = 0;
        let isTransitioning = false; // Track transition state

        // Function to show the project at the given index
        function showProject(index, direction) {
            if (isTransitioning) return; // Prevent new transitions during ongoing transition
            isTransitioning = true;

            const currentItem = projectItems[currentIndex];
            const nextItem = projectItems[index];

            if (direction === 'next') {
                currentItem.classList.add('project-item-exit-left');
                nextItem.classList.add('project-item-enter-right');
            } else if (direction === 'prev') {
                currentItem.classList.add('project-item-exit-right');
                nextItem.classList.add('project-item-enter-left');
            }

            setTimeout(() => {
                currentItem.classList.remove('active', 'project-item-exit-left', 'project-item-exit-right');
                nextItem.classList.remove('project-item-enter-right', 'project-item-enter-left');
                nextItem.classList.add('active');

                currentIndex = index;
                isTransitioning = false;
            }, 300); // Match this duration to the CSS transition duration
        }

        // Function to handle button navigation
        function navigate(direction) {
            const nextIndex = (direction === 'next') ? (currentIndex + 1) % projectItems.length : (currentIndex - 1 + projectItems.length) % projectItems.length;
            showProject(nextIndex, direction);
        }

        // Event listener for the next button
        nextButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            event.stopPropagation(); // Prevent event from bubbling up
            navigate('next');
        });

        // Event listener for the previous button
        prevButton.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default link behavior
            event.stopPropagation(); // Prevent event from bubbling up
            navigate('prev');
        });

        // Initial show of the first project item
        showProject(currentIndex);
    });
});
