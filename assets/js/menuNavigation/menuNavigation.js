// Menu Navigation System for M4 Rifle Configurator
// Based on the working pattern from the old project

let menuOpened_ID = "menuMainMenu";

// Menu ID constants
const mainMenuID = {
    menuMainMenu: "menuMainMenu",
    menuLowerGroupMenu: "menuLowerGroupMenu", 
    menuUpperGroupMenu: "menuUpperGroupMenu",
    menuGearAndAccecoriesMenu: "menuGearAndAccecoriesMenu",
    menuBarrelProductMenu: "menuBarrelProductMenu",
    menuBoltCarrierGroupProductMenu: "menuBoltCarrierGroupProductMenu",
    menuEjectionPortCoverProductMenu: "menuEjectionPortCoverProductMenu",
    menuVariant_ejectionPortCover001001: "menuVariant_ejectionPortCover001001",
    menuChargingHandleProductMenu: "menuChargingHandleProductMenu",
    menuVariant_chargingHandle001001: "menuVariant_chargingHandle001001",
    menuVariant_chargingHandle003001: "menuVariant_chargingHandle003001",
    menuVariant_chargingHandle004001: "menuVariant_chargingHandle004001",
    menuForwardAssistsProductMenu: "menuForwardAssistsProductMenu",
    menuVariant_forwardAssists001001: "menuVariant_forwardAssists001001",
    // Lower Parts Product Menus
    menuBoltCatchProductMenu: "menuBoltCatchProductMenu",
    menuBufferAndSpringKitProductMenu: "menuBufferAndSpringKitProductMenu",
    menuBufferTubeProductMenu: "menuBufferTubeProductMenu",
    menuEndPlateProductMenu: "menuEndPlateProductMenu",
    menuVariant_endPlate001001: "menuVariant_endPlate001001",
    menuVariant_endPlate002001: "menuVariant_endPlate002001",
    menuLowerReceiverProductMenu: "menuLowerReceiverProductMenu",
    menuVariant_lowerReceiver001001: "menuVariant_lowerReceiver001001",
    menuVariant_upperReceiver001001: "menuVariant_upperReceiver001001",
    menuMagazineProductMenu: "menuMagazineProductMenu",
    menuMagazineReleaseProductMenu: "menuMagazineReleaseProductMenu",
    menuVariant_magazineRelease001001: "menuVariant_magazineRelease001001",
    menuVariant_magazineRelease002001: "menuVariant_magazineRelease002001",
    menuPistolGripProductMenu: "menuPistolGripProductMenu",
    menuVariant_pistolGrip001001: "menuVariant_pistolGrip001001",
    menuVariant_pistolGrip002001: "menuVariant_pistolGrip002001",
    menuSafetyProductMenu: "menuSafetyProductMenu",
    menuVariant_safety001001: "menuVariant_safety001001",
    menuVariant_safety002001: "menuVariant_safety002001",
    menuStockProductMenu: "menuStockProductMenu",
    menuVariant_stock001001: "menuVariant_stock001001",
    menuVariant_stock002001: "menuVariant_stock002001",
    menuTakedownPinSetProductMenu: "menuTakedownPinSetProductMenu",
    menuVariant_takedownPinSet001001: "menuVariant_takedownPinSet001001",
    menuVariant_takedownPinSet002001: "menuVariant_takedownPinSet002001",
    menuTriggerProductMenu: "menuTriggerProductMenu",
    menuVariant_trigger002001: "menuVariant_trigger002001",
    menuTriggerGuardProductMenu: "menuTriggerGuardProductMenu",
    menuVariant_triggerGuard001001: "menuVariant_triggerGuard001001",
    menuVariant_triggerGuard002001: "menuVariant_triggerGuard002001",
    menuBipodProductMenu: "menuBipodProductMenu",
    menuFrontSightProductMenu: "menuFrontSightProductMenu",
    menuLaserSightProductMenu: "menuLaserSightProductMenu",
    menuMLOKAndKeymodRailProductMenu: "menuMLOKAndKeymodRailProductMenu",
    menuOpticSightProductMenu: "menuOpticSightProductMenu",
    menuRearSightProductMenu: "menuRearSightProductMenu"
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
        menu.classList.add('hidden');
    });
}

