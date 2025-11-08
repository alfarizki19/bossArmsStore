// === dataController_EjectionPortCover.mjs ===
// Ejection Port Cover UI Controller (Upper Category) — one product with many variants

// Import model controller functions
import { updateModel_EjectionPortCover, handleEjectionPortCoverSelection } from '../../modelController/modelController_Upper/modelController_EjectionPortCover.mjs';

function epc_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function epc_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function epc_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function epc_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function epc_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function epc_hideAllPartCardImages() {
	const ids = [];
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		ids.push("partCardImg_ejectionPortCover001001" + k);
	}
	ids.forEach(function (id) { epc_hideElement(id); });
}

// Hide all product card images for a specific product
function epc_hideAllProductCardImages(productGroup) {
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_ejectionPortCover" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function epc_showDefaultProductCardImage(productGroup) {
	epc_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_ejectionPortCover" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function epc_resetProductCardToDefault(productGroup) {
	const group = window.part.ejectionPortCover[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	epc_setText("productCardName_ejectionPortCover_" + productGroup, product.productTitle);
	epc_setText("productCardPrice_ejectionPortCover_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	epc_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	epc_removeClass("productCard_ejectionPortCover_" + productGroup, "active");
}

// Reset all variant cards for a product
function epc_resetAllVariantCards(productGroup) {
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_ejectionPortCover" + productGroup + k;
		epc_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_ejectionPortCover001001() {
	const group = window.part.ejectionPortCover["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	epc_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	epc_resetAllVariantCards("001001");
}

// Function to update all product cards to default from inventory
function epc_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.ejectionPortCover["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		epc_setText("productCardName_ejectionPortCover_001001", product.productTitle);
		epc_setText("productCardPrice_ejectionPortCover_001001", "$" + defaultVariant.price + " USD");
		epc_showDefaultProductCardImage("001001");
	}
}

export function uiData_EjectionPortCover() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.ejectionPortCover["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
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
	epc_addClass("productCard_ejectionPortCover_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	epc_setText("productCardName_ejectionPortCover_" + productGroup, displayName);
	epc_setText("productCardPrice_ejectionPortCover_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	epc_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_ejectionPortCover" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Update part card images - show selected, hide others
	epc_hideAllPartCardImages();
	epc_showElement("partCardImg_ejectionPortCover" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	epc_setText("partCardName_ejectionPortCover", partCardName);
	epc_setText("partCardPrice_ejectionPortCover", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	epc_resetAllVariantCards("001001");
	epc_addClass("variantCard_ejectionPortCover" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		epc_hideElement("summaryItemsCard_ejectionPortCover_001001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_ejectionPortCover_" + cardSuffix;
	epc_showElement(summaryCardId);
	epc_setText("summaryCardName_ejectionPortCover_" + cardSuffix, partCardName);
	epc_setText("summaryCardPrice_ejectionPortCover_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_EjectionPortCover() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.ejectionPortCover["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			epc_setText("summaryCardName_ejectionPortCover_" + cardSuffix, partCardName);
			epc_setText("summaryCardPrice_ejectionPortCover_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.ejectionPortCover["001"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				epc_showElement("summaryItemsCard_ejectionPortCover_" + cardSuffix);
			} else {
				epc_hideElement("summaryItemsCard_ejectionPortCover_" + cardSuffix);
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
				console.warn("❌ Ejection Port Cover: Cannot configure - Sketchfab viewer is not ready yet");
				return;
			}
			
			// Check if data is available
			if (!window.part || !window.part.ejectionPortCover) {
				console.error("❌ Ejection Port Cover data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			epc_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_ejectionPortCover001001();
			
			// Set default quantity = 1 for 00100101
			window.part.ejectionPortCover["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_EjectionPortCover();
			
			// Update 3D model after UI update
			updateModel_EjectionPortCover();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
}, true); // Use capture phase
		
} else {
		console.warn("⚠️ Ejection Port Cover: loader-start-button not found");
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
	// 001001 variants (10 variants)
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_ejectionPortCover001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_ejectionPortCover001001();
				
				// Set quantity = 1 for selected variant
				window.part.ejectionPortCover["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_EjectionPortCover();
				
				// Update 3D model after UI update
				const itemsID = "ejectionPortCover001001" + k;
handleEjectionPortCoverSelection(itemsID);
				
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
			updateSummaryCards_EjectionPortCover();
});
} else {
		console.warn("⚠️ Ejection Port Cover: summaryChartButton not found");
	}
}

export function getSelectedEjectionPortCover() {
	// Check 001001 variants
	{
		const product = window.part.ejectionPortCover["001"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getEjectionPortCoverTotalPrice() {
	const v = getSelectedEjectionPortCover();
	return v ? v.price : 0;
}