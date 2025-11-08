// === dataController_MuzzleDevice.mjs ===
// Muzzle Device UI Controller (Upper Category) — three products

// Import model controller functions
import { updateModel_MuzzleDevice, handleMuzzleDeviceSelection } from '../../modelController/modelController_Upper/modelController_MuzzleDevice.mjs';

function md_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function md_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function md_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function md_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}

function md_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide all part card images
function md_hideAllPartCardImages() {
	const ids = [
		"partCardImg_muzzleDevice00100101",
		"partCardImg_muzzleDevice00100201",
		"partCardImg_muzzleDevice00200201",
		"partCardImg_muzzleDevice00200202",
	];
	ids.forEach(function (id) { md_hideElement(id); });
}

// Hide all product card images for 002002
function md_hideAllProductCardImages_002002() {
	md_hideElement("productCardImg_muzzleDevice00200201");
	md_hideElement("productCardImg_muzzleDevice00200202");
}

// Show default product card image for 002002 (variant 01)
function md_showDefaultProductCardImage_002002() {
	md_hideAllProductCardImages_002002();
	const defaultImgId = "productCardImg_muzzleDevice00200201";
	const el = document.getElementById(defaultImgId);
	if (el) el.style.display = "block";
}

// Reset product card to default for 002002
function md_resetProductCardToDefault_002002() {
	const group = window.part.muzzleDevice["002"];
	const product = group.products["002"];
	const defaultVariant = product.variants["01"];
	
	// Show default image (variant 01)
	md_showDefaultProductCardImage_002002();
	
	// Remove active class
	md_removeClass("productCard_muzzleDevice002002", "active");
}

// Reset all variant cards for 002002
function md_resetAllVariantCards_002002() {
	md_removeClass("variantCard_muzzleDevice_00200201", "active");
	md_removeClass("variantCard_muzzleDevice_00200202", "active");
}

// Reset all variants quantity to 0 for a product
export function uiReset_muzzleDevice001001() {
	const group = window.part.muzzleDevice["001"];
	const product = group.products["001"];
	product.variants["01"].quantity = 0;
	
	// Remove active class
	md_removeClass("productCard_muzzleDevice001001", "active");
}

export function uiReset_muzzleDevice001002() {
	const group = window.part.muzzleDevice["001"];
	const product = group.products["002"];
	product.variants["01"].quantity = 0;
	
	// Remove active class
	md_removeClass("productCard_muzzleDevice001002", "active");
}

export function uiReset_muzzleDevice002002() {
	const group = window.part.muzzleDevice["002"];
	const product = group.products["002"];
	product.variants["01"].quantity = 0;
	product.variants["02"].quantity = 0;
	
	// Reset product card to default
	md_resetProductCardToDefault_002002();
	
	// Reset all variant cards
	md_resetAllVariantCards_002002();
}

// Function to update all product cards to default from inventory
function md_updateAllProductCardsToDefault() {
	// 002002 - default to variant 01
	{
		md_showDefaultProductCardImage_002002();
	}
}

// Helper: zero Warden quantities if Warden inventory exists
function md_zeroWardenQuantities() {
	try {
		const wdBrand = window.part && window.part.muzzleDevice && window.part.muzzleDevice['001'];
		const wdProd = wdBrand && wdBrand.products ? wdBrand.products['003'] : null;
		if (wdProd && wdProd.variants) {
			if (wdProd.variants['01']) wdProd.variants['01'].quantity = 0;
			if (wdProd.variants['02']) wdProd.variants['02'].quantity = 0;
		}
		// Also call window.noWarden if available
		if (window.noWarden) {
			try {
				window.noWarden();
			} catch(e) {}
		}
		if (window.uiData_Warden) {
			try {
				window.uiData_Warden();
			} catch(e) {}
		}
	} catch(e) {}
}

export function uiData_MuzzleDevice() {
let selected = null; let cardSuffix = null; let productTitle = ""; let brand = ""; let variantTitle = "";

	// Check 001001
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"];
			cardSuffix = "00100101";
			productTitle = product.productTitle;
			brand = group.brand;
			variantTitle = selected.variantTitle;
}
	}
	
	// Check 001002
	if (!selected) {
		const group = window.part.muzzleDevice["001"];
		const product = group.products["002"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"];
			cardSuffix = "00100201";
			productTitle = product.productTitle;
			brand = group.brand;
			variantTitle = selected.variantTitle;
}
	}
	
	// Check 002002 variants
	if (!selected) {
		const group = window.part.muzzleDevice["002"];
		const product = group.products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				selected = product.variants[k];
				cardSuffix = "002002" + k;
				productTitle = product.productTitle;
				brand = group.brand;
				variantTitle = selected.variantTitle;
break;
			}
		}
	}

	if (!selected || !cardSuffix) {
		console.warn("⚠️ Muzzle Device: No selected item found");
		return;
	}
	
