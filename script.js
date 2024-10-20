
.
// Attach event listener to the menu icon (hoverboard)
const menuIcon = document.querySelector('.menu-icon');
menuIcon.addEventListener('click', toggleMenu);

// Event listener for scroll to hide/show the header
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop) {
        // Scroll Down
        header.style.top = "-100px"; // Hide header
    } else {
        // Scroll Up
        header.style.top = "0"; // Show header
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});

// Models (Our Inventions) Swipeable Gallery Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.model');
const totalSlides = slides.length;
const dots = document.querySelectorAll('.dot');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

// Function to show a specific slide
function showSlide(index) {
    if (index >= totalSlides) {
        currentSlideIndex = 0; // Loop back to first slide
    } else if (index < 0) {
        currentSlideIndex = totalSlides - 1; // Loop back to last slide
    } else {
        currentSlideIndex = index;
    }
    const galleryImagesWrapper = document.querySelector('.gallery-images-wrapper');
    galleryImagesWrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    updateDots();
}

// Function to update the active dot
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentSlideIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Function to move slides via arrows
function moveSlide(direction) {
    showSlide(currentSlideIndex + direction);
}

// Function to set current slide from dots
function currentSlide(index) {
    showSlide(index - 1); // Dots are 1-based
}

// Attach event listeners to arrows
prevArrow.addEventListener('click', () => moveSlide(-1));
nextArrow.addEventListener('click', () => moveSlide(1));

// Attach event listeners to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => currentSlide(index + 1));
});

// Swipe functionality for touch devices
let startX = 0;
let endX = 0;

const gallery = document.querySelector('.gallery');

gallery.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
}, false);

gallery.addEventListener('touchend', function(e) {
    endX = e.changedTouches[0].clientX;
    handleGesture();
}, false);

function handleGesture() {
    const threshold = 50; // Minimum swipe distance
    if (endX < startX - threshold) {
        // Swipe Left
        moveSlide(1);
    } else if (endX > startX + threshold) {
        // Swipe Right
        moveSlide(-1);
    }
}

// Initialize the first slide
showSlide(currentSlideIndex);
function toggleDetails(id) {
    const details = document.getElementById(id);
    if (details.style.display === "none" || details.style.display === "") {
        details.style.display = "block"; // Show details
    } else {
        details.style.display = "none"; // Hide details
    }
}

// Initialize details to be hidden on page load
document.addEventListener("DOMContentLoaded", function() {
    const detailElements = document.querySelectorAll('.details');
    detailElements.forEach(detail => {
        detail.style.display = "none"; // Hide all details initially
    });
});
// Add any JavaScript if needed for animations or other interactions
document.querySelectorAll('.social-icons a').forEach(function(icon) {
    icon.addEventListener('click', function() {
        console.log('You clicked on ' + this.getAttribute('aria-label'));
    });
});
