// === dataController_FrontSight.mjs ===
// Front Sight UI Controller (Gear Category) — 2 products with "No Selected" option
// Import model controller functions (if exists)
let updateModel_FrontSight = () => {};
let handleFrontSightSelection = () => {};

try {
	const modelModule = await import('../../modelController/modelController_Gear/modelController_FrontSight.mjs');
	updateModel_FrontSight = modelModule.updateModel_FrontSight || updateModel_FrontSight;
	handleFrontSightSelection = modelModule.handleFrontSightSelection || handleFrontSightSelection;
} catch(e) {
}
function fs_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function fs_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function fs_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function fs_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function fs_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function fs_hideAllPartCardImages() {
	const img001 = document.getElementById("partCardImg_frontSight00100101");
	if (img001) img001.style.display = "none";
	const img002 = document.getElementById("partCardImg_frontSight00200101");
	if (img002) img002.style.display = "none";
}

// Reset all FrontSight quantities to 0
function fs_zeroFrontSightQuantities() {
	try {
		const group001 = window.part.frontSight["001"];
		const product001 = group001.products["001"];
		if (product001 && product001.variants) {
			if (product001.variants["01"]) product001.variants["01"].quantity = 0;
		}
		const group002 = window.part.frontSight["002"];
		const product002 = group002.products["001"];
		if (product002 && product002.variants) {
			if (product002.variants["01"]) product002.variants["01"].quantity = 0;
		}
	} catch(e) {
	}
}

// Reset product cards to default (remove active class)
function fs_resetAllProductCards() {
	fs_removeClass("productCard_frontSight_001001", "active");
	fs_removeClass("productCard_frontSight_002001", "active");
	fs_removeClass("productCard_NoSelected_frontSight", "active");
}

// Update product cards to default from inventory
function fs_updateAllProductCardsToDefault() {
	// 001001 - default
	{
		const group = window.part.frontSight["001"];
		const product = group.products["001"];
		const variant01 = product.variants["01"];
		fs_setText("productCardName_frontSight_001001", product.productTitle);
		fs_setText("productCardPrice_frontSight_001001", "$" + variant01.price + " USD");
	}
	// 002001 - default
	{
		const group = window.part.frontSight["002"];
		const product = group.products["001"];
		const variant01 = product.variants["01"];
		fs_setText("productCardName_frontSight_002001", product.productTitle);
		fs_setText("productCardPrice_frontSight_002001", "$" + variant01.price + " USD");
	}
	// Reset all product cards to default (no active)
	fs_resetAllProductCards();
	// Set NoSelected active by default
	fs_addClass("productCard_NoSelected_frontSight", "active");
}

// Reset all FrontSight variants
export function uiReset_frontSight() {
	fs_zeroFrontSightQuantities();
	fs_resetAllProductCards();
}

// Update UI based on selected FrontSight
export function uiData_FrontSight() {
	let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 00100101
	{
		const group = window.part.frontSight["001"];
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
		const group = window.part.frontSight["002"];
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
		// Reset all product cards
		fs_resetAllProductCards();
		// Set NoSelected active
		fs_addClass("productCard_NoSelected_frontSight", "active");
		// Update part card to "No Front Sight Selected"
		fs_setText("partCardName_frontSight", "No Front Sight Selected");
		fs_setText("partCardPrice_frontSight", "----- USD");
		// Hide all part card images
		fs_hideAllPartCardImages();
		// Hide all summary cards
		fs_hideElement("summaryItemsCard_frontSight_00100101");
		fs_hideElement("summaryItemsCard_frontSight_00200101");
		return;
	}
	const productGroup = cardSuffix.substring(0, 6); // "001001" or "002001"

	// Update selected product card - active
	// Reset all product cards first
	fs_resetAllProductCards();
	
	fs_addClass("productCard_frontSight_" + productGroup, "active");
	// Update product card name and price
	const group = window.part.frontSight[productGroup.substring(0, 3)];
	const product = group.products[productGroup.substring(3, 6)];
	fs_setText("productCardName_frontSight_" + productGroup, product.productTitle);
	fs_setText("productCardPrice_frontSight_" + productGroup, "$" + selected.price + " USD");

	// Reset other product card to default
	if (productGroup === "001001") {
		const group002 = window.part.frontSight["002"];
		const product002 = group002.products["001"];
		const variant01 = product002.variants["01"];
		fs_setText("productCardName_frontSight_002001", product002.productTitle);
		fs_setText("productCardPrice_frontSight_002001", "$" + variant01.price + " USD");
	} else {
		const group001 = window.part.frontSight["001"];
		const product001 = group001.products["001"];
		const variant01 = product001.variants["01"];
		fs_setText("productCardName_frontSight_001001", product001.productTitle);
		fs_setText("productCardPrice_frontSight_001001", "$" + variant01.price + " USD");
	}

	// Update part card images - show selected, hide others
	fs_hideAllPartCardImages();
	const partCardImgId = "partCardImg_frontSight" + cardSuffix;
	const partCardImg = document.getElementById(partCardImgId);
	if (partCardImg) {
		partCardImg.style.display = "block";
	} else {
	}

	// Update part card - format: brand + productTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	fs_setText("partCardName_frontSight", partCardName);
	fs_setText("partCardPrice_frontSight", "$" + selected.price + " USD");

	// Update summary cards - show selected, hide others
	fs_hideElement("summaryItemsCard_frontSight_00100101");
	fs_hideElement("summaryItemsCard_frontSight_00200101");
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_frontSight_" + cardSuffix;
	fs_showElement(summaryCardId);
	fs_setText("summaryCardName_frontSight_" + cardSuffix, partCardName);
	fs_setText("summaryCardPrice_frontSight_" + cardSuffix, "$" + selected.price + " USD");
}

