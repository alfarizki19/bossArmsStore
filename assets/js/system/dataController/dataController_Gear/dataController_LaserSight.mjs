// === dataController_LaserSight.mjs ===
// Gear & Acc: Laser Sight controller

// Import model controller functions
import { updateModel_LaserSight, handleLaserSightSelection } from '../../modelController/modelController_Gear/modelController_LaserSight.mjs';

function ls_get(id){ return document.getElementById(id); }
function ls_setText(id,t){ const el=ls_get(id); if(el) el.textContent=t; }
function ls_addClass(id,c){ const el=ls_get(id); if(el) el.classList.add(c); }
function ls_removeClass(id,c){ const el=ls_get(id); if(el) el.classList.remove(c); }

function ls_getGearWrap(){ const nameEl=ls_get('partName_LaserSight'); if(!nameEl) return null; let p=nameEl.parentElement; while(p && !p.classList.contains('menuPartMenuOptionContainer')){ p=p.parentElement; } return p? p.querySelector('.menuPartMenuOptionImageArea'):null; }
function ls_hideGearImages(){ const wrap=ls_getGearWrap(); if(!wrap) return; wrap.querySelectorAll('img, image, Image').forEach(el=>el.style.display='none'); }
function ls_showGearDefault(){ const a=ls_get('partImgID_laserSight00100101'); if(a) a.style.display='flex'; }

function ls_getProduct(){ const p = window.part.laserSight && window.part.laserSight['001'] && window.part.laserSight['001'].products && window.part.laserSight['001'].products['001']; return p || null; }

export function uiReset_laserSight(){ const p=ls_getProduct(); if(p){ Object.keys(p.variants).forEach(k=>p.variants[k].quantity=0); }
 // clear part-menu header states
 ls_removeClass('productHeader_laserSight00100101','active'); ls_removeClass('productHeader_noLaserSight','active');
 // gear menu default
 ls_hideGearImages(); ls_showGearDefault(); ls_setText('partName_LaserSight','no laser sight selected'); ls_setText('partPrice_LaserSight','----- USD');
 // clear icons
 ls_removeClass('productButtonIcon_NoLaserSight','active'); ls_removeClass('productButtonIcon_laserSight001001','active');
 // keep part-menu product defaults from inventory
 if(p){ ls_setText('productName_laserSight00100101', p.productTitle); ls_setText('productPricing_laserSight00100101', p.variants['01'].price + ' USD'); }
}

export function uiData_LaserSight(){ const p=ls_getProduct(); const sel=p && p.variants['01'] && p.variants['01'].quantity===1 ? p.variants['01'] : null; ls_hideGearImages(); if(!sel){ ls_showGearDefault(); ls_setText('partName_LaserSight','no laser sight selected'); ls_setText('partPrice_LaserSight','----- USD'); // activate no-selection header/icon
 ls_addClass('productHeader_noLaserSight','active'); ls_addClass('productButtonIcon_NoLaserSight','active'); ls_removeClass('productButtonIcon_laserSight001001','active'); return; }
 const img=ls_get('partImgID_'+sel.id); if(img) img.style.display='flex'; const title=p.productTitle; const suffix=(sel.variantTitle && sel.variantTitle.toLowerCase()!=='no variant')? (' - '+sel.variantTitle):'';
 // gear menu texts
 ls_setText('partName_LaserSight', title + suffix); ls_setText('partPrice_LaserSight', sel.price+' USD');
 // part menu header texts
 ls_setText('productName_laserSight00100101', title + suffix); ls_setText('productPricing_laserSight00100101', sel.price+' USD');
 // active states
 ls_addClass('productHeader_laserSight00100101','active'); ls_addClass('productButtonIcon_laserSight001001','active'); ls_removeClass('productHeader_noLaserSight','active'); ls_removeClass('productButtonIcon_NoLaserSight','active');
}

(function(){ 
	const start=ls_get('buttonModalStartMenu_StartButton'); 
	if(start){ 
		start.addEventListener('click', function(){ 
			uiReset_laserSight(); 
			uiData_LaserSight(); 
			
			// Update 3D model after UI update
			updateModel_LaserSight();
		}); 
	}
	
	const noBtn=ls_get('buttonItems_noLaserSight'); 
	if(noBtn){ 
		noBtn.addEventListener('click', function(){ 
			console.log(`🎯 No Laser Sight button clicked`);
			
			// 1. Reset UI and data (set quantity = 0) - same pattern as Warden
			uiReset_laserSight(); 
			uiData_LaserSight(); 
			
			// 2. Update 3D model after UI update (hide all laser sight models) - same pattern as Warden
			updateModel_LaserSight();
		}); 
	}
	
	const pick=ls_get('buttonItems_laserSight00100101'); 
	if(pick){ 
		pick.addEventListener('click', function(){ 
			// Same pattern as Warden: set quantity and update UI
			const p=ls_getProduct(); 
			if(p){ 
				p.variants['01'].quantity=1; 
			} 
			uiData_LaserSight(); 
			
			// Update 3D model after UI update - same pattern as Warden
			const itemsID = "laserSight00100101";
			console.log(`🎯 Laser Sight button clicked: ${itemsID}`);
			handleLaserSightSelection(itemsID);
		}); 
	}
})();

export function getSelectedLaserSight(){ const p=ls_getProduct(); if(p && p.variants['01'].quantity===1) return p.variants['01']; return null; }
export function getLaserSightTotalPrice(){ const v=getSelectedLaserSight(); return v? v.price:0; }