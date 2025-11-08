// === dataController_Barrel.mjs ===
// Barrel UI Controller (Upper Category)


// Import model controller functions (if exists)
// Note: Model controller may not exist yet
let updateModel_Barrel = () => {};
let handleBarrelSelection = () => {};


function brl_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function brl_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function brl_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function brl_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function brl_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

function brl_hideAllPartCardImages() {
	const ids = [
		"partCardImg_barrel00200101",
	];
	ids.forEach(function (id) { brl_hideElement(id); });
}

export function uiReset_barrel002001() {
	const group = window.part.barel["002"];
	const product = group.products["001"]; // 002001
	product.variants["01"].quantity = 0;

	// Reset product card
	// Note: HTML uses productCard_barrel002001 (no underscore)
	brl_removeClass("productCard_barrel002001", "active");

	// Hide part card images
	brl_hideAllPartCardImages();

	// Reset part card
	brl_setText("partCardName_barrel", "--- --- ---");
	brl_setText("partCardPrice_barrel", "----- USD");

	// Hide summary card
	// Note: Check if summary card exists (HTML uses "barel" not "barrel")
	const summaryCard = document.getElementById("summaryItemsCard_barel_00200101");
	if (summaryCard) brl_hideElement("summaryItemsCard_barel_00200101");
}

// Function to update all product card names and prices from inventory
function brl_updateAllProductCards() {
	// 002001
	{
		const group = window.part.barel["002"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		// Note: HTML uses productCardName_barel_00200101 and productCardPrice_barel_00200101
		const nameId = "productCardName_barel_00200101";
		const priceId = "productCardPrice_barel_00200101";
		if (document.getElementById(nameId)) {
			brl_setText(nameId, product.productTitle);
		}
		if (document.getElementById(priceId)) {
			brl_setText(priceId, "$" + variant.price + " USD");
		}
	}
}

export function uiData_Barrel() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = "";

	// 002001
	{
		const group = window.part.barel["002"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; 
			cardSuffix = "00200101"; 
			productTitle = product.productTitle;
			brand = group.brand;
		}
	}

	if (!selected || !cardSuffix) return;

	// Update product card
	// Note: HTML uses productCard_barrel002001 (no underscore)
	const productCardId = "productCard_barrel002001";
	const productCard = document.getElementById(productCardId);
	if (productCard) {
		brl_addClass(productCardId, "active");
	} else {
		console.warn("⚠️ Barrel: productCard_barrel002001 not found");
	}
	// Also try alternative ID if exists
	const altProductCardId = "productCard_barel_00200101";
	const altCard = document.getElementById(altProductCardId);
	if (altCard) {
		brl_addClass(altProductCardId, "active");
	}
	
	// Update product card name and price
	// Note: HTML uses productCardName_barel_00200101 and productCardPrice_barel_00200101
	const nameId = "productCardName_barel_00200101";
	const priceId = "productCardPrice_barel_00200101";
	if (document.getElementById(nameId)) {
		brl_setText(nameId, productTitle);
	}
	if (document.getElementById(priceId)) {
		brl_setText(priceId, "$" + selected.price + " USD");
	}

	// Update part card images - show selected, hide others
	brl_hideAllPartCardImages();
	// Note: HTML uses "barel" (typo) not "barrel"
	const partCardImgId = "partCardImg_barel" + cardSuffix;
	brl_showElement(partCardImgId);

	// Update part card - format: brand + productTitle
	brl_setText("partCardName_barrel", brand + " - " + productTitle);
	brl_setText("partCardPrice_barrel", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	// Note: HTML uses "barel" (typo) not "barrel"
	const summaryCardId = "summaryItemsCard_barel_" + cardSuffix;
	if (document.getElementById(summaryCardId)) {
		brl_showElement(summaryCardId);
		brl_setText("summaryCardName_barel_" + cardSuffix, brand + " - " + productTitle);
		brl_setText("summaryCardPrice_barel_" + cardSuffix, "$" + selected.price + " USD");
	}
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_Barrel() {
	// Update all summary card names and prices from inventory
	// 002001
	{
		const group = window.part.barel["002"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		const summaryCardId = "summaryItemsCard_barel_00200101";
		if (document.getElementById(summaryCardId)) {
			brl_setText("summaryCardName_barel_00200101", group.brand + " - " + product.productTitle);
			brl_setText("summaryCardPrice_barel_00200101", "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 002001
	{
		const product = window.part.barel["002"].products["001"];
		const summaryCardId = "summaryItemsCard_barel_00200101";
		if (document.getElementById(summaryCardId)) {
			if (product.variants["01"].quantity === 1) {
				brl_showElement(summaryCardId);
			} else {
				brl_hideElement(summaryCardId);
			}
		}
	}
}

// Start default -> 002001 variant 01
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
			if (!window.part || !window.part.barel) {
				console.error("❌ Barrel data not loaded yet");
				return;
			}
			
			// Update all product card names and prices from inventory
			brl_updateAllProductCards();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_barrel002001();
			
			// Set default quantity = 1 for 00200101
			window.part.barel["002"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_Barrel();
			
			// Update 3D model after UI update
			updateModel_Barrel();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
		}, true); // Use capture phase
		
	} else {
		console.warn("⚠️ Barrel: loader-start-button not found");
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
	// 002001 -> 01
	// Note: HTML uses productCard_barrel002001 (no underscore)
	const card002001 = document.getElementById("productCard_barrel002001");
	if (card002001) {
		// Use capture phase to run before onclick
		card002001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_barrel002001();
			
			// Set quantity = 1 for selected product
			window.part.barel["002"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_Barrel();
			
			// Update 3D model after UI update
			const itemsID = "barel00200101";
			handleBarrelSelection(itemsID);
			
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
			updateSummaryCards_Barrel();
		});
	} else {
		console.warn("⚠️ Barrel: summaryChartButton not found");
	}
}

export function getSelectedBarrel() {
	const a = window.part.barel["002"].products["001"].variants;
	if (a["01"].quantity === 1) return a["01"];
	return null;
}

export function getBarrelTotalPrice() {
	const v = getSelectedBarrel();
	return v ? v.price : 0;
}
