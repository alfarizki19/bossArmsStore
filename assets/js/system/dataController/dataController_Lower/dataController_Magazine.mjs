// === dataController_Magazine.mjs ===
// Magazine UI Controller (Lower Category)

// Import model controller functions
import { updateModel_Magazine, handleMagazineSelection } from '../../modelController/modelController_Lower/modelController_Magazine.mjs';

function mag_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function mag_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function mag_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function mag_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function mag_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

function mag_hideAllPartCardImages() {
	const ids = [
		"partCardImg_magazine00100101",
		"partCardImg_magazine00200101",
	];
	ids.forEach(function (id) { mag_hideElement(id); });
}

export function uiReset_magazine001001() {
	const group = window.part.magazine["001"];
	const product = group.products["001"]; // 001001
	product.variants["01"].quantity = 0;

	// Reset product card
	mag_setText("productCardName_magazine_00100101", product.productTitle);
	mag_setText("productCardPrice_magazine_00100101", "$" + product.variants["01"].price + " USD");
	mag_removeClass("productCard_magazine_00100101", "active");

	// Hide part card images
	mag_hideAllPartCardImages();

	// Reset part card
	mag_setText("partCardName_magazine", "--- --- ---");
	mag_setText("partCardPrice_magazine", "----- USD");

	// Hide summary card
	mag_hideElement("summaryItemsCard_magazine_00100101");
}

export function uiReset_magazine002001() {
	const group = window.part.magazine["002"];
	const product = group.products["001"]; // 002001
	product.variants["01"].quantity = 0;

	// Reset product card
	mag_setText("productCardName_magazine_00200101", product.productTitle);
	mag_setText("productCardPrice_magazine_00200101", "$" + product.variants["01"].price + " USD");
	mag_removeClass("productCard_magazine_00200101", "active");

	// Hide part card images
	mag_hideAllPartCardImages();

	// Reset part card
	mag_setText("partCardName_magazine", "--- --- ---");
	mag_setText("partCardPrice_magazine", "----- USD");

	// Hide summary card
	mag_hideElement("summaryItemsCard_magazine_00200101");
}

// Function to update all product card names and prices from inventory
function mag_updateAllProductCards() {
	// 001001
	{
		const group = window.part.magazine["001"];
		const product = group.products["001"];
		mag_setText("productCardName_magazine_00100101", product.productTitle);
		mag_setText("productCardPrice_magazine_00100101", "$" + product.variants["01"].price + " USD");
	}
	// 002001
	{
		const group = window.part.magazine["002"];
		const product = group.products["001"];
		mag_setText("productCardName_magazine_00200101", product.productTitle);
		mag_setText("productCardPrice_magazine_00200101", "$" + product.variants["01"].price + " USD");
	}
}

export function uiData_Magazine() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = "";

	// 001001
	{
		const group = window.part.magazine["001"];
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
		const group = window.part.magazine["002"];
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
	const productCardId = "productCard_magazine_" + cardSuffix;
	mag_setText("productCardPrice_magazine_" + cardSuffix, "$" + selected.price + " USD");
	mag_addClass(productCardId, "active");

	// Update part card images - show selected, hide others
	mag_hideAllPartCardImages();
	const partCardImgId = "partCardImg_magazine" + cardSuffix;
	mag_showElement(partCardImgId);

	// Update part card - format: brand + productTitle
	mag_setText("partCardName_magazine", brand + " - " + productTitle);
	mag_setText("partCardPrice_magazine", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	mag_hideElement("summaryItemsCard_magazine_00100101");
	mag_hideElement("summaryItemsCard_magazine_00200101");
	
	const summaryCardId = "summaryItemsCard_magazine_" + cardSuffix;
	mag_showElement(summaryCardId);
	mag_setText("summaryCardName_magazine_" + cardSuffix, brand + " - " + productTitle);
	mag_setText("summaryCardPrice_magazine_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_Magazine() {
	// Update all summary card names and prices from inventory
	// 001001
	{
		const group = window.part.magazine["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		mag_setText("summaryCardName_magazine_00100101", group.brand + " - " + product.productTitle);
		mag_setText("summaryCardPrice_magazine_00100101", "$" + variant.price + " USD");
	}
	// 002001
	{
		const group = window.part.magazine["002"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		mag_setText("summaryCardName_magazine_00200101", group.brand + " - " + product.productTitle);
		mag_setText("summaryCardPrice_magazine_00200101", "$" + variant.price + " USD");
	}

	// Show/hide summary cards based on quantity
	// 001001
	{
		const product = window.part.magazine["001"].products["001"];
		if (product.variants["01"].quantity === 1) {
			mag_showElement("summaryItemsCard_magazine_00100101");
		} else {
			mag_hideElement("summaryItemsCard_magazine_00100101");
		}
	}
	// 002001
	{
		const product = window.part.magazine["002"].products["001"];
		if (product.variants["01"].quantity === 1) {
			mag_showElement("summaryItemsCard_magazine_00200101");
		} else {
			mag_hideElement("summaryItemsCard_magazine_00200101");
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
			if (!window.part || !window.part.magazine) {
				console.error("❌ Magazine data not loaded yet");
				return;
			}
			
			// Update all product card names and prices from inventory
			mag_updateAllProductCards();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_magazine001001();
			uiReset_magazine002001();
			
			// Set default quantity = 1 for 00100101
			window.part.magazine["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_Magazine();
			
			// Update 3D model after UI update
			updateModel_Magazine();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
}, true); // Use capture phase
		
} else {
		console.warn("⚠️ Magazine: loader-start-button not found");
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
	const card001001 = document.getElementById("productCard_magazine_00100101");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_magazine001001();
			uiReset_magazine002001();
			
			// Set quantity = 1 for selected product
			window.part.magazine["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_Magazine();
			
			// Update 3D model after UI update
			const itemsID = "magazine00100101";
handleMagazineSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	}

	// 002001 -> 01
	const card002001 = document.getElementById("productCard_magazine_00200101");
	if (card002001) {
		// Use capture phase to run before onclick
		card002001.addEventListener("click", function (e) {
			// Reset all products
			uiReset_magazine001001();
			uiReset_magazine002001();
			
			// Set quantity = 1 for selected product
			window.part.magazine["002"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_Magazine();
			
			// Update 3D model after UI update
			const itemsID = "magazine00200101";
handleMagazineSelection(itemsID);
			
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
			updateSummaryCards_Magazine();
});
} else {
		console.warn("⚠️ Magazine: summaryChartButton not found");
	}
}

export function getSelectedMagazine() {
	const a = window.part.magazine["001"].products["001"].variants;
	const b = window.part.magazine["002"].products["001"].variants;
	if (a["01"].quantity === 1) return a["01"];
	if (b["01"].quantity === 1) return b["01"];
	return null;
}

export function getMagazineTotalPrice() {
	const v = getSelectedMagazine();
	return v ? v.price : 0;
}
