// === dataController_Warden.mjs ===
// Upper: Optional Warden controller (muzzleDevice brand 001, product 003)
// Variants: 01 (black), 02 (fde)

// Import model controller functions
import { updateModel_MuzzleDevice, handleMuzzleDeviceSelection } from '../../modelController/modelController_Upper/modelController_MuzzleDevice.mjs';

// Helpers
function wd_get(id){ return document.getElementById(id); }
function wd_setText(id, text){ const el = wd_get(id); if(el) el.textContent = text; }
function wd_addClass(id, cls){ const el = wd_get(id); if(el) el.classList.add(cls); }
function wd_removeClass(id, cls){ const el = wd_get(id); if(el) el.classList.remove(cls); }
function wd_show(id){ const el=wd_get(id); if(el) el.style.display='flex'; }
function wd_hide(id){ const el=wd_get(id); if(el) el.style.display='none'; }

function wd_product(){
	try{
		return window.part && window.part.muzzleDevice && window.part.muzzleDevice['001'] && window.part.muzzleDevice['001'].products && window.part.muzzleDevice['001'].products['003'] ? window.part.muzzleDevice['001'].products['003'] : null;
	}catch(e){ return null; }
}

// Determine currently selected Muzzle Device product (001001 | 001002 | 002002 | null)
function wd_getSelectedMuzzleDeviceId(){
	try{
		const md = window.part && window.part.muzzleDevice ? window.part.muzzleDevice : null;
		if(!md) return null;
		if(md['001'] && md['001'].products){
			if(md['001'].products['001'] && md['001'].products['001'].variants['01'].quantity === 1) return '001001';
			if(md['001'].products['002'] && md['001'].products['002'].variants['01'].quantity === 1) return '001002';
		}
		if(md['002'] && md['002'].products && md['002'].products['002']){
			const v = md['002'].products['002'].variants; if(v['01'].quantity===1 || v['02'].quantity===1) return '002002';
		}
		return null;
	}catch(e){ return null; }
}

// Clear variant button active states
function wd_clearVariantButtons(){
	['buttonItems_muzzleDevice00100301','buttonItems_muzzleDevice00100302'].forEach(function(id){
		const el = wd_get(id);
		if(el) el.classList.remove('active');
	});
}

// Reset headers/icons actives for both product and no-selected
function wd_clearHeaderActives(){
	wd_removeClass('productHeader_muzzleDevice001003','active');
	wd_removeClass('productButtonIcon_muzzleDevice001003','active');
	wd_removeClass('productHeader_noWarden','active');
	wd_removeClass('productButtonIcon_noWarden','active');
}

// Initialize product header texts from inventory (no quantity change)
export function uiReset_Warden_Product(){
	const p = wd_product(); if(!p) return;
	wd_setText('productName_muzzleDevice001003', p.productTitle);
	// Use variant 01 price as header price reference
	if(p.variants && p.variants['01']){
		wd_setText('productPricing_muzzleDevice001003', p.variants['01'].price + ' USD');
	}
	wd_clearHeaderActives();
	wd_clearVariantButtons();
}

// Reset Additional Items panels to defaults and default images
function wd_resetMuzzleDeviceAdditionalPart(){
	// no-op (reverted to initial behavior)
}

