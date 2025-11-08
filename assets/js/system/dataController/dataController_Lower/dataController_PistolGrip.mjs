// === dataController_PistolGrip.mjs ===
// Pistol Grip UI Controller (Lower Category) — two products with many variants
// Import model controller functions
import { updateModel_PistolGrip, handlePistolGripSelection } from '../../modelController/modelController_Lower/modelController_PistolGrip.mjs';

// Import trigger guard functions
import { uiData_TriggerGuard, updateSummaryCards_TriggerGuard } from './dataController_TriggerGuard.mjs';
function pg_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function pg_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function pg_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function pg_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function pg_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images - dynamically from inventory
function pg_hideAllPartCardImages() {
	if (!window.part || !window.part.pistolGrip) return;
	
	// 001001 variants (3 variants)
	const group001 = window.part.pistolGrip["001"];
	const product001 = group001.products["001"];
	Object.keys(product001.variants).forEach(k => {
		const imgId = "partCardImg_pistolGrip001001" + k;
		pg_hideElement(imgId);
	});
	
	// 002001 variants (7 variants)
	const group002 = window.part.pistolGrip["002"];
	const product002 = group002.products["001"];
	Object.keys(product002.variants).forEach(k => {
		const imgId = "partCardImg_pistolGrip002001" + k;
		pg_hideElement(imgId);
	});
}

// Hide all product card images for a specific product
function pg_hideAllProductCardImages(productGroup) {
	const maxVariants = productGroup === "001001" ? 3 : 7;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const imgId = "productCardImg_pistolGrip" + productGroup + k;
		const el = document.getElementById(imgId);
		if (el) el.style.display = "none";
	}
}

