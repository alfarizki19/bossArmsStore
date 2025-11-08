// === dataController_MLOKForBipod.mjs ===
// Gear & Acc: MLOK for Bipod (alias UI for mlokAndKeymodRail)

// Import model controller functions (if exists)
let updateModel_MlokForBipod = () => {};
let handleMlokForBipodSelection = () => {};

try {
	const modelModule = await import('../../modelController/modelController_Gear/modelController_MLOKForBipod.mjs');
	updateModel_MlokForBipod = modelModule.updateModel_MlokForBipod || modelModule.updateModel_MLOKForBipod || updateModel_MlokForBipod;
	handleMlokForBipodSelection = modelModule.handleMlokForBipodSelection || modelModule.handleMLOKForBipodSelection || handleMlokForBipodSelection;
} catch(e) {
}

// ===== Initialize Global Variables (0 or 1 only) =====
if (typeof window.mlokAndKeymodRail00100101_forBipod_quantity === 'undefined') {
	window.mlokAndKeymodRail00100101_forBipod_quantity = 0;
}
if (typeof window.mlokAndKeymodRail00200101_forBipod_quantity === 'undefined') {
	window.mlokAndKeymodRail00200101_forBipod_quantity = 0;
}

// Helper functions
function mfb_get(id){ return document.getElementById(id); }
function mfb_setText(id,t){ const el=mfb_get(id); if(el) el.textContent=t; }
function mfb_addClass(id,c){ const el=mfb_get(id); if(el) el.classList.add(c); }
function mfb_removeClass(id,c){ const el=mfb_get(id); if(el) el.classList.remove(c); }
function mfb_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}
function mfb_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Get products from inventory
function mfb_getProdA(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001'] && window.part.mlokAndKeymodRail['001'].products && window.part.mlokAndKeymodRail['001'].products['001']) 
		? window.part.mlokAndKeymodRail['001'].products['001'] 
		: null; 
}
function mfb_getProdB(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002'] && window.part.mlokAndKeymodRail['002'].products && window.part.mlokAndKeymodRail['002'].products['001']) 
		? window.part.mlokAndKeymodRail['002'].products['001'] 
		: null; 
}
function mfb_getBrandA(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001']) 
		? window.part.mlokAndKeymodRail['001'].brand 
		: '---'; 
}
function mfb_getBrandB(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002']) 
		? window.part.mlokAndKeymodRail['002'].brand 
		: '---'; 
}

// ===== Update Inventory Quantity =====
// Use the function from MLOK biasa (shared)
function updateInventoryQuantity_mlokAndKeymodRail() {
	if (window.updateInventoryQuantity_mlokAndKeymodRail) {
		window.updateInventoryQuantity_mlokAndKeymodRail();
	}
}