// Update Additional Items panel ONLY for currently selected Muzzle Device (A or B)
function wd_updateAdditionalPanels(){
	const p = wd_product(); if(!p || !p.variants) return;
	const brand = (window.part && window.part.muzzleDevice && window.part.muzzleDevice['001'] && window.part.muzzleDevice['001'].brand) ? window.part.muzzleDevice['001'].brand : '-----';
	const v01 = p.variants['01']; const v02 = p.variants['02'];
	const q01 = v01 ? (v01.quantity||0) : 0; const q02 = v02 ? (v02.quantity||0) : 0;
	let selected = null; if(q01>0) selected = v01; else if(q02>0) selected = v02; else return; // only update when Warden selected
	const name = p.productTitle + (selected.variantTitle && selected.variantTitle.toLowerCase() !== 'no variant' ? (' - ' + selected.variantTitle) : '');
	const price = selected.price + ' USD';
	const mdSel = wd_getSelectedMuzzleDeviceId();
	if(mdSel === '001001'){
		// Update block A only
		if(selected.id.endsWith('01')){ wd_show('productImgID_muzzleDevice00100301_A'); wd_hide('productImgID_muzzleDevice00100302_A'); }
		else { wd_hide('productImgID_muzzleDevice00100301_A'); wd_show('productImgID_muzzleDevice00100302_A'); }
		wd_setText('additionalItemsName_muzzleDevice001001', name);
		wd_setText('additionalItemsBrand_muzzleDevice001001', brand);
		wd_setText('additionalItemsPricing_muzzleDevice001001', price);
	}
	else if(mdSel === '001002'){
		// Update block B only
		if(selected.id.endsWith('01')){ wd_show('productImgID_muzzleDevice00100301_B'); wd_hide('productImgID_muzzleDevice00100302_B'); }
		else { wd_hide('productImgID_muzzleDevice00100301_B'); wd_show('productImgID_muzzleDevice00100302_B'); }
		wd_setText('additionalItemsName_muzzleDevice001002', name);
		wd_setText('additionalItemsBrand_muzzleDevice001002', brand);
		wd_setText('additionalItemsPricing_muzzleDevice001002', price);
	}
	// If 002002 or null: do not touch panels
}

// Reflect current quantities to UI
export function uiData_Warden(){
	const p = wd_product(); if(!p || !p.variants) return;
	const v01 = p.variants['01'];
	const v02 = p.variants['02'];
	const q01 = v01 ? (v01.quantity||0) : 0;
	const q02 = v02 ? (v02.quantity||0) : 0;

	wd_clearHeaderActives();
	wd_clearVariantButtons();

	if(q01 === 0 && q02 === 0){
		// No Warden selected
		wd_addClass('productHeader_noWarden','active');
		wd_addClass('productButtonIcon_noWarden','active');
		wd_showWardenHeaderImage('01');
		wd_updateAdditionalPanels();
		return;
	}

	// Some Warden selected -> mark product as active
	wd_addClass('productHeader_muzzleDevice001003','active');
	wd_addClass('productButtonIcon_muzzleDevice001003','active');

	// Activate selected variant button
	if(q01 > 0){ const b=wd_get('buttonItems_muzzleDevice00100301'); if(b) b.classList.add('active'); }
	if(q02 > 0){ const b=wd_get('buttonItems_muzzleDevice00100302'); if(b) b.classList.add('active'); }

	// Toggle Warden header image to selected variant
	if(q02 > 0) wd_showWardenHeaderImage('02'); else wd_showWardenHeaderImage('01');

	wd_updateAdditionalPanels();
}

// Reset all Warden states to 'no selected' and reset additional panels
function wd_resetWardenNoSelected(){
	const p = wd_product();
	if(p && p.variants){
		if(p.variants['01']) p.variants['01'].quantity = 0;
		if(p.variants['02']) p.variants['02'].quantity = 0;
	}
	wd_clearHeaderActives();
	wd_addClass('productHeader_noWarden','active');
	wd_addClass('productButtonIcon_noWarden','active');
	// Default panel images to 00301 on reset
	wd_show('productImgID_muzzleDevice00100301_A');
	wd_hide('productImgID_muzzleDevice00100302_A');
	wd_show('productImgID_muzzleDevice00100301_B');
	wd_hide('productImgID_muzzleDevice00100302_B');
}