// Function to open the selected menu
function openMenu() {
    const targetMenu = document.getElementById(menuOpened_ID);
    if (targetMenu) {
        targetMenu.style.display = "block";
        targetMenu.style.overflow = "auto";
        targetMenu.classList.remove('hidden');
    }
}

// Main navigation function
function navigateToMenu(menuId) {
    setMenuOpenedID(menuId);
    closeAllMenu();
    openMenu();
    updatePartMenuVisibility();
    updateMenuHeader(menuId);
}

// Update menu header based on current menu
function updateMenuHeader(menuId) {
    const headerTitle = document.querySelector('#menu-header h2');
    const headerSubtitle = document.querySelector('#menu-header p');
    
    if (!headerTitle || !headerSubtitle) return;
    
    switch(menuId) {
        case 'menuMainMenu':
            headerTitle.textContent = 'Configuration Panel';
            headerSubtitle.textContent = 'Customize your M4 build';
            break;
        case 'menuUpperGroupMenu':
            headerTitle.textContent = 'Upper Parts';
            headerSubtitle.textContent = 'Customize your M4 Upper Parts';
            break;
        case 'menuLowerGroupMenu':
            headerTitle.textContent = 'Lower Parts';
            headerSubtitle.textContent = 'Customize your M4 Lower Parts';
            break;
        case 'menuGearAndAccecoriesMenu':
            headerTitle.textContent = 'Tactical Gear';
            headerSubtitle.textContent = 'Customize your M4 Tactical Gear';
            break;
        case 'menuBarrelProductMenu':
            headerTitle.textContent = 'Barrel Selection';
            headerSubtitle.textContent = 'Choose your barrel configuration';
            break;
        case 'menuBoltCarrierGroupProductMenu':
            headerTitle.textContent = 'Bolt Carrier Group Selection';
            headerSubtitle.textContent = 'Choose your bolt carrier group';
            break;
        case 'menuEjectionPortCoverProductMenu':
            headerTitle.textContent = 'Ejection Port Cover Selection';
            headerSubtitle.textContent = 'Choose your ejection port cover';
            break;
        case 'menuVariant_ejectionPortCover001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuChargingHandleProductMenu':
            headerTitle.textContent = 'Charging Handle Selection';
            headerSubtitle.textContent = 'Choose your charging handle';
            break;
        case 'menuVariant_chargingHandle001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuVariant_chargingHandle003001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuVariant_chargingHandle004001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuForwardAssistsProductMenu':
            headerTitle.textContent = 'Forward Assists Selection';
            headerSubtitle.textContent = 'Choose your forward assist';
            break;
        case 'menuVariant_forwardAssists001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuHandguardRailSystemProductMenu':
            headerTitle.textContent = 'Handguard Rail System Selection';
            headerSubtitle.textContent = 'Choose your handguard rail system';
            break;
        case 'menuVariant_handguardRailSystem001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuVariant_handguardRailSystem001002':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        // Lower Parts Product Menus
        case 'menuBoltCatchProductMenu':
            headerTitle.textContent = 'Bolt Catch Selection';
            headerSubtitle.textContent = 'Choose your bolt catch';
            break;
        case 'menuBufferAndSpringKitProductMenu':
            headerTitle.textContent = 'Buffer and Spring Kit Selection';
            headerSubtitle.textContent = 'Choose your buffer and spring kit';
            break;
        case 'menuBufferTubeProductMenu':
            headerTitle.textContent = 'Buffer Tube Selection';
            headerSubtitle.textContent = 'Choose your buffer tube';
            break;
        case 'menuEndPlateProductMenu':
            headerTitle.textContent = 'End Plate Selection';
            headerSubtitle.textContent = 'Choose your end plate';
            break;
        case 'menuVariant_endPlate001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuVariant_endPlate002001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuLowerReceiverProductMenu':
            headerTitle.textContent = 'Lower Receiver Selection';
            headerSubtitle.textContent = 'Choose your lower receiver';
            break;
        case 'menuVariant_lowerReceiver001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuVariant_upperReceiver001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuMagazineProductMenu':
            headerTitle.textContent = 'Magazine Selection';
            headerSubtitle.textContent = 'Choose your magazine';
            break;
        case 'menuMagazineReleaseProductMenu':
            headerTitle.textContent = 'Magazine Release Selection';
            headerSubtitle.textContent = 'Choose your magazine release';
            break;
        case 'menuVariant_magazineRelease001001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        case 'menuVariant_magazineRelease002001':
            headerTitle.textContent = 'Color Variants';
            headerSubtitle.textContent = 'Choose your preferred finish';
            break;
        default:
            headerTitle.textContent = 'Configuration Panel';
            headerSubtitle.textContent = 'Customize your M4 build';
    }
}

