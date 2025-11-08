// === dataController_MLOKAndKeymodRail.mjs ===
// Gear & Acc: MLOK/Keymod Rail controller (non-bipod)
// Import model controller functions
import { updateModel_MLOK, handleMLOKSelection } from '../../modelController/modelController_Gear/modelController_Mlok.mjs';
// ===== Initialize Global Variables (0 or 1 only) =====
if (typeof window.mlokAndKeymodRail00100101_A_quantity === 'undefined') {
	window.mlokAndKeymodRail00100101_A_quantity = 0;
}
if (typeof window.mlokAndKeymodRail00200101_A_quantity === 'undefined') {
	window.mlokAndKeymodRail00200101_A_quantity = 0;
}

// Helper functions
function ml_get(id){ return document.getElementById(id); }
function ml_setText(id,t){ const el=ml_get(id); if(el) el.textContent=t; }
function ml_addClass(id,c){ const el=ml_get(id); if(el) el.classList.add(c); }
function ml_removeClass(id,c){ const el=ml_get(id); if(el) el.classList.remove(c); }
function ml_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}
function ml_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Get products from inventory
function ml_getProdA(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001'] && window.part.mlokAndKeymodRail['001'].products && window.part.mlokAndKeymodRail['001'].products['001']) 
		? window.part.mlokAndKeymodRail['001'].products['001'] 
		: null; 
}
function ml_getProdB(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002'] && window.part.mlokAndKeymodRail['002'].products && window.part.mlokAndKeymodRail['002'].products['001']) 
		? window.part.mlokAndKeymodRail['002'].products['001'] 
		: null; 
}

// Gear image helpers
function ml_hideGearImages(){
	const imgs = document.querySelectorAll('[id^="partCardImg_mlokAndKeymodRail"]');
	imgs.forEach(el=>{ el.style.display='none'; });
}
function ml_showDefaultGearImage(){
	const def = ml_get('partCardImg_mlokAndKeymodRail00100101');
	if(def) def.style.display='block';
}
function ml_showGearImageFor(choice){
	if(choice==='A'){
		const el = ml_get('partCardImg_mlokAndKeymodRail00100101');
		if(el) el.style.display='block';
	} else if(choice==='B'){
		const el = ml_get('partCardImg_mlokAndKeymodRail00200101');
		if(el) el.style.display='block';
	}
}

// ===== Update Inventory Quantity =====
// Inventory quantity = sum dari semua variable terpisah (untuk total cost)
function updateInventoryQuantity_mlokAndKeymodRail() {
	const a = ml_getProdA();
	const b = ml_getProdB();
	
	// Get variable terpisah
	const qtyA_normal = window.mlokAndKeymodRail00100101_A_quantity || 0;
	const qtyA_forBipod = window.mlokAndKeymodRail00100101_forBipod_quantity || 0;
	const qtyB_normal = window.mlokAndKeymodRail00200101_A_quantity || 0;
	const qtyB_forBipod = window.mlokAndKeymodRail00200101_forBipod_quantity || 0;
	
	// Update inventory quantity = sum
	if(a && a.variants['01']) {
		a.variants['01'].quantity = qtyA_normal + qtyA_forBipod;
	}
	if(b && b.variants['01']) {
		b.variants['01'].quantity = qtyB_normal + qtyB_forBipod;
	}
}

// ===== Update UI based on variable terpisah =====
// UI dikontrol oleh variable terpisah (0 = default/hide, 1 = active/show)
export function uiData_mlok(){
	const qtyA = window.mlokAndKeymodRail00100101_A_quantity || 0;
	const qtyB = window.mlokAndKeymodRail00200101_A_quantity || 0;
	const a = ml_getProdA();
	const b = ml_getProdB();
	
	// Update gear images
	ml_hideGearImages();
	
	// Clear all actives first
	ml_removeClass('productCard_NoSelected_mlokAndKeymodRail','active');
	ml_removeClass('productCard_mlokAndKeymodRail_001001','active');
	ml_removeClass('productCard_mlokAndKeymodRail_002001','active');
	
	if(qtyA === 0 && qtyB === 0){
		// No Selected
		ml_addClass('productCard_NoSelected_mlokAndKeymodRail','active');
		ml_showDefaultGearImage();
		ml_setText('partCardName_mlokAndKeymodRail', 'No MLOK/KeyMod Rail Selected');
		ml_setText('partCardPrice_mlokAndKeymodRail', '----- USD');
		ml_hideElement('summaryItemsCard_mlokAndKeymodRail_00100101');
		ml_hideElement('summaryItemsCard_mlokAndKeymodRail_00200101');
		return;
	}
	
	// Determine which one is selected
	let choice = null;
	if(qtyA === 1) choice = 'A';
	else if(qtyB === 1) choice = 'B';
	
	if(choice === 'A'){
		ml_addClass('productCard_mlokAndKeymodRail_001001','active');
		ml_showGearImageFor('A');
		if(a && a.variants['01']){
			const vt = (a.variants['01'].variantTitle||'').trim();
			const name = vt && vt.toLowerCase()!=='no variant' 
				? `${a.productTitle} - ${vt}` 
				: a.productTitle;
			ml_setText('partCardName_mlokAndKeymodRail', name);
			ml_setText('partCardPrice_mlokAndKeymodRail', '$' + (a.variants['01'].price||0) + ' USD');
			
			// Show summary card
			const group = window.part.mlokAndKeymodRail['001'];
			const summaryName = vt && vt.toLowerCase()!=='no variant'
				? `${group.brand} - ${a.productTitle} - ${vt}`
				: `${group.brand} - ${a.productTitle}`;
			ml_showElement('summaryItemsCard_mlokAndKeymodRail_00100101');
			ml_setText('summaryCardName_mlokAndKeymodRail_00100101', summaryName);
			ml_setText('summaryCardPrice_mlokAndKeymodRail_00100101', '$' + (a.variants['01'].price||0) + ' USD');
		}
		ml_hideElement('summaryItemsCard_mlokAndKeymodRail_00200101');
	} else {
		ml_addClass('productCard_mlokAndKeymodRail_002001','active');
		ml_showGearImageFor('B');
		if(b && b.variants['01']){
			const vt = (b.variants['01'].variantTitle||'').trim();
			const name = vt && vt.toLowerCase()!=='no variant' 
				? `${b.productTitle} - ${vt}` 
				: b.productTitle;
			ml_setText('partCardName_mlokAndKeymodRail', name);
			ml_setText('partCardPrice_mlokAndKeymodRail', '$' + (b.variants['01'].price||0) + ' USD');
			
			// Show summary card
			const group = window.part.mlokAndKeymodRail['002'];
			const summaryName = vt && vt.toLowerCase()!=='no variant'
				? `${group.brand} - ${b.productTitle} - ${vt}`
				: `${group.brand} - ${b.productTitle}`;
			ml_showElement('summaryItemsCard_mlokAndKeymodRail_00200101');
			ml_setText('summaryCardName_mlokAndKeymodRail_00200101', summaryName);
			ml_setText('summaryCardPrice_mlokAndKeymodRail_00200101', '$' + (b.variants['01'].price||0) + ' USD');
		}
		ml_hideElement('summaryItemsCard_mlokAndKeymodRail_00100101');
	}
}

