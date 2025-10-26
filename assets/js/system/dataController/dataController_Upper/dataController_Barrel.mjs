// === dataController_Barrel.mjs ===
// Barrel UI Controller for M4 Rifle Configurator

// Import model controller functions
import { updateModel_Barel, handleBarelSelection } from '../../modelController/modelController_Upper/modelController_Barel.mjs';

// Debug: Check if inventory data is loaded
console.log("Barrel dataController loaded");
console.log("window.part:", window.part);
console.log("window.part.barel:", window.part.barel);

// Check if data is properly loaded
if (window.part && window.part.barel) {
    console.log("✅ Barrel inventory data loaded successfully");
    const barrel = window.part.barel["002"].products["001"].variants["01"];
    console.log("Barrel data:", barrel);
} else {
    console.error("❌ Barrel inventory data not loaded!");
}

export function uiReset_barel002001() {
    // Reset quantity for KM Tactical 16 Barrel 223 Wylde (barel00200101)
    window.part.barel["002"].products["001"].variants["01"].quantity = 0;
    
    // Update product name & pricing (use data from inventory)
    const productNode = window.part.barel["002"].products["001"];
    const variantNode = productNode.variants["01"];
    document.getElementById("productName_barel002001").textContent = productNode.productTitle;
    document.getElementById("productPricing_barel002001").textContent = variantNode.price + " USD";

    // Reset icon button accordion
    document.getElementById("productButtonIcon_barel002001").classList.remove("active");

    // Reset header container state
    document.getElementById("productHeader_barel002001").classList.remove("active");

    // Hide part menu image
    document.getElementById("partImgID_barel00200101").style.display = "none";

    // Reset part menu texts (match HTML ids)
    document.getElementById("partName_Barel").textContent = "-----";
    document.getElementById("partPrice_Barel").textContent = "-----";
}

export function uiData_Barrel() {
    // Check if KM Tactical 16 Barrel 223 Wylde is selected
    const productNode = window.part.barel["002"].products["001"];
    const variantNode = productNode.variants["01"];
    console.log("uiData_Barrel called, barrel quantity:", variantNode.quantity);
    
    if (variantNode.quantity === 1) {
        console.log("Updating UI for selected barrel:", productNode.productTitle);
        
        // Items menu - Update pricing and states
        const pricingElement = document.getElementById("productPricing_barel002001");
        const headerElement = document.getElementById("productHeader_barel002001");
        const buttonIconElement = document.getElementById("productButtonIcon_barel002001");
        
        if (pricingElement) pricingElement.textContent = variantNode.price + " USD";
        const nameElement = document.getElementById("productName_barel002001");
        if (nameElement) nameElement.textContent = productNode.productTitle;
        if (headerElement) headerElement.classList.add("active");
        if (buttonIconElement) buttonIconElement.classList.add("active");

        // Product menu - Show image
        const productImgElement = document.getElementById("productImgID_barel00200101");
        if (productImgElement) productImgElement.style.display = "flex";

        // Upper part menu - Update display
        const partImgElement = document.getElementById("partImgID_barel00200101");
        const partNameElement = document.getElementById("partName_Barel");
        const partPriceElement = document.getElementById("partPrice_Barel");
        
        if (partImgElement) partImgElement.style.display = "flex";
        if (partNameElement) partNameElement.textContent = productNode.productTitle;
        if (partPriceElement) partPriceElement.textContent = variantNode.price + " USD";
        
        console.log("UI updated successfully");
    } else {
        console.log("Barrel not selected, quantity:", variantNode.quantity);
    }
}

// Event listener for start button - Auto-select default barrel (first part in inventory)
const startButton = document.getElementById("buttonModalStartMenu_StartButton");
if (startButton) {
    startButton.addEventListener("click", function () {
        console.log("Start button clicked - Barrel");
        uiReset_barel002001();
        // Auto-select first barrel in inventory as default (KM Tactical 16 Barrel 223 Wylde)
        window.part.barel["002"].products["001"].variants["01"].quantity = 1;
        uiData_Barrel();
        
        // Update 3D model after UI update
        updateModel_Barel();
    });
} else {
    console.error("Start button not found: buttonModalStartMenu_StartButton");
}

// Event listener for barrel selection button
const barrelButton = document.getElementById("buttonItems_barel00200101");
if (barrelButton) {
    barrelButton.addEventListener("click", function () {
        console.log("Barrel button clicked");
        uiReset_barel002001();
        // Select KM Tactical 16 Barrel 223 Wylde
        window.part.barel["002"].products["001"].variants["01"].quantity = 1;
        uiData_Barrel();
        
        // Update 3D model after UI update
        const itemsID = "barel00200101";
        console.log(`🎯 Part button clicked: ${itemsID}`);
        handleBarelSelection(itemsID);
    });
} else {
    console.error("Barrel button not found: buttonItems_barel00200101");
}


// Helper function to get currently selected barrel
export function getSelectedBarrel() {
    const barrel = window.part.barel["002"].products["001"].variants["01"];
    return barrel.quantity === 1 ? barrel : null;
}

// Helper function to get total barrel price
export function getBarrelTotalPrice() {
    const selectedBarrel = getSelectedBarrel();
    return selectedBarrel ? selectedBarrel.price : 0;
}

// Test function to manually trigger barrel selection
export function testBarrelSelection() {
    console.log("Testing barrel selection...");
    uiReset_barel002001();
    window.part.barel["002"].products["001"].variants["01"].quantity = 1;
    uiData_Barrel();
    updateModel_Barel();
    console.log("Test completed");
}

// Make test function available globally for debugging
window.testBarrelSelection = testBarrelSelection;