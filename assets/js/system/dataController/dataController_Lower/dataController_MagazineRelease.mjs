// === dataController_MagazineRelease.mjs ===
// Magazine Release UI Controller (Lower Category) — two products with many variants

console.log("📦 Loading dataController_MagazineRelease.mjs...");

// Import model controller functions
import { updateModel_MagazineRelease, handleMagazineReleaseSelection } from '../../modelController/modelController_Lower/modelController_MagazineRelease.mjs';

console.log("✅ dataController_MagazineRelease.mjs loaded");

function mr_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function mr_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function mr_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function mr_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function mr_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function mr_hideAllPartCardImages() {
	if (!window.part || !window.part.magazineRelease) return;
	
	// 001001 variants (3 variants)
	const group001 = window.part.magazineRelease["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_magazineRelease001001" + k;
		mr_hideElement(imgId);
	});
	
	// 002001 variants (10 variants)
	const group002 = window.part.magazineRelease["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_magazineRelease002001" + k;
		mr_hideElement(imgId);
	});
}

// Hide all product card images for a specific product
function mr_hideAllProductCardImages(productGroup) {
	const maxVariants = productGroup === "001001" ? 3 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_magazineRelease" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function mr_showDefaultProductCardImage(productGroup) {
	mr_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_magazineRelease" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function mr_resetProductCardToDefault(productGroup) {
	const group = window.part.magazineRelease[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	mr_setText("productCardName_magazineRelease_" + productGroup, product.productTitle);
	mr_setText("productCardPrice_magazineRelease_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	mr_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	mr_removeClass("productCard_magazineRelease_" + productGroup, "active");
}

// Reset all variant cards for a product
function mr_resetAllVariantCards(productGroup) {
	const maxVariants = productGroup === "001001" ? 3 : 10;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_magazineRelease" + productGroup + k;
		mr_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_magazineRelease001001() {
	const group = window.part.magazineRelease["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	mr_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	mr_resetAllVariantCards("001001");
}

export function uiReset_magazineRelease002001() {
	const group = window.part.magazineRelease["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	mr_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	mr_resetAllVariantCards("002001");
}

// Function to update all product cards to default from inventory
function mr_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.magazineRelease["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		mr_setText("productCardName_magazineRelease_001001", product.productTitle);
		mr_setText("productCardPrice_magazineRelease_001001", "$" + defaultVariant.price + " USD");
		mr_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.magazineRelease["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		mr_setText("productCardName_magazineRelease_002001", product.productTitle);
		mr_setText("productCardPrice_magazineRelease_002001", "$" + defaultVariant.price + " USD");
		mr_showDefaultProductCardImage("002001");
	}
}

export function uiData_MagazineRelease() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.magazineRelease["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
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
		const group = window.part.magazineRelease["002"];
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
	mr_addClass("productCard_magazineRelease_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	mr_setText("productCardName_magazineRelease_" + productGroup, displayName);
	mr_setText("productCardPrice_magazineRelease_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	mr_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_magazineRelease" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product card to default
	if (productGroup === "001001") {
		mr_resetProductCardToDefault("002001");
	} else {
		mr_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	mr_hideAllPartCardImages();
	mr_showElement("partCardImg_magazineRelease" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	mr_setText("partCardName_magazineRelease", partCardName);
	mr_setText("partCardPrice_magazineRelease", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	mr_resetAllVariantCards("001001");
	mr_resetAllVariantCards("002001");
	mr_addClass("variantCard_magazineRelease" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		mr_hideElement("summaryItemsCard_magazineRelease_001001" + k);
	}
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		mr_hideElement("summaryItemsCard_magazineRelease_002001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_magazineRelease_" + cardSuffix;
	mr_showElement(summaryCardId);
	mr_setText("summaryCardName_magazineRelease_" + cardSuffix, partCardName);
	mr_setText("summaryCardPrice_magazineRelease_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_MagazineRelease() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.magazineRelease["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			mr_setText("summaryCardName_magazineRelease_" + cardSuffix, partCardName);
			mr_setText("summaryCardPrice_magazineRelease_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.magazineRelease["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			mr_setText("summaryCardName_magazineRelease_" + cardSuffix, partCardName);
			mr_setText("summaryCardPrice_magazineRelease_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.magazineRelease["001"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				mr_showElement("summaryItemsCard_magazineRelease_" + cardSuffix);
			} else {
				mr_hideElement("summaryItemsCard_magazineRelease_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.magazineRelease["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				mr_showElement("summaryItemsCard_magazineRelease_" + cardSuffix);
			} else {
				mr_hideElement("summaryItemsCard_magazineRelease_" + cardSuffix);
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
			console.log("🎯 Magazine Release: Start button clicked");
			
			// Validate viewer is ready before configuration
			if (!window.sketchfabViewerReady) {
				console.warn("❌ Magazine Release: Cannot configure - Sketchfab viewer is not ready yet");
				return;
			}
			
			// Check if data is available
			if (!window.part || !window.part.magazineRelease) {
				console.error("❌ Magazine Release data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			mr_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_magazineRelease001001();
			uiReset_magazineRelease002001();
			
			// Set default quantity = 1 for 00100101
			window.part.magazineRelease["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_MagazineRelease();
			
			// Update 3D model after UI update
			updateModel_MagazineRelease();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
			console.log("✅ Magazine Release: Initialized with default 00100101");
		}, true); // Use capture phase
		
		console.log("✅ Magazine Release: Start button listener attached");
	} else {
		console.warn("⚠️ Magazine Release: loader-start-button not found");
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
	// 001001 variants (3 variants)
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_magazineRelease001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_magazineRelease001001();
				uiReset_magazineRelease002001();
				
				// Set quantity = 1 for selected variant
				window.part.magazineRelease["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_MagazineRelease();
				
				// Update 3D model after UI update
				const itemsID = "magazineRelease001001" + k;
				console.log(`🎯 Variant card clicked: ${itemsID}`);
				handleMagazineReleaseSelection(itemsID);
				
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
		const variantCardId = "variantCard_magazineRelease002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_magazineRelease001001();
				uiReset_magazineRelease002001();
				
				// Set quantity = 1 for selected variant
				window.part.magazineRelease["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_MagazineRelease();
				
				// Update 3D model after UI update
				const itemsID = "magazineRelease002001" + k;
				console.log(`🎯 Variant card clicked: ${itemsID}`);
				handleMagazineReleaseSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}
	
	console.log("✅ Magazine Release: Variant card listeners attached");
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
			updateSummaryCards_MagazineRelease();
			console.log("✅ Magazine Release: Summary cards updated");
		});
		console.log("✅ Magazine Release: Summary chart button listener attached");
	} else {
		console.warn("⚠️ Magazine Release: summaryChartButton not found");
	}
}

export function getSelectedMagazineRelease() {
	// Check 001001 variants
	{
		const product = window.part.magazineRelease["001"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.magazineRelease["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getMagazineReleaseTotalPrice() {
	const v = getSelectedMagazineRelease();
	return v ? v.price : 0;
}

