document.addEventListener('DOMContentLoaded', function() {
    // Array of texts to display sequentially
    var texts = [
        { text: "LEADING" },      
        { text: "EXCELLENCE" },  
        { text: "REMARKABLE" }, 
        { text: "INNOVATIONS" }  
    ];

    var index = 0;
    var textElement = document.querySelector('.welcome-content h1');
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
});