// Show default product card image (variant 01)
function pg_showDefaultProductCardImage(productGroup) {
	pg_hideAllProductCardImages(productGroup);
	const defaultImgId = "productCardImg_pistolGrip" + productGroup + "01";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default (variant 01)
function pg_resetProductCardToDefault(productGroup) {
	const group = window.part.pistolGrip[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	const defaultVariant = product.variants["01"];
	
	// Update product card name and price to default variant
	pg_setText("productCardName_pistolGrip_" + productGroup, product.productTitle);
	pg_setText("productCardPrice_pistolGrip_" + productGroup, "$" + defaultVariant.price + " USD");
	
	// Show default image (variant 01)
	pg_showDefaultProductCardImage(productGroup);
	
	// Remove active class
	pg_removeClass("productCard_pistolGrip_" + productGroup, "active");
}

// Reset all variant cards for a product
function pg_resetAllVariantCards(productGroup) {
	const maxVariants = productGroup === "001001" ? 3 : 7;
	for (let i = 1; i <= maxVariants; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_pistolGrip" + productGroup + k;
		pg_removeClass(variantCardId, "active");
	}
}

// Reset all variants quantity to 0 for a product
export function uiReset_pistolGrip001001() {
	const group = window.part.pistolGrip["001"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	pg_resetProductCardToDefault("001001");
	
	// Reset all variant cards
	pg_resetAllVariantCards("001001");
}

export function uiReset_pistolGrip002001() {
	const group = window.part.pistolGrip["002"];
	const product = group.products["001"];
	Object.keys(product.variants).forEach(k => product.variants[k].quantity = 0);
	
	// Reset product card to default
	pg_resetProductCardToDefault("002001");
	
	// Reset all variant cards
	pg_resetAllVariantCards("002001");
}

// Function to update all product cards to default from inventory
function pg_updateAllProductCardsToDefault() {
	// 001001 - default to variant 01
	{
		const group = window.part.pistolGrip["001"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		pg_setText("productCardName_pistolGrip_001001", product.productTitle);
		pg_setText("productCardPrice_pistolGrip_001001", "$" + defaultVariant.price + " USD");
		pg_showDefaultProductCardImage("001001");
	}
	// 002001 - default to variant 01
	{
		const group = window.part.pistolGrip["002"];
		const product = group.products["001"];
		const defaultVariant = product.variants["01"];
		pg_setText("productCardName_pistolGrip_002001", product.productTitle);
		pg_setText("productCardPrice_pistolGrip_002001", "$" + defaultVariant.price + " USD");
		pg_showDefaultProductCardImage("002001");
	}
}

export function uiData_PistolGrip() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001 variants
	{
		const group = window.part.pistolGrip["001"];
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
		const group = window.part.pistolGrip["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 7; i++) {
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
	pg_addClass("productCard_pistolGrip_" + productGroup, "active");
	
	// Update product card name and price with selected variant
	const displayName = variantTitle.toLowerCase() !== "no variant" 
		? productTitle + " - " + variantTitle 
		: productTitle;
	pg_setText("productCardName_pistolGrip_" + productGroup, displayName);
	pg_setText("productCardPrice_pistolGrip_" + productGroup, "$" + selected.price + " USD");
	
	// Show selected variant image, hide others
	pg_hideAllProductCardImages(productGroup);
	const selectedImgId = "productCardImg_pistolGrip" + cardSuffix;
	const selectedImg = document.getElementById(selectedImgId);
	if (selectedImg) selectedImg.style.display = "block";

	// Reset other product card to default
	if (productGroup === "001001") {
		pg_resetProductCardToDefault("002001");
	} else {
		pg_resetProductCardToDefault("001001");
	}

	// Update part card images - show selected, hide others
	pg_hideAllPartCardImages();
	pg_showElement("partCardImg_pistolGrip" + cardSuffix);

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	pg_setText("partCardName_pistolGrip", partCardName);
	pg_setText("partCardPrice_pistolGrip", "$" + selected.price + " USD");

	// Update variant cards - active selected, reset others
	pg_resetAllVariantCards("001001");
	pg_resetAllVariantCards("002001");
	pg_addClass("variantCard_pistolGrip" + cardSuffix, "active");

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		pg_hideElement("summaryItemsCard_pistolGrip_001001" + k);
	}
	for (let i = 1; i <= 7; i++) {
		const k = ("" + i).padStart(2, "0");
		pg_hideElement("summaryItemsCard_pistolGrip_002001" + k);
	}
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_pistolGrip_" + cardSuffix;
	pg_showElement(summaryCardId);
	pg_setText("summaryCardName_pistolGrip_" + cardSuffix, partCardName);
	pg_setText("summaryCardPrice_pistolGrip_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_PistolGrip() {
	// Update all summary card names and prices from inventory
	// 001001 variants
	{
		const group = window.part.pistolGrip["001"];
		const product = group.products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "001001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			pg_setText("summaryCardName_pistolGrip_" + cardSuffix, partCardName);
			pg_setText("summaryCardPrice_pistolGrip_" + cardSuffix, "$" + variant.price + " USD");
		}
	}
	// 002001 variants
	{
		const group = window.part.pistolGrip["002"];
		const product = group.products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002001" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			pg_setText("summaryCardName_pistolGrip_" + cardSuffix, partCardName);
			pg_setText("summaryCardPrice_pistolGrip_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001 variants
	{
		const product = window.part.pistolGrip["001"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "001001" + k;
			if (product.variants[k].quantity === 1) {
				pg_showElement("summaryItemsCard_pistolGrip_" + cardSuffix);
			} else {
				pg_hideElement("summaryItemsCard_pistolGrip_" + cardSuffix);
			}
		}
	}
	// 002001 variants
	{
		const product = window.part.pistolGrip["002"].products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002001" + k;
			if (product.variants[k].quantity === 1) {
				pg_showElement("summaryItemsCard_pistolGrip_" + cardSuffix);
			} else {
				pg_hideElement("summaryItemsCard_pistolGrip_" + cardSuffix);
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
			if (!window.part || !window.part.pistolGrip) {
				return;
			}
			
			// Update all product cards to default from inventory
			pg_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_pistolGrip001001();
			uiReset_pistolGrip002001();
			
			// Set default quantity = 1 for 00100101
			window.part.pistolGrip["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_PistolGrip();
			
			// Update 3D model after UI update
			updateModel_PistolGrip();
			
			// Handle trigger guard for default pistol grip (00100101)
			handleTriggerGuardForPistolGrip('pistolGrip00100101');
			
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
	// 001001 variants (3 variants)
	for (let i = 1; i <= 3; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_pistolGrip001001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_pistolGrip001001();
				uiReset_pistolGrip002001();
				
				// Set quantity = 1 for selected variant
				window.part.pistolGrip["001"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_PistolGrip();
				
				// Update 3D model after UI update
				const itemsID = "pistolGrip001001" + k;
				handlePistolGripSelection(itemsID);
				
				// Handle trigger guard based on pistol grip selection
				handleTriggerGuardForPistolGrip(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		}
	}

	// 002001 variants (7 variants)
	for (let i = 1; i <= 7; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_pistolGrip002001" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
			// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
				// Reset all products
				uiReset_pistolGrip001001();
				uiReset_pistolGrip002001();
				
				// Set quantity = 1 for selected variant
				window.part.pistolGrip["002"].products["001"].variants[k].quantity = 1;
				
				// Update UI
				uiData_PistolGrip();
				
				// Update 3D model after UI update
				const itemsID = "pistolGrip002001" + k;
				handlePistolGripSelection(itemsID);
				
				// Handle trigger guard based on pistol grip selection
				handleTriggerGuardForPistolGrip(itemsID);
				
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

// Handle trigger guard based on pistol grip selection
function handleTriggerGuardForPistolGrip(itemsID) {
	if (itemsID.startsWith('pistolGrip001001')) {
		// pistolGrip001001: NO TRIGGER GUARD needed (integrated trigger guard)
		// Set all trigger guard quantity to 0
		if (window.part && window.part.triggerGuard) {
			// 001001 variants
			const group001 = window.part.triggerGuard["001"];
			if (group001 && group001.products && group001.products["001"]) {
				Object.keys(group001.products["001"].variants).forEach(k => {
					group001.products["001"].variants[k].quantity = 0;
				});
			}
			// 002001 variants
			const group002 = window.part.triggerGuard["002"];
			if (group002 && group002.products && group002.products["001"]) {
				Object.keys(group002.products["001"].variants).forEach(k => {
					group002.products["001"].variants[k].quantity = 0;
				});
			}
		}
		
		// Hide part card trigger guard
		const partCard = document.getElementById('partCard_triggerGuard');
		if (partCard) {
			partCard.style.display = 'none';
		}
		
		// Hide all summary items cards trigger guard
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			const summaryCard = document.getElementById(`summaryItemsCard_triggerGuard_001001${k}`);
			if (summaryCard) {
				summaryCard.style.display = 'none';
			}
		}
		for (let i = 1; i <= 10; i++) {
			const k = ("" + i).padStart(2, "0");
			const summaryCard = document.getElementById(`summaryItemsCard_triggerGuard_002001${k}`);
			if (summaryCard) {
				summaryCard.style.display = 'none';
			}
		}
		
		// Update trigger guard UI
		if (window.updateModel_TriggerGuard) {
			window.updateModel_TriggerGuard();
		}
		
		// Update summary cards
		if (updateSummaryCards_TriggerGuard) {
			updateSummaryCards_TriggerGuard();
		}
		
	} else if (itemsID.startsWith('pistolGrip002001')) {
		// pistolGrip002001: TRIGGER GUARD needed (separate trigger guard)
		');
		
		// Set all trigger guard quantity to 0 first
		if (window.part && window.part.triggerGuard) {
			// 001001 variants
			const group001 = window.part.triggerGuard["001"];
			if (group001 && group001.products && group001.products["001"]) {
				Object.keys(group001.products["001"].variants).forEach(k => {
					group001.products["001"].variants[k].quantity = 0;
				});
			}
			// 002001 variants
			const group002 = window.part.triggerGuard["002"];
			if (group002 && group002.products && group002.products["001"]) {
				Object.keys(group002.products["001"].variants).forEach(k => {
					group002.products["001"].variants[k].quantity = 0;
				});
			}
		}
		
		// Set default trigger guard (triggerGuard00100101) quantity = 1
		if (window.part && window.part.triggerGuard && window.part.triggerGuard["001"]) {
			const group001 = window.part.triggerGuard["001"];
			if (group001.products && group001.products["001"] && group001.products["001"].variants["01"]) {
				group001.products["001"].variants["01"].quantity = 1;
			}
		}
		
		// Show part card trigger guard
		const partCard = document.getElementById('partCard_triggerGuard');
		if (partCard) {
			partCard.style.display = 'flex';
		}
		
		// Update trigger guard UI
		if (uiData_TriggerGuard) {
			uiData_TriggerGuard();
		}
		
		// Update trigger guard model
		if (window.updateModel_TriggerGuard) {
			window.updateModel_TriggerGuard();
		}
		
		// Update summary cards
		if (updateSummaryCards_TriggerGuard) {
			updateSummaryCards_TriggerGuard();
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
			updateSummaryCards_PistolGrip();
		});
	} else {
	}
}

export function getSelectedPistolGrip() {
	// Check 001001 variants
	{
		const product = window.part.pistolGrip["001"].products["001"];
		for (let i = 1; i <= 3; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	// Check 002001 variants
	{
		const product = window.part.pistolGrip["002"].products["001"];
		for (let i = 1; i <= 7; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getPistolGripTotalPrice() {
	const v = getSelectedPistolGrip();
	return v ? v.price : 0;
}

