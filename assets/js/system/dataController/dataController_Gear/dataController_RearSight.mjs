// === dataController_RearSight.mjs ===
// Rear Sight UI Controller (Gear Category) — 2 products with "No Selected" option

// Import model controller functions (if exists)
let updateModel_RearSight = () => {};
let handleRearSightSelection = () => {};

try {
	const modelModule = await import('../../modelController/modelController_Gear/modelController_RearSight.mjs');
	updateModel_RearSight = modelModule.updateModel_RearSight || updateModel_RearSight;
	handleRearSightSelection = modelModule.handleRearSightSelection || handleRearSightSelection;
} catch(e) {
}

function rs_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function rs_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function rs_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function rs_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function rs_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function rs_hideAllPartCardImages() {
	const img001 = document.getElementById("partCardImg_rearSight00100101");
	if (img001) img001.style.display = "none";
	const img002 = document.getElementById("partCardImg_rearSight00200101");
	if (img002) img002.style.display = "none";
}

// Reset all RearSight quantities to 0
function rs_zeroRearSightQuantities() {
	try {
		const group001 = window.part.rearSight["001"];
		const product001 = group001.products["001"];
		if (product001 && product001.variants) {
			if (product001.variants["01"]) product001.variants["01"].quantity = 0;
		}
		const group002 = window.part.rearSight["002"];
		const product002 = group002.products["001"];
		if (product002 && product002.variants) {
			if (product002.variants["01"]) product002.variants["01"].quantity = 0;
		}
	} catch(e) {
		console.warn("⚠️ Rear Sight: Error zeroing quantities", e);
	}
}

// Reset product cards to default (remove active class)
function rs_resetAllProductCards() {
	rs_removeClass("productCard_rearSight_001001", "active");
	rs_removeClass("productCard_rearSight_002001", "active");
	rs_removeClass("productCard_NoSelected_rearSight", "active");
}

// Update product cards to default from inventory
function rs_updateAllProductCardsToDefault() {
	// 001001 - default
	{
		const group = window.part.rearSight["001"];
		const product = group.products["001"];
		const variant01 = product.variants["01"];
		rs_setText("productCardName_rearSight_001001", product.productTitle);
		rs_setText("productCardPrice_rearSight_001001", "$" + variant01.price + " USD");
	}
	// 002001 - default
	{
		const group = window.part.rearSight["002"];
		const product = group.products["001"];
		const variant01 = product.variants["01"];
		rs_setText("productCardName_rearSight_002001", product.productTitle);
		rs_setText("productCardPrice_rearSight_002001", "$" + variant01.price + " USD");
	}
	// Reset all product cards to default (no active)
	rs_resetAllProductCards();
	// Set NoSelected active by default
	rs_addClass("productCard_NoSelected_rearSight", "active");
}

// Reset all RearSight variants
export function uiReset_rearSight() {
	rs_zeroRearSightQuantities();
	rs_resetAllProductCards();
}

// Update UI based on selected RearSight
export function uiData_RearSight() {
let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 00100101
	{
		const group = window.part.rearSight["001"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"];
			cardSuffix = "00100101";
			productTitle = product.productTitle;
			brand = group.brand;
			variantTitle = selected.variantTitle;
}
	}
	
	// Check 00200101
	if (!selected) {
		const group = window.part.rearSight["002"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"];
			cardSuffix = "00200101";
			productTitle = product.productTitle;
			brand = group.brand;
			variantTitle = selected.variantTitle;
}
	}

	if (!selected || !cardSuffix) {
		console.warn("⚠️ Rear Sight: No selected item found - setting NoSelected active");
		// Reset all product cards
		rs_resetAllProductCards();
		// Set NoSelected active
		rs_addClass("productCard_NoSelected_rearSight", "active");
		// Update part card to "No Rear Sight Selected"
		rs_setText("partCardName_rearSight", "No Rear Sight Selected");
		rs_setText("partCardPrice_rearSight", "----- USD");
		// Hide all part card images
		rs_hideAllPartCardImages();
		// Hide all summary cards
		rs_hideElement("summaryItemsCard_rearSight_00100101");
		rs_hideElement("summaryItemsCard_rearSight_00200101");
		return;
	}
	
const productGroup = cardSuffix.substring(0, 6); // "001001" or "002001"

	// Update selected product card - active
	// Reset all product cards first
	rs_resetAllProductCards();
	
	rs_addClass("productCard_rearSight_" + productGroup, "active");
// Update product card name and price
	const group = window.part.rearSight[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	rs_setText("productCardName_rearSight_" + productGroup, product.productTitle);
	rs_setText("productCardPrice_rearSight_" + productGroup, "$" + selected.price + " USD");

	// Reset other product card to default
	if (productGroup === "001001") {
		const group002 = window.part.rearSight["002"];
		const product002 = group002.products["001"];
		const variant01 = product002.variants["01"];
		rs_setText("productCardName_rearSight_002001", product002.productTitle);
		rs_setText("productCardPrice_rearSight_002001", "$" + variant01.price + " USD");
	} else {
		const group001 = window.part.rearSight["001"];
		const product001 = group001.products["001"];
		const variant01 = product001.variants["01"];
		rs_setText("productCardName_rearSight_001001", product001.productTitle);
		rs_setText("productCardPrice_rearSight_001001", "$" + variant01.price + " USD");
	}

	// Update part card images - show selected, hide others
	rs_hideAllPartCardImages();
	const partCardImgId = "partCardImg_rearSight" + cardSuffix;
	const partCardImg = document.getElementById(partCardImgId);
	if (partCardImg) {
		partCardImg.style.display = "block";
} else {
		console.warn(`⚠️ Rear Sight: partCardImg ${partCardImgId} not found`);
	}

	// Update part card - format: brand + productTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	rs_setText("partCardName_rearSight", partCardName);
	rs_setText("partCardPrice_rearSight", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	rs_hideElement("summaryItemsCard_rearSight_00100101");
	rs_hideElement("summaryItemsCard_rearSight_00200101");
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_rearSight_" + cardSuffix;
	rs_showElement(summaryCardId);
	rs_setText("summaryCardName_rearSight_" + cardSuffix, partCardName);
	rs_setText("summaryCardPrice_rearSight_" + cardSuffix, "$" + selected.price + " USD");
}

// Update summary cards based on quantity (called by summaryChartButton)
export function updateSummaryCards_RearSight() {
// 00100101
	{
		const product = window.part.rearSight["001"].products["001"];
		if (product.variants["01"].quantity === 1) {
			rs_showElement("summaryItemsCard_rearSight_00100101");
		} else {
			rs_hideElement("summaryItemsCard_rearSight_00100101");
		}
	}
	// 00200101
	{
		const product = window.part.rearSight["002"].products["001"];
		if (product.variants["01"].quantity === 1) {
			rs_showElement("summaryItemsCard_rearSight_00200101");
		} else {
			rs_hideElement("summaryItemsCard_rearSight_00200101");
		}
	}
}

// Start default -> No Selected (quantity = 0)
// Use DOMContentLoaded to ensure element exists
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(setupStartButtonListener, 100);
	});
} else {
	// DOM already loaded
	setTimeout(setupStartButtonListener, 100);
}

