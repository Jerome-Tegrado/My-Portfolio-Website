document.addEventListener('DOMContentLoaded', function() {
    // Array of texts to display sequentially
    var texts = [
        { text: "DISCOVER" },
        { text: "AMAZING" },
        { text: "PROJECTS" }
    ];

    var index = 0;
    var textElement = document.querySelector('#moving-text');
    var animationInterval = 0; // Interval between animations (in milliseconds)
    var moveAnimationDuration = 1500; // Duration of the moving animation (in milliseconds)

    function animateText() {
        var currentText = texts[index].text;
        var letters = currentText.split(""); // Split text into individual letters
        textElement.textContent = ""; // Clear existing content

        // Create span elements for each letter
        letters.forEach(function(letter, i) {
            var span = document.createElement("span");
            span.textContent = letter;
            span.style.transition = "color 0.2s, transform 0.6s ease-in-out"; // Adjusted transitions for color and movement
            span.style.transitionDelay = (i * 0.05) + "s"; // Delay each letter's color change

        

            textElement.appendChild(span);
        });

        // Trigger reflow to apply initial styles
        void textElement.offsetWidth;

        // Apply color change to each letter sequentially
        letters.forEach(function(letter, i) {
            textElement.children[i].style.color = getRandomColor(); // Change color to a random color
        });

        // Move and fade out animation
        setTimeout(function() {
            moveOut(textElement);
        }, animationInterval);
    }

    function moveOut(element) {
        var currentPosition = -100; // Initial position off-screen
        var animationSpeed = 1; // Adjusted speed for moving animation
        var startTime = null;
        function move(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = timestamp - startTime;
            currentPosition += animationSpeed * progress / 1000; // Calculate position based on time elapsed
            element.style.transform = 'translateX(' + currentPosition + 'px)';
            element.style.opacity = 1 - Math.abs(currentPosition) / 100;

            if (currentPosition < 100) {
                requestAnimationFrame(move);
            } else {
                setTimeout(function() {
                    index = (index + 1) % texts.length;
                    animateText();
                }, 200); // Reduced pause time before starting next animation
            }
        }
        requestAnimationFrame(move);
    }

    // Function to get a random color
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    // Start animation
    animateText();

    // Function to generate a random color in hex format
    function getRandomColor() {
        var letters = '345678'; // Characters representing darker shades
        var color = '#';
    
        // Generate a color with darker shades
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * letters.length)];
        }
    
        return color;
    }
    

    // Function to update border color every second
    function updateBorderColor() {
        const categories = document.querySelectorAll('.category');
        categories.forEach(category => {
            category.style.border = `4px solid ${getRandomColor()}`;
        });
    }

    // Update border color initially
    updateBorderColor();

    // Update border color every second
    setInterval(updateBorderColor, 2000);

    // Dropdown button functionality
    document.querySelectorAll('.dropdown-btn').forEach(button => {
        button.addEventListener('click', () => {
            const dropdownContent = button.nextElementSibling;
            const closeButton = dropdownContent.querySelector('.close-btn');

            dropdownContent.style.display = 'block';

            closeButton.addEventListener('click', () => {
                dropdownContent.style.display = 'none';
            });
        });
    });

    
    
    // Function to handle the page transition animation
function animatePageTransition(link) {
    document.body.classList.add('fade-out'); // Add the fade-out class to the body

    // Wait for the fade-out transition to complete
    setTimeout(() => {
        // Navigate to the new page
        window.location.href = link;
    }, 500); // Match the duration of the CSS transition
}

// Add event listeners to all navigation links
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior

        const targetUrl = this.getAttribute('href');
        
        // Trigger the fade-out animation
        animatePageTransition(targetUrl);
        
        // Optional: You can also add a fade-in animation when the new page loads
        document.body.addEventListener('transitionend', function(event) {
            if (event.propertyName === 'opacity' && event.target === document.body) {
                document.body.classList.remove('fade-out'); // Remove fade-out class on transition end
                document.body.classList.add('fade-in'); // Add fade-in class to body for entering animation
            }
        }, { once: true }); // Remove event listener after it's triggered once
    });
});

// Function to toggle the hover effect class
function toggleHoverEffect() {
    const h2Elements = document.querySelectorAll('.category h2');

    h2Elements.forEach((h2, index) => {
        setTimeout(() => {
            // Toggle the hover-effect class
            h2.classList.toggle('hover-effect');
        }, index * 2000); // Change every 2 seconds
    });
}

// Call toggleHoverEffect initially and set interval to repeat
toggleHoverEffect();
setInterval(toggleHoverEffect, 4000); // Repeat every 4 seconds (2 seconds for each state)



    
});
