// === dataController_UpperReceiver.mjs ===
// Upper Receiver UI Controller (Upper Category) — one product with variants


// Import model controller functions
import { updateModel_UpperReceiver, handleUpperReceiverSelection } from '../../modelController/modelController_Upper/modelController_UpperReceiver.mjs';


function ur_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function ur_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function ur_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function ur_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function ur_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function ur_hideAllPartCardImages() {
	const ids = [
		"partCardImg_upperReceiver00100101",
		"partCardImg_upperReceiver00100102",
	];
	ids.forEach(function (id) { ur_hideElement(id); });
}

// Hide all product card images for a specific product
function ur_hideAllProductCardImages(productGroup) {
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_upperReceiver" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function ur_showDefaultProductCardImage(productGroup) {
	ur_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_upperReceiver" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function ur_resetProductCardToDefault(productGroup) {
	const group = window.part.upperReceiver[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	// Note: HTML uses productCard_upperReceiver001001 (no underscore)
	const cardId = "productCard_upperReceiver" + productGroup;
	ur_removeClass(cardId, "active");
	
	// Show default image (variant 01)
	ur_showDefaultProductCardImage(productGroup);
}

// Reset all variant cards for a product
function ur_resetAllVariantCards(productGroup) {
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		// Note: HTML uses both formats: variantCard_upperReceiver00100101 and variantCard_upperReceiver_00100101
		const variantCardId1 = "variantCard_upperReceiver" + productGroup + k;
		const variantCardId2 = "variantCard_upperReceiver_" + productGroup + k;
		ur_removeClass(variantCardId1, "active");
		ur_removeClass(variantCardId2, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_upperReceiver001001() {
	const group = window.part.upperReceiver["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	ur_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	ur_resetAllVariantCards("001001");
}

// Function to update all product cards to default from inventory
function ur_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.upperReceiver["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		ur_showDefaultProductCardImage("001001");
	}
}

export function uiData_UpperReceiver() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.upperReceiver["001"];
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
	// Note: HTML uses productCard_upperReceiver001001 (no underscore)
	const productCardId = "productCard_upperReceiver001001";
	const productCard = document.getElementById(productCardId);
	if (productCard) {
		ur_addClass(productCardId, "active");
	} else {
		console.warn("⚠️ Upper Receiver: productCard not found:", productCardId);
	}
	
	// Show selected variant image, hide others
	ur_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_upperReceiver" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Update part card images - show selected, hide others
	ur_hideAllPartCardImages();
	ur_showElement("partCardImg_upperReceiver" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	ur_setText("partCardName_upperReceiver", partCardName);
	ur_setText("partCardPrice_upperReceiver", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	ur_resetAllVariantCards("001001");
	// Note: HTML uses both formats: variantCard_upperReceiver00100101 and variantCard_upperReceiver_00100101
	const variantCardId1 = "variantCard_upperReceiver" + cardSuffix;
	const variantCardId2 = "variantCard_upperReceiver_" + cardSuffix;
	ur_addClass(variantCardId1, "active");
	ur_addClass(variantCardId2, "active");

	// Update summary cards - show/hide based on quantity
	// Hide all summary cards first
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		ur_hideElement("summaryItemsCard_upperReceiver_001001" + k);
	}
	
	// Show selected summary card (based on quantity = 1)
	const summaryCardId = "summaryItemsCard_upperReceiver_" + cardSuffix;
	if (selected.quantity === 1) {
		ur_showElement(summaryCardId);
		ur_setText("summaryCardName_upperReceiver_" + cardSuffix, partCardName);
		ur_setText("summaryCardPrice_upperReceiver_" + cardSuffix, "$" + selected.price + " USD");
	} else {
		ur_hideElement(summaryCardId);
	}
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_UpperReceiver() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.upperReceiver["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			ur_setText("summaryCardName_upperReceiver_" + cardSuffix, partCardName);
			ur_setText("summaryCardPrice_upperReceiver_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.upperReceiver["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				ur_showElement("summaryItemsCard_upperReceiver_" + cardSuffix);
			} else {
				ur_hideElement("summaryItemsCard_upperReceiver_" + cardSuffix);
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
			if (!window.part || !window.part.upperReceiver) {
				console.error("❌ Upper Receiver data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			ur_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_upperReceiver001001();
			
			// Set default quantity = 1 for 00100101
			window.part.upperReceiver["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_UpperReceiver();
			
			// Update 3D model after UI update
			updateModel_UpperReceiver();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
		}, true); // Use capture phase
		
	} else {
		console.warn("⚠️ Upper Receiver: loader-start-button not found");
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
	// Note: HTML uses both formats: variantCard_upperReceiver00100101 and variantCard_upperReceiver_00100101
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId1 = "variantCard_upperReceiver001001" + k;
		const variantCardId2 = "variantCard_upperReceiver_001001" + k;
		const card = document.getElementById(variantCardId1) || document.getElementById(variantCardId2);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_upperReceiver001001();
				
				// Set quantity = 1 for selected variant
				window.part.upperReceiver["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_UpperReceiver();
				
				// Update 3D model after UI update
				const itemsID = "upperReceiver001001" + k;
				handleUpperReceiverSelection(itemsID);
				
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
			updateSummaryCards_UpperReceiver();
		});
	} else {
		console.warn("⚠️ Upper Receiver: summaryChartButton not found");
	}
}

export function getSelectedUpperReceiver() {
	// Check 001001 variants
	{
		const product = window.part.upperReceiver["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getUpperReceiverTotalPrice() {
	const v = getSelectedUpperReceiver();
	return v ? v.price : 0;
}
