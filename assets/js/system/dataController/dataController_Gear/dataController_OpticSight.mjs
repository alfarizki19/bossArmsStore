// === dataController_OpticSight.mjs ===
// Optic Sight UI Controller (Gear Category) — 1 product with "No Selected" option


// Import model controller functions (if exists)
let updateModel_OpticSight = () => {};
let handleOpticSightSelection = () => {};

try {
	const modelModule = await import('../../modelController/modelController_Gear/modelController_OpticSight.mjs');
	updateModel_OpticSight = modelModule.updateModel_OpticSight || updateModel_OpticSight;
	handleOpticSightSelection = modelModule.handleOpticSightSelection || handleOpticSightSelection;
} catch(e) {
}


function os_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function os_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function os_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function os_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function os_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Reset all OpticSight quantities to 0
function os_zeroOpticSightQuantities() {
	try {
		const group = window.part.opticSight["001"];
		const product = group.products["001"];
		if (product && product.variants) {
			if (product.variants["01"]) product.variants["01"].quantity = 0;
		}
	} catch(e) {
		console.warn("⚠️ Optic Sight: Error zeroing quantities", e);
	}
}

// Reset product cards to default (remove active class)
function os_resetAllProductCards() {
	os_removeClass("productCard_opticSight_001001", "active");
	os_removeClass("productCard_NoSelected_opticSight", "active");
}

// Update product cards to default from inventory
function os_updateAllProductCardsToDefault() {
	// 001001 - default
	{
		const group = window.part.opticSight["001"];
		const product = group.products["001"];
		const variant01 = product.variants["01"];
		os_setText("productCardName_opticSight_001001", product.productTitle);
		os_setText("productCardPrice_opticSight_001001", "$" + variant01.price + " USD");
	}
	// Reset all product cards to default (no active)
	os_resetAllProductCards();
	// Set NoSelected active by default
	os_addClass("productCard_NoSelected_opticSight", "active");
}

// Reset all OpticSight variants
export function uiReset_opticSight() {
	os_zeroOpticSightQuantities();
	os_resetAllProductCards();
}

// Update UI based on selected OpticSight
export function uiData_OpticSight() {
	
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 00100101
	{
		const group = window.part.opticSight["001"];
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
		console.warn("⚠️ Optic Sight: No selected item found - setting NoSelected active");
		// Reset all product cards
		os_resetAllProductCards();
		// Set NoSelected active
		os_addClass("productCard_NoSelected_opticSight", "active");
		// Update part card to "No Optic Sight Selected"
		os_setText("partCardName_opticSight", "No Optic Sight Selected");
		os_setText("partCardPrice_opticSight", "----- USD");
		// Hide part card image
		const partCardImg = document.getElementById("partCardImg_opticSight00100101");
		if (partCardImg) partCardImg.style.display = "none";
		// Hide summary card
		os_hideElement("summaryItemsCard_opticSight_00100101");
		return;
	}
	

	// Update selected product card - active
	// Reset all product cards first
	os_resetAllProductCards();
	
	os_addClass("productCard_opticSight_001001", "active");
	
	// Update product card name and price
	const group = window.part.opticSight["001"];
	const product = group.products["001"];
	os_setText("productCardName_opticSight_001001", product.productTitle);
	os_setText("productCardPrice_opticSight_001001", "$" + selected.price + " USD");

	// Update part card image - show selected
	const partCardImg = document.getElementById("partCardImg_opticSight00100101");
	if (partCardImg) {
		partCardImg.style.display = "block";
	} else {
		console.warn("⚠️ Optic Sight: partCardImg_opticSight00100101 not found");
	}

	// Update part card - format: brand + productTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	os_setText("partCardName_opticSight", partCardName);
	os_setText("partCardPrice_opticSight", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	os_hideElement("summaryItemsCard_opticSight_00100101");
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_opticSight_" + cardSuffix;
	os_showElement(summaryCardId);
	os_setText("summaryCardName_opticSight_" + cardSuffix, partCardName);
	os_setText("summaryCardPrice_opticSight_" + cardSuffix, "$" + selected.price + " USD");
}

// Update summary cards based on quantity (called by summaryChartButton)
export function updateSummaryCards_OpticSight() {
	
	// 00100101
	{
		const group = window.part.opticSight["001"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			os_showElement("summaryItemsCard_opticSight_00100101");
		} else {
			os_hideElement("summaryItemsCard_opticSight_00100101");
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
			if (!window.part || !window.part.opticSight) {
				console.error("❌ Optic Sight data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			os_updateAllProductCardsToDefault();
			
			// Reset all OpticSight quantities (set quantity = 0)
			os_zeroOpticSightQuantities();
			
			// Update UI (will set NoSelected active)
			uiData_OpticSight();
			
			// Update 3D model after UI update
			updateModel_OpticSight();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
		}, true); // Use capture phase
		
	} else {
		console.warn("⚠️ Optic Sight: loader-start-button not found");
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
	
	// No Selected - reset all OpticSight quantities
	const cardNoSelected = document.getElementById("productCard_NoSelected_opticSight");
	if (cardNoSelected) {
		// Use capture phase to run before onclick
		cardNoSelected.addEventListener("click", function (e) {
			
			// Reset all OpticSight quantities
			os_zeroOpticSightQuantities();
			
			// Reset product cards
			os_resetAllProductCards();
			os_addClass("productCard_NoSelected_opticSight", "active");
			
			// Update UI
			uiData_OpticSight();
			
			// Update 3D model - hide all optic sight variants when no selected
			updateModel_OpticSight();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Optic Sight: productCard_NoSelected_opticSight not found");
	}
	
	// 00100101 - Holosun HS510C
	const card001001 = document.getElementById("productCard_opticSight_001001");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			
			// Reset all OpticSight quantities
			os_zeroOpticSightQuantities();
			
			// Set quantity = 1 for selected product
			window.part.opticSight["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_OpticSight();
			
			// Update 3D model after UI update
			const itemsID = "opticSight00100101";
			handleOpticSightSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Optic Sight: productCard_opticSight_001001 not found");
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
			updateSummaryCards_OpticSight();
		});
	} else {
		console.warn("⚠️ Optic Sight: summaryChartButton not found");
	}
}

export function getSelectedOpticSight() {
	// Check 00100101
	{
		const product = window.part.opticSight["001"].products["001"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	return null;
}

export function getOpticSightTotalPrice() {
	const v = getSelectedOpticSight();
	return v ? v.price : 0;
}

