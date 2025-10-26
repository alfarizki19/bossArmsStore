// === dataController_MuzzleDevice.mjs ===
// Muzzle Device UI Controller (Upper Category)

// Import model controller functions
import { updateModel_MuzzleDevice, handleMuzzleDeviceSelection } from '../../modelController/modelController_Upper/modelController_MuzzleDevice.mjs';

function md_setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function md_addClass(id, c) { const el = document.getElementById(id); if (el) el.classList.add(c); }
function md_removeClass(id, c) { const el = document.getElementById(id); if (el) el.classList.remove(c); }

// Note: Part menu HTML for MuzzleDevice shows static images; we only control names/prices and product images where IDs exist.

// Helpers to handle product images for 002002 (has variant images with non-standard ids)
function md_hideProductImages_002002() {
	["01", "02"].forEach(function (idx) {
		const p1 = document.getElementById("productImgID_muzzleDevice002002" + idx);
		if (p1) p1.style.display = "none";
		const p2 = document.getElementById("partImgID_muzzleDevice002002" + idx);
		if (p2) p2.style.display = "none";
	});
}

function md_showDefaultImage_00200201() {
	const d1 = document.getElementById("productImgID_muzzleDevice00200201");
	const d2 = document.getElementById("partImgID_muzzleDevice00200201");
	if (d1) d1.style.display = "flex";
	if (d2) d2.style.display = "flex";
}

function md_hideAllUpperImages() {
	[
		"partImgID_muzzleDevice00100101",
		"partImgID_muzzleDevice00100201",
		"partImgID_muzzleDevice00200201",
		"partImgID_muzzleDevice00200202",
	].forEach(function (id) { const el = document.getElementById(id); if (el) el.style.display = "none"; });
}

function md_showUpperDefaultsAllGroups() {
	["partImgID_muzzleDevice00100101", "partImgID_muzzleDevice00100201", "partImgID_muzzleDevice00200201"].forEach(function (id) {
		const el = document.getElementById(id); if (el) el.style.display = "flex";
	});
}

// Update product header images for 002002 inside its own container
function md_showProductHeaderImage_002002(variantKey) {
	// Deterministic: hide both known ids, then show the requested one
	const id01 = "productImgID_muzzleDevice00200201";
	const id02 = "productImgID_muzzleDevice00200202";
	const el01 = document.getElementById(id01);
	const el02 = document.getElementById(id02);
	if (el01) el01.style.display = "none";
	if (el02) el02.style.display = "none";
	const targetId = variantKey === "02" ? id02 : id01;
	const target = document.getElementById(targetId);
	if (target) target.style.display = "flex";
}

// Update only the upper menu image/texts within upper menu container
function md_updateUpperMenu(selectedId, title, price) {
	const nameEl = document.getElementById("partName_MuzzleDevice");
	if (nameEl) nameEl.textContent = title;
	const priceEl = document.getElementById("partPrice_MuzzleDevice");
	if (priceEl) priceEl.textContent = price + " USD";
	const container = nameEl ? nameEl.closest(".menuPartMenuOptionContainer") : null;
	if (!container) return;
	const imgArea = container.querySelector(".menuPartMenuOptionImageArea");
	if (!imgArea) return;
	const imgs = imgArea.querySelectorAll("img, image, Image");
	imgs.forEach(function (img) { img.style.display = "none"; });
	const upperTarget = imgArea.querySelector("#partImgID_" + selectedId);
	if (upperTarget) upperTarget.style.display = "flex";
}

// Header icon helpers
function md_setHeaderIconActive(headerSuffix, isActive) {
	const header = document.getElementById("productHeader_muzzleDevice" + headerSuffix);
	if (!header) return;
	const icon = header.querySelector(".itemsAccordionTypeA_OpenAccordion_ButtonIcon");
	if (!icon) return;
	if (isActive) icon.classList.add("active"); else icon.classList.remove("active");
}

function md_clearAllHeaderIcons() {
	["001001", "001002", "002002"].forEach(function (suffix) { md_setHeaderIconActive(suffix, false); });
}

// Variant icon helpers for 002002
function md_clearVariantButtons_002002() {
	["01", "02"].forEach(function (v) {
		const btn = document.getElementById("buttonItems_muzzleDevice002002" + v);
		if (btn) btn.classList.remove("active");
		const icon = btn ? btn.querySelector(".itemsAccordionTypeA_ColorVariant_ButtonIcon") : null;
		if (icon) icon.classList.remove("active");
	});
}

function md_setVariantActive_002002(variantKey) {
	const btn = document.getElementById("buttonItems_muzzleDevice002002" + variantKey);
	if (btn) btn.classList.add("active");
	const icon = btn ? btn.querySelector(".itemsAccordionTypeA_ColorVariant_ButtonIcon") : null;
	if (icon) icon.classList.add("active");
}

