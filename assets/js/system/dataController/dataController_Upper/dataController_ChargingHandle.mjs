// === dataController_ChargingHandle.mjs ===
// Charging Handle UI Controller for M4 Rifle Configurator (Upper Category)

// Import model controller functions
import { updateModel_ChargingHandle, handleChargingHandleSelection } from '../../modelController/modelController_Upper/modelController_ChargingHandle.mjs';

// Utility helpers
function ch_hideAllUpperImages() {
	const ids = [
		"partImgID_chargingHandle00100101",
		"partImgID_chargingHandle00100102",
		"partImgID_chargingHandle00200101",
		"partImgID_chargingHandle00300101",
		"partImgID_chargingHandle00300102",
		"partImgID_chargingHandle00300103",
		"partImgID_chargingHandle00400101",
		"partImgID_chargingHandle00400102",
		"partImgID_chargingHandle00400103",
		"partImgID_chargingHandle00400104",
		"partImgID_chargingHandle00400105",
		"partImgID_chargingHandle00400106",
		"partImgID_chargingHandle00400107",
		"partImgID_chargingHandle00400108",
		"partImgID_chargingHandle00400109",
		"partImgID_chargingHandle00400110",
	];
	ids.forEach(function (id) {
		const el = document.getElementById(id);
		if (el) el.style.display = "none";
	});
}

// Hide product images in the items menu for a given product group (e.g., 001001 / 003001 / 004001)
function ch_hideProductImagesByGroup(groupSuffix) {
	for (let i = 1; i <= 10; i++) {
		const idx = ("" + i).padStart(2, "0");
		const el = document.getElementById("productImgID_chargingHandle" + groupSuffix + idx);
		if (el) el.style.display = "none";
	}
}

// Hide all product images across all charging handle product groups
function ch_hideAllProductImages() {
	["001001", "002001", "003001", "004001"].forEach(function (suffix) {
		ch_hideProductImagesByGroup(suffix);
	});
}

function ch_setText(id, text) {
	const el = document.getElementById(id);
	if (el) el.textContent = text;
}

function ch_addClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.add(className);
}

function ch_removeClass(id, className) {
	const el = document.getElementById(id);
	if (el) el.classList.remove(className);
}

// Clear active state on color variant buttons for a given product group
function ch_clearVariantButtons(groupSuffix) {
	for (let i = 1; i <= 10; i++) {
		const idx = ("" + i).padStart(2, "0");
		const btn = document.getElementById("buttonItems_chargingHandle" + groupSuffix + idx);
		if (btn) btn.classList.remove("active");
	}
}

// Reset per product
export function uiReset_chargingHandle001001() {
	// Geissele ACH with 2 color variants (01 black, 02 ddc)
	window.part.chargingHandle["001"].products["001"].variants["01"].quantity = 0;
	window.part.chargingHandle["001"].products["001"].variants["02"].quantity = 0;
	const product = window.part.chargingHandle["001"].products["001"];
	ch_setText("productName_chargingHandle001001", product.productTitle);
	ch_setText("productPricing_chargingHandle001001", product.variants["01"].price + " USD");
	ch_removeClass("productButtonIcon_chargingHandle001001", "active");
	ch_removeClass("productHeader_chargingHandle001001", "active");
	ch_clearVariantButtons("001001");
	ch_hideAllUpperImages();
	ch_setText("partName_ChargingHandle", "-----");
	ch_setText("partPrice_ChargingHandle", "-----");
}

export function uiReset_chargingHandle002001() {
	// Novoske no variant
	window.part.chargingHandle["002"].products["001"].variants["01"].quantity = 0;
	const product = window.part.chargingHandle["002"].products["001"];
	ch_setText("productName_chargingHandle002001", product.productTitle);
	ch_setText("productPricing_chargingHandle002001", product.variants["01"].price + " USD");
	ch_removeClass("productButtonIcon_chargingHandle002001", "active");
	ch_removeClass("productHeader_chargingHandle002001", "active");
	ch_clearVariantButtons("002001");
	ch_hideAllUpperImages();
	ch_setText("partName_ChargingHandle", "-----");
	ch_setText("partPrice_ChargingHandle", "-----");
}

export function uiReset_chargingHandle003001() {
	// Radian with 3 color variants (01 black, 02 fde, 03 red)
	const variants = window.part.chargingHandle["003"].products["001"].variants;
	variants["01"].quantity = 0;
	variants["02"].quantity = 0;
	variants["03"].quantity = 0;
	const product = window.part.chargingHandle["003"].products["001"];
	ch_setText("productName_chargingHandle003001", product.productTitle);
	ch_setText("productPricing_chargingHandle003001", product.variants["01"].price + " USD");
	ch_removeClass("productButtonIcon_chargingHandle003001", "active");
	ch_removeClass("productHeader_chargingHandle003001", "active");
	ch_clearVariantButtons("003001");
	ch_hideAllUpperImages();
	ch_setText("partName_ChargingHandle", "-----");
	ch_setText("partPrice_ChargingHandle", "-----");
}

