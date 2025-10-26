// === dataController_mlok.mjs ===
// Gear & Acc: MLOK/Keymod Rail controller (non-bipod)

// Import model controller functions
import { updateModel_MLOK, handleMLOKSelection } from '../../modelController/modelController_Gear/modelController_Mlok.mjs';

function ml_get(id){ return document.getElementById(id); }
function ml_setText(id,t){ const el=ml_get(id); if(el) el.textContent=t; }
function ml_addClass(id,c){ const el=ml_get(id); if(el) el.classList.add(c); }
function ml_removeClass(id,c){ const el=ml_get(id); if(el) el.classList.remove(c); }

function ml_getProdA(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001'] && window.part.mlokAndKeymodRail['001'].products && window.part.mlokAndKeymodRail['001'].products['001']) ? window.part.mlokAndKeymodRail['001'].products['001'] : null; }
function ml_getProdB(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002'] && window.part.mlokAndKeymodRail['002'].products && window.part.mlokAndKeymodRail['002'].products['001']) ? window.part.mlokAndKeymodRail['002'].products['001'] : null; }

// remember last selected brand globally to sync with mlokForBipod
function ml_getLastSelected(){ return window.__mlokLastSelected || null; }
function ml_setLastSelected(v){ window.__mlokLastSelected = v; }

// gear image helpers
function ml_hideGearImages(){
  const imgs = document.querySelectorAll('[id^="partImgID_mlokAndKeymodRail"]');
  imgs.forEach(el=>{ el.style.display='none'; });
}
function ml_showDefaultGearImage(){
  const def = ml_get('partImgID_mlokAndKeymodRail00100101');
  if(def) def.style.display='flex';
}
function ml_showGearImageFor(choice){
  if(choice==='A'){
    const el = ml_get('partImgID_mlokAndKeymodRail00100101');
    if(el) el.style.display='flex';
  } else if(choice==='B'){
    const el = ml_get('partImgID_mlokAndKeymodRail00200101');
    if(el) el.style.display='flex';
  }
}

export function uiReset_mlok(){
  // Do not change quantities; only reset UI texts/classes
  const a=ml_getProdA(); const b=ml_getProdB();
  if(a){ ml_setText('productName_mlokAndKeymodRail001001', a.productTitle); ml_setText('productPricing_mlokAndKeymodRail001001', a.variants['01'].price + ' USD'); }
  if(b){ ml_setText('productName_mlokAndKeymodRail002001', b.productTitle); ml_setText('productPricing_mlokAndKeymodRail002001', b.variants['01'].price + ' USD'); }
  // Clear actives
  ml_removeClass('productHeader_mlokAndKeymodRail001001','active');
  ml_removeClass('productHeader_mlokAndKeymodRail002001','active');
  ml_removeClass('productHeader_noMlokAndKeymodRail','active');
  ml_removeClass('productButtonIcon_mlokAndKeymodRail00100101','active');
  ml_removeClass('productButtonIcon_mlokAndKeymodRail00200101','active');
  ml_removeClass('productButtonIcon_noMlokAndKeymodRail','active');
  // set no-selected texts
  ml_setText('partName_Mlok', 'No MLOK Selected');
  ml_setText('partPrice_Mlok', '----- USD');
  // gear images default
  ml_hideGearImages();
  ml_showDefaultGearImage();
}

export function uiData_mlok(){
  const a=ml_getProdA(); const b=ml_getProdB();
  const aq = a && a.variants['01'] ? (a.variants['01'].quantity||0) : 0;
  const bq = b && b.variants['01'] ? (b.variants['01'].quantity||0) : 0;
  // Clear actives first
  ml_removeClass('productHeader_mlokAndKeymodRail001001','active');
  ml_removeClass('productHeader_mlokAndKeymodRail002001','active');
  ml_removeClass('productHeader_noMlokAndKeymodRail','active');
  ml_removeClass('productButtonIcon_mlokAndKeymodRail00100101','active');
  ml_removeClass('productButtonIcon_mlokAndKeymodRail00200101','active');
  ml_removeClass('productButtonIcon_noMlokAndKeymodRail','active');
  // Reflect current state (mutually exclusive active state)
  ml_hideGearImages();
  if(aq===0 && bq===0){
    ml_addClass('productHeader_noMlokAndKeymodRail','active');
    ml_addClass('productButtonIcon_noMlokAndKeymodRail','active');
    ml_showDefaultGearImage();
    ml_setText('partName_Mlok', 'No MLOK Selected');
    ml_setText('partPrice_Mlok', '----- USD');
    return;
  }
  let choice = null;
  const lastSel = ml_getLastSelected();
  if(lastSel==='A' && aq>0) choice = 'A';
  else if(lastSel==='B' && bq>0) choice = 'B';
  else if(aq>0 && bq===0) choice = 'A';
  else if(bq>0 && aq===0) choice = 'B';
  else choice = 'A'; // both > 0 but no last -> default A
  if(choice==='A'){
    ml_addClass('productHeader_mlokAndKeymodRail001001','active');
    ml_addClass('productButtonIcon_mlokAndKeymodRail00100101','active');
    ml_showGearImageFor('A');
    if(a && a.variants['01']){
      const vt = (a.variants['01'].variantTitle||'').trim();
      const name = vt && vt.toLowerCase()!=='no variant' ? `${a.productTitle} - ${vt}` : a.productTitle;
      ml_setText('partName_Mlok', name);
      ml_setText('partPrice_Mlok', (a.variants['01'].price||0) + ' USD');
    }
  } else {
    ml_addClass('productHeader_mlokAndKeymodRail002001','active');
    ml_addClass('productButtonIcon_mlokAndKeymodRail00200101','active');
    ml_showGearImageFor('B');
    if(b && b.variants['01']){
      const vt = (b.variants['01'].variantTitle||'').trim();
      const name = vt && vt.toLowerCase()!=='no variant' ? `${b.productTitle} - ${vt}` : b.productTitle;
      ml_setText('partName_Mlok', name);
      ml_setText('partPrice_Mlok', (b.variants['01'].price||0) + ' USD');
    }
  }
}

(function(){
  const start=ml_get('buttonModalStartMenu_StartButton');
  if(start){ start.addEventListener('click', function(){ uiReset_mlok(); ml_setLastSelected(null); window.__mlokSummaryMode='normal'; uiData_mlok(); 
    
    // Update 3D model after UI update
    updateModel_MLOK();
    }); }
  const noBtn=ml_get('buttonItems_noMlokAndKeymodRail');
  if(noBtn){ noBtn.addEventListener('click', function(){ const a=ml_getProdA(); const b=ml_getProdB(); if(a) a.variants['01'].quantity = 0; if(b) b.variants['01'].quantity = 0; ml_setLastSelected(null); window.__mlokSummaryMode='normal'; uiData_mlok(); 
    
    // Update 3D model after UI update
    const itemsID = "noMlokAndKeymodRail";
    console.log(`🎯 No MLOK button clicked: ${itemsID}`);
    handleMLOKSelection(itemsID);
    }); }
  const aBtn=ml_get('buttonItems_mlokAndKeymodRail00100101');
  if(aBtn){ aBtn.addEventListener('click', function(){ const a=ml_getProdA(); const b=ml_getProdB(); if(b && b.variants['01']) b.variants['01'].quantity = 0; if(a && a.variants['01']) a.variants['01'].quantity = Math.max(0,(a.variants['01'].quantity||0) + 1); ml_setLastSelected('A'); window.__mlokSummaryMode='normal'; uiData_mlok(); 
    
    // Update 3D model after UI update
    const itemsID = "mlokAndKeymodRail00100101";
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleMLOKSelection(itemsID);
    }); }
  const bBtn=ml_get('buttonItems_mlokAndKeymodRail00200101');
  if(bBtn){ bBtn.addEventListener('click', function(){ const a=ml_getProdA(); const b=ml_getProdB(); if(a && a.variants['01']) a.variants['01'].quantity = 0; if(b && b.variants['01']) b.variants['01'].quantity = Math.max(0,(b.variants['01'].quantity||0) + 1); ml_setLastSelected('B'); window.__mlokSummaryMode='normal'; uiData_mlok(); 
    
    // Update 3D model after UI update
    const itemsID = "mlokAndKeymodRail00200101";
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleMLOKSelection(itemsID);
    }); }
})();

export function getMlokTotalPrice(){ const a=ml_getProdA(); const b=ml_getProdB(); const ap=(a&&a.variants['01'])? (a.variants['01'].price*(a.variants['01'].quantity||0)) : 0; const bp=(b&&b.variants['01'])? (b.variants['01'].price*(b.variants['01'].quantity||0)) : 0; return ap+bp; }