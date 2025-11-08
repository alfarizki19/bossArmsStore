// === dataController_Bipod.mjs ===
// Gear & Acc: Bipod controller (with MLOK-for-Bipod linkage)

console.log("📦 Loading dataController_Bipod.mjs...");

// Import model controller functions (if exists)
let updateModel_Bipod = () => {};
let handleBipodSelection = () => {};
let handleBipodToggle = () => {};

try {
	const modelModule = await import('../../modelController/modelController_Gear/modelController_Bipod.mjs');
	updateModel_Bipod = modelModule.updateModel_Bipod || updateModel_Bipod;
	handleBipodSelection = modelModule.handleBipodSelection || handleBipodSelection;
	handleBipodToggle = modelModule.handleBipodToggle || handleBipodToggle;
} catch(e) {
	console.log("ℹ️ Bipod: Model controller not found, using empty functions");
}

console.log("✅ dataController_Bipod.mjs loaded");

// Helper functions
function bp_get(id){ return document.getElementById(id); }
function bp_setText(id, text){ const el=bp_get(id); if(el) el.textContent=text; }
function bp_addClass(id, c){ const el=bp_get(id); if(el) el.classList.add(c); }
function bp_removeClass(id, c){ const el=bp_get(id); if(el) el.classList.remove(c); }
function bp_showElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "flex";
}
function bp_hideElement(id) {
	const el = document.getElementById(id);
	if (el) el.style.display = "none";
}

// Hide gear images
function bp_hideGearImages(){
	const img = bp_get('partCardImg_bipod00100101');
	if(img) img.style.display='none';
}
function bp_showGearDefault(){
	const img = bp_get('partCardImg_bipod00100101');
	if(img) img.style.display='block';
}

// Inventory access
function bp_getBipod(){ 
	return (window.part && window.part.bipod && window.part.bipod['001'] && window.part.bipod['001'].products && window.part.bipod['001'].products['001']) 
		? window.part.bipod['001'].products['001'] 
		: null; 
}
function bp_getMlokA(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001'] && window.part.mlokAndKeymodRail['001'].products && window.part.mlokAndKeymodRail['001'].products['001']) 
		? window.part.mlokAndKeymodRail['001'].products['001'] 
		: null; 
}
function bp_getMlokB(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002'] && window.part.mlokAndKeymodRail['002'].products && window.part.mlokAndKeymodRail['002'].products['001']) 
		? window.part.mlokAndKeymodRail['002'].products['001'] 
		: null; 
}
function bp_getMlokBrandA(){ 
	return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001']) 
		? window.part.mlokAndKeymodRail['001'].brand 
		: '---'; 
}

// ===== Update Inventory Quantity =====
// Use the function from MLOK biasa (shared)
function updateInventoryQuantity_mlokAndKeymodRail() {
	if (window.updateInventoryQuantity_mlokAndKeymodRail) {
		window.updateInventoryQuantity_mlokAndKeymodRail();
	}
}

