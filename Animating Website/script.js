document.addEventListener('DOMContentLoaded', () => {
    // We add the class to the header after a tiny delay 
    // to ensure the browser has rendered the initial state
    setTimeout(() => {
        const header = document.querySelector('.header-container');
        header.classList.add('is-visible');
    }, 100);
});
