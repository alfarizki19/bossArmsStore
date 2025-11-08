// === dataController_BoltCatch.mjs ===
// Bolt Catch Assembly UI Controller (Lower Category)
// Import model controller functions (if exists)
// Note: Model controller may not exist yet
let updateModel_BoltCatch = () => {};
let handleBoltCatchSelection = () => {};
function bca_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function bca_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function bca_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function bca_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function bca_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

function bca_hideAllPartCardImages() {
	const ids = [
		"partCardImg_boltCatch00100101",
	];
	ids.forEach(function (id) { bca_hideElement(id); });
}

export function uiReset_boltCatch001001() {
	const group = window.part.boltCatch["001"];
	const product = group.products["001"]; // 001001
	product.variants["01"].quantity = 0;

	// Reset product card
	// Note: HTML uses productCard_boltCatch_00100101 (with underscore)
	bca_removeClass("productCard_boltCatch_00100101", "active");

	// Hide part card images
	bca_hideAllPartCardImages();

	// Reset part card
	bca_setText("partCardName_boltCatch", "--- --- ---");
	bca_setText("partCardPrice_boltCatch", "----- USD");

	// Hide summary card
	// Note: Check if summary card exists
	const summaryCard = document.getElementById("summaryItemsCard_boltCatch_00100101");
	if (summaryCard) bca_hideElement("summaryItemsCard_boltCatch_00100101");
}

// Function to update all product card names and prices from inventory
function bca_updateAllProductCards() {
	// 001001
	{
		const group = window.part.boltCatch["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		// Note: HTML uses productCardName_boltCatch_00100101 and productCardPrice_boltCatch_00100101
		const nameId = "productCardName_boltCatch_00100101";
		const priceId = "productCardPrice_boltCatch_00100101";
		if (document.getElementById(nameId)) {
			bca_setText(nameId, product.productTitle);
		}
		if (document.getElementById(priceId)) {
			bca_setText(priceId, "$" + variant.price + " USD");
		}
	}
}

export function uiData_BoltCatch() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = "";

	// 001001
	{
		const group = window.part.boltCatch["001"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; 
			cardSuffix = "00100101"; 
			productTitle = product.productTitle;
			brand = group.brand;
		}
	}

	if (!selected || !cardSuffix) return;

	// Update product card
	// Note: HTML uses productCard_boltCatch_00100101 (with underscore)
	const productCardId = "productCard_boltCatch_00100101";
	const productCard = document.getElementById(productCardId);
	if (productCard) {
		bca_addClass(productCardId, "active");
	} else {
	}
	
	// Update product card name and price
	// Note: HTML uses productCardName_boltCatch_00100101 and productCardPrice_boltCatch_00100101
	const nameId = "productCardName_boltCatch_00100101";
	const priceId = "productCardPrice_boltCatch_00100101";
	if (document.getElementById(nameId)) {
		bca_setText(nameId, productTitle);
	}
	if (document.getElementById(priceId)) {
		bca_setText(priceId, "$" + selected.price + " USD");
	}

	// Update part card images - show selected, hide others
	bca_hideAllPartCardImages();
	const partCardImgId = "partCardImg_boltCatch" + cardSuffix;
	bca_showElement(partCardImgId);

	// Update part card - format: brand + productTitle
	bca_setText("partCardName_boltCatch", brand + " - " + productTitle);
	bca_setText("partCardPrice_boltCatch", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	const summaryCardId = "summaryItemsCard_boltCatch_" + cardSuffix;
	if (document.getElementById(summaryCardId)) {
		bca_showElement(summaryCardId);
		bca_setText("summaryCardName_boltCatch_" + cardSuffix, brand + " - " + productTitle);
		bca_setText("summaryCardPrice_boltCatch_" + cardSuffix, "$" + selected.price + " USD");
	}
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_BoltCatch() {
	// Update all summary card names and prices from inventory
	// 001001
	{
		const group = window.part.boltCatch["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		const summaryCardId = "summaryItemsCard_boltCatch_00100101";
		if (document.getElementById(summaryCardId)) {
			bca_setText("summaryCardName_boltCatch_00100101", group.brand + " - " + product.productTitle);
			bca_setText("summaryCardPrice_boltCatch_00100101", "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001
	{
		const product = window.part.boltCatch["001"].products["001"];
		const summaryCardId = "summaryItemsCard_boltCatch_00100101";
		if (document.getElementById(summaryCardId)) {
			if (product.variants["01"].quantity === 1) {
				bca_showElement(summaryCardId);
			} else {
				bca_hideElement(summaryCardId);
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
			if (!window.part || !window.part.boltCatch) {
				return;
			}
			
			// Update all product card names and prices from inventory
			bca_updateAllProductCards();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_boltCatch001001();
			
			// Set default quantity = 1 for 00100101
			window.part.boltCatch["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_BoltCatch();
			
			// Update 3D model after UI update
			updateModel_BoltCatch();
			
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
	// Note: HTML uses productCard_boltCatch_00100101 (with underscore)
	const card001001 = document.getElementById("productCard_boltCatch_00100101");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_boltCatch001001();
			
			// Set quantity = 1 for selected product
			window.part.boltCatch["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_BoltCatch();
			
			// Update 3D model after UI update
			const itemsID = "boltCatch00100101";
			handleBoltCatchSelection(itemsID);
			
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
			updateSummaryCards_BoltCatch();
		});
	} else {
	}
}

export function getSelectedBoltCatch() {
	const a = window.part.boltCatch["001"].products["001"].variants;
	if (a["01"].quantity === 1) return a["01"];
	return null;
}

export function getBoltCatchTotalPrice() {
	const v = getSelectedBoltCatch();
	return v ? v.price : 0;
}