// Helper: zero Warden quantities if Warden inventory exists
function md_zeroWardenQuantities(){
	try{
		const wdBrand = window.part && window.part.muzzleDevice && window.part.muzzleDevice['001'];
		const wdProd = wdBrand && wdBrand.products ? wdBrand.products['003'] : null;
		if(wdProd && wdProd.variants){
			if(wdProd.variants['01']) wdProd.variants['01'].quantity = 0;
			if(wdProd.variants['02']) wdProd.variants['02'].quantity = 0;
		}
	}catch(e){}
}

export function uiReset_muzzleDevice001001() {
	const product = window.part.muzzleDevice["001"].products["001"]; // warcomp 556 ctn closed, no variant
	product.variants["01"].quantity = 0;
	md_setText("productName_muzzleDevice001001", product.productTitle);
	md_setText("productPricing_muzzleDevice001001", product.variants["01"].price + " USD");
	md_removeClass("productHeader_muzzleDevice001001", "active");
}

export function uiReset_muzzleDevice001002() {
	const product = window.part.muzzleDevice["001"].products["002"]; // warcomp flash hider, no variant
	product.variants["01"].quantity = 0;
	md_setText("productName_muzzleDevice001002", product.productTitle);
	md_setText("productPricing_muzzleDevice001002", product.variants["01"].price + " USD");
	md_removeClass("productHeader_muzzleDevice001002", "active");
}

export function uiReset_muzzleDevice002002() {
	const product = window.part.muzzleDevice["002"].products["002"]; // 65 Heart Breaker, variants 01..02
	product.variants["01"].quantity = 0;
	product.variants["02"].quantity = 0;
	md_setText("productName_muzzleDevice002002", product.productTitle);
	md_setText("productPricing_muzzleDevice002002", product.variants["01"].price + " USD");
	md_removeClass("productHeader_muzzleDevice002002", "active");
}

export function uiData_MuzzleDevice() {
	let selected = null; let headerSuffix = null; let productTitle = "";

	// 001001
	{
		const product = window.part.muzzleDevice["001"].products["001"]; const v = product.variants["01"]; if (v.quantity === 1) { selected = v; headerSuffix = "001001"; productTitle = product.productTitle; }
	}
	// 001002
	{
		const product = window.part.muzzleDevice["001"].products["002"]; const v = product.variants["01"]; if (v.quantity === 1) { selected = v; headerSuffix = "001002"; productTitle = product.productTitle; }
	}
	// 002002 (01..02)
	{
		const product = window.part.muzzleDevice["002"].products["002"]; for (const k of ["01", "02"]) { if (product.variants[k].quantity === 1) { selected = product.variants[k]; headerSuffix = "002002"; productTitle = product.productTitle; } }
	}

	if (!selected) return;

	md_setText("productPricing_muzzleDevice" + headerSuffix, selected.price + " USD");
	md_addClass("productHeader_muzzleDevice" + headerSuffix, "active");
	md_clearAllHeaderIcons();
	md_setHeaderIconActive(headerSuffix, true);

	const variantSuffix = (selected.variantTitle && selected.variantTitle.toLowerCase() !== "no variant") ? (" - " + selected.variantTitle) : "";
	md_setText("productName_muzzleDevice" + headerSuffix, productTitle + variantSuffix);

	// Update 002002 product header image to selected variant; others keep defaults
	if (headerSuffix === "002002") {
		md_showProductHeaderImage_002002(selected.id.slice(-2));
	}

	// Upper menu: update only within upper menu container
	md_updateUpperMenu(selected.id, productTitle + variantSuffix, selected.price);

	// Handle product header images and variant buttons for 002002 group
	if (headerSuffix === "002002") {
		md_showProductHeaderImage_002002(selected.id.slice(-2));
		md_clearVariantButtons_002002();
		md_setVariantActive_002002(selected.id.slice(-2));
	} else {
		// Ensure 002002 defaults to 01 when not selected
		md_showProductHeaderImage_002002("01");
		md_clearVariantButtons_002002();
	}
}

// Start defaults: pick first item 001001
{
	const btn = document.getElementById("buttonModalStartMenu_StartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Reset and set default header image for 002002 to variant 01
			md_hideProductImages_002002();
			md_showProductHeaderImage_002002("01");
			uiReset_muzzleDevice001001();
			uiReset_muzzleDevice001002();
			uiReset_muzzleDevice002002();
			window.part.muzzleDevice["001"].products["001"].variants["01"].quantity = 1;
			uiData_MuzzleDevice();
			
			// Update 3D model after UI update
			updateModel_MuzzleDevice();
		});
	}
}

