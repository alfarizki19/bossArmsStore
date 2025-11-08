// === dataController_Warden.mjs ===
// Warden UI Controller (Upper Category) — part of Muzzle Device (001003)


// Import model controller functions
import { updateModel_MuzzleDevice, handleMuzzleDeviceSelection } from '../../modelController/modelController_Upper/modelController_MuzzleDevice.mjs';

// Import model controller functions (if exists) - legacy support
let updateModel_Warden = () => {};
let handleWardenSelection = () => {};

try {
	const modelModule = await import('../../modelController/modelController_Upper/modelController_Warden.mjs');
	updateModel_Warden = modelModule.updateModel_Warden || updateModel_Warden;
	handleWardenSelection = modelModule.handleWardenSelection || handleWardenSelection;
} catch(e) {
}


function wd_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function wd_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function wd_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function wd_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function wd_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Reset all Warden quantities to 0
function wd_zeroWardenQuantities() {
	try {
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		if (product && product.variants) {
			if (product.variants["01"]) product.variants["01"].quantity = 0;
			if (product.variants["02"]) product.variants["02"].quantity = 0;
		}
	} catch(e) {
		console.warn("⚠️ Warden: Error zeroing quantities", e);
	}
}

// Reset product cards to default (remove active class)
function wd_resetAllProductCards() {
	wd_removeClass("productCard_muzzleDevice00100301", "active");
	wd_removeClass("productCard_muzzleDevice00100302", "active");
	wd_removeClass("productCard_NoSelected_warden", "active");
}

// Update product cards to default from inventory
function wd_updateAllProductCardsToDefault() {
	// 00100301 - default
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		const variant01 = product.variants["01"];
		wd_setText("productCardName_muzzleDevice00100301", product.productTitle + " (" + variant01.variantTitle + ")");
		wd_setText("productCardPrice_muzzleDevice00100301", "$" + variant01.price + " USD");
	}
	// 00100302 - default
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		const variant02 = product.variants["02"];
		wd_setText("productCardName_muzzleDevice00100302", product.productTitle + " (" + variant02.variantTitle + ")");
		wd_setText("productCardPrice_muzzleDevice00100302", "$" + variant02.price + " USD");
	}
	// Reset all product cards to default (no active)
	wd_resetAllProductCards();
	// Set NoSelected active by default
	wd_addClass("productCard_NoSelected_warden", "active");
}

// Reset all Warden variants
export function uiReset_warden() {
	wd_zeroWardenQuantities();
	wd_resetAllProductCards();
}

// Update UI based on selected Warden
export function uiData_Warden() {
	
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 00100301
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"];
			cardSuffix = "00100301";
			productTitle = product.productTitle;
			brand = group.brand;
			variantTitle = selected.variantTitle;
		}
	}
	
	// Check 00100302
	if (!selected) {
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		if (product.variants["02"].quantity === 1) {
			selected = product.variants["02"];
			cardSuffix = "00100302";
			productTitle = product.productTitle;
			brand = group.brand;
			variantTitle = selected.variantTitle;
		}
	}

	if (!selected || !cardSuffix) {
		console.warn("⚠️ Warden: No selected item found - setting NoSelected active");
		// Reset all product cards
		wd_resetAllProductCards();
		// Set NoSelected active
		wd_addClass("productCard_NoSelected_warden", "active");
		// Hide all summary cards
		wd_hideElement("summaryItemsCard_muzzleDevice_00100301");
		wd_hideElement("summaryItemsCard_muzzleDevice_00100302");
		return;
	}
	

	// Update selected product card - active
	// Reset all product cards first
	wd_resetAllProductCards();
	
	if (cardSuffix === "00100301") {
		wd_addClass("productCard_muzzleDevice00100301", "active");
		
		// Update product card name and price
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		const displayName = product.productTitle + " (" + selected.variantTitle + ")";
		wd_setText("productCardName_muzzleDevice00100301", displayName);
		wd_setText("productCardPrice_muzzleDevice00100301", "$" + selected.price + " USD");
	} else if (cardSuffix === "00100302") {
		wd_addClass("productCard_muzzleDevice00100302", "active");
		
		// Update product card name and price
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		const displayName = product.productTitle + " (" + selected.variantTitle + ")";
		wd_setText("productCardName_muzzleDevice00100302", displayName);
		wd_setText("productCardPrice_muzzleDevice00100302", "$" + selected.price + " USD");
	}

	// Update summary cards - show selected, hide others
	wd_hideElement("summaryItemsCard_muzzleDevice_00100301");
	wd_hideElement("summaryItemsCard_muzzleDevice_00100302");
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_muzzleDevice_" + cardSuffix;
	wd_showElement(summaryCardId);
	
	// Format name: brand + productTitle + variantTitle
	const displayName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " (" + variantTitle + ")"
		: brand + " - " + productTitle;
	wd_setText("summaryCardName_muzzleDevice_" + cardSuffix, displayName);
	wd_setText("summaryCardPrice_muzzleDevice_" + cardSuffix, "$" + selected.price + " USD");
}