// ===== Update UI based on selected Bipod =====
export function uiData_Bipod(){ 
	const p=bp_getBipod(); 
	if(!p) return; 
	
	const v01=p.variants['01']; 
	const selected = v01 && v01.quantity===1 ? v01 : null; 
	
	// Default gear image baseline
	bp_hideGearImages(); 
	
	if(!selected){ 
		// No bipod selected
		bp_showGearDefault(); 
		bp_setText('partCardName_bipod','No Bipod Selected'); 
		bp_setText('partCardPrice_bipod','----- USD'); 
		
		// Ensure no-selected active
		bp_addClass('productCard_NoSelected_bipod','active'); 
		bp_removeClass('productCard_bipod_001001','active'); 
		
		// Hide summary card
		bp_hideElement('summaryItemsCard_bipod_00100101');
		
		return;
	}
	
	// Selected bipod
	const title = p.productTitle; 
	bp_setText('partCardName_bipod', title); 
	bp_setText('partCardPrice_bipod', '$' + v01.price + ' USD'); 
	
	const img=bp_get('partCardImg_'+v01.id); 
	if(img) img.style.display='block';
	
	// Part menu states
	bp_removeClass('productCard_NoSelected_bipod','active'); 
	bp_addClass('productCard_bipod_001001','active');
	
	// Update part-menu header texts for bipod
	bp_setText('productCardName_bipod_001001', p.productTitle); 
	bp_setText('productCardPrice_bipod_001001', '$' + v01.price + ' USD');
	
	// Show summary card
	const group = window.part.bipod['001'];
	const summaryName = group.brand + ' - ' + p.productTitle;
	bp_showElement('summaryItemsCard_bipod_00100101');
	bp_setText('summaryCardName_bipod_00100101', summaryName);
	bp_setText('summaryCardPrice_bipod_00100101', '$' + v01.price + ' USD');
	
	// Update MLOK for bipod UI (if function exists)
	if (window.uiData_mlokForBipod) {
		window.uiData_mlokForBipod();
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
	console.log("🔧 Bipod: Setting up product card listeners...");
	
	// No bipod
	const noBtn = bp_get('productCard_NoSelected_bipod');
	if(noBtn){ 
		noBtn.addEventListener('click', function(){ 
			const p=bp_getBipod(); 
			const a=bp_getMlokA();
			
			// Set bipod quantity = 0 (0->0, 1->0)
			if(p && p.variants['01']) {
				const qty = p.variants['01'].quantity || 0;
				if (qty === 0) {
					p.variants['01'].quantity = 0;
				} else if (qty === 1) {
					p.variants['01'].quantity = 0;
				}
			}
			
			// Set MLOK for bipod variable terpisah = 0
			window.mlokAndKeymodRail00100101_forBipod_quantity = 0;
			window.mlokAndKeymodRail00200101_forBipod_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Set UI manually
			bp_addClass('productCard_NoSelected_bipod','active');
			bp_removeClass('productCard_bipod_001001','active');
			bp_removeClass('productCard_mlokAndKeymodRail_001001_forBipod','active');
			bp_removeClass('productCard_mlokAndKeymodRail_002001_forBipod','active');
			
			// Hide forBipod summary cards
			bp_hideElement('summaryItemsCard_mlokAndKeymodRail_00100101_forBipod');
			bp_hideElement('summaryItemsCard_mlokAndKeymodRail_00200101_forBipod');
			
			// Update UI
			uiData_Bipod(); 
			
			// Update MLOK for bipod UI
			if (window.uiData_mlokForBipod) {
				window.uiData_mlokForBipod();
			}
			
			// Update 3D model
			updateModel_Bipod();
		}, true);
	}
	
	// Select bipod 00100101
	const pick = bp_get('productCard_bipod_001001');
	if(pick){ 
		pick.addEventListener('click', function(){ 
			const p=bp_getBipod(); 
			if(!p) return;
			const a=bp_getMlokA();
			
			// Get current bipod quantity
			const qty = p.variants['01'].quantity || 0;
			
			// Set bipod quantity = 1 (0->1, 1->1)
			if (qty === 0) {
				p.variants['01'].quantity = 1;
			} else if (qty === 1) {
				p.variants['01'].quantity = 1;
			}
			
			// Only reset to default MLOK for bipod if bipod is newly added (quantity was 0)
			if (qty === 0) {
				// Bipod baru ditambahkan - set default adapter = A
				window.mlokAndKeymodRail00100101_forBipod_quantity = 1;
				window.mlokAndKeymodRail00200101_forBipod_quantity = 0;
				
				// Update inventory quantity
				updateInventoryQuantity_mlokAndKeymodRail();
				
				// Set UI manually for default
				bp_addClass('productCard_mlokAndKeymodRail_001001_forBipod','active');
				bp_removeClass('productCard_mlokAndKeymodRail_002001_forBipod','active');
				
				// Show A forBipod summary
				if(a && a.variants['01']) {
					const summaryName = bp_getMlokBrandA() + ' - ' + a.productTitle + ' for bipod';
					bp_showElement('summaryItemsCard_mlokAndKeymodRail_00100101_forBipod');
					bp_setText('summaryCardName_mlokAndKeymodRail_00100101_forBipod', summaryName);
					bp_setText('summaryCardPrice_mlokAndKeymodRail_00100101_forBipod', '$' + a.variants['01'].price + ' USD');
				}
			}
			// If qty != 0, bipod sudah ada - tidak perlu reset MLOK for bipod, biarkan yang sudah dipilih
			
			// Set UI manually
			bp_removeClass('productCard_NoSelected_bipod','active');
			bp_addClass('productCard_bipod_001001','active');
			
			// Update UI
			uiData_Bipod(); 
			
			// Update MLOK for bipod UI
			if (window.uiData_mlokForBipod) {
				window.uiData_mlokForBipod();
			}
			
			// Update 3D model
			const itemsID = "bipod00100101";
			console.log(`🎯 Part button clicked: ${itemsID}`);
			handleBipodSelection(itemsID);
		}, true);
	}
	
	console.log("✅ Bipod: Product card listeners attached");
}

// ===== Start Button Listener =====
// Reset bipod and MLOK for bipod variables when start button is clicked
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
			console.log("🎯 Bipod: Start button clicked - Resetting variables");
			
			// Reset bipod quantity
			const p = bp_getBipod();
			if(p && p.variants['01']) {
				p.variants['01'].quantity = 0;
			}
			
			// Reset all MLOK for bipod variables to 0
			window.mlokAndKeymodRail00100101_forBipod_quantity = 0;
			window.mlokAndKeymodRail00200101_forBipod_quantity = 0;
			
			// Update inventory quantity
			updateInventoryQuantity_mlokAndKeymodRail();
			
			// Update UI
			uiData_Bipod();
			
			// Update MLOK for bipod UI
			if (window.uiData_mlokForBipod) {
				window.uiData_mlokForBipod();
			}
			
			console.log("✅ Bipod: Variables reset");
		}, true);
		
		console.log("✅ Bipod: Start button listener attached");
	}
}

