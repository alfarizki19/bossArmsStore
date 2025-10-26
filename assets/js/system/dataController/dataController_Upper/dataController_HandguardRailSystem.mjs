// === dataController_HandguardRailSystem.mjs ===
// Handguard Rail System UI Controller (Upper Category)

// Import model controller functions
import { updateModel_Handguard, handleHandguardSelection } from '../../modelController/modelController_Upper/modelController_Handguard.mjs';

function hrs_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function hrs_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function hrs_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

function hrs_hideAllUpperImages() {
	const ids = [
		"partImgID_handguardRailSystem00100101",
		"partImgID_handguardRailSystem00100102",
		"partImgID_handguardRailSystem00100201",
		"partImgID_handguardRailSystem00100202",
	];
	ids.forEach(function (id) { const el = document.getElementById(id); if (el) el.style.display = "none"; });
}

function hrs_hideProductImagesByGroup(groupSuffix) {
	for (let i = 1; i <= 2; i++) {
		const idx = ("" + i).padStart(2, "0");
		const el = document.getElementById("productImgID_handguardRailSystem" + groupSuffix + idx);
		if (el) el.style.display = "none";
	}
}

function hrs_hideAllProductImages() {
	["001001", "001002"].forEach(function (suffix) { hrs_hideProductImagesByGroup(suffix); });
}

function hrs_showDefaultProductImages() {
	const defaults = [
		"productImgID_handguardRailSystem00100101",
		"productImgID_handguardRailSystem00100201",
	];
	defaults.forEach(function (id) { const el = document.getElementById(id); if (el) el.style.display = "flex"; });
}

function hrs_clearVariantButtons(groupSuffix) {
	for (let i = 1; i <= 2; i++) {
		const idx = ("" + i).padStart(2, "0");
		const btn = document.getElementById("buttonItems_handguardRailSystem" + groupSuffix + idx);
		if (btn) btn.classList.remove("active");
	}
}

export function uiReset_handguardRailSystem001001() {
	const product = window.part.handguardRailSystem["001"].products["001"]; // 001001
	product.variants["01"].quantity = 0;
	product.variants["02"].quantity = 0;

	hrs_setText("productName_handguardRailSystem001001", product.productTitle);
	hrs_setText("productPricing_handguardRailSystem001001", product.variants["01"].price + " USD");
	hrs_removeClass("productHeader_handguardRailSystem001001", "active");
	hrs_removeClass("productButtonIcon_handguardRailSystem001001", "active");

	hrs_hideProductImagesByGroup("001001");
	hrs_hideAllUpperImages();

	hrs_setText("partName_Handguard", "-----");
	hrs_setText("partPrice_Handguard", "-----");
	hrs_clearVariantButtons("001001");
}

export function uiReset_handguardRailSystem001002() {
	const product = window.part.handguardRailSystem["001"].products["002"]; // 001002
	product.variants["01"].quantity = 0;
	product.variants["02"].quantity = 0;

	hrs_setText("productName_handguardRailSystem001002", product.productTitle);
	hrs_setText("productPricing_handguardRailSystem001002", product.variants["01"].price + " USD");
	hrs_removeClass("productHeader_handguardRailSystem001002", "active");
	hrs_removeClass("productButtonIcon_handguardRailSystem001002", "active");

	hrs_hideProductImagesByGroup("001002");
	hrs_hideAllUpperImages();

	hrs_setText("partName_Handguard", "-----");
	hrs_setText("partPrice_Handguard", "-----");
	hrs_clearVariantButtons("001002");
}

