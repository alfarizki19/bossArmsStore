// Boss Arms Store - Main JavaScript

console.log('Boss Arms Store - Main JS loaded');

// Mobile menu functionality with slide transition
function openMobileMenu() {
    const overlay = document.getElementById('mobile-menu');
    const panel = document.getElementById('mobile-menu-panel');
    if (!overlay || !panel) return;
    overlay.classList.remove('hidden');
    // Force reflow so transition applies when removing translate class
    void panel.offsetWidth;
    panel.classList.remove('-translate-x-full');
}

function closeMobileMenu() {
    const overlay = document.getElementById('mobile-menu');
    const panel = document.getElementById('mobile-menu-panel');
    if (!overlay || !panel) return;
    panel.classList.add('-translate-x-full');
    const handleTransitionEnd = (e) => {
        if (e.target !== panel) return;
        overlay.classList.add('hidden');
        panel.removeEventListener('transitionend', handleTransitionEnd);
    };
    panel.addEventListener('transitionend', handleTransitionEnd);
}

function toggleMobileMenu() {
    const overlay = document.getElementById('mobile-menu');
    if (!overlay) return;
    if (overlay.classList.contains('hidden')) {
        openMobileMenu();
    } else {
        closeMobileMenu();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Boss Arms Store initialized');
    
    // Mobile menu button event listener
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu when clicking outside
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function(e) {
            if (e.target === mobileMenu) {
                closeMobileMenu();
            }
        });
    }
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
});