// Update summary cards based on quantity (called by summaryChartButton)
export function updateSummaryCards_FrontSight() {
	// 00100101
	{
		const product = window.part.frontSight["001"].products["001"];
		if (product.variants["01"].quantity === 1) {
			fs_showElement("summaryItemsCard_frontSight_00100101");
		} else {
			fs_hideElement("summaryItemsCard_frontSight_00100101");
		}
	}
	// 00200101
	{
		const product = window.part.frontSight["002"].products["001"];
		if (product.variants["01"].quantity === 1) {
			fs_showElement("summaryItemsCard_frontSight_00200101");
		} else {
			fs_hideElement("summaryItemsCard_frontSight_00200101");
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
			if (!window.part || !window.part.frontSight) {
				return;
			}
			
			// Update all product cards to default from inventory
			fs_updateAllProductCardsToDefault();
			
			// Reset all FrontSight quantities (set quantity = 0)
			fs_zeroFrontSightQuantities();
			
			// Update UI (will set NoSelected active)
			uiData_FrontSight();
			
			// Update 3D model after UI update
			updateModel_FrontSight();
			
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
	// No Selected - reset all FrontSight quantities
	const cardNoSelected = document.getElementById("productCard_NoSelected_frontSight");
	if (cardNoSelected) {
		// Use capture phase to run before onclick
		cardNoSelected.addEventListener("click", function (e) {
			// Reset all FrontSight quantities
			fs_zeroFrontSightQuantities();
			
			// Reset product cards
			fs_resetAllProductCards();
			fs_addClass("productCard_NoSelected_frontSight", "active");
			
			// Update UI
			uiData_FrontSight();
			
			// Update 3D model (if needed)
			if (window.noFrontSight) {
				try {
					window.noFrontSight();
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
	}
	
	// 00100101 - Front Folding BattleSight
	const card001001 = document.getElementById("productCard_frontSight_001001");
	if (card001001) {
		// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
			// Reset all FrontSight quantities
			fs_zeroFrontSightQuantities();
			
			// Set quantity = 1 for selected product
			window.part.frontSight["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_FrontSight();
			
			// Update 3D model after UI update
			const itemsID = "frontSight00100101";
			handleFrontSightSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
	}
	
	// 00200101 - QDS Same Plane Front Sight YHM 5030
	const card002001 = document.getElementById("productCard_frontSight_002001");
	if (card002001) {
		// Use capture phase to run before onclick
		card002001.addEventListener("click", function (e) {
			// Reset all FrontSight quantities
			fs_zeroFrontSightQuantities();
			
			// Set quantity = 1 for selected product
			window.part.frontSight["002"].products["001"].variants["01"].quantity = 1;
			
			// Update UI
			uiData_FrontSight();
			
			// Update 3D model after UI update
			const itemsID = "frontSight00200101";
			handleFrontSightSelection(itemsID);
			
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
			updateSummaryCards_FrontSight();
		});
	} else {
	}
}

export function getSelectedFrontSight() {
	// Check 00100101
	{
		const product = window.part.frontSight["001"].products["001"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	// Check 00200101
	{
		const product = window.part.frontSight["002"].products["001"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	return null;
}

export function getFrontSightTotalPrice() {
	const v = getSelectedFrontSight();
	return v ? v.price : 0;
}
