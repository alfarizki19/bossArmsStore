// === dataController_ForwardAssists.mjs ===
// Forward Assist UI Controller (Upper Category)

// Import model controller functions
import { updateModel_ForwardAssists, handleForwardAssistsSelection } from '../../modelController/modelController_Upper/modelController_ForwardAssists.mjs';

function fa_setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function fa_addClass(id, c) { const el = document.getElementById(id); if (el) el.classList.add(c); }
function fa_removeClass(id, c) { const el = document.getElementById(id); if (el) el.classList.remove(c); }

function fa_hideUpperImages() {
	["partImgID_forwardAssists00100101", "partImgID_forwardAssists00100102"].forEach(function (id) {
		const el = document.getElementById(id); if (el) el.style.display = "none";
	});
}

function fa_hideProductImages() {
	["productImgID_forwardAssists00100101", "productImgID_forwardAssists00100102"].forEach(function (id) {
		const el = document.getElementById(id); if (el) el.style.display = "none";
	});
}

function fa_clearVariantButtons() {
	["01", "02"].forEach(function (v) {
		const btn = document.getElementById("buttonItems_forwardAssists001001" + v);
		if (btn) btn.classList.remove("active");
	});
}

function fa_showDefaultProductImages() {
	// Show default variant image (01) for product group
	const defaultImg = document.getElementById("productImgID_forwardAssists00100101");
	if (defaultImg) defaultImg.style.display = "flex";
}

export function uiReset_forwardAssists001001() {
	const product = window.part.forwardAssist["001"].products["001"]; // Assembly
	product.variants["01"].quantity = 0;
	product.variants["02"].quantity = 0;

	fa_setText("productName_forwardAssists001001", product.productTitle);
	fa_setText("productPricing_forwardAssists001001", product.variants["01"].price + " USD");
	fa_removeClass("productHeader_forwardAssists001001", "active");
	fa_removeClass("productButtonIcon_forwardAssists001001", "active");

	fa_hideProductImages();
	fa_hideUpperImages();

	fa_setText("partName_ForwardAssist", "-----");
	fa_setText("partPrice_ForwardAssist", "-----");
	fa_clearVariantButtons();
}

export function uiData_ForwardAssists() {
	const product = window.part.forwardAssist["001"].products["001"]; // Timber Creek
	let selected = null; let variantKey = null;
	for (const k of ["01", "02"]) { if (product.variants[k].quantity === 1) { selected = product.variants[k]; variantKey = k; } }
	if (!selected) return;

	fa_setText("productPricing_forwardAssists001001", selected.price + " USD");
	fa_addClass("productHeader_forwardAssists001001", "active");
	fa_addClass("productButtonIcon_forwardAssists001001", "active");

	fa_hideProductImages();
	const pImg = document.getElementById("productImgID_" + selected.id);
	if (pImg) pImg.style.display = "flex";

	fa_hideUpperImages();
	const uImg = document.getElementById("partImgID_" + selected.id);
	if (uImg) uImg.style.display = "flex";

	const variantSuffix = (selected.variantTitle && selected.variantTitle.toLowerCase() !== "no variant") ? (" - " + selected.variantTitle) : "";
	fa_setText("productName_forwardAssists001001", product.productTitle + variantSuffix);
	fa_setText("partName_ForwardAssist", product.productTitle + variantSuffix);
	fa_setText("partPrice_ForwardAssist", selected.price + " USD");

	fa_clearVariantButtons();
	const btn = document.getElementById("buttonItems_forwardAssists001001" + variantKey);
	if (btn) btn.classList.add("active");
}

// Start default -> 01
{
	const btn = document.getElementById("buttonModalStartMenu_StartButton");
	if (btn) {
		btn.addEventListener("click", function () {
			// Hide all product images then show default variant image (01)
			fa_hideProductImages();
			fa_showDefaultProductImages();
			
			// Reset UI states
			uiReset_forwardAssists001001();
			
			// Select default variant: 00100101
			window.part.forwardAssist["001"].products["001"].variants["01"].quantity = 1;
			uiData_ForwardAssists();
			
			// Update 3D model after UI update
			updateModel_ForwardAssists();
		});
	}
}

// Variant listeners
{
	["01", "02"].forEach(function (v) {
		const b = document.getElementById("buttonItems_forwardAssists001001" + v);
		if (!b) return;
		b.addEventListener("click", function () {
			// Hide all product images then show default variant image (01)
			fa_hideProductImages();
			fa_showDefaultProductImages();
			
			// Reset UI states
			uiReset_forwardAssists001001();
			
			// Select variant
			window.part.forwardAssist["001"].products["001"].variants[v].quantity = 1;
			uiData_ForwardAssists();
			
			// Update 3D model after UI update
			const itemsID = "forwardAssists001001" + v;
			console.log(`🎯 Part button clicked: ${itemsID}`);
			handleForwardAssistsSelection(itemsID);
		});
	});
}

export function getSelectedForwardAssists() {
	const product = window.part.forwardAssist["001"].products["001"]; for (const k of ["01", "02"]) { if (product.variants[k].quantity === 1) return product.variants[k]; } return null;
}

export function getForwardAssistsTotalPrice() {
	const v = getSelectedForwardAssists(); return v ? v.price : 0;
}