// Navigate to variant menu
function navigateToVariantMenu(variantMenuId) {
    setMenuOpenedID(variantMenuId);
    closeAllMenu();
    openMenu();
    updatePartMenuVisibility();
    updateMenuHeader(variantMenuId);
}

// Navigate to model controller menu
function navigateToModelControllerMenu(modelControllerMenuId) {
    setMenuOpenedID(modelControllerMenuId);
    closeAllMenu();
    openMenu();
    updatePartMenuVisibility();
    updateMenuHeader(modelControllerMenuId);
}

// Go back to previous menu
function goBackToMenu() {
    // For now, always go back to main menu
    // You can implement history tracking if needed
    navigateToMenu('menuMainMenu');
    updatePartMenuVisibility();
}

// Navigate to upper group menu
function goBackToUpperGroupMenu() {
    navigateToMenu('menuUpperGroupMenu');
    updatePartMenuVisibility();
}

// Navigate to ejection port cover product menu
function goBackToEjectionPortCoverProductMenu() {
    navigateToMenu('menuEjectionPortCoverProductMenu');
    updatePartMenuVisibility();
}

// Navigate to charging handle product menu
function goBackToChargingHandleProductMenu() {
    navigateToMenu('menuChargingHandleProductMenu');
    updatePartMenuVisibility();
}

// Navigate to forward assists product menu
function goBackToForwardAssistsProductMenu() {
    navigateToMenu('menuForwardAssistsProductMenu');
    updatePartMenuVisibility();
}

// Navigate to handguard rail system product menu
function goBackToHandguardRailSystemProductMenu() {
    navigateToMenu('menuHandguardRailSystemProductMenu');
    updatePartMenuVisibility();
}

// Navigate to muzzle device product menu
function goBackToMuzzleDeviceProductMenu() {
    navigateToMenu('menuMuzzleDeviceProductMenu');
    updatePartMenuVisibility();
}

// Navigate to upper receiver product menu
function goBackToUpperReceiverProductMenu() {
    navigateToMenu('menuUpperReceiver');
    updatePartMenuVisibility();
}

// Navigate to lower group menu
function goBackToLowerGroupMenu() {
    navigateToMenu('menuLowerGroupMenu');
    updatePartMenuVisibility();
}

// Navigate to bolt catch product menu
function goBackToBoltCatchProductMenu() {
    navigateToMenu('menuBoltCatchProductMenu');
    updatePartMenuVisibility();
}

// Navigate to buffer and spring kit product menu
function goBackToBufferAndSpringKitProductMenu() {
    navigateToMenu('menuBufferAndSpringKitProductMenu');
    updatePartMenuVisibility();
}

// Navigate to buffer tube product menu
function goBackToBufferTubeProductMenu() {
    navigateToMenu('menuBufferTubeProductMenu');
    updatePartMenuVisibility();
}

// Navigate to end plate product menu
function goBackToEndPlateProductMenu() {
    navigateToMenu('menuEndPlateProductMenu');
    updatePartMenuVisibility();
}

// Navigate to end plate variant menu (Fortis)
function goBackToEndPlateVariantMenu001001() {
    navigateToMenu('menuVariant_endPlate001001');
    updatePartMenuVisibility();
}

