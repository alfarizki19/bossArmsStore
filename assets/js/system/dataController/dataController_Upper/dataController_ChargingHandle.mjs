// === dataController_ChargingHandle.mjs ===
// Charging Handle UI Controller (Upper Category) — four products with variants

// Import model controller functions
import { updateModel_ChargingHandle, handleChargingHandleSelection } from '../../modelController/modelController_Upper/modelController_ChargingHandle.mjs';

function ch_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function ch_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function ch_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function ch_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function ch_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function ch_hideAllPartCardImages() {
	if (!window.part || !window.part.chargingHandle) return;
	
	// 001001 variants (2 variants)
	const group001 = window.part.chargingHandle["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_chargingHandle001001" + k;
		ch_hideElement(imgId);
	});
	
	// 002001 variants (1 variant)
	const group002 = window.part.chargingHandle["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_chargingHandle002001" + k;
		ch_hideElement(imgId);
	});
	
	// 003001 variants (3 variants)
	const group003 = window.part.chargingHandle["003"];
	const product003 = group003.products["001"];
	Object.keys(product003.variants).forEach(k => {
		const imgId = "partCardImg_chargingHandle003001" + k;
		ch_hideElement(imgId);
	});
	
	// 004001 variants (10 variants)
	const group004 = window.part.chargingHandle["004"];
	const product004 = group004.products["001"];
	Object.keys(product004.variants).forEach(k => {
		const imgId = "partCardImg_chargingHandle004001" + k;
		ch_hideElement(imgId);
	});
}

