// === dataController_Trigger.mjs ===
// Trigger UI Controller (Lower Category) — two products with variants


// Import model controller functions
import { updateModel_Trigger, handleTriggerSelection } from '../../modelController/modelController_Lower/modelController_Trigger.mjs';


function tr_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function tr_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function tr_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function tr_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function tr_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function tr_hideAllPartCardImages() {
	if (!window.part || !window.part.trigger) return;
	
	// 001001 variants (1 variant)
	const group001 = window.part.trigger["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_trigger001001" + k;
		tr_hideElement(imgId);
	});
	
	// 002001 variants (3 variants)
	const group002 = window.part.trigger["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_trigger002001" + k;
		tr_hideElement(imgId);
	});
}

// Hide all product card images for a specific product
function tr_hideAllProductCardImages(productGroup) {
	const maxVariants = productGroup === "001001" ? 1 : 3;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_trigger" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function tr_showDefaultProductCardImage(productGroup) {
	tr_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_trigger" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function tr_resetProductCardToDefault(productGroup) {
	const group = window.part.trigger[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	tr_setText("productCardName_trigger_" + productGroup, product.productTitle);
	tr_setText("productCardPrice_trigger_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	tr_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	tr_removeClass("productCard_trigger_" + productGroup, "active");
}

// Reset all variant cards for a product
function tr_resetAllVariantCards(productGroup) {
	const maxVariants = productGroup === "001001" ? 1 : 3;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_trigger" + productGroup + k;
		tr_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_trigger001001() {
	const group = window.part.trigger["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	tr_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	tr_resetAllVariantCards("001001");
}

export function uiReset_trigger002001() {
	const group = window.part.trigger["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	tr_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	tr_resetAllVariantCards("002001");
}

// Function to update all product cards to default from inventory
function tr_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.trigger["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		tr_setText("productCardName_trigger_001001", product.productTitle);
		tr_setText("productCardPrice_trigger_001001", "$" + defaultVariant.price + " USD");
		tr_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.trigger["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		tr_setText("productCardName_trigger_002001", product.productTitle);
		tr_setText("productCardPrice_trigger_002001", "$" + defaultVariant.price + " USD");
		tr_showDefaultProductCardImage("002001");
	}
}

export function uiData_Trigger() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.trigger["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 1; i++) {
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
		const group = window.part.trigger["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
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

	if (!selected || !cardSuffix) return;

	const productGroup = cardSuffix.substring(0, 6); // "001001" or "002001"
	const variantNum = cardSuffix.substring(6, 8); // "01", "02", etc.

	// Update selected product card
	tr_addClass("productCard_trigger_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	tr_setText("productCardName_trigger_" + productGroup, displayName);
	tr_setText("productCardPrice_trigger_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	tr_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_trigger" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product card to default
	if (productGroup === "001001") {
		tr_resetProductCardToDefault("002001");
	} else {
		tr_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	tr_hideAllPartCardImages();
	tr_showElement("partCardImg_trigger" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	tr_setText("partCardName_trigger", partCardName);
	tr_setText("partCardPrice_trigger", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	tr_resetAllVariantCards("001001");
	tr_resetAllVariantCards("002001");
	tr_addClass("variantCard_trigger" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 1; i++) {
		const k = ("" + i).padStart(2, "0");
		tr_hideElement("summaryItemsCard_trigger_001001" + k);
	}
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		tr_hideElement("summaryItemsCard_trigger_002001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_trigger_" + cardSuffix;
	tr_showElement(summaryCardId);
	tr_setText("summaryCardName_trigger_" + cardSuffix, partCardName);
	tr_setText("summaryCardPrice_trigger_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_Trigger() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.trigger["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			tr_setText("summaryCardName_trigger_" + cardSuffix, partCardName);
			tr_setText("summaryCardPrice_trigger_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.trigger["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			tr_setText("summaryCardName_trigger_" + cardSuffix, partCardName);
			tr_setText("summaryCardPrice_trigger_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.trigger["001"].products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				tr_showElement("summaryItemsCard_trigger_" + cardSuffix);
			} else {
				tr_hideElement("summaryItemsCard_trigger_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.trigger["002"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				tr_showElement("summaryItemsCard_trigger_" + cardSuffix);
			} else {
				tr_hideElement("summaryItemsCard_trigger_" + cardSuffix);
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
			if (!window.part || !window.part.trigger) {
				console.error("❌ Trigger data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			tr_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_trigger001001();
			uiReset_trigger002001();
			
			// Set default quantity = 1 for 00100101
			window.part.trigger["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_Trigger();
			
			// Update 3D model after UI update
			updateModel_Trigger();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
		}, true); // Use capture phase
		
	} else {
		console.warn("⚠️ Trigger: loader-start-button not found");
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
	// 001001 -> 01 (only 1 variant, select from product card)
	const card001001 = document.getElementById("productCard_trigger_001001");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_trigger001001();
			uiReset_trigger002001();
			
			// Set quantity = 1 for selected product
			window.part.trigger["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_Trigger();
			
			// Update 3D model after UI update
			const itemsID = "trigger00100101";
			handleTriggerSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
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
	// 002001 variants (3 variants)
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_trigger002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_trigger001001();
				uiReset_trigger002001();
				
				// Set quantity = 1 for selected variant
				window.part.trigger["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_Trigger();
				
				// Update 3D model after UI update
				const itemsID = "trigger002001" + k;
				handleTriggerSelection(itemsID);
				
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
			updateSummaryCards_Trigger();
		});
	} else {
		console.warn("⚠️ Trigger: summaryChartButton not found");
	}
}

export function getSelectedTrigger() {
	// Check 001001 variants
	{
		const product = window.part.trigger["001"].products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.trigger["002"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getTriggerTotalPrice() {
	const v = getSelectedTrigger();
	return v ? v.price : 0;
}