// ===== Update UI based on variable terpisah =====
// UI dikontrol oleh variable terpisah (0 = default/hide, 1 = active/show)
export function uiData_mlokForBipod(){
	const qtyA = window.mlokAndKeymodRail00100101_forBipod_quantity || 0;
	const qtyB = window.mlokAndKeymodRail00200101_forBipod_quantity || 0;
	const a = mfb_getProdA();
	const b = mfb_getProdB();
	
	// Clear all actives first
	mfb_removeClass('productCard_mlokAndKeymodRail_001001_forBipod','active');
	mfb_removeClass('productCard_mlokAndKeymodRail_002001_forBipod','active');
	
	if(qtyA === 0 && qtyB === 0){
		// No Selected - default to brand A texts and hide summary cards
		if(a){ 
			mfb_setText('productCardName_mlokAndKeymodRail_001001_forBipod', a.productTitle); 
			mfb_setText('productCardPrice_mlokAndKeymodRail_001001_forBipod', '$' + a.variants['01'].price + ' USD'); 
		}
		mfb_hideElement('summaryItemsCard_mlokAndKeymodRail_00100101_forBipod');
		mfb_hideElement('summaryItemsCard_mlokAndKeymodRail_00200101_forBipod');
		return;
	}
	
	// Determine which one is selected
	let choice = null;
	if(qtyA === 1) choice = 'A';
	else if(qtyB === 1) choice = 'B';
	
	if(choice === 'A'){
		mfb_addClass('productCard_mlokAndKeymodRail_001001_forBipod','active');
		if(a && a.variants['01']){
			mfb_setText('productCardName_mlokAndKeymodRail_001001_forBipod', a.productTitle); 
			mfb_setText('productCardPrice_mlokAndKeymodRail_001001_forBipod', '$' + a.variants['01'].price + ' USD');
			
			// Show summary card
			const summaryName = mfb_getBrandA() + ' - ' + a.productTitle + ' for bipod';
			mfb_showElement('summaryItemsCard_mlokAndKeymodRail_00100101_forBipod');
			mfb_setText('summaryCardName_mlokAndKeymodRail_00100101_forBipod', summaryName);
			mfb_setText('summaryCardPrice_mlokAndKeymodRail_00100101_forBipod', '$' + a.variants['01'].price + ' USD');
		}
		mfb_hideElement('summaryItemsCard_mlokAndKeymodRail_00200101_forBipod');
	} else {
		mfb_addClass('productCard_mlokAndKeymodRail_002001_forBipod','active');
		if(b && b.variants['01']){
			mfb_setText('productCardName_mlokAndKeymodRail_002001_forBipod', b.productTitle); 
			mfb_setText('productCardPrice_mlokAndKeymodRail_002001_forBipod', '$' + b.variants['01'].price + ' USD');
			
			// Show summary card
			const summaryName = mfb_getBrandB() + ' - ' + b.productTitle + ' for bipod';
			mfb_showElement('summaryItemsCard_mlokAndKeymodRail_00200101_forBipod');
			mfb_setText('summaryCardName_mlokAndKeymodRail_00200101_forBipod', summaryName);
			mfb_setText('summaryCardPrice_mlokAndKeymodRail_00200101_forBipod', '$' + b.variants['01'].price + ' USD');
		}
		mfb_hideElement('summaryItemsCard_mlokAndKeymodRail_00100101_forBipod');
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
// MLOK A for bipod (00100101)
	const aBtn = mfb_get('productCard_mlokAndKeymodRail_001001_forBipod');
	if(aBtn){ 
		aBtn.addEventListener('click', function(){ 
			// Set variable terpisah (tetap 1, tidak peduli diklik berapa kali)
			window.mlokAndKeymodRail00100101_forBipod_quantity = 1;
			window.mlokAndKeymodRail00200101_forBipod_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update UI (only MLOK for bipod, tidak mempengaruhi MLOK biasa)
			uiData_mlokForBipod();
			
			// Update 3D model
			const itemsID = "mlokAndKeymodRail00100101";
handleMlokForBipodSelection(itemsID);
		}, true);
	}
	
	// MLOK B for bipod (00200101)
	const bBtn = mfb_get('productCard_mlokAndKeymodRail_002001_forBipod');
	if(bBtn){ 
		bBtn.addEventListener('click', function(){ 
			// Set variable terpisah (tetap 1, tidak peduli diklik berapa kali)
			window.mlokAndKeymodRail00200101_forBipod_quantity = 1;
			window.mlokAndKeymodRail00100101_forBipod_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update UI (only MLOK for bipod, tidak mempengaruhi MLOK biasa)
			uiData_mlokForBipod();
			
			// Update 3D model
			const itemsID = "mlokAndKeymodRail00200101";
handleMlokForBipodSelection(itemsID);
		}, true);
	}
	
}

// ===== Start Button Listener =====
// Reset all MLOK for bipod variables when start button is clicked
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
// Reset all MLOK for bipod variables to 0
			window.mlokAndKeymodRail00100101_forBipod_quantity = 0;
			window.mlokAndKeymodRail00200101_forBipod_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update UI
			uiData_mlokForBipod();
			
}, true);
		
}
}

// Make functions globally accessible
window.uiData_mlokForBipod = uiData_mlokForBipod;