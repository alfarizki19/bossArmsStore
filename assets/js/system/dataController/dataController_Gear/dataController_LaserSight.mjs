// === dataController_LaserSight.mjs ===
// Laser Sight UI Controller (Gear Category) — 1 product with "No Selected" option
// Import model controller functions (if exists)
let updateModel_LaserSight = () => {};
let handleLaserSightSelection = () => {};

try {
	const modelModule = await import('../../modelController/modelController_Gear/modelController_LaserSight.mjs');
	updateModel_LaserSight = modelModule.updateModel_LaserSight || updateModel_LaserSight;
	handleLaserSightSelection = modelModule.handleLaserSightSelection || handleLaserSightSelection;
} catch(e) {
}
function ls_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function ls_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function ls_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function ls_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function ls_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Reset all LaserSight quantities to 0
function ls_zeroLaserSightQuantities() {
	try {
		const group = window.part.laserSight["001"];
		const product = group.products["001"];
		if (product && product.variants) {
			if (product.variants["01"]) product.variants["01"].quantity = 0;
		}
	} catch(e) {
	}
}

// Reset product cards to default (remove active class)
function ls_resetAllProductCards() {
	ls_removeClass("productCard_laserSight_001001", "active");
	ls_removeClass("productCard_NoSelected_laserSight", "active");
}

// Update product cards to default from inventory
function ls_updateAllProductCardsToDefault() {
	// 001001 - default
	{
		const group = window.part.laserSight["001"];
		const product = group.products["001"];
		const variant01 = product.variants["01"];
		ls_setText("productCardName_laserSight_001001", product.productTitle);
		ls_setText("productCardPrice_laserSight_001001", "$" + variant01.price + " USD");
	}
	// Reset all product cards to default (no active)
	ls_resetAllProductCards();
	// Set NoSelected active by default
	ls_addClass("productCard_NoSelected_laserSight", "active");
}

// Reset all LaserSight variants
export function uiReset_laserSight() {
	ls_zeroLaserSightQuantities();
	ls_resetAllProductCards();
}

// Update UI based on selected LaserSight
export function uiData_LaserSight() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 00100101
	{
		const group = window.part.laserSight["001"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"];
			cardSuffix = "00100101";
			productTitle = product.productTitle;
			brand = group.brand;
			variantTitle = selected.variantTitle;
		}
	}

	if (!selected || !cardSuffix) {
		// Reset all product cards
		ls_resetAllProductCards();
		// Set NoSelected active
		ls_addClass("productCard_NoSelected_laserSight", "active");
		// Update part card to "No Laser Sight Selected"
		ls_setText("partCardName_laserSight", "No Laser Sight Selected");
		ls_setText("partCardPrice_laserSight", "----- USD");
		// Hide part card image
		const partCardImg = document.getElementById("partCardImg_laserSight00100101");
		if (partCardImg) partCardImg.style.display = "none";
		// Hide summary card
		ls_hideElement("summaryItemsCard_laserSight_00100101");
		return;
	}
	// Update selected product card - active
	// Reset all product cards first
	ls_resetAllProductCards();
	
	ls_addClass("productCard_laserSight_001001", "active");
	// Update product card name and price
	const group = window.part.laserSight["001"];
	const product = group.products["001"];
	ls_setText("productCardName_laserSight_001001", product.productTitle);
	ls_setText("productCardPrice_laserSight_001001", "$" + selected.price + " USD");

	// Update part card image - show selected
	const partCardImg = document.getElementById("partCardImg_laserSight00100101");
	if (partCardImg) {
		partCardImg.style.display = "block";
	} else {
	}

	// Update part card - format: brand + productTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	ls_setText("partCardName_laserSight", partCardName);
	ls_setText("partCardPrice_laserSight", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	ls_hideElement("summaryItemsCard_laserSight_00100101");
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_laserSight_" + cardSuffix;
	ls_showElement(summaryCardId);
	ls_setText("summaryCardName_laserSight_" + cardSuffix, partCardName);
	ls_setText("summaryCardPrice_laserSight_" + cardSuffix, "$" + selected.price + " USD");
}

// Update summary cards based on quantity (called by summaryChartButton)
export function updateSummaryCards_LaserSight() {
	// 00100101
	{
		const product = window.part.laserSight["001"].products["001"];
		if (product.variants["01"].quantity === 1) {
			ls_showElement("summaryItemsCard_laserSight_00100101");
		} else {
			ls_hideElement("summaryItemsCard_laserSight_00100101");
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
			if (!window.part || !window.part.laserSight) {
				return;
			}
			
			// Update all product cards to default from inventory
			ls_updateAllProductCardsToDefault();
			
			// Reset all LaserSight quantities (set quantity = 0)
			ls_zeroLaserSightQuantities();
			
			// Update UI (will set NoSelected active)
			uiData_LaserSight();
			
			// Update 3D model after UI update
			updateModel_LaserSight();
			
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
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(setupProductCardListeners, 100);
	});
} else {
	// DOM already loaded
	setTimeout(setupProductCardListeners, 100);
}

function setupProductCardListeners() {
	// No Selected - reset all LaserSight quantities
	const cardNoSelected = document.getElementById("productCard_NoSelected_laserSight");
	if (cardNoSelected) {
		// Use capture phase to run before onclick
		cardNoSelected.addEventListener("click", function (e) {
			// Reset all LaserSight quantities
			ls_zeroLaserSightQuantities();
			
			// Reset product cards
			ls_resetAllProductCards();
			ls_addClass("productCard_NoSelected_laserSight", "active");
			
			// Update UI
			uiData_LaserSight();
			
			// Update 3D model - hide all laser sight variants when no selected
			updateModel_LaserSight();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
	}
	
	// 00100101 - Tactical Device Laser Sight LS321
	const card001001 = document.getElementById("productCard_laserSight_001001");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all LaserSight quantities
			ls_zeroLaserSightQuantities();
			
			// Set quantity = 1 for selected product
			window.part.laserSight["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_LaserSight();
			
			// Update 3D model after UI update
			const itemsID = "laserSight00100101";
			handleLaserSightSelection(itemsID);
			
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
			updateSummaryCards_LaserSight();
		});
	} else {
	}
}

export function getSelectedLaserSight() {
	// Check 00100101
	{
		const product = window.part.laserSight["001"].products["001"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	return null;
}

export function getLaserSightTotalPrice() {
	const v = getSelectedLaserSight();
	return v ? v.price : 0;
}