const productGroup = cardSuffix.substring(0, 6); // "001001", "001002", or "002002"
	const variantNum = cardSuffix.substring(6, 8); // "01", "02", etc.

	// Update selected product card - set active
	if (productGroup === "001001") {
		// Reset other product cards first
		md_removeClass("productCard_muzzleDevice001002", "active");
		md_resetProductCardToDefault_002002();
		// Set active for selected
		md_addClass("productCard_muzzleDevice001001", "active");
} else if (productGroup === "001002") {
		// Reset other product cards first
		md_removeClass("productCard_muzzleDevice001001", "active");
		md_resetProductCardToDefault_002002();
		// Set active for selected
		md_addClass("productCard_muzzleDevice001002", "active");
} else if (productGroup === "002002") {
		// Reset other product cards first
		md_removeClass("productCard_muzzleDevice001001", "active");
		md_removeClass("productCard_muzzleDevice001002", "active");
		// Set active for selected
		md_addClass("productCard_muzzleDevice002002", "active");
// Update product card image for 002002
		md_hideAllProductCardImages_002002();
		const selectedImgId = "productCardImg_muzzleDevice" + cardSuffix;
		const selectedImg = document.getElementById(selectedImgId);
		if (selectedImg) selectedImg.style.display = "block";
	}

	// Note: Other product cards are already reset above

	// Update part card images - show selected, hide others
	md_hideAllPartCardImages();
	const partCardImgId = "partCardImg_muzzleDevice" + cardSuffix;
	const partCardImg = document.getElementById(partCardImgId);
	if (partCardImg) {
		partCardImg.style.display = "block";
} else {
		console.warn(`⚠️ Muzzle Device: partCardImg ${partCardImgId} not found`);
	}

	// Update part card - format: brand + productTitle + variantTitle
	const partCardName = variantTitle.toLowerCase() !== "no variant"
		? brand + " - " + productTitle + " - " + variantTitle
		: brand + " - " + productTitle;
	md_setText("partCardName_muzzleDevice", partCardName);
	md_setText("partCardPrice_muzzleDevice", "$" + selected.price + " USD");

	// Update variant cards for 002002 - active selected, reset others
	if (productGroup === "002002") {
		md_resetAllVariantCards_002002();
		md_addClass("variantCard_muzzleDevice_" + cardSuffix, "active");
	}

	// Update summary cards - show selected, hide others
	// Hide all summary cards first
	md_hideElement("summaryItemsCard_muzzleDevice_00100101");
	md_hideElement("summaryItemsCard_muzzleDevice_00100201");
	md_hideElement("summaryItemsCard_muzzleDevice_00200201");
	md_hideElement("summaryItemsCard_muzzleDevice_00200202");
	
	// Show selected summary card
	const summaryCardId = "summaryItemsCard_muzzleDevice_" + cardSuffix;
	md_showElement(summaryCardId);
	md_setText("summaryCardName_muzzleDevice_" + cardSuffix, partCardName);
	md_setText("summaryCardPrice_muzzleDevice_" + cardSuffix, "$" + selected.price + " USD");
}

