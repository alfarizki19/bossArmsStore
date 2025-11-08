// === dataController_Safety.mjs ===
// Safety UI Controller (Lower Category) — two products with many variants
// Import model controller functions
import { updateModel_Safety, handleSafetySelection } from '../../modelController/modelController_Lower/modelController_Safety.mjs';
function sf_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function sf_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function sf_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function sf_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function sf_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function sf_hideAllPartCardImages() {
	if (!window.part || !window.part.safety) return;
	
	// 001001 variants (4 variants)
	const group001 = window.part.safety["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_safety001001" + k;
		sf_hideElement(imgId);
	});
	
	// 002001 variants (10 variants)
	const group002 = window.part.safety["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_safety002001" + k;
		sf_hideElement(imgId);
	});
}

// Hide all product card images for a specific product
function sf_hideAllProductCardImages(productGroup) {
	const maxVariants = productGroup === "001001" ? 4 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_safety" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function sf_showDefaultProductCardImage(productGroup) {
	sf_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_safety" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function sf_resetProductCardToDefault(productGroup) {
	const group = window.part.safety[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	sf_setText("productCardName_safety_" + productGroup, product.productTitle);
	sf_setText("productCardPrice_safety_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	sf_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	sf_removeClass("productCard_safety_" + productGroup, "active");
}

// Reset all variant cards for a product
function sf_resetAllVariantCards(productGroup) {
	const maxVariants = productGroup === "001001" ? 4 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_safety" + productGroup + k;
		sf_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_safety001001() {
	const group = window.part.safety["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	sf_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	sf_resetAllVariantCards("001001");
}

export function uiReset_safety002001() {
	const group = window.part.safety["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	sf_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	sf_resetAllVariantCards("002001");
}

// Function to update all product cards to default from inventory
function sf_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.safety["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		sf_setText("productCardName_safety_001001", product.productTitle);
		sf_setText("productCardPrice_safety_001001", "$" + defaultVariant.price + " USD");
		sf_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.safety["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		sf_setText("productCardName_safety_002001", product.productTitle);
		sf_setText("productCardPrice_safety_002001", "$" + defaultVariant.price + " USD");
		sf_showDefaultProductCardImage("002001");
	}
}

export function uiData_Safety() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.safety["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 4; i++) {
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
		const group = window.part.safety["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
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
	sf_addClass("productCard_safety_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	sf_setText("productCardName_safety_" + productGroup, displayName);
	sf_setText("productCardPrice_safety_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	sf_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_safety" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product card to default
	if (productGroup === "001001") {
		sf_resetProductCardToDefault("002001");
	} else {
		sf_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	sf_hideAllPartCardImages();
	sf_showElement("partCardImg_safety" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	sf_setText("partCardName_safety", partCardName);
	sf_setText("partCardPrice_safety", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	sf_resetAllVariantCards("001001");
	sf_resetAllVariantCards("002001");
	sf_addClass("variantCard_safety" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 4; i++) {
		const k = ("" + i).padStart(2, "0");
		sf_hideElement("summaryItemsCard_safety_001001" + k);
	}
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		sf_hideElement("summaryItemsCard_safety_002001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_safety_" + cardSuffix;
	sf_showElement(summaryCardId);
	sf_setText("summaryCardName_safety_" + cardSuffix, partCardName);
	sf_setText("summaryCardPrice_safety_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_Safety() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.safety["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 4; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			sf_setText("summaryCardName_safety_" + cardSuffix, partCardName);
			sf_setText("summaryCardPrice_safety_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.safety["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			sf_setText("summaryCardName_safety_" + cardSuffix, partCardName);
			sf_setText("summaryCardPrice_safety_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.safety["001"].products["001"];
		for (let i = 1; i <= 4; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				sf_showElement("summaryItemsCard_safety_" + cardSuffix);
			} else {
				sf_hideElement("summaryItemsCard_safety_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.safety["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				sf_showElement("summaryItemsCard_safety_" + cardSuffix);
			} else {
				sf_hideElement("summaryItemsCard_safety_" + cardSuffix);
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
				return;
			}
			
			// Check if data is available
			if (!window.part || !window.part.safety) {
				return;
			}
			
			// Update all product cards to default from inventory
			sf_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_safety001001();
			uiReset_safety002001();
			
			// Set default quantity = 1 for 00100101
			window.part.safety["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_Safety();
			
			// Update 3D model after UI update
			updateModel_Safety();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
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
	// 001001 variants (4 variants)
	for (let i = 1; i <= 4; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_safety001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_safety001001();
				uiReset_safety002001();
				
				// Set quantity = 1 for selected variant
				window.part.safety["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_Safety();
				
				// Update 3D model after UI update
				const itemsID = "safety001001" + k;
				handleSafetySelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}

	// 002001 variants (10 variants)
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_safety002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_safety001001();
				uiReset_safety002001();
				
				// Set quantity = 1 for selected variant
				window.part.safety["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_Safety();
				
				// Update 3D model after UI update
				const itemsID = "safety002001" + k;
				handleSafetySelection(itemsID);
				
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
			updateSummaryCards_Safety();
		});
	} else {
	}
}

export function getSelectedSafety() {
	// Check 001001 variants
	{
		const product = window.part.safety["001"].products["001"];
		for (let i = 1; i <= 4; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.safety["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getSafetyTotalPrice() {
	const v = getSelectedSafety();
	return v ? v.price : 0;
}