// Navigate to end plate variant menu (Timber Creek)
function goBackToEndPlateVariantMenu002001() {
    navigateToMenu('menuVariant_endPlate002001');
    updatePartMenuVisibility();
}

// Navigate to lower receiver product menu
function goBackToLowerReceiverProductMenu() {
    navigateToMenu('menuLowerReceiverProductMenu');
    updatePartMenuVisibility();
}

// Navigate to lower receiver variant menu
function goBackToLowerReceiverVariantMenu001001() {
    navigateToMenu('menuVariant_lowerReceiver001001');
    updatePartMenuVisibility();
}

// Navigate to upper receiver variant menu
function goBackToUpperReceiverVariantMenu001001() {
    navigateToMenu('menuVariant_upperReceiver001001');
    updatePartMenuVisibility();
}

// Navigate to magazine product menu
function goBackToMagazineProductMenu() {
    navigateToMenu('menuMagazineProductMenu');
    updatePartMenuVisibility();
}

// Navigate to magazine release product menu
function goBackToMagazineReleaseProductMenu() {
    navigateToMenu('menuMagazineReleaseProductMenu');
    updatePartMenuVisibility();
}

// Navigate to magazine release variant menu (Seekins Precision)
function goBackToMagazineReleaseVariantMenu001001() {
    navigateToMenu('menuVariant_magazineRelease001001');
    updatePartMenuVisibility();
}

// Navigate to pistol grip product menu
function goBackToPistolGripProductMenu() {
    navigateToMenu('menuPistolGripProductMenu');
    updatePartMenuVisibility();
}

// Navigate to safety product menu
function goBackToSafetyProductMenu() {
    navigateToMenu('menuSafetyProductMenu');
    updatePartMenuVisibility();
}

// Navigate to stock product menu
function goBackToStockProductMenu() {
    navigateToMenu('menuStockProductMenu');
    updatePartMenuVisibility();
}

// Navigate to takedown pin set product menu
function goBackToTakedownPinSetProductMenu() {
    navigateToMenu('menuTakedownPinSetProductMenu');
    updatePartMenuVisibility();
}

// Navigate to trigger product menu
function goBackToTriggerProductMenu() {
    navigateToMenu('menuTriggerProductMenu');
    updatePartMenuVisibility();
}

// Navigate to trigger guard product menu
function goBackToTriggerGuardProductMenu() {
    navigateToMenu('menuTriggerGuardProductMenu');
    updatePartMenuVisibility();
}

// Navigate to gear menu
function goBackToGearMenu() {
    navigateToMenu('menuGearAndAccecoriesMenu');
    updatePartMenuVisibility();
}

// Navigate to magazine release variant menu (Timber Creek)
function goBackToMagazineReleaseVariantMenu002001() {
    navigateToMenu('menuVariant_magazineRelease002001');
    updatePartMenuVisibility();
}


// Select variant function
function selectVariant(variantId, variantName) {
    // No functionality - backend will handle this
    // Frontend only provides UI structure
}

// Handle product selection
function selectProduct(productId, productName, productBrand, productPrice) {
    // No functionality - backend will handle this
    // Frontend only provides UI structure
}