// Function to update all summary cards from inventory data
export function updateSummaryCards_MuzzleDevice() {
	// Update all summary card names and prices from inventory
	// 001001
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["001"];
		const variant = product.variants["01"];
		const cardSuffix = "00100101";
		const variantTitle = variant.variantTitle;
		const partCardName = variantTitle.toLowerCase() !== "no variant"
			? group.brand + " - " + product.productTitle + " - " + variantTitle
			: group.brand + " - " + product.productTitle;
		md_setText("summaryCardName_muzzleDevice_" + cardSuffix, partCardName);
		md_setText("summaryCardPrice_muzzleDevice_" + cardSuffix, "$" + variant.price + " USD");
	}
	// 001002
	{
		const group = window.part.muzzleDevice["001"];
		const product = group.products["002"];
		const variant = product.variants["01"];
		const cardSuffix = "00100201";
		const variantTitle = variant.variantTitle;
		const partCardName = variantTitle.toLowerCase() !== "no variant"
			? group.brand + " - " + product.productTitle + " - " + variantTitle
			: group.brand + " - " + product.productTitle;
		md_setText("summaryCardName_muzzleDevice_" + cardSuffix, partCardName);
		md_setText("summaryCardPrice_muzzleDevice_" + cardSuffix, "$" + variant.price + " USD");
	}
	// 002002 variants
	{
		const group = window.part.muzzleDevice["002"];
		const product = group.products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const variant = product.variants[k];
			const cardSuffix = "002002" + k;
			const variantTitle = variant.variantTitle;
			const partCardName = variantTitle.toLowerCase() !== "no variant"
				? group.brand + " - " + product.productTitle + " - " + variantTitle
				: group.brand + " - " + product.productTitle;
			md_setText("summaryCardName_muzzleDevice_" + cardSuffix, partCardName);
			md_setText("summaryCardPrice_muzzleDevice_" + cardSuffix, "$" + variant.price + " USD");
		}
	}

	// Show/hide summary cards based on quantity
	// 001001
	{
		const product = window.part.muzzleDevice["001"].products["001"];
		const cardSuffix = "00100101";
		if (product.variants["01"].quantity === 1) {
			md_showElement("summaryItemsCard_muzzleDevice_" + cardSuffix);
		} else {
			md_hideElement("summaryItemsCard_muzzleDevice_" + cardSuffix);
		}
	}
	// 001002
	{
		const product = window.part.muzzleDevice["001"].products["002"];
		const cardSuffix = "00100201";
		if (product.variants["01"].quantity === 1) {
			md_showElement("summaryItemsCard_muzzleDevice_" + cardSuffix);
		} else {
			md_hideElement("summaryItemsCard_muzzleDevice_" + cardSuffix);
		}
	}
	// 002002 variants
	{
		const product = window.part.muzzleDevice["002"].products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			const cardSuffix = "002002" + k;
			if (product.variants[k].quantity === 1) {
				md_showElement("summaryItemsCard_muzzleDevice_" + cardSuffix);
			} else {
				md_hideElement("summaryItemsCard_muzzleDevice_" + cardSuffix);
			}
		}
	}
}

// Start default -> 001001 variant 01
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
			if (!window.part || !window.part.muzzleDevice) {
				console.error("❌ Muzzle Device data not loaded yet");
				return;
			}
			
			// Update all product cards to default from inventory
			md_updateAllProductCardsToDefault();
			
			// Reset all products (set quantity = 0, remove active class)
			uiReset_muzzleDevice001001();
			uiReset_muzzleDevice001002();
			uiReset_muzzleDevice002002();
			
			// Reset warden (default tidak dipilih)
			md_zeroWardenQuantities();
			// Update Warden product cards to default from inventory
			if (window.wd_updateAllProductCardsToDefault) {
				try {
					window.wd_updateAllProductCardsToDefault();
} catch(e) {
					console.warn("⚠️ Muzzle Device: wd_updateAllProductCardsToDefault not available", e);
				}
			}
			// Also call uiData_Warden to update Warden UI
			if (window.uiData_Warden) {
				try {
					window.uiData_Warden();
				} catch(e) {
					console.warn("⚠️ Muzzle Device: uiData_Warden not available", e);
				}
			}
			
			// Set default quantity = 1 for 00100101
			window.part.muzzleDevice["001"].products["001"].variants["01"].quantity = 1;
			
			// Update UI (will set active class and show/hide images)
			uiData_MuzzleDevice();
			
			// Update 3D model after UI update
			updateModel_MuzzleDevice();
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
			
}, true); // Use capture phase
		
} else {
		console.warn("⚠️ Muzzle Device: loader-start-button not found");
	}
}

