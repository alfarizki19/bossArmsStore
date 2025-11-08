// === dataController_BufferAndSpringKit.mjs ===
// Buffer And Spring Kit UI Controller (Lower Category)

console.log("📦 Loading dataController_BufferAndSpringKit.mjs...");

// Import model controller functions (if exists)
// Note: Model controller may not exist yet
let updateModel_BufferAndSpringKit = () => {};
let handleBufferAndSpringKitSelection = () => {};

console.log("✅ dataController_BufferAndSpringKit.mjs loaded");

function bask_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function bask_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function bask_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function bask_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function bask_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

function bask_hideAllPartCardImages() {
	const ids = [
		"partCardImg_bufferAndSpringKit00100101",
	];
	ids.forEach(function (id) { bask_hideElement(id); });
}

export function uiReset_bufferAndSpringKit001001() {
	const group = window.part.bufferAndSpringKit["001"];
	const product = group.products["001"]; // 001001
	product.variants["01"].quantity = 0;

	// Reset product card
	// Note: HTML uses productCard_bufferAndSpringKit_00100101 (with underscore)
	bask_removeClass("productCard_bufferAndSpringKit_00100101", "active");

	// Hide part card images
	bask_hideAllPartCardImages();

	// Reset part card
	bask_setText("partCardName_bufferAndSpringKit", "--- --- ---");
	bask_setText("partCardPrice_bufferAndSpringKit", "----- USD");

	// Hide summary card
	// Note: Check if summary card exists
	const summaryCard = document.getElementById("summaryItemsCard_bufferAndSpringKit_00100101");
	if (summaryCard) bask_hideElement("summaryItemsCard_bufferAndSpringKit_00100101");
}

// Function to update all product card names and prices from inventory
function bask_updateAllProductCards() {
	// 001001
	{
		const group = window.part.bufferAndSpringKit["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		// Note: HTML uses productCardName_bufferAndSpringKit_00100101 and productCardPrice_bufferAndSpringKit_00100101
		const nameId = "productCardName_bufferAndSpringKit_00100101";
		const priceId = "productCardPrice_bufferAndSpringKit_00100101";
		if (document.getElementById(nameId)) {
			bask_setText(nameId, product.productTitle);
		}
		if (document.getElementById(priceId)) {
			bask_setText(priceId, "$" + variant.price + " USD");
		}
	}
}

export function uiData_BufferAndSpringKit() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = "";

	// 001001
	{
		const group = window.part.bufferAndSpringKit["001"];
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
	// Note: HTML uses productCard_bufferAndSpringKit_00100101 (with underscore)
	const productCardId = "productCard_bufferAndSpringKit_00100101";
	const productCard = document.getElementById(productCardId);
	if (productCard) {
		bask_addClass(productCardId, "active");
		console.log("✅ Buffer And Spring Kit: Added active class to", productCardId);
	} else {
		console.warn("⚠️ Buffer And Spring Kit: productCard_bufferAndSpringKit_00100101 not found");
	}
	
	// Update product card name and price
	// Note: HTML uses productCardName_bufferAndSpringKit_00100101 and productCardPrice_bufferAndSpringKit_00100101
	const nameId = "productCardName_bufferAndSpringKit_00100101";
	const priceId = "productCardPrice_bufferAndSpringKit_00100101";
	if (document.getElementById(nameId)) {
		bask_setText(nameId, productTitle);
	}
	if (document.getElementById(priceId)) {
		bask_setText(priceId, "$" + selected.price + " USD");
	}

	// Update part card images - show selected, hide others
	bask_hideAllPartCardImages();
	const partCardImgId = "partCardImg_bufferAndSpringKit" + cardSuffix;
	bask_showElement(partCardImgId);

	// Update part card - format: brand + productTitle
	bask_setText("partCardName_bufferAndSpringKit", brand + " - " + productTitle);
	bask_setText("partCardPrice_bufferAndSpringKit", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	const summaryCardId = "summaryItemsCard_bufferAndSpringKit_" + cardSuffix;
	if (document.getElementById(summaryCardId)) {
		bask_showElement(summaryCardId);
		bask_setText("summaryCardName_bufferAndSpringKit_" + cardSuffix, brand + " - " + productTitle);
		bask_setText("summaryCardPrice_bufferAndSpringKit_" + cardSuffix, "$" + selected.price + " USD");
	}
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_BufferAndSpringKit() {
	// Update all summary card names and prices from inventory
	// 001001
	{
		const group = window.part.bufferAndSpringKit["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		const summaryCardId = "summaryItemsCard_bufferAndSpringKit_00100101";
		if (document.getElementById(summaryCardId)) {
			bask_setText("summaryCardName_bufferAndSpringKit_00100101", group.brand + " - " + product.productTitle);
			bask_setText("summaryCardPrice_bufferAndSpringKit_00100101", "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001
	{
		const product = window.part.bufferAndSpringKit["001"].products["001"];
		const summaryCardId = "summaryItemsCard_bufferAndSpringKit_00100101";
		if (document.getElementById(summaryCardId)) {
			if (product.variants["01"].quantity === 1) {
				bask_showElement(summaryCardId);
			} else {
				bask_hideElement(summaryCardId);
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
			console.log("🎯 Buffer And Spring Kit: Start button clicked");
			
			// Check if data is available
			if (!window.part || !window.part.bufferAndSpringKit) {
				console.error("❌ Buffer And Spring Kit data not loaded yet");
				return;
			}
			
			// Update all product card names and prices from inventory
			bask_updateAllProductCards();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_bufferAndSpringKit001001();
			
			// Set default quantity = 1 for 00100101
			window.part.bufferAndSpringKit["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_BufferAndSpringKit();
			
			// Update 3D model after UI update
			updateModel_BufferAndSpringKit();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
			console.log("✅ Buffer And Spring Kit: Initialized with default 00100101");
		}, true); // Use capture phase
		
		console.log("✅ Buffer And Spring Kit: Start button listener attached");
	} else {
		console.warn("⚠️ Buffer And Spring Kit: loader-start-button not found");
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
	// Note: HTML uses productCard_bufferAndSpringKit_00100101 (with underscore)
	const card001001 = document.getElementById("productCard_bufferAndSpringKit_00100101");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_bufferAndSpringKit001001();
			
			// Set quantity = 1 for selected product
			window.part.bufferAndSpringKit["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_BufferAndSpringKit();
			
			// Update 3D model after UI update
			const itemsID = "bufferAndSpringKit00100101";
			console.log(`🎯 Product card clicked: ${itemsID}`);
			handleBufferAndSpringKitSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	}
	
	console.log("✅ Buffer And Spring Kit: Product card listeners attached");
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
			updateSummaryCards_BufferAndSpringKit();
			console.log("✅ Buffer And Spring Kit: Summary cards updated");
		});
		console.log("✅ Buffer And Spring Kit: Summary chart button listener attached");
	} else {
		console.warn("⚠️ Buffer And Spring Kit: summaryChartButton not found");
	}
}

export function getSelectedBufferAndSpringKit() {
	const a = window.part.bufferAndSpringKit["001"].products["001"].variants;
	if (a["01"].quantity === 1) return a["01"];
	return null;
}

export function getBufferAndSpringKitTotalPrice() {
	const v = getSelectedBufferAndSpringKit();
	return v ? v.price : 0;
}