export function uiReset_chargingHandle004001() {
	// Timber Creek with 10 color variants (01..10)
	const variants = window.part.chargingHandle["004"].products["001"].variants;
	Object.keys(variants).forEach(function (key) { variants[key].quantity = 0; });
	const product = window.part.chargingHandle["004"].products["001"];
	ch_setText("productName_chargingHandle004001", product.productTitle);
	ch_setText("productPricing_chargingHandle004001", variants["01"].price + " USD");
	ch_removeClass("productButtonIcon_chargingHandle004001", "active");
	ch_removeClass("productHeader_chargingHandle004001", "active");
	ch_clearVariantButtons("004001");
	ch_hideAllUpperImages();
	ch_setText("partName_ChargingHandle", "-----");
	ch_setText("partPrice_ChargingHandle", "-----");
}

export function uiData_ChargingHandle() {
	let selected = null;
	let headerSuffix = null; // e.g., 001001 / 002001 / 003001 / 004001

	// Geissele
	const g01 = window.part.chargingHandle["001"].products["001"].variants["01"];
	if (g01.quantity === 1) { selected = g01; headerSuffix = "001001"; }
	const g02 = window.part.chargingHandle["001"].products["001"].variants["02"];
	if (g02.quantity === 1) { selected = g02; headerSuffix = "001001"; }

	// Novoske
	const n01 = window.part.chargingHandle["002"].products["001"].variants["01"];
	if (n01.quantity === 1) { selected = n01; headerSuffix = "002001"; }

	// Radian
	const r01 = window.part.chargingHandle["003"].products["001"].variants["01"];
	if (r01.quantity === 1) { selected = r01; headerSuffix = "003001"; }
	const r02 = window.part.chargingHandle["003"].products["001"].variants["02"];
	if (r02.quantity === 1) { selected = r02; headerSuffix = "003001"; }
	const r03 = window.part.chargingHandle["003"].products["001"].variants["03"];
	if (r03.quantity === 1) { selected = r03; headerSuffix = "003001"; }

	// Timber Creek (01..10)
	const tVariants = window.part.chargingHandle["004"].products["001"].variants;
	Object.keys(tVariants).forEach(function (k) {
		if (tVariants[k].quantity === 1) { selected = tVariants[k]; headerSuffix = "004001"; }
	});

	if (!selected) return;

	// Items menu
	ch_setText("productPricing_chargingHandle" + headerSuffix, selected.price + " USD");
	ch_addClass("productHeader_chargingHandle" + headerSuffix, "active");
	ch_addClass("productButtonIcon_chargingHandle" + headerSuffix, "active");

	// Product menu images: hide all in this group, then show selected
	ch_hideProductImagesByGroup(headerSuffix);
	const productImg = document.getElementById("productImgID_" + selected.id);
	if (productImg) productImg.style.display = "flex";

	// Upper menu images
	ch_hideAllUpperImages();
	const upperImg = document.getElementById("partImgID_" + selected.id);
	if (upperImg) upperImg.style.display = "flex";

	// Upper menu texts
	// Resolve productTitle by traversing back from selected id
	let productTitle = "";
	(function resolveTitle() {
		const groups = ["001", "002", "003", "004"];
		for (const g of groups) {
			const brand = window.part.chargingHandle[g];
			if (!brand) continue;
			const prod = brand.products["001"];
			if (!prod) continue;
			const variants = prod.variants;
			for (const key in variants) {
				if (variants[key].id === selected.id) { productTitle = prod.productTitle; return; }
			}
		}
	})();
	const variantSuffix = (selected.variantTitle && selected.variantTitle.toLowerCase() !== "no variant") ? (" - " + selected.variantTitle) : "";
	// Update items header product name with variant suffix (if any)
	ch_setText("productName_chargingHandle" + headerSuffix, productTitle + variantSuffix);
	// Update upper menu part name with variant suffix (if any)
	ch_setText("partName_ChargingHandle", productTitle + variantSuffix);
	ch_setText("partPrice_ChargingHandle", selected.price + " USD");

	// Variant button active state (if variant buttons exist for this group)
	ch_clearVariantButtons(headerSuffix);
	const variantIdx = selected.id.slice(-2);
	const selectedBtn = document.getElementById("buttonItems_" + selected.id);
	if (selectedBtn) selectedBtn.classList.add("active");
}

// Start button selects a sensible default: Geissele black (00100101)
{
	const btn = document.getElementById("buttonModalStartMenu_StartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Hide all product images then show default variant image (01) for each product group
			ch_hideAllProductImages();
			const defaults = [
				"productImgID_chargingHandle00100101",
				"productImgID_chargingHandle00200101",
				"productImgID_chargingHandle00300101",
				"productImgID_chargingHandle00400101",
			];
			defaults.forEach(function (id) {
				const el = document.getElementById(id);
				if (el) el.style.display = "flex";
			});

			// Reset UI states
			uiReset_chargingHandle001001();
			uiReset_chargingHandle002001();
			uiReset_chargingHandle003001();
			uiReset_chargingHandle004001();

			// Select default variant: Geissele 00100101
			window.part.chargingHandle["001"].products["001"].variants["01"].quantity = 1;
			uiData_ChargingHandle();
			
			// Update 3D model after UI update
			updateModel_ChargingHandle();
		});
	}
}

