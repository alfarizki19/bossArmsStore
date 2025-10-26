// === dataController_mlokForBipod.mjs ===
// Gear & Acc: MLOK for Bipod (alias UI for mlokAndKeymodRail)

// Import model controller functions
import { updateModel_MlokForBipod, handleMlokForBipodSelection } from '../../modelController/modelController_Gear/modelController_MlokForBipod.mjs';

function mfb_get(id){ return document.getElementById(id); }
function mfb_setText(id,t){ const el=mfb_get(id); if(el) el.textContent=t; }
function mfb_addClass(id,c){ const el=mfb_get(id); if(el) el.classList.add(c); }
function mfb_removeClass(id,c){ const el=mfb_get(id); if(el) el.classList.remove(c); }

function mfb_getProdA(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001'] && window.part.mlokAndKeymodRail['001'].products && window.part.mlokAndKeymodRail['001'].products['001']) ? window.part.mlokAndKeymodRail['001'].products['001'] : null; }
function mfb_getProdB(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002'] && window.part.mlokAndKeymodRail['002'].products && window.part.mlokAndKeymodRail['002'].products['001']) ? window.part.mlokAndKeymodRail['002'].products['001'] : null; }
function mfb_getBrandA(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['001']) ? window.part.mlokAndKeymodRail['001'].brand : '---'; }
function mfb_getBrandB(){ return (window.part && window.part.mlokAndKeymodRail && window.part.mlokAndKeymodRail['002']) ? window.part.mlokAndKeymodRail['002'].brand : '---'; }

// Additional panel in Bipod menu
function mfb_updateAdditional(product){ if(!product || !product.variants['01']) return; const v=product.variants['01']; mfb_setText('additionalItemsName_bipod001001', product.productTitle); mfb_setText('additionalItemsBrand_bipod001001', product === mfb_getProdA() ? mfb_getBrandA() : mfb_getBrandB()); mfb_setText('additionalItemsPricing_bipod001001', v.price + ' USD'); const imgA=mfb_get('productImgAdditionalID_MLOKBipod001'); const imgB=mfb_get('productImgAdditionalID_MLOKBipod002'); if(product===mfb_getProdA()){ if(imgA) imgA.style.display='flex'; if(imgB) imgB.style.display='none'; } else { if(imgA) imgA.style.display='none'; if(imgB) imgB.style.display='flex'; } }

// Resets per group (no quantity change here; just UI texts/classes)
export function uiReset_mlokForBipod001001(){ const p=mfb_getProdA(); if(!p) return; mfb_setText('productName_mlokAndKeymodRail001001_forbipod', p.productTitle); mfb_setText('productPricing_mlokAndKeymodRail001001_forbipod', p.variants['01'].price + ' USD'); mfb_removeClass('productHeader_mlokAndKeymodRail001001_forbipod','active'); mfb_removeClass('productButtonIcon_mlokAndKeymodRail001001_forbipod','active'); }
export function uiReset_mlokForBipod002001(){ const p=mfb_getProdB(); if(!p) return; mfb_setText('productName_mlokAndKeymodRail002001_forbipod', p.productTitle); mfb_setText('productPricing_mlokAndKeymodRail002001_forbipod', p.variants['01'].price + ' USD'); mfb_removeClass('productHeader_mlokAndKeymodRail002001_forbipod','active'); mfb_removeClass('productButtonIcon_mlokAndKeymodRail002001_forbipod','active'); }

export function uiData_mlokForBipod(){ const a=mfb_getProdA(); const b=mfb_getProdB(); const aq = a && a.variants['01'] ? (a.variants['01'].quantity||0) : 0; const bq = b && b.variants['01'] ? (b.variants['01'].quantity||0) : 0; // clear actives first
 mfb_removeClass('productHeader_mlokAndKeymodRail001001_forbipod','active'); mfb_removeClass('productHeader_mlokAndKeymodRail002001_forbipod','active'); mfb_removeClass('productButtonIcon_mlokAndKeymodRail001001_forbipod','active'); mfb_removeClass('productButtonIcon_mlokAndKeymodRail002001_forbipod','active'); mfb_removeClass('productContainer_mlokAndKeymodRail001001_forbipod','active'); mfb_removeClass('productContainer_mlokAndKeymodRail002001_forbipod','active');
 // reflect current state exclusively by last-selected choice
 const lastSel = window.__mlokLastSelected || (aq>0? 'A' : (bq>0? 'B': null));
 if(lastSel==='A' && a && aq>0){ mfb_setText('productName_mlokAndKeymodRail001001_forbipod', a.productTitle); mfb_setText('productPricing_mlokAndKeymodRail001001_forbipod', a.variants['01'].price + ' USD'); mfb_addClass('productHeader_mlokAndKeymodRail001001_forbipod','active'); mfb_addClass('productButtonIcon_mlokAndKeymodRail001001_forbipod','active'); mfb_addClass('productContainer_mlokAndKeymodRail001001_forbipod','active'); mfb_updateAdditional(a); return; }
 if(lastSel==='B' && b && bq>0){ mfb_setText('productName_mlokAndKeymodRail002001_forbipod', b.productTitle); mfb_setText('productPricing_mlokAndKeymodRail002001_forbipod', b.variants['01'].price + ' USD'); mfb_addClass('productHeader_mlokAndKeymodRail002001_forbipod','active'); mfb_addClass('productButtonIcon_mlokAndKeymodRail002001_forbipod','active'); mfb_addClass('productContainer_mlokAndKeymodRail002001_forbipod','active'); mfb_updateAdditional(b); return; }
 // if none yet but one has qty, activate that one
 if(aq>0 && a){ mfb_setText('productName_mlokAndKeymodRail001001_forbipod', a.productTitle); mfb_setText('productPricing_mlokAndKeymodRail001001_forbipod', a.variants['01'].price + ' USD'); mfb_addClass('productHeader_mlokAndKeymodRail001001_forbipod','active'); mfb_addClass('productButtonIcon_mlokAndKeymodRail001001_forbipod','active'); mfb_addClass('productContainer_mlokAndKeymodRail001001_forbipod','active'); mfb_updateAdditional(a); return; }
 if(bq>0 && b){ mfb_setText('productName_mlokAndKeymodRail002001_forbipod', b.productTitle); mfb_setText('productPricing_mlokAndKeymodRail002001_forbipod', b.variants['01'].price + ' USD'); mfb_addClass('productHeader_mlokAndKeymodRail002001_forbipod','active'); mfb_addClass('productButtonIcon_mlokAndKeymodRail002001_forbipod','active'); mfb_addClass('productContainer_mlokAndKeymodRail002001_forbipod','active'); mfb_updateAdditional(b); return; }
 // none -> default to brand A texts
 if(a){ mfb_setText('productName_mlokAndKeymodRail001001_forbipod', a.productTitle); mfb_setText('productPricing_mlokAndKeymodRail001001_forbipod', a.variants['01'].price + ' USD'); }
}

(function(){ 
  const start=mfb_get('buttonModalStartMenu_StartButton'); 
  if(start){ 
    start.addEventListener('click', function(){ 
      uiReset_mlokForBipod001001(); 
      uiReset_mlokForBipod002001(); 
      window.__mlokSummaryMode='forBipod'; 
      uiData_mlokForBipod(); 
      
      // Update 3D model after UI update
      updateModel_MlokForBipod();
    }); 
  }
  
  const aBtn=mfb_get('buttonItems_mlokAndKeymodRail00100101_forbipod'); 
  if(aBtn){ 
    aBtn.addEventListener('click', function(){ 
      const a=mfb_getProdA(); 
      const b=mfb_getProdB(); 
      if(b && b.variants['01']) b.variants['01'].quantity = 0; 
      if(a && a.variants['01']) a.variants['01'].quantity = Math.max(0,(a.variants['01'].quantity||0) + 1); 
      window.__mlokLastSelected='A'; 
      window.__mlokSummaryMode='forBipod'; 
      uiData_mlokForBipod(); 
      
      // Update 3D model after UI update
      const itemsID = "mlokAndKeymodRail00100101";
      console.log(`🎯 M-LOK for Bipod button clicked: ${itemsID}`);
      handleMlokForBipodSelection(itemsID);
    }); 
  }
  
  const bBtn=mfb_get('buttonItems_mlokAndKeymodRail00200101_forbipod'); 
  if(bBtn){ 
    bBtn.addEventListener('click', function(){ 
      const a=mfb_getProdA(); 
      const b=mfb_getProdB(); 
      if(a && a.variants['01']) a.variants['01'].quantity = 0; 
      if(b && b.variants['01']) b.variants['01'].quantity = Math.max(0,(b.variants['01'].quantity||0) + 1); 
      window.__mlokLastSelected='B'; 
      window.__mlokSummaryMode='forBipod'; 
      uiData_mlokForBipod(); 
      
      // Update 3D model after UI update
      const itemsID = "mlokAndKeymodRail00200101";
      console.log(`🎯 M-LOK for Bipod button clicked: ${itemsID}`);
      handleMlokForBipodSelection(itemsID);
    }); 
  }
  
  const jump=mfb_get('buttonKeMenuMlokForBipod_bipod001001'); 
  if(jump){ 
    jump.addEventListener('click', function(){ 
      window.__mlokSummaryMode='forBipod'; 
      uiData_mlokForBipod(); 
      
      // Update 3D model after UI update
      updateModel_MlokForBipod();
    }); 
  }
})();