// === dataController_BoltCarrierGroup.mjs ===
// Bolt Carrier Group UI Controller (Upper Category)

// Import model controller functions
import { updateModel_BoltCarrierGroup, handleBoltCarrierGroupSelection } from '../../modelController/modelController_Upper/modelController_BoltCarrierGroup.mjs';

function bcg_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function bcg_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function bcg_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function bcg_hideAllUpperImages() {
	const ids = [
		"partImgID_boltCarrierGroup00100101",
		"partImgID_boltCarrierGroup00200101",
		"partImgID_boltCarrierGroup00200201",
	];
	ids.forEach(function (id) { const el = document.getElementById(id); if (el) el.style.display = "none"; });
}

function bcg_hideProductImagesByGroup(groupSuffix) {
	for (let i = 1; i <= 1; i++) {
		const idx = ("" + i).padStart(2, "0");
		const el = document.getElementById("productImgID_boltCarrierGroup" + groupSuffix + idx);
		if (el) el.style.display = "none";
	}
}

function bcg_hideAllProductImages() {
	["001001", "002001", "002002"].forEach(function (suffix) { bcg_hideProductImagesByGroup(suffix); });
}

function bcg_showDefaultProductImages() {
	const defaults = [
		"productImgID_boltCarrierGroup00100101",
		"productImgID_boltCarrierGroup00200101",
		"productImgID_boltCarrierGroup00200201",
	];
	defaults.forEach(function (id) { const el = document.getElementById(id); if (el) el.style.display = "flex"; });
}

function bcg_clearVariantButtons(groupSuffix) {
	for (let i = 1; i <= 1; i++) {
		const idx = ("" + i).padStart(2, "0");
		const btn = document.getElementById("buttonItems_boltCarrierGroup" + groupSuffix + idx);
		if (btn) btn.classList.remove("active");
	}
}

export function uiReset_boltCarrierGroup001001() {
	const product = window.part.boltCarrierGroup["001"].products["001"]; // 001001
	product.variants["01"].quantity = 0;

	bcg_setText("productName_boltCarrierGroup001001", product.productTitle);
	bcg_setText("productPricing_boltCarrierGroup001001", product.variants["01"].price + " USD");
	bcg_removeClass("productHeader_boltCarrierGroup001001", "active");
	bcg_removeClass("productButtonIcon_boltCarrierGroup001001", "active");

	bcg_hideProductImagesByGroup("001001");
	bcg_hideAllUpperImages();

	bcg_setText("partName_BoltCarrierGroup", "-----");
	bcg_setText("partPrice_BoltCarrierGroup", "-----");
	bcg_clearVariantButtons("001001");
}

export function uiReset_boltCarrierGroup002001() {
	const product = window.part.boltCarrierGroup["002"].products["001"]; // 002001
	product.variants["01"].quantity = 0;

	bcg_setText("productName_boltCarrierGroup002001", product.productTitle);
	bcg_setText("productPricing_boltCarrierGroup002001", product.variants["01"].price + " USD");
	bcg_removeClass("productHeader_boltCarrierGroup002001", "active");
	bcg_removeClass("productButtonIcon_boltCarrierGroup002001", "active");

	bcg_hideProductImagesByGroup("002001");
	bcg_hideAllUpperImages();

	bcg_setText("partName_BoltCarrierGroup", "-----");
	bcg_setText("partPrice_BoltCarrierGroup", "-----");
	bcg_clearVariantButtons("002001");
}

export function uiReset_boltCarrierGroup002002() {
	const product = window.part.boltCarrierGroup["002"].products["002"]; // 002002
	product.variants["01"].quantity = 0;

	bcg_setText("productName_boltCarrierGroup002002", product.productTitle);
	bcg_setText("productPricing_boltCarrierGroup002002", product.variants["01"].price + " USD");
	bcg_removeClass("productHeader_boltCarrierGroup002002", "active");
	bcg_removeClass("productButtonIcon_boltCarrierGroup002002", "active");

	bcg_hideProductImagesByGroup("002002");
	bcg_hideAllUpperImages();

	bcg_setText("partName_BoltCarrierGroup", "-----");
	bcg_setText("partPrice_BoltCarrierGroup", "-----");
	bcg_clearVariantButtons("002002");
}