// Product card click listeners (for products with only 1 variant)
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
// 001001 -> 01 (only 1 variant, select from product card)
	const card001001 = document.getElementById("productCard_muzzleDevice001001");
	if (card001001) {
// Use capture phase to run before onclick
		card001001.addEventListener("click", function (e) {
// Check if already selected
			const currentQty = window.part.muzzleDevice["001"].products["001"].variants["01"].quantity || 0;
			const isAlreadySelected = currentQty === 1;
			
			if (!isAlreadySelected) {
				// Reset all products only if not already selected
				uiReset_muzzleDevice001001();
				uiReset_muzzleDevice001002();
				uiReset_muzzleDevice002002();
				
				// Set quantity = 1 for selected product
				window.part.muzzleDevice["001"].products["001"].variants["01"].quantity = 1;
			} else {
}
			
			// Always hide warden when base muzzle device is selected
			md_zeroWardenQuantities();
			
			// Update UI
			uiData_MuzzleDevice();
			
			// Update 3D model after UI update
			const itemsID = "muzzleDevice00100101";
handleMuzzleDeviceSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Muzzle Device: productCard_muzzleDevice001001 not found");
	}
	
	// 001002 -> 01 (only 1 variant, select from product card)
	const card001002 = document.getElementById("productCard_muzzleDevice001002");
	if (card001002) {
// Use capture phase to run before onclick
		card001002.addEventListener("click", function (e) {
// Check if already selected
			const currentQty = window.part.muzzleDevice["001"].products["002"].variants["01"].quantity || 0;
			const isAlreadySelected = currentQty === 1;
			
			if (!isAlreadySelected) {
				// Reset all products only if not already selected
				uiReset_muzzleDevice001001();
				uiReset_muzzleDevice001002();
				uiReset_muzzleDevice002002();
				
				// Set quantity = 1 for selected product
				window.part.muzzleDevice["001"].products["002"].variants["01"].quantity = 1;
			} else {
}
			
			// Always hide warden when base muzzle device is selected
			md_zeroWardenQuantities();
			
			// Update UI
			uiData_MuzzleDevice();
			
			// Update 3D model after UI update
			const itemsID = "muzzleDevice00100201";
handleMuzzleDeviceSelection(itemsID);
			
			// Update total cost
			if (window.renderTotals) {
				setTimeout(() => {
					window.renderTotals();
				}, 100);
			}
		}, true); // Use capture phase
	} else {
		console.warn("⚠️ Muzzle Device: productCard_muzzleDevice001002 not found");
	}
	
}

// Variant card click listeners
// Use DOMContentLoaded to ensure elements exist
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(setupVariantCardListeners, 100);
	});
} else {
	// DOM already loaded
	setTimeout(setupVariantCardListeners, 100);
}

function setupVariantCardListeners() {
// 002002 variants (2 variants)
	for (let i = 1; i <= 2; i++) {
		const k = ("" + i).padStart(2, "0");
		const variantCardId = "variantCard_muzzleDevice_002002" + k;
		const card = document.getElementById(variantCardId);
		if (card) {
// Use capture phase to run before onclick
			card.addEventListener("click", function (e) {
// Reset all products
				uiReset_muzzleDevice001001();
				uiReset_muzzleDevice001002();
				uiReset_muzzleDevice002002();
				
				// Reset warden (tidak compatible dengan 002002)
				md_zeroWardenQuantities();
				
				// Set quantity = 1 for selected variant
				window.part.muzzleDevice["002"].products["002"].variants[k].quantity = 1;
				
				// Update UI
				uiData_MuzzleDevice();
				
				// Update 3D model after UI update
				const itemsID = "muzzleDevice002002" + k;
handleMuzzleDeviceSelection(itemsID);
				
				// Update total cost
				if (window.renderTotals) {
					setTimeout(() => {
						window.renderTotals();
					}, 100);
				}
			}, true); // Use capture phase
		} else {
			console.warn(`⚠️ Muzzle Device: ${variantCardId} not found`);
		}
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
			updateSummaryCards_MuzzleDevice();
});
} else {
		console.warn("⚠️ Muzzle Device: summaryChartButton not found");
	}
}

export function getSelectedMuzzleDevice() {
	// Check 001001
	{
		const product = window.part.muzzleDevice["001"].products["001"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	// Check 001002
	{
		const product = window.part.muzzleDevice["001"].products["002"];
		if (product.variants["01"] && product.variants["01"].quantity === 1) {
			return product.variants["01"];
		}
	}
	// Check 002002 variants
	{
		const product = window.part.muzzleDevice["002"].products["002"];
		for (let i = 1; i <= 2; i++) {
			const k = ("" + i).padStart(2, "0");
			if (product.variants[k] && product.variants[k].quantity === 1) {
				return product.variants[k];
			}
		}
	}
	return null;
}

export function getMuzzleDeviceTotalPrice() {
	const v = getSelectedMuzzleDevice();
	return v ? v.price : 0;
}
