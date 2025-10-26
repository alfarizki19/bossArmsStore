// === dataController_Bipod.mjs ===
// Gear & Acc: Bipod controller (with MLOK-for-Bipod linkage)

// Import model controller functions
import { updateModel_Bipod, handleBipodSelection, handleBipodToggle } from '../../modelController/modelController_Gear/modelController_Bipod.mjs';

function bp_get(id){ return document.getElementById(id); }
function bp_setText(id, text){ const el=bp_get(id); if(el) el.textContent=text; }
function bp_addClass(id, c){ const el=bp_get(id); if(el) el.classList.add(c); }
function bp_removeClass(id, c){ const el=bp_get(id); if(el) el.classList.remove(c); }

function bp_getGearWrap(){ const nameEl=bp_get('partName_Bipod'); if(!nameEl) return null; let p=nameEl.parentElement; while(p && !p.classList.contains('menuPartMenuOptionContainer')){ p=p.parentElement; } return p? p.querySelector('.menuPartMenuOptionImageArea') : null; }
function bp_hideGearImages(){ const wrap=bp_getGearWrap(); if(!wrap) return; wrap.querySelectorAll('img, image, Image').forEach(el=>el.style.display='none'); }
function bp_showGearDefault(){ const img=bp_get('partImgID_bipod00100101'); if(img) img.style.display='flex'; }

