// Menu Navigation System for M4 Rifle Configurator
// Based on the working pattern from the old project

let menuOpened_ID = "menuMainMenu";

// Menu ID constants
const mainMenuID = {
    menuMainMenu: "menuMainMenu",
    menuLowerGroupMenu: "menuLowerGroupMenu", 
    menuUpperGroupMenu: "menuUpperGroupMenu",
    menuGearAndAccecoriesMenu: "menuGearAndAccecoriesMenu"
};

// Function to set menu opened ID
function setMenuOpenedID(newMenuID) {
    menuOpened_ID = newMenuID;
}

// Function to close all menus
function closeAllMenu() {
    // Hide all menu containers
    const allMenus = document.querySelectorAll('.main-menu-container, .menu-group-container');
    allMenus.forEach(menu => {
        menu.style.display = "none";
    });
}

// Function to open the selected menu
function openMenu() {
    const targetMenu = document.getElementById(menuOpened_ID);
    if (targetMenu) {
        targetMenu.style.display = "block";
        targetMenu.style.overflow = "auto";
    }
}

// Main navigation function
function navigateToMenu(menuId) {
    setMenuOpenedID(menuId);
    closeAllMenu();
    openMenu();
    updatePartMenuVisibility();
}

// Navigate to variant menu
function navigateToVariantMenu(variantMenuId) {
    setMenuOpenedID(variantMenuId);
    closeAllMenu();
    openMenu();
    updatePartMenuVisibility();
}

// Go back to previous menu
function goBackToMenu() {
    // For now, always go back to main menu
    // You can implement history tracking if needed
    navigateToMenu('menuMainMenu');
    updatePartMenuVisibility();
}

// Initialize menu navigation
function initializeMenuNavigation() {
    // Set up main menu navigation buttons
    const buttonKeMenuUpperGroup = document.getElementById('buttonKeMenuUpperGroup');
    const buttonKeMenuLowerGroup = document.getElementById('buttonKeMenuLowerGroup');
    const buttonKeMenuGearAndAccecories = document.getElementById('buttonKeMenuGearAndAccecories');

    if (buttonKeMenuUpperGroup) {
        buttonKeMenuUpperGroup.addEventListener('click', function() {
            navigateToMenu('menuUpperGroupMenu');
        });
    }

    if (buttonKeMenuLowerGroup) {
        buttonKeMenuLowerGroup.addEventListener('click', function() {
            navigateToMenu('menuLowerGroupMenu');
        });
    }

    if (buttonKeMenuGearAndAccecories) {
        buttonKeMenuGearAndAccecories.addEventListener('click', function() {
            navigateToMenu('menuGearAndAccecoriesMenu');
        });
    }

    // Set up back buttons
    const backButtons = [
        'backButton_LowerGroupMenu',
        'backButton_UpperGroupMenu', 
        'backButton_GearMenu',
        'backButton_BarrelMenu',
        'backButton_BoltCarrierGroupMenu',
        'backButton_ChargingHandleMenu',
        'backButton_EjectionPortCoverMenu',
        'backButton_ForwardAssistsMenu',
        'backButton_HandguardRailSystemMenu',
        'backButton_MuzzleDeviceMenu',
        'backButton_UpperReceiverMenu',
        'backButton_EjectionPortCoverVariantMenu',
        'backButton_ForwardAssistsVariantMenu',
        'backButton_HandguardRailSystemVariantMenu',
        'backButton_MuzzleDeviceVariantMenu',
        'backButton_ChargingHandleVariantMenu',
        'backButton_UpperReceiverVariantMenu'
    ];

    backButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                goBackToMenu();
            });
        }
    });

    // Mobile menu toggle setup
    setupMobileMenuToggle();

    // Initialize menu visibility
    closeAllMenu();
    navigateToMenu('menuMainMenu');
    
    // Initialize viewer and part menu visibility
    updatePartMenuVisibility();

    // Handle window resize for mobile/desktop transition
    window.addEventListener('resize', function() {
        updatePartMenuVisibility();
    });
}

// Setup mobile menu toggle
function setupMobileMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const sideMenuOverlay = document.getElementById('side-menu-overlay');
    const sideMenu = document.getElementById('side-menu');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const menuArrow = document.getElementById('menu-arrow');
    const partMenu = document.getElementById('part-menu');

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (sideMenuOverlay) {
                sideMenuOverlay.classList.remove('hidden');
            }
            if (sideMenu) {
                sideMenu.classList.remove('translate-x-full');
            }
        });
    }

    // Close mobile menu
    if (menuClose) {
        menuClose.addEventListener('click', function() {
            closeMobileMenu();
        });
    }

    if (sideMenuOverlay) {
        sideMenuOverlay.addEventListener('click', function(e) {
            if (e.target === sideMenuOverlay) {
                closeMobileMenu();
            }
        });
    }

    // Menu toggle button for mobile
    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', function() {
            if (partMenu) {
                if (partMenu.classList.contains('hidden')) {
                    partMenu.classList.remove('hidden');
                    if (menuArrow) {
                        menuArrow.classList.remove('fa-chevron-up');
                        menuArrow.classList.add('fa-chevron-down');
                    }
                } else {
                    partMenu.classList.add('hidden');
                    if (menuArrow) {
                        menuArrow.classList.remove('fa-chevron-down');
                        menuArrow.classList.add('fa-chevron-up');
                    }
                }
                
                // Update viewer visibility after toggle
                updatePartMenuVisibility();
            }
        });
    }
}

// Close mobile menu
function closeMobileMenu() {
    const sideMenuOverlay = document.getElementById('side-menu-overlay');
    const sideMenu = document.getElementById('side-menu');
    
    if (sideMenu) {
        sideMenu.classList.add('translate-x-full');
    }
    if (sideMenuOverlay) {
        setTimeout(() => {
            sideMenuOverlay.classList.add('hidden');
        }, 300);
    }
}

// Update part menu visibility based on screen size
function updatePartMenuVisibility() {
    const partMenu = document.getElementById('part-menu');
    const menuArrow = document.getElementById('menu-arrow');
    const panelFeatures = document.getElementById('panel-features');
    
    if (!partMenu || !menuArrow) return;
    
    // Check if we're on desktop (lg breakpoint = 1024px)
    if (window.innerWidth >= 1024) {
        // On desktop, always show part menu and panel features
        partMenu.classList.remove('hidden');
        menuArrow.classList.remove('fa-chevron-up');
        menuArrow.classList.add('fa-chevron-down');
        
        // Show panel features on desktop
        if (panelFeatures) {
            panelFeatures.classList.remove('hidden');
        }
    } else {
        // On mobile, handle part menu and panel features visibility
        const isPartMenuVisible = !partMenu.classList.contains('hidden');
        
        if (isPartMenuVisible) {
            // Part menu is open on mobile - hide panel features
            if (panelFeatures) {
                panelFeatures.classList.add('hidden');
            }
        } else {
            // Part menu is closed on mobile - show panel features
            if (panelFeatures) {
                panelFeatures.classList.remove('hidden');
            }
        }
        
        // Update arrow icon based on part menu state
        if (isPartMenuVisible) {
            menuArrow.classList.remove('fa-chevron-up');
            menuArrow.classList.add('fa-chevron-down');
        } else {
            menuArrow.classList.remove('fa-chevron-down');
            menuArrow.classList.add('fa-chevron-up');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are rendered
    setTimeout(() => {
        initializeMenuNavigation();
    }, 100);
});

// Export functions for global access
window.navigateToMenu = navigateToMenu;
window.navigateToVariantMenu = navigateToVariantMenu;
window.goBackToMenu = goBackToMenu;