export function uiData_HandguardRailSystem() {
	let selected = null; let headerSuffix = null; let productTitle = "";

	// 001001
	{
		const product = window.part.handguardRailSystem["001"].products["001"];
		for (const v of ["01", "02"]) {
			if (product.variants[v].quantity === 1) {
				selected = product.variants[v]; headerSuffix = "001001"; productTitle = product.productTitle;
			}
		}
	}
	// 001002
	{
		const product = window.part.handguardRailSystem["001"].products["002"];
		for (const v of ["01", "02"]) {
			if (product.variants[v].quantity === 1) {
				selected = product.variants[v]; headerSuffix = "001002"; productTitle = product.productTitle;
			}
		}
	}

	if (!selected || !headerSuffix) return;

	// Items header
	hrs_setText("productPricing_handguardRailSystem" + headerSuffix, selected.price + " USD");
	hrs_addClass("productHeader_handguardRailSystem" + headerSuffix, "active");
	hrs_addClass("productButtonIcon_handguardRailSystem" + headerSuffix, "active");

	// Product images
	hrs_hideProductImagesByGroup(headerSuffix);
	const pImg = document.getElementById("productImgID_" + selected.id);
	if (pImg) pImg.style.display = "flex";

	// Ensure non-selected group's default image (01) is visible
	const otherSuffix = headerSuffix === "001001" ? "001002" : "001001";
	const otherDefault = document.getElementById("productImgID_handguardRailSystem" + otherSuffix + "01");
	if (otherDefault) otherDefault.style.display = "flex";

	// Upper menu
	hrs_hideAllUpperImages();
	const uImg = document.getElementById("partImgID_" + selected.id);
	if (uImg) uImg.style.display = "flex";

	const variantSuffix = (selected.variantTitle && selected.variantTitle.toLowerCase() !== "no variant") ? (" - " + selected.variantTitle) : "";
	hrs_setText("productName_handguardRailSystem" + headerSuffix, productTitle + variantSuffix);
	hrs_setText("partName_Handguard", productTitle + variantSuffix);
	hrs_setText("partPrice_Handguard", selected.price + " USD");

	// Variant buttons active
	hrs_clearVariantButtons(headerSuffix);
	const btn = document.getElementById("buttonItems_" + selected.id);
	if (btn) btn.classList.add("active");
}

// Start default -> 001001 variant 01
{
	const btn = document.getElementById("buttonModalStartMenu_StartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Show defaults for both product groups
			hrs_hideAllProductImages();
			hrs_showDefaultProductImages();
			uiReset_handguardRailSystem001001();
			uiReset_handguardRailSystem001002();
			window.part.handguardRailSystem["001"].products["001"].variants["01"].quantity = 1;
			uiData_HandguardRailSystem();
			
			// Update 3D model after UI update
			updateModel_Handguard();
		});
	}
}

// Variant listeners
{
	// 001001 -> 01, 02
	["01", "02"].forEach(function (v) {
		const btn = document.getElementById("buttonItems_handguardRailSystem001001" + v);
		if (btn) btn.addEventListener("click", function () {
			// Show defaults for both product groups before applying selection
			hrs_hideAllProductImages();
			hrs_showDefaultProductImages();
			uiReset_handguardRailSystem001001();
			uiReset_handguardRailSystem001002();
			window.part.handguardRailSystem["001"].products["001"].variants[v].quantity = 1;
			uiData_HandguardRailSystem();
			
			// Update 3D model after UI update
			const itemsID = "handguardRailSystem001001" + v;
			console.log(`🎯 Part button clicked: ${itemsID}`);
			handleHandguardSelection(itemsID);
		});
	});
	// 001002 -> 01, 02
	["01", "02"].forEach(function (v) {
		const btn = document.getElementById("buttonItems_handguardRailSystem001002" + v);
		if (btn) btn.addEventListener("click", function () {
			// Show defaults for both product groups before applying selection
			hrs_hideAllProductImages();
			hrs_showDefaultProductImages();
			uiReset_handguardRailSystem001001();
			uiReset_handguardRailSystem001002();
			window.part.handguardRailSystem["001"].products["002"].variants[v].quantity = 1;
			uiData_HandguardRailSystem();
			
			// Update 3D model after UI update
			const itemsID = "handguardRailSystem001002" + v;
			console.log(`🎯 Part button clicked: ${itemsID}`);
			handleHandguardSelection(itemsID);
		});
	});
}

export function getSelectedHandguardRailSystem() {
	const a = window.part.handguardRailSystem["001"].products["001"].variants;
	const b = window.part.handguardRailSystem["001"].products["002"].variants;
	for (const k of ["01", "02"]) { if (a[k].quantity === 1) return a[k]; }
	for (const k of ["01", "02"]) { if (b[k].quantity === 1) return b[k]; }
	return null;
}

export function getHandguardRailSystemTotalPrice() {
	const v = getSelectedHandguardRailSystem();
	return v ? v.price : 0;
}