document.addEventListener('DOMContentLoaded', () => {
    initializeVideoButtons();
    initializeImageCarousel();
});

function initializeVideoButtons() {
    // Define the video URLs
    const videos = {
        en: 'FW1ZGr94Eno',
        sp: 'UE6XL0pgFPw',
        it: '1JvujsjfQGQ'
    };

    // Get the iframe element
    const iframe = document.querySelector('.video-section__player iframe');

    // Get the buttons
    const enButton = document.querySelector('.video-section__button--en');
    const spButton = document.querySelector('.video-section__button--sp');
    const itButton = document.querySelector('.video-section__button--it');

    // Function to change the video
    const changeVideo = (lang) => {
        iframe.src = `https://www.youtube.com/embed/${videos[lang]}`;
    };

    // Add event listeners to the buttons
    enButton.addEventListener('click', () => changeVideo('en'));
    spButton.addEventListener('click', () => changeVideo('sp'));
    itButton.addEventListener('click', () => changeVideo('it'));
}

function initializeImageCarousel() {
    // Image carousel code
    const images = [
        { src: './img/working1.webp', smallText: '2016', mediumText: 'Studying PhD' },
        { src: './img/working2.webp', smallText: '2021', mediumText: 'Teaching Maths' },
        { src: './img/working4.webp', smallText: '2022', mediumText: 'Coaching Sports' },
        { src: './img/working5.webp', smallText: '2023', mediumText: 'Fellowship Dublin' },
        { src: './img/working3.webp', smallText: '2024', mediumText: 'Fellowship Padova' }
    ];

    let currentIndex = 0;
    let changeCounter = 0;
    let intervalTime = 2000;
    let transitionDuration = 500;
    let timeoutId;

    const carouselImage = document.getElementById('carousel-image');
    const smallCircle = document.querySelector('.carousel-section__circle--small');
    const mediumCircle = document.querySelector('.carousel-section__circle--medium');

    const changeImage = () => {
        carouselImage.style.transitionDuration = `${transitionDuration}ms`;
        carouselImage.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            changeCounter++;
            carouselImage.src = images[currentIndex].src;
            smallCircle.textContent = images[currentIndex].smallText;
            mediumCircle.textContent = images[currentIndex].mediumText;
            carouselImage.classList.remove('fade-out');

            intervalTime = changeCounter <= 10 ? 2000 + changeCounter * 200 : 4000;
            transitionDuration = changeCounter <= 10 ? 500 + changeCounter * 25 : 750;

            timeoutId = setTimeout(changeImage, intervalTime);
        }, transitionDuration); 
    };

    const startAnimation = () => {
        timeoutId = setTimeout(changeImage, intervalTime);
    };

    const stopAnimation = () => {
        clearTimeout(timeoutId);
    };

    // Event listeners to stop and start the animation on hover
    carouselImage.addEventListener('mouseenter', stopAnimation);
    carouselImage.addEventListener('mouseleave', startAnimation);

    // Start the first change
    startAnimation();
}
