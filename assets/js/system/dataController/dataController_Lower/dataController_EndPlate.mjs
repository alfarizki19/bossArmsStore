// === dataController_EndPlate.mjs ===
// End Plate UI Controller (Lower Category) — two products with many variants

console.log("📦 Loading dataController_EndPlate.mjs...");

// Import model controller functions
import { updateModel_EndPlate, handleEndPlateSelection } from '../../modelController/modelController_Lower/modelController_EndPlate.mjs';

console.log("✅ dataController_EndPlate.mjs loaded");

function ep_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function ep_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function ep_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function ep_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function ep_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function ep_hideAllPartCardImages() {
	const ids = [
		"partCardImg_endPlate00100101",
		"partCardImg_endPlate00100102",
		"partCardImg_endPlate00100103",
		"partCardImg_endPlate00100104",
		"partCardImg_endPlate00100105",
		"partCardImg_endPlate00100106",
		"partCardImg_endPlate00100107",
		"partCardImg_endPlate00200101",
		"partCardImg_endPlate00200102",
		"partCardImg_endPlate00200103",
		"partCardImg_endPlate00200104",
		"partCardImg_endPlate00200105",
		"partCardImg_endPlate00200106",
		"partCardImg_endPlate00200107",
		"partCardImg_endPlate00200108",
		"partCardImg_endPlate00200109",
		"partCardImg_endPlate00200110",
	];
	ids.forEach(function (id) { ep_hideElement(id); });
}

// Hide all product card images for a specific product
function ep_hideAllProductCardImages(productGroup) {
	const maxVariants = productGroup === "001001" ? 7 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_endPlate" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function ep_showDefaultProductCardImage(productGroup) {
	ep_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_endPlate" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function ep_resetProductCardToDefault(productGroup) {
	const group = window.part.endPlate[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	ep_setText("productCardName_endPlate_" + productGroup, product.productTitle);
	ep_setText("productCardPrice_endPlate_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	ep_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	ep_removeClass("productCard_endPlate_" + productGroup, "active");
}

// Reset all variant cards for a product
function ep_resetAllVariantCards(productGroup) {
	const maxVariants = productGroup === "001001" ? 7 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_endPlate" + productGroup + k;
		ep_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_endPlate001001() {
	const group = window.part.endPlate["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	ep_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	ep_resetAllVariantCards("001001");
}

export function uiReset_endPlate002001() {
	const group = window.part.endPlate["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	ep_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	ep_resetAllVariantCards("002001");
}

// Function to update all product cards to default from inventory
function ep_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.endPlate["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		ep_setText("productCardName_endPlate_001001", product.productTitle);
		ep_setText("productCardPrice_endPlate_001001", "$" + defaultVariant.price + " USD");
		ep_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.endPlate["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		ep_setText("productCardName_endPlate_002001", product.productTitle);
		ep_setText("productCardPrice_endPlate_002001", "$" + defaultVariant.price + " USD");
		ep_showDefaultProductCardImage("002001");
	}
}

export function uiData_EndPlate() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.endPlate["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 7; i++) {
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
		const group = window.part.endPlate["002"];
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
	ep_addClass("productCard_endPlate_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	ep_setText("productCardName_endPlate_" + productGroup, displayName);
	ep_setText("productCardPrice_endPlate_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	ep_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_endPlate" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product card to default
	if (productGroup === "001001") {
		ep_resetProductCardToDefault("002001");
	} else {
		ep_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	ep_hideAllPartCardImages();
	ep_showElement("partCardImg_endPlate" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	ep_setText("partCardName_endPlate", partCardName);
	ep_setText("partCardPrice_endPlate", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	ep_resetAllVariantCards("001001");
	ep_resetAllVariantCards("002001");
	ep_addClass("variantCard_endPlate" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 7; i++) {
		const k = ("" + i).padStart(2, "0");
		ep_hideElement("summaryItemsCard_endPlate_001001" + k);
	}
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		ep_hideElement("summaryItemsCard_endPlate_002001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_endPlate_" + cardSuffix;
	ep_showElement(summaryCardId);
	ep_setText("summaryCardName_endPlate_" + cardSuffix, partCardName);
	ep_setText("summaryCardPrice_endPlate_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_EndPlate() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.endPlate["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			ep_setText("summaryCardName_endPlate_" + cardSuffix, partCardName);
			ep_setText("summaryCardPrice_endPlate_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.endPlate["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			ep_setText("summaryCardName_endPlate_" + cardSuffix, partCardName);
			ep_setText("summaryCardPrice_endPlate_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.endPlate["001"].products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				ep_showElement("summaryItemsCard_endPlate_" + cardSuffix);
			} else {
				ep_hideElement("summaryItemsCard_endPlate_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.endPlate["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				ep_showElement("summaryItemsCard_endPlate_" + cardSuffix);
			} else {
				ep_hideElement("summaryItemsCard_endPlate_" + cardSuffix);
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
			console.log("🎯 End Plate: Start button clicked");
			
			// Validate viewer is ready before configuration
			if (!window.sketchfabViewerReady) {
				console.warn("❌ End Plate: Cannot configure - Sketchfab viewer is not ready yet");
				return;
			}
			
			// Check if data is available
			if (!window.part || !window.part.endPlate) {
				console.error("❌ End Plate data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			ep_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_endPlate001001();
			uiReset_endPlate002001();
			
			// Set default quantity = 1 for 00100101
			window.part.endPlate["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_EndPlate();
			
			// Update 3D model after UI update
			updateModel_EndPlate();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
			console.log("✅ End Plate: Initialized with default 00100101");
		}, true); // Use capture phase
		
		console.log("✅ End Plate: Start button listener attached");
	} else {
		console.warn("⚠️ End Plate: loader-start-button not found");
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
	// 001001 variants (7 variants)
	for (let i = 1; i <= 7; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_endPlate001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_endPlate001001();
				uiReset_endPlate002001();
				
				// Set quantity = 1 for selected variant
				window.part.endPlate["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_EndPlate();
				
				// Update 3D model after UI update
				const itemsID = "endPlate001001" + k;
				console.log(`🎯 Variant card clicked: ${itemsID}`);
				handleEndPlateSelection(itemsID);
				
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
		const variantCardId = "variantCard_endPlate002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_endPlate001001();
				uiReset_endPlate002001();
				
				// Set quantity = 1 for selected variant
				window.part.endPlate["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_EndPlate();
				
				// Update 3D model after UI update
				const itemsID = "endPlate002001" + k;
				console.log(`🎯 Variant card clicked: ${itemsID}`);
				handleEndPlateSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}
	
	console.log("✅ End Plate: Variant card listeners attached");
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
			updateSummaryCards_EndPlate();
			console.log("✅ End Plate: Summary cards updated");
		});
		console.log("✅ End Plate: Summary chart button listener attached");
	} else {
		console.warn("⚠️ End Plate: summaryChartButton not found");
	}
}

export function getSelectedEndPlate() {
	// Check 001001 variants
	{
		const product = window.part.endPlate["001"].products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.endPlate["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getEndPlateTotalPrice() {
	const v = getSelectedEndPlate();
	return v ? v.price : 0;
}
