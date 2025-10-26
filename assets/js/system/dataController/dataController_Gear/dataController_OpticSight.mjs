// === dataController_OpticSight.mjs ===
// Gear & Acc: Optic Sight controller

// Import model controller functions
import { updateModel_OpticSight, handleOpticSightSelection } from '../../modelController/modelController_Gear/modelController_OpticSight.mjs';

function os_get(id){ return document.getElementById(id); }
function os_setText(id,t){ const el=os_get(id); if(el) el.textContent=t; }
function os_addClass(id,c){ const el=os_get(id); if(el) el.classList.add(c); }
function os_removeClass(id,c){ const el=os_get(id); if(el) el.classList.remove(c); }

function os_getGearWrap(){ const nameEl=os_get('partName_OpticSight'); if(!nameEl) return null; let p=nameEl.parentElement; while(p && !p.classList.contains('menuPartMenuOptionContainer')){ p=p.parentElement; } return p? p.querySelector('.menuPartMenuOptionImageArea'):null; }
function os_hideGearImages(){ const wrap=os_getGearWrap(); if(!wrap) return; wrap.querySelectorAll('img, image, Image').forEach(el=>el.style.display='none'); }
function os_showGearDefault(){ const a=os_get('partImgID_opticSight00100101'); if(a) a.style.display='flex'; }

function os_getProduct(){ const p = window.part.opticSight && window.part.opticSight['001'] && window.part.opticSight['001'].products && window.part.opticSight['001'].products['001']; return p || null; }

export function uiReset_opticSight(){ const p=os_getProduct(); if(p){ Object.keys(p.variants).forEach(k=>p.variants[k].quantity=0); } os_removeClass('productHeader_opticSight001001','active'); os_removeClass('productHeader_noOpticSight','active'); os_hideGearImages(); os_showGearDefault(); os_setText('partName_OpticSight','no optic sight selected'); os_setText('partPrice_OpticSight','----- USD'); // clear icons
 os_removeClass('productButtonIcon_noOpticSight','active'); os_removeClass('productButtonIcon_opticSight00100101','active'); // keep part-menu header texts to inventory defaults
 if(p){ os_setText('productName_opticSight001001', p.productTitle); os_setText('productPricing_opticSight001001', p.variants['01'].price + ' USD'); } }

export function uiData_OpticSight(){ const p=os_getProduct(); const sel=p && p.variants['01'] && p.variants['01'].quantity===1 ? p.variants['01'] : null; os_hideGearImages(); if(!sel){ os_showGearDefault(); os_setText('partName_OpticSight','no optic sight selected'); os_setText('partPrice_OpticSight','----- USD'); // activate no-optic header/icon
 os_addClass('productHeader_noOpticSight','active'); os_addClass('productButtonIcon_noOpticSight','active'); os_removeClass('productButtonIcon_opticSight00100101','active'); return; }
 const img=os_get('partImgID_'+sel.id); if(img) img.style.display='flex'; const title = p.productTitle; const suffix = (sel.variantTitle && sel.variantTitle.toLowerCase()!=='no variant')? (' - '+sel.variantTitle) : ''; // gear menu
 os_setText('partName_OpticSight', title + suffix); os_setText('partPrice_OpticSight', sel.price+' USD'); // part menu header
 os_setText('productName_opticSight001001', title + suffix); os_setText('productPricing_opticSight001001', sel.price+' USD'); // part menu active states
 os_addClass('productHeader_opticSight001001','active'); os_addClass('productButtonIcon_opticSight00100101','active'); os_removeClass('productHeader_noOpticSight','active'); os_removeClass('productButtonIcon_noOpticSight','active'); }

(function(){ const start=os_get('buttonModalStartMenu_StartButton'); if(start){ start.addEventListener('click', function(){ uiReset_opticSight(); uiData_OpticSight(); 
    
    // Update 3D model after UI update
    updateModel_OpticSight();
    }); }
 const noBtn=os_get('buttonItems_noOpticSight'); if(noBtn){ noBtn.addEventListener('click', function(){ uiReset_opticSight(); uiData_OpticSight(); 
    
    // Update 3D model after UI update
    updateModel_OpticSight();
    }); }
 const pick=os_get('buttonItems_opticSight00100101'); if(pick){ pick.addEventListener('click', function(){ const p=os_getProduct(); if(p){ p.variants['01'].quantity=1; } uiData_OpticSight(); 
    
    // Update 3D model after UI update
    const itemsID = "opticSight00100101";
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleOpticSightSelection(itemsID);
    }); }
})();

export function getSelectedOpticSight(){ const p=os_getProduct(); if(p && p.variants['01'].quantity===1) return p.variants['01']; return null; }
export function getOpticSightTotalPrice(){ const v=getSelectedOpticSight(); return v? v.price:0; }