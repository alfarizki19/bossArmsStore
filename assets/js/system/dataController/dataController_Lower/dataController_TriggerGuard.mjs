// === dataController_TriggerGuard.mjs ===
// Trigger Guard UI Controller (Lower Category) — two products with many variants

console.log("📦 Loading dataController_TriggerGuard.mjs...");

// Import model controller functions
import { updateModel_TriggerGuard, handleTriggerGuardSelection } from '../../modelController/modelController_Lower/modelController_TriggerGuard.mjs';

console.log("✅ dataController_TriggerGuard.mjs loaded");

function tg_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function tg_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function tg_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function tg_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function tg_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function tg_hideAllPartCardImages() {
	if (!window.part || !window.part.triggerGuard) return;
	
	// Hide partCardImg_triggerGuard001001 (product card without variant)
	const el001001 = document.getElementById("partCardImg_triggerGuard001001");
	if (el001001) el001001.style.display = "none";
	
	// 001001 variants (7 variants: 01-07)
	const group001 = window.part.triggerGuard["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_triggerGuard001001" + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	});
	
	// 002001 variants (10 variants: 01-10)
	const group002 = window.part.triggerGuard["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_triggerGuard002001" + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	});
}

// Hide all product card images for a specific product
function tg_hideAllProductCardImages(productGroup) {
	// Hide productCardImg_triggerGuard001001 (product card without variant) for 001001
	if (productGroup === "001001") {
		const el001001 = document.getElementById("productCardImg_triggerGuard001001");
		if (el001001) el001001.style.display = "none";
	}
	
	const maxVariants = productGroup === "001001" ? 7 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_triggerGuard" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function tg_showDefaultProductCardImage(productGroup) {
	tg_hideAllProductCardImages(productGroup);
	
	// For 001001, show productCardImg_triggerGuard001001 (product card without variant)
	if (productGroup === "001001") {
		const el001001 = document.getElementById("productCardImg_triggerGuard001001");
		if (el001001) {
			el001001.style.display = "block";
			return;
		}
	}
	
	// Otherwise show variant 01
	const defaultImgId = "productCardImg_triggerGuard" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function tg_resetProductCardToDefault(productGroup) {
	const group = window.part.triggerGuard[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	tg_setText("productCardName_triggerGuard_" + productGroup, product.productTitle);
	tg_setText("productCardPrice_triggerGuard_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	tg_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	tg_removeClass("productCard_triggerGuard_" + productGroup, "active");
}

// Reset all variant cards for a product
function tg_resetAllVariantCards(productGroup) {
	const maxVariants = productGroup === "001001" ? 7 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_triggerGuard" + productGroup + k;
		tg_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_triggerGuard001001() {
	const group = window.part.triggerGuard["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	tg_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	tg_resetAllVariantCards("001001");
}

export function uiReset_triggerGuard002001() {
	const group = window.part.triggerGuard["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	tg_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	tg_resetAllVariantCards("002001");
}

// Function to update all product cards to default from inventory
function tg_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.triggerGuard["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		tg_setText("productCardName_triggerGuard_001001", product.productTitle);
		tg_setText("productCardPrice_triggerGuard_001001", "$" + defaultVariant.price + " USD");
		tg_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.triggerGuard["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		tg_setText("productCardName_triggerGuard_002001", product.productTitle);
		tg_setText("productCardPrice_triggerGuard_002001", "$" + defaultVariant.price + " USD");
		tg_showDefaultProductCardImage("002001");
	}
}

export function uiData_TriggerGuard() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.triggerGuard["001"];
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
		const group = window.part.triggerGuard["002"];
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
	tg_addClass("productCard_triggerGuard_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	tg_setText("productCardName_triggerGuard_" + productGroup, displayName);
	tg_setText("productCardPrice_triggerGuard_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	tg_hideAllProductCardImages(productGroup);
	
	// For 001001, show productCardImg_triggerGuard001001 (product card without variant) if variant 01 is selected
	if (productGroup === "001001" && variantNum === "01") {
		const el001001 = document.getElementById("productCardImg_triggerGuard001001");
		if (el001001) {
			el001001.style.display = "block";
			console.log(`✅ Trigger Guard: Showing product card image productCardImg_triggerGuard001001`);
		}
	} else {
		// Show variant-specific image
		const selectedImgId = "productCardImg_triggerGuard" + cardSuffix;
		const selectedImg = document.getElementById(selectedImgId);
		if (selectedImg) {
			selectedImg.style.display = "block";
			console.log(`✅ Trigger Guard: Showing product card image ${selectedImgId}`);
		} else {
			console.warn(`⚠️ Trigger Guard: productCardImg ${selectedImgId} not found`);
		}
	}

	// Reset other product card to default
	if (productGroup === "001001") {
		tg_resetProductCardToDefault("002001");
	} else {
		tg_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	tg_hideAllPartCardImages();
	
	// Show selected part card image
	const partCardImgId = "partCardImg_triggerGuard" + cardSuffix;
	const partCardImg = document.getElementById(partCardImgId);
	if (partCardImg) {
		partCardImg.style.display = "block";
		console.log(`✅ Trigger Guard: Showing part card image ${partCardImgId}`);
	} else {
		console.warn(`⚠️ Trigger Guard: partCardImg ${partCardImgId} not found`);
	}

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	tg_setText("partCardName_triggerGuard", partCardName);
	tg_setText("partCardPrice_triggerGuard", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	tg_resetAllVariantCards("001001");
	tg_resetAllVariantCards("002001");
	tg_addClass("variantCard_triggerGuard" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 7; i++) {
		const k = ("" + i).padStart(2, "0");
		tg_hideElement("summaryItemsCard_triggerGuard_001001" + k);
	}
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		tg_hideElement("summaryItemsCard_triggerGuard_002001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_triggerGuard_" + cardSuffix;
	tg_showElement(summaryCardId);
	tg_setText("summaryCardName_triggerGuard_" + cardSuffix, partCardName);
	tg_setText("summaryCardPrice_triggerGuard_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_TriggerGuard() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.triggerGuard["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			tg_setText("summaryCardName_triggerGuard_" + cardSuffix, partCardName);
			tg_setText("summaryCardPrice_triggerGuard_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.triggerGuard["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			tg_setText("summaryCardName_triggerGuard_" + cardSuffix, partCardName);
			tg_setText("summaryCardPrice_triggerGuard_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.triggerGuard["001"].products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				tg_showElement("summaryItemsCard_triggerGuard_" + cardSuffix);
			} else {
				tg_hideElement("summaryItemsCard_triggerGuard_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.triggerGuard["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				tg_showElement("summaryItemsCard_triggerGuard_" + cardSuffix);
			} else {
				tg_hideElement("summaryItemsCard_triggerGuard_" + cardSuffix);
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
			console.log("🎯 Trigger Guard: Start button clicked");
			
			// Validate viewer is ready before configuration
			if (!window.sketchfabViewerReady) {
				console.warn("❌ Trigger Guard: Cannot configure - Sketchfab viewer is not ready yet");
				return;
			}
			
			// Check if data is available
			if (!window.part || !window.part.triggerGuard) {
				console.error("❌ Trigger Guard data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			tg_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_triggerGuard001001();
			uiReset_triggerGuard002001();
			
			// Set default quantity = 1 for 00100101
			window.part.triggerGuard["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_TriggerGuard();
			
			// Update 3D model after UI update
			updateModel_TriggerGuard();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
			console.log("✅ Trigger Guard: Initialized with default 00100101");
		}, true); // Use capture phase
		
		console.log("✅ Trigger Guard: Start button listener attached");
	} else {
		console.warn("⚠️ Trigger Guard: loader-start-button not found");
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
		const variantCardId = "variantCard_triggerGuard001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_triggerGuard001001();
				uiReset_triggerGuard002001();
				
				// Set quantity = 1 for selected variant
				window.part.triggerGuard["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_TriggerGuard();
				
				// Update 3D model after UI update
				const itemsID = "triggerGuard001001" + k;
				console.log(`🎯 Variant card clicked: ${itemsID}`);
				handleTriggerGuardSelection(itemsID);
				
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
		const variantCardId = "variantCard_triggerGuard002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_triggerGuard001001();
				uiReset_triggerGuard002001();
				
				// Set quantity = 1 for selected variant
				window.part.triggerGuard["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_TriggerGuard();
				
				// Update 3D model after UI update
				const itemsID = "triggerGuard002001" + k;
				console.log(`🎯 Variant card clicked: ${itemsID}`);
				handleTriggerGuardSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}
	
	console.log("✅ Trigger Guard: Variant card listeners attached");
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
			updateSummaryCards_TriggerGuard();
			console.log("✅ Trigger Guard: Summary cards updated");
		});
		console.log("✅ Trigger Guard: Summary chart button listener attached");
	} else {
		console.warn("⚠️ Trigger Guard: summaryChartButton not found");
	}
}

export function getSelectedTriggerGuard() {
	// Check 001001 variants
	{
		const product = window.part.triggerGuard["001"].products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.triggerGuard["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getTriggerGuardTotalPrice() {
	const v = getSelectedTriggerGuard();
	return v ? v.price : 0;
}