// Selection buttons
{
	// Geissele: black & ddc
	const gBlack = document.getElementById("buttonItems_chargingHandle00100101");
	if (gBlack) gBlack.addEventListener("click", function () {
		uiReset_chargingHandle001001();
		uiReset_chargingHandle002001();
		uiReset_chargingHandle003001();
		uiReset_chargingHandle004001();
		window.part.chargingHandle["001"].products["001"].variants["01"].quantity = 1;
		uiData_ChargingHandle();
		
		// Update 3D model after UI update
		const itemsID = "chargingHandle00100101";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleChargingHandleSelection(itemsID);
	});
	const gDdc = document.getElementById("buttonItems_chargingHandle00100102");
	if (gDdc) gDdc.addEventListener("click", function () {
		uiReset_chargingHandle001001();
		uiReset_chargingHandle002001();
		uiReset_chargingHandle003001();
		uiReset_chargingHandle004001();
		window.part.chargingHandle["001"].products["001"].variants["02"].quantity = 1;
		uiData_ChargingHandle();
		
		// Update 3D model after UI update
		const itemsID = "chargingHandle00100102";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleChargingHandleSelection(itemsID);
	});

	// Novoske
	const n = document.getElementById("buttonItems_chargingHandle00200101");
	if (n) n.addEventListener("click", function () {
		uiReset_chargingHandle001001();
		uiReset_chargingHandle002001();
		uiReset_chargingHandle003001();
		uiReset_chargingHandle004001();
		window.part.chargingHandle["002"].products["001"].variants["01"].quantity = 1;
		uiData_ChargingHandle();
		
		// Update 3D model after UI update
		const itemsID = "chargingHandle00200101";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleChargingHandleSelection(itemsID);
	});

	// Radian: black, fde, red
	const rBlack = document.getElementById("buttonItems_chargingHandle00300101");
	if (rBlack) rBlack.addEventListener("click", function () {
		uiReset_chargingHandle001001();
		uiReset_chargingHandle002001();
		uiReset_chargingHandle003001();
		uiReset_chargingHandle004001();
		window.part.chargingHandle["003"].products["001"].variants["01"].quantity = 1;
		uiData_ChargingHandle();
		
		// Update 3D model after UI update
		const itemsID = "chargingHandle00300101";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleChargingHandleSelection(itemsID);
	});
	const rFde = document.getElementById("buttonItems_chargingHandle00300102");
	if (rFde) rFde.addEventListener("click", function () {
		uiReset_chargingHandle001001();
		uiReset_chargingHandle002001();
		uiReset_chargingHandle003001();
		uiReset_chargingHandle004001();
		window.part.chargingHandle["003"].products["001"].variants["02"].quantity = 1;
		uiData_ChargingHandle();
		
		// Update 3D model after UI update
		const itemsID = "chargingHandle00300102";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleChargingHandleSelection(itemsID);
	});
	const rRed = document.getElementById("buttonItems_chargingHandle00300103");
	if (rRed) rRed.addEventListener("click", function () {
		uiReset_chargingHandle001001();
		uiReset_chargingHandle002001();
		uiReset_chargingHandle003001();
		uiReset_chargingHandle004001();
		window.part.chargingHandle["003"].products["001"].variants["03"].quantity = 1;
		uiData_ChargingHandle();
		
		// Update 3D model after UI update
		const itemsID = "chargingHandle00300103";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleChargingHandleSelection(itemsID);
	});

	// Timber Creek (01..10)
	for (let i = 1; i <= 10; i++) {
		const idx = ("" + i).padStart(2, "0");
		const btn = document.getElementById("buttonItems_chargingHandle004001" + idx);
		if (!btn) continue;
		btn.addEventListener("click", function () {
			uiReset_chargingHandle001001();
			uiReset_chargingHandle002001();
			uiReset_chargingHandle003001();
			uiReset_chargingHandle004001();
			window.part.chargingHandle["004"].products["001"].variants[idx].quantity = 1;
			uiData_ChargingHandle();
			
			// Update 3D model after UI update
			const itemsID = "chargingHandle004001" + idx;
			console.log(`🎯 Part button clicked: ${itemsID}`);
			handleChargingHandleSelection(itemsID);
		});
	}
}

export function getSelectedChargingHandle() {
	// Iterate all variants across all brands
	const groups = ["001", "002", "003", "004"];
	for (const g of groups) {
		const brand = window.part.chargingHandle[g];
		if (!brand) continue;
		const prod = brand.products["001"];
		if (!prod) continue;
		const variants = prod.variants;
		for (const k in variants) {
			if (variants[k].quantity === 1) return variants[k];
		}
	}
	return null;
}

export function getChargingHandleTotalPrice() {
	const v = getSelectedChargingHandle();
	return v ? v.price : 0;
}