// === dataController_LowerReceiver.mjs ===
// Lower Receiver UI Controller (Lower Category)

// Import model controller functions
import { updateModel_LowerReceiver, handleLowerReceiverSelection } from '../../modelController/modelController_Lower/modelController_LowerReceiver.mjs';

function lr_setText(id, text){ const el=document.getElementById(id); if(el) el.textContent=text; }
function lr_addClass(id,c){ const el=document.getElementById(id); if(el) el.classList.add(c); }
function lr_removeClass(id,c){ const el=document.getElementById(id); if(el) el.classList.remove(c); }

function lr_hideHeaderImages(){ const header=document.querySelector('#productContainer_lowerReceiver001001 .itemsAccordionTypeA_Header_ImageArea'); if(header){ header.querySelectorAll('img, image, Image').forEach(el=>el.style.display='none'); } }

function lr_showHeaderDefault(){ const def=document.getElementById('productImgID_lowerReceiver00100101'); if(def) def.style.display='block'; }

function lr_clearVariantButtons(){ ["01","02"].forEach(v=>{ const b=document.getElementById('buttonItems_lowerReceiver001001'+v); if(b) b.classList.remove('active'); }); }

function lr_setHeaderIconActive(){ const icon=document.getElementById('productButtonIcon_lowerReceiver001001'); if(icon){ icon.classList.add('active'); } }
function lr_clearHeaderIconActive(){ const icon=document.getElementById('productButtonIcon_lowerReceiver001001'); if(icon){ icon.classList.remove('active'); } }

export function uiReset_lowerReceiver001001(){ const p=window.part.lowerReceiver["001"].products["001"]; Object.keys(p.variants).forEach(k=>p.variants[k].quantity=0); lr_setText("productName_lowerReceiver001001", p.productTitle); lr_setText("productPricing_lowerReceiver001001", p.variants["01"].price+" USD"); lr_removeClass("productHeader_lowerReceiver001001","active"); lr_clearHeaderIconActive(); lr_hideHeaderImages(); lr_showHeaderDefault(); lr_clearVariantButtons(); lr_hideLowerMenuImages(); lr_showLowerMenuDefault(); }

export function uiData_LowerReceiver(){ const prod=window.part.lowerReceiver["001"].products["001"]; let sel=null,key=null; if(prod.variants["01"].quantity===1){ sel=prod.variants["01"]; key="01"; } if(prod.variants["02"].quantity===1){ sel=prod.variants["02"]; key="02"; } if(!sel){ lr_clearHeaderIconActive(); return; } lr_setText("productPricing_lowerReceiver001001", sel.price+" USD"); lr_addClass("productHeader_lowerReceiver001001","active"); lr_hideHeaderImages(); const h=document.getElementById("productImgID_lowerReceiver001001"+key); if(h) h.style.display="block"; lr_setText("productName_lowerReceiver001001", prod.productTitle + (sel.variantTitle.toLowerCase()!=="no variant"? (" - "+sel.variantTitle):"")); if(prod.variants["01"].quantity===1 || prod.variants["02"].quantity===1){ lr_setHeaderIconActive(); } else { lr_clearHeaderIconActive(); } lr_clearVariantButtons(); const vb=document.getElementById('buttonItems_lowerReceiver001001'+key); if(vb) vb.classList.add('active'); lr_updateLowerMenuImage(key); lr_setText('partName_LowerReceiver', prod.productTitle + (sel.variantTitle.toLowerCase()!=='no variant'? (' - '+sel.variantTitle):'')); lr_setText('partPrice_LowerReceiver', sel.price+' USD'); }

{ const btn=document.getElementById("buttonModalStartMenu_StartButton"); if(btn) btn.addEventListener("click", function(){
    uiReset_lowerReceiver001001();
    window.part.lowerReceiver["001"].products["001"].variants["01"].quantity=1;
    uiData_LowerReceiver();
    // enforce icon active and lower menu 01 image for default
    lr_setHeaderIconActive();
    lr_updateLowerMenuImage('01');
    
    // Update 3D model after UI update
    updateModel_LowerReceiver();
}); }

// Lower menu sync (hide all then show selected)
function lr_getLowerMenuWrap(){
    const nameEl = document.getElementById('partName_LowerReceiver');
    if(!nameEl) return null;
    let parent = nameEl.parentElement;
    while(parent && !parent.classList.contains('menuPartMenuOptionContainer')){
        parent = parent.parentElement;
    }
    if(!parent) return null;
    return parent.querySelector('.menuPartMenuOptionImageArea');
}
function lr_hideLowerMenuImages(){ const wrap = lr_getLowerMenuWrap(); if(!wrap) return; wrap.querySelectorAll('img, image, Image').forEach(i=>i.style.display='none'); }
function lr_showLowerMenuDefault(){ const img = document.getElementById('partImgID_lowerReceiver00100101'); if(img) img.style.display='block'; }
function lr_updateLowerMenuImage(key){ const wrap = lr_getLowerMenuWrap(); if(!wrap) return; wrap.querySelectorAll('img, image, Image').forEach(i=>i.style.display='none'); const img = document.getElementById('partImgID_lowerReceiver001001'+key); if(img) img.style.display='block'; }

// Hook into selection flow by wrapping original uiData

{ ["01","02"].forEach(v=>{ const b=document.getElementById("buttonItems_lowerReceiver001001"+v); if(b) b.addEventListener("click", function(){ uiReset_lowerReceiver001001(); window.part.lowerReceiver["001"].products["001"].variants[v].quantity=1; uiData_LowerReceiver(); 
    // Update 3D model after UI update
    const itemsID = "lowerReceiver001001" + v;
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleLowerReceiverSelection(itemsID);
}); }); }

export function getSelectedLowerReceiver(){ const p=window.part.lowerReceiver["001"].products["001"].variants; if(p["01"].quantity===1) return p["01"]; if(p["02"].quantity===1) return p["02"]; return null; }
export function getLowerReceiverTotalPrice(){ const v=getSelectedLowerReceiver(); return v? v.price:0; }