// Update summary cards based on quantity (called by summaryChartButton)
export function updateSummaryCards_Warden() {
	
	// 00100301
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		if (product.variants["01"].quantity === 1) {
			wd_showElement("summaryItemsCard_muzzleDevice_00100301");
		} else {
			wd_hideElement("summaryItemsCard_muzzleDevice_00100301");
		}
	}
	// 00100302
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["003"];
		if (product.variants["02"].quantity === 1) {
			wd_showElement("summaryItemsCard_muzzleDevice_00100302");
		} else {
			wd_hideElement("summaryItemsCard_muzzleDevice_00100302");
		}
	}
}

// Product card click listeners
// Use DOMContentLoaded to ensure elements exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(setupProductCardListeners, 100);
	});
} else {
	// DOM already loaded
	setTimeout(setupProductCardListeners, 100);
}

function setupProductCardListeners() {
	
	// No Selected - reset all Warden quantities
	const cardNoSelected = document.getElementById("productCard_NoSelected_warden");
	if (cardNoSelected) {
		// Use capture phase to run before onclick
		cardNoSelected.addEventListener("click", function (e) {
			
			// Reset all Warden quantities
			wd_zeroWardenQuantities();
			
			// Reset product cards
			wd_resetAllProductCards();
			wd_addClass("productCard_NoSelected_warden", "active");
			
			// Update UI
			uiData_Warden();
			
			// Update 3D model - hide all warden variants when no selected
			updateModel_MuzzleDevice();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Warden: productCard_NoSelected_warden not found");
	}
	
	// 00100301 - Black
	const card00100301 = document.getElementById("productCard_muzzleDevice00100301");
	if (card00100301) {
		// Use capture phase to run before onclick
		card00100301.addEventListener("click", function (e) {
			
			// Reset all Warden quantities
			wd_zeroWardenQuantities();
			
			// Set quantity = 1 for selected product
			window.part.muzzleDevice["001"].products["003"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_Warden();
			
			// Update 3D model after UI update
			const itemsID = "muzzleDevice00100301";
			handleMuzzleDeviceSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Warden: productCard_muzzleDevice00100301 not found");
	}
	
	// 00100302 - FDE
	const card00100302 = document.getElementById("productCard_muzzleDevice00100302");
	if (card00100302) {
		// Use capture phase to run before onclick
		card00100302.addEventListener("click", function (e) {
			
			// Reset all Warden quantities
			wd_zeroWardenQuantities();
			
			// Set quantity = 1 for selected product
			window.part.muzzleDevice["001"].products["003"].variants["02"].quantity = 1;
			
			// Update UI
			uiData_Warden();
			
			// Update 3D model after UI update
			const itemsID = "muzzleDevice00100302";
			handleMuzzleDeviceSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Warden: productCard_muzzleDevice00100302 not found");
	}
	
}

// Summary chart button click listener
// Use DOMContentLoaded to ensure element exists
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(setupSummaryChartButtonListener, 100);
	});
} else {
	// DOM already loaded
	setTimeout(setupSummaryChartButtonListener, 100);
}

function setupSummaryChartButtonListener() {
	const btn = document.getElementById("summaryChartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Update all summary cards from inventory data
			updateSummaryCards_Warden();
		});
	} else {
		console.warn("⚠️ Warden: summaryChartButton not found");
	}
}

export function getSelectedWarden() {
	// Check 00100301
	{
		const product = window.part.muzzleDevice["001"].products["003"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	// Check 00100302
	{
		const product = window.part.muzzleDevice["001"].products["003"];
		if (product.variants["02"] && product.variants["02"].quantity === 1) {
			return product.variants["02"];
		}
	}
	return null;
}

export function getWardenTotalPrice() {
	const v = getSelectedWarden();
	return v ? v.price : 0;
}

// Make uiData_Warden and wd_updateAllProductCardsToDefault available globally for Muzzle Device to call
window.uiData_Warden = uiData_Warden;
window.wd_updateAllProductCardsToDefault = wd_updateAllProductCardsToDefault;