// Selection listeners
{
	const b100101 = document.getElementById("buttonItems_muzzleDevice00100101") || document.getElementById("buttonProductDetail_muzzleDevice001001");
	if (b100101) b100101.addEventListener("click", function () {
		const wasSelected = !!(window.part && window.part.muzzleDevice && window.part.muzzleDevice["001"] && window.part.muzzleDevice["001"].products && window.part.muzzleDevice["001"].products["001"] && window.part.muzzleDevice["001"].products["001"].variants && window.part.muzzleDevice["001"].products["001"].variants["01"] && window.part.muzzleDevice["001"].products["001"].variants["01"].quantity === 1);
		md_hideProductImages_002002(); md_showDefaultImage_00200201();
		uiReset_muzzleDevice001001(); uiReset_muzzleDevice001002(); uiReset_muzzleDevice002002();
		// Always reset warden when switching base muzzle device
		if (window.noWarden) { try { window.noWarden(); } catch(e){} }
		if (window.uiData_Warden) { try { window.uiData_Warden(); } catch(e){} }
		window.part.muzzleDevice["001"].products["001"].variants["01"].quantity = 1;
		uiData_MuzzleDevice();
		
		// Update 3D model after UI update (similar to buttonItems_noWarden)
		updateModel_MuzzleDevice();
		const itemsID = "muzzleDevice00100101";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleMuzzleDeviceSelection(itemsID);
	});
	const b100201 = document.getElementById("buttonItems_muzzleDevice00100201") || document.getElementById("buttonProductDetail_muzzleDevice001002");
	if (b100201) b100201.addEventListener("click", function () {
		const wasSelected = !!(window.part && window.part.muzzleDevice && window.part.muzzleDevice["001"] && window.part.muzzleDevice["001"].products && window.part.muzzleDevice["001"].products["002"] && window.part.muzzleDevice["001"].products["002"].variants && window.part.muzzleDevice["001"].products["002"].variants["01"] && window.part.muzzleDevice["001"].products["002"].variants["01"].quantity === 1);
		md_hideProductImages_002002(); md_showDefaultImage_00200201();
		uiReset_muzzleDevice001001(); uiReset_muzzleDevice001002(); uiReset_muzzleDevice002002();
		// Always reset warden when switching base muzzle device
		if (window.noWarden) { try { window.noWarden(); } catch(e){} }
		if (window.uiData_Warden) { try { window.uiData_Warden(); } catch(e){} }
		window.part.muzzleDevice["001"].products["002"].variants["01"].quantity = 1;
		uiData_MuzzleDevice();
		
		// Update 3D model after UI update (similar to buttonItems_noWarden)
		updateModel_MuzzleDevice();
		const itemsID = "muzzleDevice00100201";
		console.log(`🎯 Part button clicked: ${itemsID}`);
		handleMuzzleDeviceSelection(itemsID);
	});
	["01", "02"].forEach(function (v) {
		const b2002 = document.getElementById("buttonItems_muzzleDevice002002" + v);
		if (b2002) b2002.addEventListener("click", function () {
			const wasSelected = !!(window.part && window.part.muzzleDevice && window.part.muzzleDevice["002"] && window.part.muzzleDevice["002"].products && window.part.muzzleDevice["002"].products["002"] && window.part.muzzleDevice["002"].products["002"].variants && window.part.muzzleDevice["002"].products["002"].variants[v] && window.part.muzzleDevice["002"].products["002"].variants[v].quantity === 1);
			uiReset_muzzleDevice001001(); uiReset_muzzleDevice001002(); uiReset_muzzleDevice002002();
			// Always reset warden when switching base muzzle device
		if (window.noWarden) { try { window.noWarden(); } catch(e){} }
		if (window.uiData_Warden) { try { window.uiData_Warden(); } catch(e){} }
			window.part.muzzleDevice["002"].products["002"].variants[v].quantity = 1;
			uiData_MuzzleDevice();
			
			// Update 3D model after UI update (similar to buttonItems_noWarden)
			updateModel_MuzzleDevice();
			const itemsID = "muzzleDevice002002" + v;
			console.log(`🎯 Part button clicked: ${itemsID}`);
			handleMuzzleDeviceSelection(itemsID);
		});
	});
}

export function getSelectedMuzzleDevice() {
	const a = window.part.muzzleDevice["001"].products["001"].variants["01"]; if (a.quantity === 1) return a;
	const b = window.part.muzzleDevice["001"].products["002"].variants["01"]; if (b.quantity === 1) return b;
	const c = window.part.muzzleDevice["002"].products["002"].variants; for (const k of ["01", "02"]) { if (c[k].quantity === 1) return c[k]; }
	return null;
}

export function getMuzzleDeviceTotalPrice() { const v = getSelectedMuzzleDevice(); return v ? v.price : 0; }