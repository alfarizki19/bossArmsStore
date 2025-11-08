// === dataController_Stock.mjs ===
// Stock UI Controller (Lower Category) — two products with many variants
// Import model controller functions
import { updateModel_Stock, handleStockSelection } from '../../modelController/modelController_Lower/modelController_Stock.mjs';
function st_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function st_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function st_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function st_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function st_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function st_hideAllPartCardImages() {
	if (!window.part || !window.part.stock) return;
	
	// 001001 variants (5 variants)
	const group001 = window.part.stock["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_stock001001" + k;
		st_hideElement(imgId);
	});
	
	// 002001 variants (3 variants)
	const group002 = window.part.stock["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_stock002001" + k;
		st_hideElement(imgId);
	});
}

// Hide all product card images for a specific product
function st_hideAllProductCardImages(productGroup) {
	const maxVariants = productGroup === "001001" ? 5 : 3;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_stock" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function st_showDefaultProductCardImage(productGroup) {
	st_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_stock" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function st_resetProductCardToDefault(productGroup) {
	const group = window.part.stock[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	st_setText("productCardName_stock_" + productGroup, product.productTitle);
	st_setText("productCardPrice_stock_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	st_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	st_removeClass("productCard_stock_" + productGroup, "active");
}

// Reset all variant cards for a product
function st_resetAllVariantCards(productGroup) {
	const maxVariants = productGroup === "001001" ? 5 : 3;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_stock" + productGroup + k;
		st_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_stock001001() {
	const group = window.part.stock["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	st_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	st_resetAllVariantCards("001001");
}

export function uiReset_stock002001() {
	const group = window.part.stock["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	st_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	st_resetAllVariantCards("002001");
}

// Function to update all product cards to default from inventory
function st_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.stock["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		st_setText("productCardName_stock_001001", product.productTitle);
		st_setText("productCardPrice_stock_001001", "$" + defaultVariant.price + " USD");
		st_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.stock["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		st_setText("productCardName_stock_002001", product.productTitle);
		st_setText("productCardPrice_stock_002001", "$" + defaultVariant.price + " USD");
		st_showDefaultProductCardImage("002001");
	}
}

export function uiData_Stock() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.stock["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 5; i++) {
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
		const group = window.part.stock["002"];
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
	st_addClass("productCard_stock_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	st_setText("productCardName_stock_" + productGroup, displayName);
	st_setText("productCardPrice_stock_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	st_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_stock" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product card to default
	if (productGroup === "001001") {
		st_resetProductCardToDefault("002001");
	} else {
		st_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	st_hideAllPartCardImages();
	st_showElement("partCardImg_stock" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	st_setText("partCardName_stock", partCardName);
	st_setText("partCardPrice_stock", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	st_resetAllVariantCards("001001");
	st_resetAllVariantCards("002001");
	st_addClass("variantCard_stock" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 5; i++) {
		const k = ("" + i).padStart(2, "0");
		st_hideElement("summaryItemsCard_stock_001001" + k);
	}
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		st_hideElement("summaryItemsCard_stock_002001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_stock_" + cardSuffix;
	st_showElement(summaryCardId);
	st_setText("summaryCardName_stock_" + cardSuffix, partCardName);
	st_setText("summaryCardPrice_stock_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_Stock() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.stock["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 5; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			st_setText("summaryCardName_stock_" + cardSuffix, partCardName);
			st_setText("summaryCardPrice_stock_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.stock["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			st_setText("summaryCardName_stock_" + cardSuffix, partCardName);
			st_setText("summaryCardPrice_stock_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.stock["001"].products["001"];
		for (let i = 1; i <= 5; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				st_showElement("summaryItemsCard_stock_" + cardSuffix);
			} else {
				st_hideElement("summaryItemsCard_stock_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.stock["002"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				st_showElement("summaryItemsCard_stock_" + cardSuffix);
			} else {
				st_hideElement("summaryItemsCard_stock_" + cardSuffix);
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
			if (!window.part || !window.part.stock) {
				return;
			}
			
			// Update all product cards to default from inventory
			st_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_stock001001();
			uiReset_stock002001();
			
			// Set default quantity = 1 for 00100101
			window.part.stock["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_Stock();
			
			// Update 3D model after UI update
			updateModel_Stock();
			
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
	// 001001 variants (5 variants)
	for (let i = 1; i <= 5; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_stock001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_stock001001();
				uiReset_stock002001();
				
				// Set quantity = 1 for selected variant
				window.part.stock["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_Stock();
				
				// Update 3D model after UI update
				const itemsID = "stock001001" + k;
				handleStockSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}

	// 002001 variants (3 variants)
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_stock002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_stock001001();
				uiReset_stock002001();
				
				// Set quantity = 1 for selected variant
				window.part.stock["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_Stock();
				
				// Update 3D model after UI update
				const itemsID = "stock002001" + k;
				handleStockSelection(itemsID);
				
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
			updateSummaryCards_Stock();
		});
	} else {
	}
}

export function getSelectedStock() {
	// Check 001001 variants
	{
		const product = window.part.stock["001"].products["001"];
		for (let i = 1; i <= 5; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.stock["002"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getStockTotalPrice() {
	const v = getSelectedStock();
	return v ? v.price : 0;
}

