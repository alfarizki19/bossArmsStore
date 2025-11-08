// === dataController_HandguardRailSystem.mjs ===
// Handguard Rail System UI Controller (Upper Category) — two products with variants

// Import model controller functions
import { updateModel_Handguard, handleHandguardSelection } from '../../modelController/modelController_Upper/modelController_Handguard.mjs';

// Map to expected function names
let updateModel_HandguardRailSystem = updateModel_Handguard;
let handleHandguardRailSystemSelection = handleHandguardSelection;

function hrs_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function hrs_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function hrs_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function hrs_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function hrs_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function hrs_hideAllPartCardImages() {
	const ids = [
		"partCardImg_handguardRailSystem00100101",
		"partCardImg_handguardRailSystem00100102",
		"partCardImg_handguardRailSystem00100201",
		"partCardImg_handguardRailSystem00100202",
	];
	ids.forEach(function (id) { hrs_hideElement(id); });
}

// Hide all product card images for a specific product
function hrs_hideAllProductCardImages(productGroup) {
	// productGroup here is HTML format (001001 or 002001)
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_handguardRailSystem" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function hrs_showDefaultProductCardImage(productGroup) {
	// productGroup here is HTML format (001001 or 002001)
	hrs_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_handguardRailSystem" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function hrs_resetProductCardToDefault(productGroup) {
	// productGroup here is inventory format (001001 or 001002)
	const group = window.part.handguardRailSystem[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Map productGroup to HTML ID
	// HTML uses 002001 for product 001002 (inventory)
	const htmlProductGroup = productGroup === "001002" ? "002001" : productGroup;
	
	// Update product card name and price to default variant (01)
	// Note: productCardName = productTitle + " - " + variantTitle
	const defaultProductCardNameText = product.productTitle + " - " + defaultVariant.variantTitle;
	hrs_setText("productCardName_handguardRailSystem_" + htmlProductGroup, defaultProductCardNameText);
	hrs_setText("productCardPrice_handguardRailSystem_" + htmlProductGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01) - use HTML ID format
	hrs_showDefaultProductCardImage(htmlProductGroup);
	
	// Remove active class
	// Note: HTML uses productCard_handguardRailSystem_001001 (with underscore)
	hrs_removeClass("productCard_handguardRailSystem_" + htmlProductGroup, "active");
}

// Reset all variant cards for a product
function hrs_resetAllVariantCards(productGroup) {
	// productGroup here is inventory format (001001 or 001002)
	// Note: HTML uses variantCard_handguardRailSystem00100101 (no underscore for 001001)
	//       and variantCard_handguardRailSystem_00100201 (with underscore for 001002 inventory)
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		// For 001001: no underscore
		// For 001002: with underscore (inventory format)
		const variantCardId = productGroup === "001001"
			? "variantCard_handguardRailSystem" + productGroup + k
			: "variantCard_handguardRailSystem_" + productGroup + k;
		hrs_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_handguardRailSystem001001() {
	const group = window.part.handguardRailSystem["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	hrs_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	hrs_resetAllVariantCards("001001");
}

export function uiReset_handguardRailSystem001002() {
	const group = window.part.handguardRailSystem["001"];
	const product = group.products["002"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	hrs_resetProductCardToDefault("001002");
	
	// Reset all variant cards
	hrs_resetAllVariantCards("001002");
}

// Function to update all product cards to default from inventory
function hrs_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.handguardRailSystem["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		const defaultProductCardNameText = product.productTitle + " - " + defaultVariant.variantTitle;
		hrs_setText("productCardName_handguardRailSystem_001001", defaultProductCardNameText);
		hrs_setText("productCardPrice_handguardRailSystem_001001", "$" + defaultVariant.price + " USD");
		hrs_showDefaultProductCardImage("001001");
		// Remove active class (default state)
		hrs_removeClass("productCard_handguardRailSystem_001001", "active");
	}
	// 001002 - default to variant 01
	// Note: HTML uses 002001 for product 001002 (inventory)
	{
		const group = window.part.handguardRailSystem["001"];
		const product = group.products["002"];
		const defaultVariant = product.variants["01"];
		const defaultProductCardNameText = product.productTitle + " - " + defaultVariant.variantTitle;
		hrs_setText("productCardName_handguardRailSystem_002001", defaultProductCardNameText);
		hrs_setText("productCardPrice_handguardRailSystem_002001", "$" + defaultVariant.price + " USD");
		hrs_showDefaultProductCardImage("002001");
		// Remove active class (default state)
		hrs_removeClass("productCard_handguardRailSystem_002001", "active");
	}
}

export function uiData_HandguardRailSystem() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.handguardRailSystem["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				selected = product.variants[k];
				cardSuffix = "001001" + k;
				productTitle = product.productTitle;
				brand = group.brand;
				variantTitle = selected.variantTitle;
				break;
			}
		}
	}
	
	// Check 001002 variants
	if (!selected) {
		const group = window.part.handguardRailSystem["001"];
		const product = group.products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				selected = product.variants[k];
				cardSuffix = "001002" + k;
				productTitle = product.productTitle;
				brand = group.brand;
				variantTitle = selected.variantTitle;
				break;
			}
		}
	}

	if (!selected || !cardSuffix) {
		console.warn("⚠️ Handguard Rail System: No variant selected (quantity = 1)");
		return;
	}
	
