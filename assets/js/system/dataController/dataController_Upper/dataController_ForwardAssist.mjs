// === dataController_ForwardAssist.mjs ===
// Forward Assist UI Controller (Upper Category) — one product with variants

// Import model controller functions
import { updateModel_ForwardAssists, handleForwardAssistsSelection } from '../../modelController/modelController_Upper/modelController_ForwardAssists.mjs';

function fa_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function fa_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function fa_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function fa_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function fa_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function fa_hideAllPartCardImages() {
	const ids = [
		"partCardImg_forwardAssists00100101",
		"partCardImg_forwardAssists00100102",
	];
	ids.forEach(function (id) { fa_hideElement(id); });
}

// Hide all product card images for a specific product
function fa_hideAllProductCardImages(productGroup) {
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_forwardAssists" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function fa_showDefaultProductCardImage(productGroup) {
	fa_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_forwardAssists" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function fa_resetProductCardToDefault(productGroup) {
	const group = window.part.forwardAssist[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	fa_setText("productCardName_forwardAssists_" + productGroup, product.productTitle);
	fa_setText("productCardPrice_forwardAssists_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	fa_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	fa_removeClass("productCard_forwardAssists_" + productGroup, "active");
}

// Reset all variant cards for a product
function fa_resetAllVariantCards(productGroup) {
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		// Note: HTML uses variantCard_forwardAssists00100101 (no underscore before productGroup)
		const variantCardId = "variantCard_forwardAssists" + productGroup + k;
		fa_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_forwardAssist001001() {
	const group = window.part.forwardAssist["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	fa_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	fa_resetAllVariantCards("001001");
}

// Function to update all product cards to default from inventory
function fa_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.forwardAssist["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		fa_setText("productCardName_forwardAssists_001001", product.productTitle);
		fa_setText("productCardPrice_forwardAssists_001001", "$" + defaultVariant.price + " USD");
		fa_showDefaultProductCardImage("001001");
	}
}

export function uiData_ForwardAssist() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.forwardAssist["001"];
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
	// Note: HTML uses productCard_forwardAssists_001001 (with underscore)
	const productCardId = "productCard_forwardAssists_" + productGroup;
	const productCard = document.getElementById(productCardId);
	if (productCard) {
		fa_addClass(productCardId, "active");
} else {
		console.warn("⚠️ Forward Assist: productCard not found:", productCardId);
	}
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	fa_setText("productCardName_forwardAssists_" + productGroup, displayName);
	fa_setText("productCardPrice_forwardAssists_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	fa_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_forwardAssists" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Update part card images - show selected, hide others
	fa_hideAllPartCardImages();
	fa_showElement("partCardImg_forwardAssists" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	fa_setText("partCardName_forwardAssists", partCardName);
	fa_setText("partCardPrice_forwardAssists", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	fa_resetAllVariantCards("001001");
	// Note: HTML uses variantCard_forwardAssists00100101 (no underscore before productGroup)
	fa_addClass("variantCard_forwardAssists" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		fa_hideElement("summaryItemsCard_forwardAssists_001001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_forwardAssists_" + cardSuffix;
	fa_showElement(summaryCardId);
	fa_setText("summaryCardName_forwardAssists_" + cardSuffix, partCardName);
	fa_setText("summaryCardPrice_forwardAssists_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_ForwardAssist() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.forwardAssist["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			fa_setText("summaryCardName_forwardAssists_" + cardSuffix, partCardName);
			fa_setText("summaryCardPrice_forwardAssists_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.forwardAssist["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				fa_showElement("summaryItemsCard_forwardAssists_" + cardSuffix);
			} else {
				fa_hideElement("summaryItemsCard_forwardAssists_" + cardSuffix);
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
			if (!window.part || !window.part.forwardAssist) {
				console.error("❌ Forward Assist data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			fa_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_forwardAssist001001();
			
			// Set default quantity = 1 for 00100101
			window.part.forwardAssist["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_ForwardAssist();
			
			// Update 3D model after UI update
			updateModel_ForwardAssists();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
}, true); // Use capture phase
		
} else {
		console.warn("⚠️ Forward Assist: loader-start-button not found");
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
	// Note: HTML uses variantCard_forwardAssists00100101 (no underscore before productGroup)
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_forwardAssists001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_forwardAssist001001();
				
				// Set quantity = 1 for selected variant
				window.part.forwardAssist["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_ForwardAssist();
				
				// Update 3D model after UI update
				const itemsID = "forwardAssists001001" + k;
handleForwardAssistsSelection(itemsID);
				
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
			updateSummaryCards_ForwardAssist();
});
} else {
		console.warn("⚠️ Forward Assist: summaryChartButton not found");
	}
}

export function getSelectedForwardAssist() {
	// Check 001001 variants
	{
		const product = window.part.forwardAssist["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getForwardAssistTotalPrice() {
	const v = getSelectedForwardAssist();
	return v ? v.price : 0;
}