// Inventory access
function bp_getBipod(){ return (window.part && window.part.bipod && window.part.bipod['001'] && window.part.bipod['001'].products && window.part.bipod['001'].products['001']) ? window.part.bipod['001'].products['001'] : null; }
function bp_getMlokA(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001'] && window.part.mlokAndKeymodRail['001'].products && window.part.mlokAndKeymodRail['001'].products['001']) ? window.part.mlokAndKeymodRail['001'].products['001'] : null; }
function bp_getMlokB(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002'] && window.part.mlokAndKeymodRail['002'].products && window.part.mlokAndKeymodRail['002'].products['001']) ? window.part.mlokAndKeymodRail['002'].products['001'] : null; }

function bp_getMlokBrandA(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001']) ? window.part.mlokAndKeymodRail['001'].brand : '---'; }
function bp_getMlokBrandB(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002']) ? window.part.mlokAndKeymodRail['002'].brand : '---'; }

function bp_incMlokA(){ const a=bp_getMlokA(); if(a && a.variants['01']) a.variants['01'].quantity = Math.max(0,(a.variants['01'].quantity||0)+1); }
function bp_decMlokIfAny(){ const a=bp_getMlokA(); const b=bp_getMlokB(); if(a && a.variants['01'] && (a.variants['01'].quantity||0)>0) a.variants['01'].quantity -= 1; if(b && b.variants['01'] && (b.variants['01'].quantity||0)>0) b.variants['01'].quantity -= 1; }

function bp_updateAdditionalFromMlokA(){ const a=bp_getMlokA(); if(!a || !a.variants['01']) return; const v=a.variants['01']; // per spec: name=productTitle, brand from brand node, price=variant price
 bp_setText('additionalItemsName_bipod001001', a.productTitle); bp_setText('additionalItemsBrand_bipod001001', bp_getMlokBrandA()); bp_setText('additionalItemsPricing_bipod001001', v.price + ' USD'); const imgA = bp_get('productImgAdditionalID_MLOKBipod001'); const imgB = bp_get('productImgAdditionalID_MLOKBipod002'); if(imgA) imgA.style.display='flex'; if(imgB) imgB.style.display='none'; }

// Reset to no-selected (explicit command)
export function uiReset_bipod(){ const p=bp_getBipod(); if(!p) return; // clear quantities
 Object.keys(p.variants).forEach(k=>p.variants[k].quantity=0);
 // Gear menu
 bp_hideGearImages(); bp_showGearDefault(); bp_setText('partName_Bipod','No Bipod Selected'); bp_setText('partPrice_Bipod','--- USD');
 // Part menu header/icon states
 bp_addClass('productHeader_noBipod','active'); bp_addClass('productButtonIcon_NoBipod','active');
 bp_removeClass('productHeader_bipod001001','active'); bp_removeClass('productButtonIcon_bipod00100101','active'); bp_removeClass('productButtonIcon_bipod001001','active');
 // Part menu header texts (defaults from inventory)
 bp_setText('productName_bipod001001', p.productTitle); bp_setText('productPricing_bipod001001', p.variants['01'].price + ' USD');
 // Additional panel to defaults
 bp_setText('additionalItemsName_bipod001001','no parts selected'); bp_setText('additionalItemsBrand_bipod001001','--- ---'); bp_setText('additionalItemsPricing_bipod001001','----- USD'); const imgA = bp_get('productImgAdditionalID_MLOKBipod001'); const imgB = bp_get('productImgAdditionalID_MLOKBipod002'); if(imgA) imgA.style.display='none'; if(imgB) imgB.style.display='none';
 // MLOK decrement both brands if any
 bp_decMlokIfAny(); }

export function uiData_Bipod(){ const p=bp_getBipod(); if(!p) return; const v01=p.variants['01']; const selected = v01 && v01.quantity===1 ? v01 : null; // Default gear image baseline
 bp_hideGearImages(); if(!selected){ bp_showGearDefault(); bp_setText('partName_Bipod','No Bipod Selected'); bp_setText('partPrice_Bipod','--- USD'); // ensure no-selected active
 bp_addClass('productHeader_noBipod','active'); bp_addClass('productButtonIcon_NoBipod','active'); bp_removeClass('productHeader_bipod001001','active'); bp_removeClass('productButtonIcon_bipod00100101','active'); bp_removeClass('productButtonIcon_bipod001001','active'); return; }
 // Selected bipod
 const title = p.productTitle; bp_setText('partName_Bipod', title); bp_setText('partPrice_Bipod', v01.price + ' USD'); const img=bp_get('partImgID_'+v01.id); if(img) img.style.display='flex';
 // Part menu states
 bp_removeClass('productHeader_noBipod','active'); bp_removeClass('productButtonIcon_NoBipod','active'); bp_addClass('productHeader_bipod001001','active');
 // toggle either icon id
 bp_addClass('productButtonIcon_bipod001001','active'); bp_addClass('productButtonIcon_bipod00100101','active');
 // Update part-menu header texts for bipod
 bp_setText('productName_bipod001001', p.productTitle); bp_setText('productPricing_bipod001001', v01.price + ' USD');
 // Activate MLOK for bipod header/icon (if present)
 bp_addClass('productHeader_mlokAndKeymodRail001001_forbipod','active'); bp_addClass('productButtonIcon_mlokAndKeymodRail001001_forbipod','active');
 // Ensure MLOK A +1 and update additional panel
 bp_incMlokA(); bp_updateAdditionalFromMlokA(); }

// Wiring buttons
(function(){ 
  const start=bp_get('buttonModalStartMenu_StartButton'); 
  if(start){ 
    start.addEventListener('click', function(){ 
      uiReset_bipod(); 
      uiData_Bipod(); 
      
      // Update 3D model after UI update
      updateModel_Bipod();
    }); 
  }
  
  // no bipod
  const noBtn = bp_get('buttonItems_noBipod'); 
  if(noBtn){ 
    noBtn.addEventListener('click', function(){ 
      const p=bp_getBipod(); 
      if(p){ p.variants['01'].quantity=0; } 
      uiReset_bipod(); 
      uiData_Bipod(); 
      
      // Update 3D model after UI update
      updateModel_Bipod();
    }); 
  }
  
  // select bipod 00100101
  const pick = bp_get('buttonItems_bipod00100101'); 
  if(pick){ 
    pick.addEventListener('click', function(){ 
      const p=bp_getBipod(); 
      if(!p) return; 
      p.variants['01'].quantity=1; 
      uiData_Bipod(); 
      
      // Update 3D model after UI update
      const itemsID = "bipod00100101";
      console.log(`🎯 Part button clicked: ${itemsID}`);
      handleBipodSelection(itemsID);
    }); 
  }
  
  // Add toggle button listeners for Bipod states (A, B, C, D)
  // Button A (Folded Long)
  const toggleBtnA = bp_get('buttonModelController_bipod00100101_A');
  if(toggleBtnA){
    toggleBtnA.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: bipod00100101_A (Folded Long)`);
      handleBipodToggle('bipod00100101', 'A');
    });
  }
  
  // Button B (Folded Short)
  const toggleBtnB = bp_get('buttonModelController_bipod00100101_B');
  if(toggleBtnB){
    toggleBtnB.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: bipod00100101_B (Folded Short)`);
      handleBipodToggle('bipod00100101', 'B');
    });
  }
  
  // Button C (Open Short)
  const toggleBtnC = bp_get('buttonModelController_bipod00100101_C');
  if(toggleBtnC){
    toggleBtnC.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: bipod00100101_C (Open Short)`);
      handleBipodToggle('bipod00100101', 'C');
    });
  }
  
  // Button D (Open Long)
  const toggleBtnD = bp_get('buttonModelController_bipod00100101_D');
  if(toggleBtnD){
    toggleBtnD.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: bipod00100101_D (Open Long)`);
      handleBipodToggle('bipod00100101', 'D');
    });
  }
})();

export function getSelectedBipod(){ const p=bp_getBipod(); if(!p) return null; return (p.variants['01'].quantity===1)? p.variants['01']: null; }
export function getBipodTotalPrice(){ const v=getSelectedBipod(); return v? v.price:0; }