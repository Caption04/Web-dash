window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    // Change 50 to the number of pixels you want 
    // the user to scroll before the color changes
    if (window.scrollY > 500) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});