const productGroup = cardSuffix.substring(0, 6); // "001001" or "001002"
	
	// Map productGroup to HTML ID
	// HTML uses 002001 for product 001002 (inventory)
	const htmlProductGroup = productGroup === "001002" ? "002001" : productGroup;

	// Update selected product card
	// Note: HTML uses productCard_handguardRailSystem_001001 (with underscore)
	hrs_addClass("productCard_handguardRailSystem_" + htmlProductGroup, "active");
	
	// Update product card name and price with selected variant
	// Note: productCardName = productTitle + " - " + variantTitle
	const variantNum = cardSuffix.substring(6, 8); // "01", "02", etc.
	const group = window.part.handguardRailSystem[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const variant = product.variants[variantNum];
	
	// Update product card name: productTitle + " - " + variantTitle
	const productCardNameText = product.productTitle + " - " + variant.variantTitle;
	hrs_setText("productCardName_handguardRailSystem_" + htmlProductGroup, productCardNameText);
	hrs_setText("productCardPrice_handguardRailSystem_" + htmlProductGroup, "$" + variant.price + " USD");
	
	// Show selected variant image, hide others
	// Note: HTML uses 002001 for product images when productGroup is 001002
	const htmlProductGroupForImg = productGroup === "001002" ? "002001" : productGroup;
	hrs_hideAllProductCardImages(htmlProductGroupForImg);
	// HTML image ID format: productCardImg_handguardRailSystem00200101 (uses HTML productGroup)
	const selectedImgId = "productCardImg_handguardRailSystem" + htmlProductGroupForImg + variantNum;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product card to default
	if (productGroup === "001001") {
		hrs_resetProductCardToDefault("001002");
	} else {
		hrs_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	hrs_hideAllPartCardImages();
	hrs_showElement("partCardImg_handguardRailSystem" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	hrs_setText("partCardName_handguardRailSystem", partCardName);
	hrs_setText("partCardPrice_handguardRailSystem", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	hrs_resetAllVariantCards("001001");
	hrs_resetAllVariantCards("001002");
	// Note: HTML uses variantCard_handguardRailSystem00100101 (no underscore for 001001)
	//       and variantCard_handguardRailSystem_00100201 (with underscore for 001002 inventory)
	const variantCardId = productGroup === "001001"
		? "variantCard_handguardRailSystem" + cardSuffix
		: "variantCard_handguardRailSystem_" + cardSuffix;
	hrs_addClass(variantCardId, "active");

	// Note: summaryItemsCard hanya di-update oleh summaryChartButton (updateSummaryCards_HandguardRailSystem)
	// Tidak perlu update di sini
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_HandguardRailSystem() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.handguardRailSystem["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			hrs_setText("summaryCardName_handguardRailSystem_" + cardSuffix, partCardName);
			hrs_setText("summaryCardPrice_handguardRailSystem_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 001002 variants
	// Note: HTML uses 002001 for product 001002 (inventory)
	{
		const group = window.part.handguardRailSystem["001"];
		const product = group.products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const inventoryCardSuffix = "001002" + k;
			const htmlCardSuffix = "002001" + k; // HTML format
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			hrs_setText("summaryCardName_handguardRailSystem_" + htmlCardSuffix, partCardName);
			hrs_setText("summaryCardPrice_handguardRailSystem_" + htmlCardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.handguardRailSystem["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				hrs_showElement("summaryItemsCard_handguardRailSystem_" + cardSuffix);
			} else {
				hrs_hideElement("summaryItemsCard_handguardRailSystem_" + cardSuffix);
			}
		}
	}
	// 001002 variants (HTML uses 002001)
	{
		const product = window.part.handguardRailSystem["001"].products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001002" + k;
			const htmlCardSuffix = "002001" + k; // HTML format
			if (product.variants[k].quantity === 1) {
				hrs_showElement("summaryItemsCard_handguardRailSystem_" + htmlCardSuffix);
			} else {
				hrs_hideElement("summaryItemsCard_handguardRailSystem_" + htmlCardSuffix);
			}
		}
	}
}

// Start default -> 001001 variant 01
// Use DOMContentLoaded to ensure element exists
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupStartButtonListener);
} else {
	// DOM already loaded
	setupStartButtonListener();
}

function setupStartButtonListener() {
	const btn = document.getElementById("loader-start-button");
	if (btn) {
		// Keep existing onclick for hideLoader, but add our handler
		// Use capture phase to run before onclick
		btn.addEventListener("click", function (e) {
// Check if data is available
			if (!window.part || !window.part.handguardRailSystem) {
				console.error("❌ Handguard Rail System data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			hrs_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_handguardRailSystem001001();
			uiReset_handguardRailSystem001002();
			
			// Set default quantity = 1 for 00100101
			window.part.handguardRailSystem["001"].products["001"].variants["01"].quantity = 1;
			
			// Set default part card to 00100101
			const defaultGroup = window.part.handguardRailSystem["001"];
			const defaultProduct = defaultGroup.products["001"];
			const defaultVariant = defaultProduct.variants["01"];
			hrs_hideAllPartCardImages();
			hrs_showElement("partCardImg_handguardRailSystem00100101");
			const defaultPartCardName = defaultGroup.brand + " - " + defaultProduct.productTitle + " - " + defaultVariant.variantTitle;
			hrs_setText("partCardName_handguardRailSystem", defaultPartCardName);
			hrs_setText("partCardPrice_handguardRailSystem", "$" + defaultVariant.price + " USD");
			
			// Update UI (will set active class and show/hide images)
			uiData_HandguardRailSystem();
			
			// Update 3D model after UI update
			updateModel_HandguardRailSystem();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
}, true); // Use capture phase
		
} else {
		console.warn("⚠️ Handguard Rail System: loader-start-button not found");
	}
}

// Variant card click listeners
// Use DOMContentLoaded to ensure elements exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupVariantCardListeners);
} else {
	// DOM already loaded
	setupVariantCardListeners();
}

function setupVariantCardListeners() {
	// 001001 variants (2 variants)
	// Note: HTML uses variantCard_handguardRailSystem00100101 (no underscore)
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_handguardRailSystem001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_handguardRailSystem001001();
				uiReset_handguardRailSystem001002();
				
				// Set quantity = 1 for selected variant
				window.part.handguardRailSystem["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_HandguardRailSystem();
				
				// Update 3D model after UI update
				const itemsID = "handguardRailSystem001001" + k;
handleHandguardRailSystemSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}

	// 001002 variants (2 variants)
	// Note: HTML uses variantCard_handguardRailSystem_00100201 (with underscore for 001002 inventory)
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_handguardRailSystem_001002" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_handguardRailSystem001001();
				uiReset_handguardRailSystem001002();
				
				// Set quantity = 1 for selected variant
				window.part.handguardRailSystem["001"].products["002"].variants[k].quantity = 1;
				
				// Update UI
				uiData_HandguardRailSystem();
				
				// Update 3D model after UI update
				// Note: itemsID uses inventory format (001002), not HTML format (002001)
				const itemsID = "handguardRailSystem001002" + k;
handleHandguardRailSystemSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}
	
}

// Summary chart button click listener
// Use DOMContentLoaded to ensure element exists
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupSummaryChartButtonListener);
} else {
	// DOM already loaded
	setupSummaryChartButtonListener();
}

function setupSummaryChartButtonListener() {
	const btn = document.getElementById("summaryChartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Update all summary cards from inventory data
			updateSummaryCards_HandguardRailSystem();
});
} else {
		console.warn("⚠️ Handguard Rail System: summaryChartButton not found");
	}
}

export function getSelectedHandguardRailSystem() {
	// Check 001001 variants
	{
		const product = window.part.handguardRailSystem["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 001002 variants
	{
		const product = window.part.handguardRailSystem["001"].products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getHandguardRailSystemTotalPrice() {
	const v = getSelectedHandguardRailSystem();
	return v ? v.price : 0;
}