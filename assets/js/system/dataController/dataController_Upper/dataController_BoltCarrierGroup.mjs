// === dataController_BoltCarrierGroup.mjs ===
// Bolt Carrier Group UI Controller (Upper Category)
// Import model controller functions
import { updateModel_BoltCarrierGroup, handleBoltCarrierGroupSelection } from '../../modelController/modelController_Upper/modelController_BoltCarrierGroup.mjs';
function bcg_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function bcg_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function bcg_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function bcg_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function bcg_hideElement(id) {
	const el = document.getElementById(id);
		if (el) el.style.display = "none";
}

function bcg_hideAllPartCardImages() {
	const ids = [
		"partCardImg_boltCarrierGroup00100101",
		"partCardImg_boltCarrierGroup00200101",
		"partCardImg_boltCarrierGroup00200201",
	];
	ids.forEach(function (id) { bcg_hideElement(id); });
}

export function uiReset_boltCarrierGroup001001() {
	const group = window.part.boltCarrierGroup["001"];
	const product = group.products["001"]; // 001001
	product.variants["01"].quantity = 0;

	// Reset product card
	bcg_setText("productCardName_boltCarrierGroup_00100101", product.productTitle);
	bcg_setText("productCardPrice_boltCarrierGroup_00100101", "$" + product.variants["01"].price + " USD");
	bcg_removeClass("productCard_boltCarrierGroup_00100101", "active");

	// Hide part card images
	bcg_hideAllPartCardImages();

	// Reset part card
	bcg_setText("partCardName_boltCarrierGroup", "--- --- ---");
	bcg_setText("partCardPrice_boltCarrierGroup", "----- USD");

	// Hide summary card
	bcg_hideElement("summaryItemsCard_boltCarrierGroup_00100101");
}

export function uiReset_boltCarrierGroup002001() {
	const group = window.part.boltCarrierGroup["002"];
	const product = group.products["001"]; // 002001
	product.variants["01"].quantity = 0;

	// Reset product card
	bcg_setText("productCardName_boltCarrierGroup_00200101", product.productTitle);
	bcg_setText("productCardPrice_boltCarrierGroup_00200101", "$" + product.variants["01"].price + " USD");
	bcg_removeClass("productCard_boltCarrierGroup_00200101", "active");

	// Hide part card images
	bcg_hideAllPartCardImages();

	// Reset part card
	bcg_setText("partCardName_boltCarrierGroup", "--- --- ---");
	bcg_setText("partCardPrice_boltCarrierGroup", "----- USD");

	// Hide summary card
	bcg_hideElement("summaryItemsCard_boltCarrierGroup_00200101");
}

export function uiReset_boltCarrierGroup002002() {
	const group = window.part.boltCarrierGroup["002"];
	const product = group.products["002"]; // 002002
	product.variants["01"].quantity = 0;

	// Reset product card
	bcg_setText("productCardName_boltCarrierGroup_00200201", product.productTitle);
	bcg_setText("productCardPrice_boltCarrierGroup_00200201", "$" + product.variants["01"].price + " USD");
	bcg_removeClass("productCard_boltCarrierGroup_00200201", "active");

	// Hide part card images
	bcg_hideAllPartCardImages();

	// Reset part card
	bcg_setText("partCardName_boltCarrierGroup", "--- --- ---");
	bcg_setText("partCardPrice_boltCarrierGroup", "----- USD");

	// Hide summary card
	bcg_hideElement("summaryItemsCard_boltCarrierGroup_00200201");
}

// Function to update all product card names and prices from inventory
function bcg_updateAllProductCards() {
	// 001001
	{
		const group = window.part.boltCarrierGroup["001"];
		const product = group.products["001"];
		bcg_setText("productCardName_boltCarrierGroup_00100101", product.productTitle);
		bcg_setText("productCardPrice_boltCarrierGroup_00100101", "$" + product.variants["01"].price + " USD");
	}
	// 002001
	{
		const group = window.part.boltCarrierGroup["002"];
		const product = group.products["001"];
		bcg_setText("productCardName_boltCarrierGroup_00200101", product.productTitle);
		bcg_setText("productCardPrice_boltCarrierGroup_00200101", "$" + product.variants["01"].price + " USD");
	}
	// 002002
	{
		const group = window.part.boltCarrierGroup["002"];
		const product = group.products["002"];
		bcg_setText("productCardName_boltCarrierGroup_00200201", product.productTitle);
		bcg_setText("productCardPrice_boltCarrierGroup_00200201", "$" + product.variants["01"].price + " USD");
	}
}