export function uiData_BoltCarrierGroup() {
	let selected = null; let headerSuffix = null; let productTitle = "";

	// 001001
	{
		const product = window.part.boltCarrierGroup["001"].products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; headerSuffix = "001001"; productTitle = product.productTitle;
		}
	}
	// 002001
	{
		const product = window.part.boltCarrierGroup["002"].products["001"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; headerSuffix = "002001"; productTitle = product.productTitle;
		}
	}
	// 002002
	{
		const product = window.part.boltCarrierGroup["002"].products["002"];
		if (product.variants["01"].quantity === 1) {
			selected = product.variants["01"]; headerSuffix = "002002"; productTitle = product.productTitle;
		}
	}

	if (!selected || !headerSuffix) return;

	// Items header
	bcg_setText("productPricing_boltCarrierGroup" + headerSuffix, selected.price + " USD");
	bcg_addClass("productHeader_boltCarrierGroup" + headerSuffix, "active");
	bcg_addClass("productButtonIcon_boltCarrierGroup" + headerSuffix, "active");

	// Product images
	bcg_hideProductImagesByGroup(headerSuffix);
	const pImg = document.getElementById("productImgID_" + selected.id);
	if (pImg) pImg.style.display = "flex";

	// Ensure non-selected groups' default images are visible
	const otherSuffixes = ["001001", "002001", "002002"].filter(s => s !== headerSuffix);
	otherSuffixes.forEach(suffix => {
		const otherDefault = document.getElementById("productImgID_boltCarrierGroup" + suffix + "01");
		if (otherDefault) otherDefault.style.display = "flex";
	});

	// Upper menu
	bcg_hideAllUpperImages();
	const uImg = document.getElementById("partImgID_" + selected.id);
	if (uImg) uImg.style.display = "flex";

	const variantSuffix = (selected.variantTitle && selected.variantTitle.toLowerCase() !== "no variant") ? (" - " + selected.variantTitle) : "";
	bcg_setText("productName_boltCarrierGroup" + headerSuffix, productTitle + variantSuffix);
	bcg_setText("partName_BoltCarrierGroup", productTitle + variantSuffix);
	bcg_setText("partPrice_BoltCarrierGroup", selected.price + " USD");

	// Variant buttons active
	bcg_clearVariantButtons(headerSuffix);
	const btn = document.getElementById("buttonItems_" + selected.id);
	if (btn) btn.classList.add("active");
}

// Start default -> 001001 variant 01
{
	const btn = document.getElementById("buttonModalStartMenu_StartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Show defaults for all product groups
			bcg_hideAllProductImages();
			bcg_showDefaultProductImages();
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
        window.part.boltCarrierGroup["001"].products["001"].variants["01"].quantity = 1;
        uiData_BoltCarrierGroup();
			
			// Update 3D model after UI update
			updateModel_BoltCarrierGroup();
});
	}
}

// Variant listeners
{
	// 001001 -> 01
	const btn001001 = document.getElementById("buttonItems_boltCarrierGroup00100101");
	if (btn001001) btn001001.addEventListener("click", function () {
		// Show defaults for all product groups before applying selection
		bcg_hideAllProductImages();
		bcg_showDefaultProductImages();
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
        window.part.boltCarrierGroup["001"].products["001"].variants["01"].quantity = 1;
        uiData_BoltCarrierGroup();
		
		// Update 3D model after UI update
		const itemsID = "boltCarrierGroup00100101";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleBoltCarrierGroupSelection(itemsID);
	});

	// 002001 -> 01
	const btn002001 = document.getElementById("buttonItems_boltCarrierGroup00200101");
	if (btn002001) btn002001.addEventListener("click", function () {
		// Show defaults for all product groups before applying selection
		bcg_hideAllProductImages();
		bcg_showDefaultProductImages();
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
        window.part.boltCarrierGroup["002"].products["001"].variants["01"].quantity = 1;
        uiData_BoltCarrierGroup();
		
		// Update 3D model after UI update
		const itemsID = "boltCarrierGroup00200101";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleBoltCarrierGroupSelection(itemsID);
	});

	// 002002 -> 01
	const btn002002 = document.getElementById("buttonItems_boltCarrierGroup00200201");
	if (btn002002) btn002002.addEventListener("click", function () {
		// Show defaults for all product groups before applying selection
		bcg_hideAllProductImages();
		bcg_showDefaultProductImages();
    uiReset_boltCarrierGroup001001();
    uiReset_boltCarrierGroup002001();
    uiReset_boltCarrierGroup002002();
        window.part.boltCarrierGroup["002"].products["002"].variants["01"].quantity = 1;
        uiData_BoltCarrierGroup();
		
		// Update 3D model after UI update
		const itemsID = "boltCarrierGroup00200201";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleBoltCarrierGroupSelection(itemsID);
});
}

export function getSelectedBoltCarrierGroup() {
	const a = window.part.boltCarrierGroup["001"].products["001"].variants;
	const b = window.part.boltCarrierGroup["002"].products["001"].variants;
	const c = window.part.boltCarrierGroup["002"].products["002"].variants;
	if (a["01"].quantity === 1) return a["01"];
	if (b["01"].quantity === 1) return b["01"];
	if (c["01"].quantity === 1) return c["01"];
	return null;
}

export function getBoltCarrierGroupTotalPrice() {
	const v = getSelectedBoltCarrierGroup();
	return v ? v.price : 0;
}