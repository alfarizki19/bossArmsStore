// === dataController_TakedownPinSet.mjs ===
// Takedown Pin Set UI Controller (Lower Category) — three products with variants
// Import model controller functions
import { updateModel_TakedownPin, handleTakedownPinSelection } from '../../modelController/modelController_Lower/modelController_TakedownPin.mjs';
function tps_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function tps_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function tps_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function tps_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function tps_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function tps_hideAllPartCardImages() {
	if (!window.part || !window.part.takedownPin) return;
	
	// 001001 variants (2 variants)
	const group001 = window.part.takedownPin["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_takedownPinSet001001" + k;
		tps_hideElement(imgId);
	});
	
	// 002001 variants (10 variants)
	const group002 = window.part.takedownPin["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_takedownPinSet002001" + k;
		tps_hideElement(imgId);
	});
	
	// 003001 variants (1 variant)
	const group003 = window.part.takedownPin["003"];
	const product003 = group003.products["001"];
	Object.keys(product003.variants).forEach(k => {
		const imgId = "partCardImg_takedownPinSet003001" + k;
		tps_hideElement(imgId);
	});
}

// Hide all product card images for a specific product
function tps_hideAllProductCardImages(productGroup) {
	let maxVariants;
	if (productGroup === "001001") maxVariants = 2;
	else if (productGroup === "002001") maxVariants = 10;
	else if (productGroup === "003001") maxVariants = 1;
	else return;
	
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_takedownPinSet" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function tps_showDefaultProductCardImage(productGroup) {
	tps_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_takedownPinSet" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function tps_resetProductCardToDefault(productGroup) {
	const group = window.part.takedownPin[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	tps_setText("productCardName_takedownPinSet_" + productGroup, product.productTitle);
	tps_setText("productCardPrice_takedownPinSet_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	tps_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	tps_removeClass("productCard_takedownPinSet_" + productGroup, "active");
}

// Reset all variant cards for a product
function tps_resetAllVariantCards(productGroup) {
	let maxVariants;
	if (productGroup === "001001") maxVariants = 2;
	else if (productGroup === "002001") maxVariants = 10;
	else if (productGroup === "003001") maxVariants = 1;
	else return;
	
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_takedownPinSet" + productGroup + k;
		tps_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_takedownPinSet001001() {
	const group = window.part.takedownPin["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	tps_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	tps_resetAllVariantCards("001001");
}

export function uiReset_takedownPinSet002001() {
	const group = window.part.takedownPin["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	tps_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	tps_resetAllVariantCards("002001");
}

export function uiReset_takedownPinSet003001() {
	const group = window.part.takedownPin["003"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	tps_resetProductCardToDefault("003001");
	
	// Reset all variant cards
	tps_resetAllVariantCards("003001");
}

// Function to update all product cards to default from inventory
function tps_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.takedownPin["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		tps_setText("productCardName_takedownPinSet_001001", product.productTitle);
		tps_setText("productCardPrice_takedownPinSet_001001", "$" + defaultVariant.price + " USD");
		tps_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.takedownPin["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		tps_setText("productCardName_takedownPinSet_002001", product.productTitle);
		tps_setText("productCardPrice_takedownPinSet_002001", "$" + defaultVariant.price + " USD");
		tps_showDefaultProductCardImage("002001");
	}
	// 003001 - default to variant 01
	{
		const group = window.part.takedownPin["003"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		tps_setText("productCardName_takedownPinSet_003001", product.productTitle);
		tps_setText("productCardPrice_takedownPinSet_003001", "$" + defaultVariant.price + " USD");
		tps_showDefaultProductCardImage("003001");
	}
}

export function uiData_TakedownPinSet() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.takedownPin["001"];
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
	
	// Check 002001 variants
	if (!selected) {
		const group = window.part.takedownPin["002"];
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
	
	// Check 003001 variants
	if (!selected) {
		const group = window.part.takedownPin["003"];
		const product = group.products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				selected = product.variants[k];
				cardSuffix = "003001" + k;
				productTitle = product.productTitle;
				brand = group.brand;
				variantTitle = selected.variantTitle;
				break;
			}
		}
	}

	if (!selected || !cardSuffix) return;

	const productGroup = cardSuffix.substring(0, 6); // "001001", "002001", or "003001"
	const variantNum = cardSuffix.substring(6, 8); // "01", "02", etc.

	// Update selected product card
	tps_addClass("productCard_takedownPinSet_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	tps_setText("productCardName_takedownPinSet_" + productGroup, displayName);
	tps_setText("productCardPrice_takedownPinSet_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	tps_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_takedownPinSet" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product cards to default
	if (productGroup === "001001") {
		tps_resetProductCardToDefault("002001");
		tps_resetProductCardToDefault("003001");
	} else if (productGroup === "002001") {
		tps_resetProductCardToDefault("001001");
		tps_resetProductCardToDefault("003001");
	} else {
		tps_resetProductCardToDefault("001001");
		tps_resetProductCardToDefault("002001");
	}

	// Update part card images - show selected, hide others
	tps_hideAllPartCardImages();
	tps_showElement("partCardImg_takedownPinSet" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	tps_setText("partCardName_takedownPinSet", partCardName);
	tps_setText("partCardPrice_takedownPinSet", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	tps_resetAllVariantCards("001001");
	tps_resetAllVariantCards("002001");
	tps_resetAllVariantCards("003001");
	tps_addClass("variantCard_takedownPinSet" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		tps_hideElement("summaryItemsCard_takedownPinSet_001001" + k);
	}
	for (let i = 1; i <= 10; i++) {
		const k = ("" + i).padStart(2, "0");
		tps_hideElement("summaryItemsCard_takedownPinSet_002001" + k);
	}
	for (let i = 1; i <= 1; i++) {
		const k = ("" + i).padStart(2, "0");
		tps_hideElement("summaryItemsCard_takedownPinSet_003001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_takedownPinSet_" + cardSuffix;
	tps_showElement(summaryCardId);
	tps_setText("summaryCardName_takedownPinSet_" + cardSuffix, partCardName);
	tps_setText("summaryCardPrice_takedownPinSet_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_TakedownPinSet() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.takedownPin["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			tps_setText("summaryCardName_takedownPinSet_" + cardSuffix, partCardName);
			tps_setText("summaryCardPrice_takedownPinSet_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.takedownPin["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			tps_setText("summaryCardName_takedownPinSet_" + cardSuffix, partCardName);
			tps_setText("summaryCardPrice_takedownPinSet_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 003001 variants
	{
		const group = window.part.takedownPin["003"];
		const product = group.products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "003001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			tps_setText("summaryCardName_takedownPinSet_" + cardSuffix, partCardName);
			tps_setText("summaryCardPrice_takedownPinSet_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.takedownPin["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				tps_showElement("summaryItemsCard_takedownPinSet_" + cardSuffix);
			} else {
				tps_hideElement("summaryItemsCard_takedownPinSet_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.takedownPin["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				tps_showElement("summaryItemsCard_takedownPinSet_" + cardSuffix);
			} else {
				tps_hideElement("summaryItemsCard_takedownPinSet_" + cardSuffix);
			}
		}
	}
	// 003001 variants
	{
		const product = window.part.takedownPin["003"].products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "003001" + k;
			if (product.variants[k].quantity === 1) {
				tps_showElement("summaryItemsCard_takedownPinSet_" + cardSuffix);
			} else {
				tps_hideElement("summaryItemsCard_takedownPinSet_" + cardSuffix);
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
			if (!window.part || !window.part.takedownPin) {
				return;
			}
			
			// Update all product cards to default from inventory
			tps_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_takedownPinSet001001();
			uiReset_takedownPinSet002001();
			uiReset_takedownPinSet003001();
			
			// Set default quantity = 1 for 00100101
			window.part.takedownPin["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_TakedownPinSet();
			
			// Update 3D model after UI update
			updateModel_TakedownPin();
			
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
	// 001001 variants (2 variants)
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_takedownPinSet001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_takedownPinSet001001();
				uiReset_takedownPinSet002001();
				uiReset_takedownPinSet003001();
				
				// Set quantity = 1 for selected variant
				window.part.takedownPin["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_TakedownPinSet();
				
				// Update 3D model after UI update
				const itemsID = "takedownPinSet001001" + k;
				handleTakedownPinSelection(itemsID);
				
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
		const variantCardId = "variantCard_takedownPinSet002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_takedownPinSet001001();
				uiReset_takedownPinSet002001();
				uiReset_takedownPinSet003001();
				
				// Set quantity = 1 for selected variant
				window.part.takedownPin["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_TakedownPinSet();
				
				// Update 3D model after UI update
				const itemsID = "takedownPinSet002001" + k;
				handleTakedownPinSelection(itemsID);
				
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

// Product card click listeners (for products with only 1 variant)
// Use DOMContentLoaded to ensure elements exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupProductCardListeners);
} else {
	// DOM already loaded
	setupProductCardListeners();
}

function setupProductCardListeners() {
	// 003001 -> 01 (only 1 variant, select from product card)
	const card003001 = document.getElementById("productCard_takedownPinSet_003001");
	if (card003001) {
		// Use capture phase to run before onclick
		card003001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_takedownPinSet001001();
			uiReset_takedownPinSet002001();
			uiReset_takedownPinSet003001();
			
			// Set quantity = 1 for selected product
			window.part.takedownPin["003"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_TakedownPinSet();
			
			// Update 3D model after UI update
			const itemsID = "takedownPinSet00300101";
			handleTakedownPinSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
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
			updateSummaryCards_TakedownPinSet();
		});
	} else {
	}
}

export function getSelectedTakedownPinSet() {
	// Check 001001 variants
	{
		const product = window.part.takedownPin["001"].products["001"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.takedownPin["002"].products["001"];
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 003001 variants
	{
		const product = window.part.takedownPin["003"].products["001"];
		for (let i = 1; i <= 1; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getTakedownPinSetTotalPrice() {
	const v = getSelectedTakedownPinSet();
	return v ? v.price : 0;
}