// Hide all product card images for a specific product
function ch_hideAllProductCardImages(productGroup) {
	let maxVariants;
	if (productGroup === "001001") maxVariants = 2;
	else if (productGroup === "002001") maxVariants = 1;
	else if (productGroup === "003001") maxVariants = 3;
	else if (productGroup === "004001") maxVariants = 10;
	else return;
	
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_chargingHandle" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function ch_showDefaultProductCardImage(productGroup) {
	ch_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_chargingHandle" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function ch_resetProductCardToDefault(productGroup) {
	const group = window.part.chargingHandle[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Special handling for 002001 (ID includes 01)
	const cardId = productGroup === "002001" ? "productCard_chargingHandle_00200101" : "productCard_chargingHandle_" + productGroup;
	const nameId = productGroup === "002001" ? "productCardName_chargingHandle_00200101" : "productCardName_chargingHandle_" + productGroup;
	const priceId = productGroup === "002001" ? "productCardPrice_chargingHandle_00200101" : "productCardPrice_chargingHandle_" + productGroup;
	
	// Update product card name and price to default variant
	ch_setText(nameId, product.productTitle);
	ch_setText(priceId, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	ch_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	ch_removeClass(cardId, "active");
}

// Reset all variant cards for a product
function ch_resetAllVariantCards(productGroup) {
	let maxVariants;
	if (productGroup === "001001") maxVariants = 2;
	else if (productGroup === "002001") maxVariants = 1;
	else if (productGroup === "003001") maxVariants = 3;
	else if (productGroup === "004001") maxVariants = 10;
	else return;
	
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_chargingHandle" + productGroup + k;
		ch_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_chargingHandle001001() {
	const group = window.part.chargingHandle["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	ch_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	ch_resetAllVariantCards("001001");
}

export function uiReset_chargingHandle002001() {
	const group = window.part.chargingHandle["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	ch_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	ch_resetAllVariantCards("002001");
}

export function uiReset_chargingHandle003001() {
	const group = window.part.chargingHandle["003"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	ch_resetProductCardToDefault("003001");
	
	// Reset all variant cards
	ch_resetAllVariantCards("003001");
}

export function uiReset_chargingHandle004001() {
	const group = window.part.chargingHandle["004"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	ch_resetProductCardToDefault("004001");
	
	// Reset all variant cards
	ch_resetAllVariantCards("004001");
}

// Function to update all product cards to default from inventory
function ch_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.chargingHandle["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		ch_setText("productCardName_chargingHandle_001001", product.productTitle);
		ch_setText("productCardPrice_chargingHandle_001001", "$" + defaultVariant.price + " USD");
		ch_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.chargingHandle["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		ch_setText("productCardName_chargingHandle_00200101", product.productTitle);
		ch_setText("productCardPrice_chargingHandle_00200101", "$" + defaultVariant.price + " USD");
		ch_showDefaultProductCardImage("002001");
	}
	// 003001 - default to variant 01
	{
		const group = window.part.chargingHandle["003"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		ch_setText("productCardName_chargingHandle_003001", product.productTitle);
		ch_setText("productCardPrice_chargingHandle_003001", "$" + defaultVariant.price + " USD");
		ch_showDefaultProductCardImage("003001");
	}
	// 004001 - default to variant 01
	{
		const group = window.part.chargingHandle["004"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		ch_setText("productCardName_chargingHandle_004001", product.productTitle);
		ch_setText("productCardPrice_chargingHandle_004001", "$" + defaultVariant.price + " USD");
		ch_showDefaultProductCardImage("004001");
	}
}

export function uiData_ChargingHandle() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.chargingHandle["001"];
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
	
	// Check 002001 variants
	if (!selected) {
		const group = window.part.chargingHandle["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				selected = product.variants[k];
				cardSuffix = "002001" + k;
				productTitle = product.productTitle;
				brand = group.brand;
				variantTitle = selected.variantTitle;
				break;
			}
		}
	}
	
	// Check 003001 variants
	if (!selected) {
		const group = window.part.chargingHandle["003"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				selected = product.variants[k];
				cardSuffix = "003001" + k;
				productTitle = product.productTitle;
				brand = group.brand;
				variantTitle = selected.variantTitle;
				break;
			}
		}
	}
	
	// Check 004001 variants
	if (!selected) {
		const group = window.part.chargingHandle["004"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				selected = product.variants[k];
				cardSuffix = "004001" + k;
				productTitle = product.productTitle;
				brand = group.brand;
				variantTitle = selected.variantTitle;
				break;
			}
		}
	}

	if (!selected || !cardSuffix) return;

	const productGroup = cardSuffix.substring(0, 6); // "001001", "002001", "003001", or "004001"
	const variantNum = cardSuffix.substring(6, 8); // "01", "02", etc.

	// Special handling for 002001 (ID includes 01)
	const cardId = productGroup === "002001" ? "productCard_chargingHandle_00200101" : "productCard_chargingHandle_" + productGroup;
	const nameId = productGroup === "002001" ? "productCardName_chargingHandle_00200101" : "productCardName_chargingHandle_" + productGroup;
	const priceId = productGroup === "002001" ? "productCardPrice_chargingHandle_00200101" : "productCardPrice_chargingHandle_" + productGroup;

	// Update selected product card
	ch_addClass(cardId, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	ch_setText(nameId, displayName);
	ch_setText(priceId, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	ch_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_chargingHandle" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product cards to default
	if (productGroup === "001001") {
		ch_resetProductCardToDefault("002001");
		ch_resetProductCardToDefault("003001");
		ch_resetProductCardToDefault("004001");
	} else if (productGroup === "002001") {
		ch_resetProductCardToDefault("001001");
		ch_resetProductCardToDefault("003001");
		ch_resetProductCardToDefault("004001");
	} else if (productGroup === "003001") {
		ch_resetProductCardToDefault("001001");
		ch_resetProductCardToDefault("002001");
		ch_resetProductCardToDefault("004001");
	} else {
		ch_resetProductCardToDefault("001001");
		ch_resetProductCardToDefault("002001");
		ch_resetProductCardToDefault("003001");
	}

	// Update part card images - show selected, hide others
	ch_hideAllPartCardImages();
	ch_showElement("partCardImg_chargingHandle" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	ch_setText("partCardName_chargingHandle", partCardName);
	ch_setText("partCardPrice_chargingHandle", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	ch_resetAllVariantCards("001001");
	ch_resetAllVariantCards("002001");
	ch_resetAllVariantCards("003001");
	ch_resetAllVariantCards("004001");
	ch_addClass("variantCard_chargingHandle" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		ch_hideElement("summaryItemsCard_chargingHandle_001001" + k);
	}
	for (let i = 1; i <= 1; i++) {
		const k = ("" + i).padStart(2, "0");
		ch_hideElement("summaryItemsCard_chargingHandle_002001" + k);
	}
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		ch_hideElement("summaryItemsCard_chargingHandle_003001" + k);
	}
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		ch_hideElement("summaryItemsCard_chargingHandle_004001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_chargingHandle_" + cardSuffix;
	ch_showElement(summaryCardId);
	ch_setText("summaryCardName_chargingHandle_" + cardSuffix, partCardName);
	ch_setText("summaryCardPrice_chargingHandle_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_ChargingHandle() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.chargingHandle["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			ch_setText("summaryCardName_chargingHandle_" + cardSuffix, partCardName);
			ch_setText("summaryCardPrice_chargingHandle_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.chargingHandle["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			ch_setText("summaryCardName_chargingHandle_" + cardSuffix, partCardName);
			ch_setText("summaryCardPrice_chargingHandle_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 003001 variants
	{
		const group = window.part.chargingHandle["003"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "003001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			ch_setText("summaryCardName_chargingHandle_" + cardSuffix, partCardName);
			ch_setText("summaryCardPrice_chargingHandle_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 004001 variants
	{
		const group = window.part.chargingHandle["004"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "004001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			ch_setText("summaryCardName_chargingHandle_" + cardSuffix, partCardName);
			ch_setText("summaryCardPrice_chargingHandle_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.chargingHandle["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				ch_showElement("summaryItemsCard_chargingHandle_" + cardSuffix);
			} else {
				ch_hideElement("summaryItemsCard_chargingHandle_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.chargingHandle["002"].products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				ch_showElement("summaryItemsCard_chargingHandle_" + cardSuffix);
			} else {
				ch_hideElement("summaryItemsCard_chargingHandle_" + cardSuffix);
			}
		}
	}
	// 003001 variants
	{
		const product = window.part.chargingHandle["003"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "003001" + k;
			if (product.variants[k].quantity === 1) {
				ch_showElement("summaryItemsCard_chargingHandle_" + cardSuffix);
			} else {
				ch_hideElement("summaryItemsCard_chargingHandle_" + cardSuffix);
			}
		}
	}
	// 004001 variants
	{
		const product = window.part.chargingHandle["004"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "004001" + k;
			if (product.variants[k].quantity === 1) {
				ch_showElement("summaryItemsCard_chargingHandle_" + cardSuffix);
			} else {
				ch_hideElement("summaryItemsCard_chargingHandle_" + cardSuffix);
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
// Validate viewer is ready before configuration
			if (!window.sketchfabViewerReady) {
				console.warn("❌ Charging Handle: Cannot configure - Sketchfab viewer is not ready yet");
				return;
			}
			
			// Check if data is available
			if (!window.part || !window.part.chargingHandle) {
				console.error("❌ Charging Handle data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			ch_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_chargingHandle001001();
			uiReset_chargingHandle002001();
			uiReset_chargingHandle003001();
			uiReset_chargingHandle004001();
			
			// Set default quantity = 1 for 00100101
			window.part.chargingHandle["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_ChargingHandle();
			
			// Update 3D model after UI update
			updateModel_ChargingHandle();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
}, true); // Use capture phase
		
} else {
		console.warn("⚠️ Charging Handle: loader-start-button not found");
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
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_chargingHandle001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_chargingHandle001001();
				uiReset_chargingHandle002001();
				uiReset_chargingHandle003001();
				uiReset_chargingHandle004001();
				
				// Set quantity = 1 for selected variant
				window.part.chargingHandle["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_ChargingHandle();
				
				// Update 3D model after UI update
				const itemsID = "chargingHandle001001" + k;
handleChargingHandleSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}

	// 003001 variants (3 variants)
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_chargingHandle003001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_chargingHandle001001();
				uiReset_chargingHandle002001();
				uiReset_chargingHandle003001();
				uiReset_chargingHandle004001();
				
				// Set quantity = 1 for selected variant
				window.part.chargingHandle["003"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_ChargingHandle();
				
				// Update 3D model after UI update
				const itemsID = "chargingHandle003001" + k;
handleChargingHandleSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}
	
	// 004001 variants (10 variants)
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_chargingHandle004001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_chargingHandle001001();
				uiReset_chargingHandle002001();
				uiReset_chargingHandle003001();
				uiReset_chargingHandle004001();
				
				// Set quantity = 1 for selected variant
				window.part.chargingHandle["004"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_ChargingHandle();
				
				// Update 3D model after UI update
				const itemsID = "chargingHandle004001" + k;
handleChargingHandleSelection(itemsID);
				
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

// Product card click listeners (for products with only 1 variant)
// Use DOMContentLoaded to ensure elements exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupProductCardListeners);
} else {
	// DOM already loaded
	setupProductCardListeners();
}

function setupProductCardListeners() {
	// 002001 -> 01 (only 1 variant, select from product card)
	// Note: HTML uses productCard_chargingHandle_00200101 (with 01)
	const card002001 = document.getElementById("productCard_chargingHandle_00200101");
	if (card002001) {
		// Use capture phase to run before onclick
		card002001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_chargingHandle001001();
			uiReset_chargingHandle002001();
			uiReset_chargingHandle003001();
			uiReset_chargingHandle004001();
			
			// Set quantity = 1 for selected product
			window.part.chargingHandle["002"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_ChargingHandle();
			
			// Update 3D model after UI update
			const itemsID = "chargingHandle00200101";
handleChargingHandleSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Charging Handle: productCard_chargingHandle_00200101 not found");
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
			updateSummaryCards_ChargingHandle();
});
} else {
		console.warn("⚠️ Charging Handle: summaryChartButton not found");
	}
}

export function getSelectedChargingHandle() {
	// Check 001001 variants
	{
		const product = window.part.chargingHandle["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.chargingHandle["002"].products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 003001 variants
	{
		const product = window.part.chargingHandle["003"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 004001 variants
	{
		const product = window.part.chargingHandle["004"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getChargingHandleTotalPrice() {
	const v = getSelectedChargingHandle();
	return v ? v.price : 0;
}