// ===== Event Listeners =====
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(setupProductCardListeners, 100);
	});
} else {
	setTimeout(setupProductCardListeners, 100);
}

function setupProductCardListeners() {
	// No Selected - reset MLOK biasa
	const noBtn = ml_get('productCard_NoSelected_mlokAndKeymodRail');
	if(noBtn){ 
		noBtn.addEventListener('click', function(){ 
			// Set variable terpisah = 0
			window.mlokAndKeymodRail00100101_A_quantity = 0;
			window.mlokAndKeymodRail00200101_A_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update UI
			uiData_mlok();
			
			// Update 3D model
			const itemsID = "noMlokAndKeymodRail";
			handleMLOKSelection(itemsID);
		}, true);
	}
	
	// MLOK A (00100101)
	const aBtn = ml_get('productCard_mlokAndKeymodRail_001001');
	if(aBtn){ 
		aBtn.addEventListener('click', function(){ 
			// Set variable terpisah (tetap 1, tidak peduli diklik berapa kali)
			window.mlokAndKeymodRail00100101_A_quantity = 1;
			window.mlokAndKeymodRail00200101_A_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update UI
			uiData_mlok();
			
			// Update 3D model
			const itemsID = "mlokAndKeymodRail00100101";
			handleMLOKSelection(itemsID);
		}, true);
	}
	
	// MLOK B (00200101)
	const bBtn = ml_get('productCard_mlokAndKeymodRail_002001');
	if(bBtn){ 
		bBtn.addEventListener('click', function(){ 
			// Set variable terpisah (tetap 1, tidak peduli diklik berapa kali)
			window.mlokAndKeymodRail00200101_A_quantity = 1;
			window.mlokAndKeymodRail00100101_A_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update UI
			uiData_mlok();
			
			// Update 3D model
			const itemsID = "mlokAndKeymodRail00200101";
			handleMLOKSelection(itemsID);
		}, true);
	}
}

// ===== Start Button Listener =====
// Reset all MLOK biasa variables when start button is clicked
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', function() {
		setTimeout(setupStartButtonListener, 100);
	});
} else {
	setTimeout(setupStartButtonListener, 100);
}

function setupStartButtonListener() {
	const btn = document.getElementById("loader-start-button");
	if (btn) {
		btn.addEventListener("click", function (e) {
			// Reset all MLOK biasa variables to 0
			window.mlokAndKeymodRail00100101_A_quantity = 0;
			window.mlokAndKeymodRail00200101_A_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update product card names and prices from inventory
			const a = ml_getProdA();
			const b = ml_getProdB();
			
			if(a && a.variants['01']) {
				ml_setText('productCardName_mlokAndKeymodRail_001001', a.productTitle);
				ml_setText('productCardPrice_mlokAndKeymodRail_001001', '$' + a.variants['01'].price + ' USD');
			}
			
			if(b && b.variants['01']) {
				ml_setText('productCardName_mlokAndKeymodRail_002001', b.productTitle);
				ml_setText('productCardPrice_mlokAndKeymodRail_002001', '$' + b.variants['01'].price + ' USD');
			}
			
			// Update UI
			uiData_mlok();
		}, true);
	}
}

// Make functions globally accessible
window.uiData_mlok = uiData_mlok;
window.updateInventoryQuantity_mlokAndKeymodRail = updateInventoryQuantity_mlokAndKeymodRail;

