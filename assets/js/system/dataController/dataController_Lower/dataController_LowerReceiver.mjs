// === dataController_LowerReceiver.mjs ===
// Lower Receiver UI Controller (Lower Category) — one product with variants

console.log("📦 Loading dataController_LowerReceiver.mjs...");

// Import model controller functions
import { updateModel_LowerReceiver, handleLowerReceiverSelection } from '../../modelController/modelController_Lower/modelController_LowerReceiver.mjs';

console.log("✅ dataController_LowerReceiver.mjs loaded");

function lr_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function lr_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function lr_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function lr_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function lr_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function lr_hideAllPartCardImages() {
	const ids = [
		"partCardImg_lowerReceiver00100101",
		"partCardImg_lowerReceiver00100102",
	];
	ids.forEach(function (id) { lr_hideElement(id); });
}

// Hide all product card images for a specific product
function lr_hideAllProductCardImages(productGroup) {
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_lowerReceiver" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function lr_showDefaultProductCardImage(productGroup) {
	lr_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_lowerReceiver" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function lr_resetProductCardToDefault(productGroup) {
	const group = window.part.lowerReceiver[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	// Note: HTML uses productCard_lowerReceiver_001001 (with underscore)
	const cardId = "productCard_lowerReceiver_" + productGroup;
	lr_removeClass(cardId, "active");
	
	// Update product card name and price
	const displayName = product.productTitle;
	lr_setText("productCardName_lowerReceiver_" + productGroup, displayName);
	lr_setText("productCardPrice_lowerReceiver_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	lr_showDefaultProductCardImage(productGroup);
}

// Reset all variant cards for a product
function lr_resetAllVariantCards(productGroup) {
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_lowerReceiver" + productGroup + k;
		lr_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_lowerReceiver001001() {
	const group = window.part.lowerReceiver["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	lr_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	lr_resetAllVariantCards("001001");
}

// Function to update all product cards to default from inventory
function lr_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.lowerReceiver["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		lr_setText("productCardName_lowerReceiver_001001", product.productTitle);
		lr_setText("productCardPrice_lowerReceiver_001001", "$" + defaultVariant.price + " USD");
		lr_showDefaultProductCardImage("001001");
	}
}

export function uiData_LowerReceiver() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.lowerReceiver["001"];
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

	if (!selected || !cardSuffix) return;

	const productGroup = cardSuffix.substring(0, 6); // "001001"

	// Update selected product card
	// Note: HTML uses productCard_lowerReceiver_001001 (with underscore)
	const productCardId = "productCard_lowerReceiver_" + productGroup;
	const productCard = document.getElementById(productCardId);
	if (productCard) {
		lr_addClass(productCardId, "active");
		console.log("✅ Lower Receiver: Added active class to", productCardId);
	} else {
		console.warn("⚠️ Lower Receiver: productCard not found:", productCardId);
	}
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	lr_setText("productCardName_lowerReceiver_" + productGroup, displayName);
	lr_setText("productCardPrice_lowerReceiver_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	lr_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_lowerReceiver" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Update part card images - show selected, hide others
	lr_hideAllPartCardImages();
	lr_showElement("partCardImg_lowerReceiver" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	lr_setText("partCardName_lowerReceiver", partCardName);
	lr_setText("partCardPrice_lowerReceiver", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	lr_resetAllVariantCards("001001");
	const variantCardId = "variantCard_lowerReceiver" + cardSuffix;
	lr_addClass(variantCardId, "active");

	// Update summary cards - show/hide based on quantity
	// Hide all summary cards first
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		lr_hideElement("summaryItemsCard_lowerReceiver_001001" + k);
	}
	
	// Show selected summary card (based on quantity = 1)
	const summaryCardId = "summaryItemsCard_lowerReceiver_" + cardSuffix;
	if (selected.quantity === 1) {
		lr_showElement(summaryCardId);
		lr_setText("summaryCardName_lowerReceiver_" + cardSuffix, partCardName);
		lr_setText("summaryCardPrice_lowerReceiver_" + cardSuffix, "$" + selected.price + " USD");
	} else {
		lr_hideElement(summaryCardId);
	}
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_LowerReceiver() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.lowerReceiver["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			lr_setText("summaryCardName_lowerReceiver_" + cardSuffix, partCardName);
			lr_setText("summaryCardPrice_lowerReceiver_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.lowerReceiver["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				lr_showElement("summaryItemsCard_lowerReceiver_" + cardSuffix);
			} else {
				lr_hideElement("summaryItemsCard_lowerReceiver_" + cardSuffix);
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
			console.log("🎯 Lower Receiver: Start button clicked");
			
			// Check if data is available
			if (!window.part || !window.part.lowerReceiver) {
				console.error("❌ Lower Receiver data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			lr_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_lowerReceiver001001();
			
			// Set default quantity = 1 for 00100101
			window.part.lowerReceiver["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_LowerReceiver();
			
			// Update 3D model after UI update
			updateModel_LowerReceiver();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
			console.log("✅ Lower Receiver: Initialized with default 00100101");
		}, true); // Use capture phase
		
		console.log("✅ Lower Receiver: Start button listener attached");
	} else {
		console.warn("⚠️ Lower Receiver: loader-start-button not found");
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
		const variantCardId = "variantCard_lowerReceiver001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_lowerReceiver001001();
				
				// Set quantity = 1 for selected variant
				window.part.lowerReceiver["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_LowerReceiver();
				
				// Update 3D model after UI update
				const itemsID = "lowerReceiver001001" + k;
				console.log(`🎯 Variant card clicked: ${itemsID}`);
				handleLowerReceiverSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}
	
	console.log("✅ Lower Receiver: Variant card listeners attached");
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
			updateSummaryCards_LowerReceiver();
			console.log("✅ Lower Receiver: Summary cards updated");
		});
		console.log("✅ Lower Receiver: Summary chart button listener attached");
	} else {
		console.warn("⚠️ Lower Receiver: summaryChartButton not found");
	}
}

export function getSelectedLowerReceiver() {
	const product = window.part.lowerReceiver["001"].products["001"];
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		if (product.variants[k] && product.variants[k].quantity === 1) {
			return product.variants[k];
		}
	}
	return null;
}

export function getLowerReceiverTotalPrice() {
	const v = getSelectedLowerReceiver();
	return v ? v.price : 0;
}