// Complete noWarden function - handles all aspects of "no warden" condition
function noWarden(){
	console.log('🔧 Setting no warden condition');
	
	// Set warden quantities to 0
	const p = wd_product();
	if(p && p.variants){
		if(p.variants['01']) p.variants['01'].quantity = 0; // muzzleDevice00100301
		if(p.variants['02']) p.variants['02'].quantity = 0; // muzzleDevice00100302
	}
	
	// Hide warden models
	if (window.hideAllWardenVariants) {
		window.hideAllWardenVariants();
	}
	
	// Set additional items text to "no part selected"
	wd_setText('additionalItemsName_muzzleDevice001001', 'no part selected');
	wd_setText('additionalItemsBrand_muzzleDevice001001', '---');
	wd_setText('additionalItemsPricing_muzzleDevice001001', '--- USD');
	
	wd_setText('additionalItemsName_muzzleDevice001002', 'no part selected');
	wd_setText('additionalItemsBrand_muzzleDevice001002', '---');
	wd_setText('additionalItemsPricing_muzzleDevice001002', '--- USD');
	
	// Set product images
	wd_show('productImgID_muzzleDevice00100301_A');
	wd_hide('productImgID_muzzleDevice00100302_A');
	wd_show('productImgID_muzzleDevice00100301_B');
	wd_hide('productImgID_muzzleDevice00100302_B');
	
	// Set header states
	wd_clearHeaderActives();
	wd_addClass('productHeader_noWarden','active');
	wd_addClass('productButtonIcon_noWarden','active');
	
	console.log('✅ No warden condition set complete');
}

// Helper to open/activate Warden accordion/header without changing quantities
function wd_openWardenAccordion(){
	wd_removeClass('productHeader_noWarden','active');
	wd_removeClass('productButtonIcon_noWarden','active');
	wd_addClass('productHeader_muzzleDevice001003','active');
	wd_addClass('productButtonIcon_muzzleDevice001003','active');
	const header = wd_get('productHeader_muzzleDevice001003');
	if(header && header.scrollIntoView){ try{ header.scrollIntoView({behavior:'smooth', block:'center'}); }catch(e){} }
}

// Warden header image helpers (inside Warden accordion)
function wd_hideWardenHeaderImages(){
	wd_hide('productImgID_muzzleDevice00100301');
	wd_hide('productImgID_muzzleDevice00100302');
}
function wd_showWardenHeaderImage(variantKey){
	wd_hideWardenHeaderImages();
	if(variantKey === '02') wd_show('productImgID_muzzleDevice00100302');
	else wd_show('productImgID_muzzleDevice00100301');
}

// Wire events
(function(){
	const start = wd_get('buttonModalStartMenu_StartButton');
	if(start){ start.addEventListener('click', function(){
		wd_resetWardenNoSelected();
		uiReset_Warden_Product();
		uiData_Warden();
	}); }

	// No Warden
	const noBtn = wd_get('buttonItems_noWarden');
	if(noBtn){ noBtn.addEventListener('click', function(){
		noWarden();
		uiData_Warden();
		
		// Update 3D model after UI update (hide all muzzle device models)
		updateModel_MuzzleDevice();
	}); }

	// Variant 01 (black)
	const b01 = wd_get('buttonItems_muzzleDevice00100301');
	if(b01){ b01.addEventListener('click', function(){
		const p = wd_product(); if(!p || !p.variants) return;
		if(p.variants['01']) p.variants['01'].quantity = 1;
		if(p.variants['02']) p.variants['02'].quantity = 0;
		wd_updateAdditionalPanels();
		uiData_Warden();
		
		// Update 3D model after UI update
		const itemsID = "muzzleDevice00100301";
		console.log(`🎯 Warden button clicked: ${itemsID}`);
		handleMuzzleDeviceSelection(itemsID);
	}); }

	// Variant 02 (fde)
	const b02 = wd_get('buttonItems_muzzleDevice00100302');
	if(b02){ b02.addEventListener('click', function(){
		const p = wd_product(); if(!p || !p.variants) return;
		if(p.variants['02']) p.variants['02'].quantity = 1;
		if(p.variants['01']) p.variants['01'].quantity = 0;
		wd_updateAdditionalPanels();
		uiData_Warden();
		
		// Update 3D model after UI update
		const itemsID = "muzzleDevice00100302";
		console.log(`🎯 Warden button clicked: ${itemsID}`);
		handleMuzzleDeviceSelection(itemsID);
	}); }

	// Open from Muzzle Device additional-edit buttons (removed)
})();

// Expose selected functions to window for cross-module calls
if (typeof window !== 'undefined') {
	window.wd_resetWardenNoSelected = wd_resetWardenNoSelected;
	window.noWarden = noWarden;
	window.uiData_Warden = uiData_Warden;
}