export function uiData_BoltCarrierGroup() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = "";

	// 001001
	{
		const group = window.part.boltCarrierGroup["001"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; 
			cardSuffix = "00100101"; 
			productTitle = product.productTitle;
			brand = group.brand;
		}
	}
	// 002001
	{
		const group = window.part.boltCarrierGroup["002"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; 
			cardSuffix = "00200101"; 
			productTitle = product.productTitle;
			brand = group.brand;
		}
	}
	// 002002
	{
		const group = window.part.boltCarrierGroup["002"];
		const product = group.products["002"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; 
			cardSuffix = "00200201"; 
			productTitle = product.productTitle;
			brand = group.brand;
		}
	}

	if (!selected || !cardSuffix) return;

	// Update product card
	const productCardId = "productCard_boltCarrierGroup_" + cardSuffix;
	bcg_setText("productCardPrice_boltCarrierGroup_" + cardSuffix, "$" + selected.price + " USD");
	bcg_addClass(productCardId, "active");

	// Update part card images - show selected, hide others
	bcg_hideAllPartCardImages();
	const partCardImgId = "partCardImg_boltCarrierGroup" + cardSuffix;
	bcg_showElement(partCardImgId);

	// Update part card - format: brand + productTitle
	bcg_setText("partCardName_boltCarrierGroup", brand + " - " + productTitle);
	bcg_setText("partCardPrice_boltCarrierGroup", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	bcg_hideElement("summaryItemsCard_boltCarrierGroup_00100101");
	bcg_hideElement("summaryItemsCard_boltCarrierGroup_00200101");
	bcg_hideElement("summaryItemsCard_boltCarrierGroup_00200201");
	
	const summaryCardId = "summaryItemsCard_boltCarrierGroup_" + cardSuffix;
	bcg_showElement(summaryCardId);
	bcg_setText("summaryCardName_boltCarrierGroup_" + cardSuffix, brand + " - " + productTitle);
	bcg_setText("summaryCardPrice_boltCarrierGroup_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_BoltCarrierGroup() {
	// Update all summary card names and prices from inventory
	// 001001
	{
		const group = window.part.boltCarrierGroup["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		bcg_setText("summaryCardName_boltCarrierGroup_00100101", group.brand + " - " + product.productTitle);
		bcg_setText("summaryCardPrice_boltCarrierGroup_00100101", "$" + variant.price + " USD");
	}
	// 002001
	{
		const group = window.part.boltCarrierGroup["002"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		bcg_setText("summaryCardName_boltCarrierGroup_00200101", group.brand + " - " + product.productTitle);
		bcg_setText("summaryCardPrice_boltCarrierGroup_00200101", "$" + variant.price + " USD");
	}
	// 002002
	{
		const group = window.part.boltCarrierGroup["002"];
		const product = group.products["002"];
		const variant = product.variants["01"];
		bcg_setText("summaryCardName_boltCarrierGroup_00200201", group.brand + " - " + product.productTitle);
		bcg_setText("summaryCardPrice_boltCarrierGroup_00200201", "$" + variant.price + " USD");
	}

	// Show/hide summary cards based on quantity
	// 001001
	{
		const product = window.part.boltCarrierGroup["001"].products["001"];
		if (product.variants["01"].quantity === 1) {
			bcg_showElement("summaryItemsCard_boltCarrierGroup_00100101");
		} else {
			bcg_hideElement("summaryItemsCard_boltCarrierGroup_00100101");
		}
	}
	// 002001
	{
		const product = window.part.boltCarrierGroup["002"].products["001"];
		if (product.variants["01"].quantity === 1) {
			bcg_showElement("summaryItemsCard_boltCarrierGroup_00200101");
		} else {
			bcg_hideElement("summaryItemsCard_boltCarrierGroup_00200101");
		}
	}
	// 002002
	{
		const product = window.part.boltCarrierGroup["002"].products["002"];
		if (product.variants["01"].quantity === 1) {
			bcg_showElement("summaryItemsCard_boltCarrierGroup_00200201");
		} else {
			bcg_hideElement("summaryItemsCard_boltCarrierGroup_00200201");
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
			if (!window.part || !window.part.boltCarrierGroup) {
				return;
			}
			
			// Update all product card names and prices from inventory
			bcg_updateAllProductCards();
			
			// Reset all products (set quantity = 0, remove active class)
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
			
			// Set default quantity = 1 for 00100101
        window.part.boltCarrierGroup["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
        uiData_BoltCarrierGroup();
			
			// Update 3D model after UI update
			updateModel_BoltCarrierGroup();
			
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

// Product card click listeners
// Use DOMContentLoaded to ensure elements exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', setupProductCardListeners);
} else {
	// DOM already loaded
	setupProductCardListeners();
}

function setupProductCardListeners() {
	// 001001 -> 01
	const card001001 = document.getElementById("productCard_boltCarrierGroup_00100101");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all products
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
			
			// Set quantity = 1 for selected product
        window.part.boltCarrierGroup["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
        uiData_BoltCarrierGroup();
		
		// Update 3D model after UI update
		const itemsID = "boltCarrierGroup00100101";
		handleBoltCarrierGroupSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	}

	// 002001 -> 01
	const card002001 = document.getElementById("productCard_boltCarrierGroup_00200101");
	if (card002001) {
		// Use capture phase to run before onclick
		card002001.addEventListener("click", function (e) {
			// Reset all products
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
			
			// Set quantity = 1 for selected product
        window.part.boltCarrierGroup["002"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
        uiData_BoltCarrierGroup();
		
		// Update 3D model after UI update
		const itemsID = "boltCarrierGroup00200101";
		handleBoltCarrierGroupSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	}

	// 002002 -> 01
	const card002002 = document.getElementById("productCard_boltCarrierGroup_00200201");
	if (card002002) {
		// Use capture phase to run before onclick
		card002002.addEventListener("click", function (e) {
			// Reset all products
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
			
			// Set quantity = 1 for selected product
        window.part.boltCarrierGroup["002"].products["002"].variants["01"].quantity = 1;
			
			// Update UI
        uiData_BoltCarrierGroup();
		
		// Update 3D model after UI update
		const itemsID = "boltCarrierGroup00200201";
		handleBoltCarrierGroupSelection(itemsID);
			
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
			updateSummaryCards_BoltCarrierGroup();
		});
	} else {
	}
}

export function getSelectedBoltCarrierGroup() {
	const a = window.part.boltCarrierGroup["001"].products["001"].variants;
	const b = window.part.boltCarrierGroup["002"].products["001"].variants;
	const c = window.part.boltCarrierGroup["002"].products["002"].variants;
	if (a["01"].quantity === 1) return a["01"];
	if (b["01"].quantity === 1) return b["01"];
	if (c["01"].quantity === 1) return c["01"];
	return null;
}

export function getBoltCarrierGroupTotalPrice() {
	const v = getSelectedBoltCarrierGroup();
	return v ? v.price : 0;
}