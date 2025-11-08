// === dataController_BufferTube.mjs ===
// Buffer Tube UI Controller (Lower Category)

console.log("📦 Loading dataController_BufferTube.mjs...");

// Import model controller functions (if exists)
// Note: Model controller may not exist yet
let updateModel_BufferTube = () => {};
let handleBufferTubeSelection = () => {};

console.log("✅ dataController_BufferTube.mjs loaded");

function bt_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function bt_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function bt_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function bt_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function bt_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

function bt_hideAllPartCardImages() {
	const ids = [
		"partCardImg_bufferTube00100101",
	];
	ids.forEach(function (id) { bt_hideElement(id); });
}

export function uiReset_bufferTube001001() {
	const group = window.part.bufferTube["001"];
	const product = group.products["001"]; // 001001
	product.variants["01"].quantity = 0;

	// Reset product card
	// Note: HTML uses productCard_bufferTube_00100101 (with underscore)
	bt_removeClass("productCard_bufferTube_00100101", "active");

	// Hide part card images
	bt_hideAllPartCardImages();

	// Reset part card
	bt_setText("partCardName_bufferTube", "--- --- ---");
	bt_setText("partCardPrice_bufferTube", "----- USD");

	// Hide summary card
	// Note: Check if summary card exists
	const summaryCard = document.getElementById("summaryItemsCard_bufferTube_00100101");
	if (summaryCard) bt_hideElement("summaryItemsCard_bufferTube_00100101");
}

// Function to update all product card names and prices from inventory
function bt_updateAllProductCards() {
	// 001001
	{
		const group = window.part.bufferTube["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		// Note: HTML uses productCardName_bufferTube_00100101 and productCardPrice_bufferTube_00100101
		const nameId = "productCardName_bufferTube_00100101";
		const priceId = "productCardPrice_bufferTube_00100101";
		if (document.getElementById(nameId)) {
			bt_setText(nameId, product.productTitle);
		}
		if (document.getElementById(priceId)) {
			bt_setText(priceId, "$" + variant.price + " USD");
		}
	}
}

export function uiData_BufferTube() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = "";

	// 001001
	{
		const group = window.part.bufferTube["001"];
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
	// Note: HTML uses productCard_bufferTube_00100101 (with underscore)
	const productCardId = "productCard_bufferTube_00100101";
	const productCard = document.getElementById(productCardId);
	if (productCard) {
		bt_addClass(productCardId, "active");
		console.log("✅ Buffer Tube: Added active class to", productCardId);
	} else {
		console.warn("⚠️ Buffer Tube: productCard_bufferTube_00100101 not found");
	}
	
	// Update product card name and price
	// Note: HTML uses productCardName_bufferTube_00100101 and productCardPrice_bufferTube_00100101
	const nameId = "productCardName_bufferTube_00100101";
	const priceId = "productCardPrice_bufferTube_00100101";
	if (document.getElementById(nameId)) {
		bt_setText(nameId, productTitle);
	}
	if (document.getElementById(priceId)) {
		bt_setText(priceId, "$" + selected.price + " USD");
	}

	// Update part card images - show selected, hide others
	bt_hideAllPartCardImages();
	const partCardImgId = "partCardImg_bufferTube" + cardSuffix;
	bt_showElement(partCardImgId);

	// Update part card - format: brand + productTitle
	bt_setText("partCardName_bufferTube", brand + " - " + productTitle);
	bt_setText("partCardPrice_bufferTube", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	const summaryCardId = "summaryItemsCard_bufferTube_" + cardSuffix;
	if (document.getElementById(summaryCardId)) {
		bt_showElement(summaryCardId);
		bt_setText("summaryCardName_bufferTube_" + cardSuffix, brand + " - " + productTitle);
		bt_setText("summaryCardPrice_bufferTube_" + cardSuffix, "$" + selected.price + " USD");
	}
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_BufferTube() {
	// Update all summary card names and prices from inventory
	// 001001
	{
		const group = window.part.bufferTube["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		const summaryCardId = "summaryItemsCard_bufferTube_00100101";
		if (document.getElementById(summaryCardId)) {
			bt_setText("summaryCardName_bufferTube_00100101", group.brand + " - " + product.productTitle);
			bt_setText("summaryCardPrice_bufferTube_00100101", "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001
	{
		const product = window.part.bufferTube["001"].products["001"];
		const summaryCardId = "summaryItemsCard_bufferTube_00100101";
		if (document.getElementById(summaryCardId)) {
			if (product.variants["01"].quantity === 1) {
				bt_showElement(summaryCardId);
			} else {
				bt_hideElement(summaryCardId);
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
			console.log("🎯 Buffer Tube: Start button clicked");
			
			// Check if data is available
			if (!window.part || !window.part.bufferTube) {
				console.error("❌ Buffer Tube data not loaded yet");
				return;
			}
			
			// Update all product card names and prices from inventory
			bt_updateAllProductCards();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_bufferTube001001();
			
			// Set default quantity = 1 for 00100101
			window.part.bufferTube["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_BufferTube();
			
			// Update 3D model after UI update
			updateModel_BufferTube();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
			console.log("✅ Buffer Tube: Initialized with default 00100101");
		}, true); // Use capture phase
		
		console.log("✅ Buffer Tube: Start button listener attached");
	} else {
		console.warn("⚠️ Buffer Tube: loader-start-button not found");
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
	// Note: HTML uses productCard_bufferTube_00100101 (with underscore)
	const card001001 = document.getElementById("productCard_bufferTube_00100101");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_bufferTube001001();
			
			// Set quantity = 1 for selected product
			window.part.bufferTube["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_BufferTube();
			
			// Update 3D model after UI update
			const itemsID = "bufferTube00100101";
			console.log(`🎯 Product card clicked: ${itemsID}`);
			handleBufferTubeSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	}
	
	console.log("✅ Buffer Tube: Product card listeners attached");
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
			updateSummaryCards_BufferTube();
			console.log("✅ Buffer Tube: Summary cards updated");
		});
		console.log("✅ Buffer Tube: Summary chart button listener attached");
	} else {
		console.warn("⚠️ Buffer Tube: summaryChartButton not found");
	}
}

export function getSelectedBufferTube() {
	const a = window.part.bufferTube["001"].products["001"].variants;
	if (a["01"].quantity === 1) return a["01"];
	return null;
}

export function getBufferTubeTotalPrice() {
	const v = getSelectedBufferTube();
	return v ? v.price : 0;
}
