document.addEventListener('DOMContentLoaded', function() {
    // Array of texts to display sequentially
    var texts = [    
        { text: "EXCELLENT" },  
        { text: "REMARKABLE" }, 
        { text: "INNOVATOR" }  
    ];

    var index = 0;
    var textElement = document.querySelector('.welcome-content h1');
    var animationInterval = 0; // Interval between animations (in milliseconds)
    var moveAnimationDuration = 1500; // Duration of the moving animation (in milliseconds)
   
    // Array of light colors in greener and bluer hues
   var colors = ['#00FFFF', '#7FFFD4', '#66CDAA', '#00CED1'];
    var colorIndex = 0;

    // Function to get the next color from the array
    function getNextColor() {
        var color = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        return color;
    }

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
            span.style.color = getNextColor(); // Change color to the next predefined color
            textElement.appendChild(span);
        });

        // Trigger reflow to apply initial styles
        void textElement.offsetWidth;

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

    // Start animation
    animateText();

    
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
});