function setupStartButtonListener() {
	const btn = document.getElementById("loader-start-button");
	if (btn) {
		// Keep existing onclick for hideLoader, but add our handler
		// Use capture phase to run before onclick
		btn.addEventListener("click", function (e) {
// Check if data is available
			if (!window.part || !window.part.rearSight) {
				console.error("❌ Rear Sight data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			rs_updateAllProductCardsToDefault();
			
			// Reset all RearSight quantities (set quantity = 0)
			rs_zeroRearSightQuantities();
			
			// Update UI (will set NoSelected active)
			uiData_RearSight();
			
			// Update 3D model after UI update
			updateModel_RearSight();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
}, true); // Use capture phase
		
} else {
		console.warn("⚠️ Rear Sight: loader-start-button not found");
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
// No Selected - reset all RearSight quantities
	const cardNoSelected = document.getElementById("productCard_NoSelected_rearSight");
	if (cardNoSelected) {
// Use capture phase to run before onclick
		cardNoSelected.addEventListener("click", function (e) {
// Reset all RearSight quantities
			rs_zeroRearSightQuantities();
			
			// Reset product cards
			rs_resetAllProductCards();
			rs_addClass("productCard_NoSelected_rearSight", "active");
			
			// Update UI
			uiData_RearSight();
			
			// Update 3D model (if needed)
			if (window.noRearSight) {
				try {
					window.noRearSight();
				} catch(e) {}
			}
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Rear Sight: productCard_NoSelected_rearSight not found");
	}
	
	// 00100101 - Rear Folding Battle Sight Dioptic
	const card001001 = document.getElementById("productCard_rearSight_001001");
	if (card001001) {
// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
// Reset all RearSight quantities
			rs_zeroRearSightQuantities();
			
			// Set quantity = 1 for selected product
			window.part.rearSight["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_RearSight();
			
			// Update 3D model after UI update
			const itemsID = "rearSight00100101";
handleRearSightSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Rear Sight: productCard_rearSight_001001 not found");
	}
	
	// 00200101 - QDS Same Plane Rear Sight YHM 5010
	const card002001 = document.getElementById("productCard_rearSight_002001");
	if (card002001) {
// Use capture phase to run before onclick
		card002001.addEventListener("click", function (e) {
// Reset all RearSight quantities
			rs_zeroRearSightQuantities();
			
			// Set quantity = 1 for selected product
			window.part.rearSight["002"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_RearSight();
			
			// Update 3D model after UI update
			const itemsID = "rearSight00200101";
handleRearSightSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Rear Sight: productCard_rearSight_002001 not found");
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
			updateSummaryCards_RearSight();
});
} else {
		console.warn("⚠️ Rear Sight: summaryChartButton not found");
	}
}

export function getSelectedRearSight() {
	// Check 00100101
	{
		const product = window.part.rearSight["001"].products["001"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	// Check 00200101
	{
		const product = window.part.rearSight["002"].products["001"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	return null;
}

export function getRearSightTotalPrice() {
	const v = getSelectedRearSight();
	return v ? v.price : 0;
}
