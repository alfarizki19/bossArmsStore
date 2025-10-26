// === dataController_UpperReceiver.mjs ===
// Upper Receiver UI Controller (Upper Category)

// Import model controller functions
import { updateModel_UpperReceiver, handleUpperReceiverSelection } from '../../modelController/modelController_Upper/modelController_UpperReceiver.mjs';

function ur_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function ur_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function ur_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function ur_hideUpperImages() {
	["partImgID_upperReceiver00100101", "partImgID_upperReceiver00100102"].forEach(function (id) {
		const el = document.getElementById(id);
		if (el) el.style.display = "none";
	});
}

function ur_hideProductImages() {
	["productImgID_upperReceiver00100101", "productImgID_upperReceiver00100102"].forEach(function (id) {
		const el = document.getElementById(id);
		if (el) el.style.display = "none";
	});
}

function ur_clearVariantButtons() {
	["01", "02"].forEach(function (v) {
		const btn = document.getElementById("buttonItems_upperReceiver001001" + v);
		if (btn) btn.classList.remove("active");
	});
}

function ur_showDefaultProductImages() {
	// Show default variant image (01) for product group
	const defaultImg = document.getElementById("productImgID_upperReceiver00100101");
	if (defaultImg) defaultImg.style.display = "flex";
}

export function uiReset_upperReceiver001001() {
	const product = window.part.upperReceiver["001"].products["001"]; // MK4
	const variants = product.variants; // 01 black, 02 fde
	variants["01"].quantity = 0;
	variants["02"].quantity = 0;

	ur_setText("productName_upperReceiver001001", product.productTitle);
	ur_setText("productPricing_upperReceiver001001", variants["01"].price + " USD");
	ur_removeClass("productHeader_upperReceiver001001", "active");
	ur_removeClass("productButtonIcon_upperReceiver001001", "active");

	ur_hideUpperImages();
	ur_hideProductImages();

	ur_setText("partName_UpperReceiver", "-----");
	ur_setText("partPrice_UpperReceiver", "-----");
	ur_clearVariantButtons();
}

export function uiData_UpperReceiver() {
	const product = window.part.upperReceiver["001"].products["001"]; // MK4
	const v01 = product.variants["01"]; const v02 = product.variants["02"];
	let selected = null; let variantKey = null;
	if (v01.quantity === 1) { selected = v01; variantKey = "01"; }
	if (v02.quantity === 1) { selected = v02; variantKey = "02"; }
	if (!selected) return;

	// Items header
	ur_setText("productPricing_upperReceiver001001", selected.price + " USD");
	ur_addClass("productHeader_upperReceiver001001", "active");
	ur_addClass("productButtonIcon_upperReceiver001001", "active");

	// Product images
	ur_hideProductImages();
	const pImg = document.getElementById("productImgID_upperReceiver001001" + variantKey);
	if (pImg) pImg.style.display = "flex";

	// Upper menu
	ur_hideUpperImages();
	const uImg = document.getElementById("partImgID_upperReceiver001001" + variantKey);
	if (uImg) uImg.style.display = "flex";

	const variantSuffix = (selected.variantTitle && selected.variantTitle.toLowerCase() !== "no variant") ? (" - " + selected.variantTitle) : "";
	ur_setText("productName_upperReceiver001001", product.productTitle + variantSuffix);
	ur_setText("partName_UpperReceiver", product.productTitle + variantSuffix);
	ur_setText("partPrice_UpperReceiver", selected.price + " USD");

	ur_clearVariantButtons();
	const btn = document.getElementById("buttonItems_upperReceiver001001" + variantKey);
	if (btn) btn.classList.add("active");
}

// Start button default -> black (01)
{
	const btn = document.getElementById("buttonModalStartMenu_StartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Hide all product images then show default variant image (01)
			ur_hideProductImages();
			ur_showDefaultProductImages();
			
			// Reset UI states
			uiReset_upperReceiver001001();
			
			// Select default variant: 00100101
			window.part.upperReceiver["001"].products["001"].variants["01"].quantity = 1;
			uiData_UpperReceiver();
			
			// Update 3D model after UI update
			updateModel_UpperReceiver();
		});
	}
}

// Variant selection listeners
{
	const b01 = document.getElementById("buttonItems_upperReceiver00100101");
	if (b01) b01.addEventListener("click", function () {
		// Hide all product images then show default variant image (01)
		ur_hideProductImages();
		ur_showDefaultProductImages();
		
		// Reset UI states
		uiReset_upperReceiver001001();
		
		// Select variant
		window.part.upperReceiver["001"].products["001"].variants["01"].quantity = 1;
		uiData_UpperReceiver();
		
		// Update 3D model after UI update
		const itemsID = "upperReceiver00100101";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleUpperReceiverSelection(itemsID);
	});
	const b02 = document.getElementById("buttonItems_upperReceiver00100102");
	if (b02) b02.addEventListener("click", function () {
		// Hide all product images then show default variant image (01)
		ur_hideProductImages();
		ur_showDefaultProductImages();
		
		// Reset UI states
		uiReset_upperReceiver001001();
		
		// Select variant
		window.part.upperReceiver["001"].products["001"].variants["02"].quantity = 1;
		uiData_UpperReceiver();
		
		// Update 3D model after UI update
		const itemsID = "upperReceiver00100102";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleUpperReceiverSelection(itemsID);
	});
}

export function getSelectedUpperReceiver() {
	const product = window.part.upperReceiver["001"].products["001"]; // MK4
	for (const k of ["01", "02"]) {
		if (product.variants[k].quantity === 1) return product.variants[k];
	}
	return null;
}

export function getUpperReceiverTotalPrice() {
	const v = getSelectedUpperReceiver();
	return v ? v.price : 0;
}