// Initialize menu navigation
function initializeMenuNavigation() {
    // Set up main menu navigation buttons
    const categoryCard_upperReceiver = document.getElementById('categoryCard_upperReceiver');
    const categoryCard_lowerReceiver = document.getElementById('categoryCard_lowerReceiver');
    const categoryCard_tacticalGear = document.getElementById('categoryCard_tacticalGear');

    if (categoryCard_upperReceiver) {
        categoryCard_upperReceiver.addEventListener('click', function() {
            navigateToMenu('menuUpperGroupMenu');
        });
    }

    if (categoryCard_lowerReceiver) {
        categoryCard_lowerReceiver.addEventListener('click', function() {
            navigateToMenu('menuLowerGroupMenu');
        });
    }

    if (categoryCard_tacticalGear) {
        categoryCard_tacticalGear.addEventListener('click', function() {
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
        'backButton_BarrelProductMenu',
        'backButton_BoltCarrierGroupProductMenu',
        'backButton_EjectionPortCoverProductMenu',
        'backButton_EjectionPortCoverVariantMenu',
        'backButton_ChargingHandleProductMenu',
        'backButton_ChargingHandleGeisseleVariantMenu',
        'backButton_ChargingHandleRadianVariantMenu',
        'backButton_ChargingHandleTimberCreekVariantMenu',
        'backButton_ForwardAssistsProductMenu',
        'backButton_ForwardAssistsVariantMenu',
        'backButton_HandguardRailSystemVariantMenu001',
        'backButton_HandguardRailSystemVariantMenu002',
        'backButton_HandguardRailSystemProductMenu',
        'backButton_ChargingHandleVariantMenu',
        'backButton_UpperReceiverVariantMenu',
        'backButton_UpperReceiverVariantMenu001001',
        'backButton_MuzzleDeviceVariantMenu002002',
        'backButton_BarrelProductMenu',
        'backButton_BoltCarrierGroupProductMenu',
        'backButton_BoltCatchProductMenu',
        'backButton_BufferAndSpringKitProductMenu',
        'backButton_BufferTubeProductMenu',
        'backButton_EndPlateProductMenu',
        'backButton_EndPlateVariantMenu001001',
        'backButton_EndPlateVariantMenu002001',
        'backButton_LowerReceiverProductMenu',
        'backButton_LowerReceiverVariantMenu001001',
        'backButton_UpperReceiverVariantMenu001001',
        'backButton_MagazineProductMenu',
        'backButton_MagazineReleaseProductMenu',
        'backButton_MagazineReleaseVariantMenu001001',
        'backButton_MagazineReleaseVariantMenu002001',
        'backButton_PistolGripProductMenu',
        'backButton_PistolGripVariantMenu001001',
        'backButton_PistolGripVariantMenu002001',
        'backButton_SafetyProductMenu',
        'backButton_SafetyVariantMenu001001',
        'backButton_SafetyVariantMenu002001',
        'backButton_StockProductMenu',
        'backButton_StockVariantMenu001001',
        'backButton_StockVariantMenu002001',
        'backButton_TakedownPinSetProductMenu',
        'backButton_TakedownPinSetVariantMenu001001',
        'backButton_TakedownPinSetVariantMenu002001',
        'backButton_TriggerProductMenu',
        'backButton_TriggerVariantMenu002001',
        'backButton_TriggerGuardProductMenu',
        'backButton_TriggerGuardVariantMenu001001',
        'backButton_TriggerGuardVariantMenu002001',
        'backButton_BipodProductMenu',
        'backButton_FrontSightProductMenu',
        'backButton_LaserSightProductMenu',
        'backButton_MLOKAndKeymodRailProductMenu',
        'backButton_OpticSightProductMenu',
        'backButton_RearSightProductMenu',
        'backButton_BipodModelControllerMenu00100101',
        'backButton_FrontSightModelControllerMenu00100101',
        'backButton_FrontSightModelControllerMenu00200101',
        'backButton_RearSightModelControllerMenu00100101',
        'backButton_RearSightModelControllerMenu00200101'
    ];

    backButtons.forEach(buttonId => {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', function() {
                // Special handling for product menu back buttons
                if (buttonId === 'backButton_BarrelProductMenu' || buttonId === 'backButton_BoltCarrierGroupProductMenu') {
                    goBackToUpperGroupMenu();
                } else if (buttonId === 'backButton_EjectionPortCoverVariantMenu') {
                    goBackToEjectionPortCoverProductMenu();
                } else if (buttonId === 'backButton_EjectionPortCoverProductMenu') {
                    goBackToUpperGroupMenu();
                } else if (buttonId === 'backButton_ChargingHandleProductMenu') {
                    goBackToUpperGroupMenu();
                } else if (buttonId === 'backButton_ChargingHandleGeisseleVariantMenu' || buttonId === 'backButton_ChargingHandleRadianVariantMenu' || buttonId === 'backButton_ChargingHandleTimberCreekVariantMenu') {
                    goBackToChargingHandleProductMenu();
                } else if (buttonId === 'backButton_ForwardAssistsVariantMenu') {
                    goBackToForwardAssistsProductMenu();
                } else if (buttonId === 'backButton_ForwardAssistsProductMenu') {
                    goBackToUpperGroupMenu();
                } else if (buttonId === 'backButton_HandguardRailSystemVariantMenu001' || buttonId === 'backButton_HandguardRailSystemVariantMenu002') {
                    goBackToHandguardRailSystemProductMenu();
                } else if (buttonId === 'backButton_HandguardRailSystemProductMenu') {
                    goBackToUpperGroupMenu();
                } else if (buttonId === 'backButton_MuzzleDeviceMenu') {
                    goBackToUpperGroupMenu();
                } else if (buttonId === 'backButton_MuzzleDeviceVariantMenu002002') {
                    goBackToMuzzleDeviceProductMenu();
                } else if (buttonId === 'backButton_UpperReceiverMenu') {
                    goBackToUpperGroupMenu();
                } else if (buttonId === 'backButton_UpperReceiverVariantMenu001001') {
                    goBackToUpperReceiverProductMenu();
                } else if (buttonId === 'backButton_BoltCatchProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_BufferAndSpringKitProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_BufferTubeProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_EndPlateProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_EndPlateVariantMenu001001') {
                    goBackToEndPlateProductMenu();
                } else if (buttonId === 'backButton_EndPlateVariantMenu002001') {
                    goBackToEndPlateProductMenu();
                } else if (buttonId === 'backButton_LowerReceiverProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_LowerReceiverVariantMenu001001') {
                    goBackToLowerReceiverProductMenu();
                } else if (buttonId === 'backButton_UpperReceiverVariantMenu001001') {
                    goBackToUpperReceiverProductMenu();
                } else if (buttonId === 'backButton_MagazineProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_MagazineReleaseProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_MagazineReleaseVariantMenu001001') {
                    goBackToMagazineReleaseProductMenu();
                } else if (buttonId === 'backButton_MagazineReleaseVariantMenu002001') {
                    goBackToMagazineReleaseProductMenu();
                } else if (buttonId === 'backButton_PistolGripProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_PistolGripVariantMenu001001') {
                    goBackToPistolGripProductMenu();
                } else if (buttonId === 'backButton_PistolGripVariantMenu002001') {
                    goBackToPistolGripProductMenu();
                } else if (buttonId === 'backButton_SafetyProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_SafetyVariantMenu001001') {
                    goBackToSafetyProductMenu();
                } else if (buttonId === 'backButton_SafetyVariantMenu002001') {
                    goBackToSafetyProductMenu();
                } else if (buttonId === 'backButton_StockProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_StockVariantMenu001001') {
                    goBackToStockProductMenu();
                } else if (buttonId === 'backButton_StockVariantMenu002001') {
                    goBackToStockProductMenu();
                } else if (buttonId === 'backButton_TakedownPinSetProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_TakedownPinSetVariantMenu001001') {
                    goBackToTakedownPinSetProductMenu();
                } else if (buttonId === 'backButton_TakedownPinSetVariantMenu002001') {
                    goBackToTakedownPinSetProductMenu();
                } else if (buttonId === 'backButton_TriggerProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_TriggerVariantMenu002001') {
                    goBackToTriggerProductMenu();
                } else if (buttonId === 'backButton_TriggerGuardProductMenu') {
                    goBackToLowerGroupMenu();
                } else if (buttonId === 'backButton_TriggerGuardVariantMenu001001') {
                    goBackToTriggerGuardProductMenu();
                } else if (buttonId === 'backButton_TriggerGuardVariantMenu002001') {
                    goBackToTriggerGuardProductMenu();
                } else if (buttonId === 'backButton_BipodProductMenu') {
                    goBackToGearMenu();
                } else if (buttonId === 'backButton_FrontSightProductMenu') {
                    goBackToGearMenu();
                } else if (buttonId === 'backButton_LaserSightProductMenu') {
                    goBackToGearMenu();
                } else if (buttonId === 'backButton_MLOKAndKeymodRailProductMenu') {
                    goBackToGearMenu();
                } else if (buttonId === 'backButton_OpticSightProductMenu') {
                    goBackToGearMenu();
                } else if (buttonId === 'backButton_RearSightProductMenu') {
                    goBackToGearMenu();
                } else if (buttonId === 'backButton_BipodModelControllerMenu00100101') {
                    navigateToMenu('menuBipodProductMenu');
                    updatePartMenuVisibility();
                } else if (buttonId === 'backButton_FrontSightModelControllerMenu00100101') {
                    navigateToMenu('menuFrontSightProductMenu');
                    updatePartMenuVisibility();
                } else if (buttonId === 'backButton_FrontSightModelControllerMenu00200101') {
                    navigateToMenu('menuFrontSightProductMenu');
                    updatePartMenuVisibility();
                } else if (buttonId === 'backButton_RearSightModelControllerMenu00100101') {
                    navigateToMenu('menuRearSightProductMenu');
                    updatePartMenuVisibility();
                } else if (buttonId === 'backButton_RearSightModelControllerMenu00200101') {
                    navigateToMenu('menuRearSightProductMenu');
                    updatePartMenuVisibility();
                } else {
                    goBackToMenu();
                }
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
window.navigateToModelControllerMenu = navigateToModelControllerMenu;
window.goBackToMenu = goBackToMenu;
window.goBackToUpperGroupMenu = goBackToUpperGroupMenu;
window.goBackToEjectionPortCoverProductMenu = goBackToEjectionPortCoverProductMenu;
window.goBackToChargingHandleProductMenu = goBackToChargingHandleProductMenu;
window.goBackToForwardAssistsProductMenu = goBackToForwardAssistsProductMenu;
window.goBackToHandguardRailSystemProductMenu = goBackToHandguardRailSystemProductMenu;
window.goBackToMuzzleDeviceProductMenu = goBackToMuzzleDeviceProductMenu;
window.goBackToUpperReceiverProductMenu = goBackToUpperReceiverProductMenu;
window.goBackToLowerGroupMenu = goBackToLowerGroupMenu;
window.goBackToBoltCatchProductMenu = goBackToBoltCatchProductMenu;
window.goBackToBufferAndSpringKitProductMenu = goBackToBufferAndSpringKitProductMenu;
window.goBackToBufferTubeProductMenu = goBackToBufferTubeProductMenu;
window.goBackToEndPlateProductMenu = goBackToEndPlateProductMenu;
window.goBackToEndPlateVariantMenu001001 = goBackToEndPlateVariantMenu001001;
window.goBackToEndPlateVariantMenu002001 = goBackToEndPlateVariantMenu002001;
window.goBackToLowerReceiverProductMenu = goBackToLowerReceiverProductMenu;
window.goBackToLowerReceiverVariantMenu001001 = goBackToLowerReceiverVariantMenu001001;
window.goBackToUpperReceiverVariantMenu001001 = goBackToUpperReceiverVariantMenu001001;
window.goBackToMagazineProductMenu = goBackToMagazineProductMenu;
window.goBackToMagazineReleaseProductMenu = goBackToMagazineReleaseProductMenu;
window.goBackToMagazineReleaseVariantMenu001001 = goBackToMagazineReleaseVariantMenu001001;
window.goBackToMagazineReleaseVariantMenu002001 = goBackToMagazineReleaseVariantMenu002001;
window.goBackToPistolGripProductMenu = goBackToPistolGripProductMenu;
window.goBackToSafetyProductMenu = goBackToSafetyProductMenu;
window.goBackToStockProductMenu = goBackToStockProductMenu;
window.goBackToTakedownPinSetProductMenu = goBackToTakedownPinSetProductMenu;
window.goBackToTriggerProductMenu = goBackToTriggerProductMenu;
window.goBackToTriggerGuardProductMenu = goBackToTriggerGuardProductMenu;
window.goBackToGearMenu = goBackToGearMenu;
window.selectProduct = selectProduct;
window.selectVariant = selectVariant;