// === dataController_FrontSight.mjs ===
// Gear & Acc: Front Sight controller

// Import model controller functions
import { updateModel_FrontSight, handleFrontSightSelection, handleFrontSightToggle } from '../../modelController/modelController_Gear/modelController_FrontSight.mjs';

function fs_get(id){ return document.getElementById(id); }
function fs_setText(id, t){ const el=fs_get(id); if(el) el.textContent=t; }
function fs_addClass(id,c){ const el=fs_get(id); if(el) el.classList.add(c); }
function fs_removeClass(id,c){ const el=fs_get(id); if(el) el.classList.remove(c); }

function fs_getGearWrap(){ const nameEl=fs_get('partName_FrontSight'); if(!nameEl) return null; let p=nameEl.parentElement; while(p && !p.classList.contains('menuPartMenuOptionContainer')){ p=p.parentElement; } return p? p.querySelector('.menuPartMenuOptionImageArea') : null; }
function fs_hideGearImages(){ const wrap=fs_getGearWrap(); if(!wrap) return; wrap.querySelectorAll('img, image, Image').forEach(el=>el.style.display='none'); }
function fs_showGearDefaults(){ const a=fs_get('partImgID_frontSight00100101'); if(a) a.style.display='flex'; }

function fs_getProducts(){ const a = window.part.frontSight && window.part.frontSight['001'] && window.part.frontSight['001'].products && window.part.frontSight['001'].products['001']; const b = window.part.frontSight && window.part.frontSight['002'] && window.part.frontSight['002'].products && window.part.frontSight['002'].products['001']; return {a, b}; }

export function uiReset_frontSight(){ const {a,b}=fs_getProducts(); if(a){ a.variants['01'].quantity=0; } if(b){ b.variants['01'].quantity=0; }
 // clear selected headers
 fs_removeClass('productHeader_frontSight001001','active'); fs_removeClass('productHeader_frontSight002001','active'); fs_removeClass('productHeader_noFrontSight','active');
 // gear menu default
 fs_hideGearImages(); fs_showGearDefaults(); fs_setText('partName_FrontSight','no front sight selected'); fs_setText('partPrice_FrontSight','----- USD');
 // icons
 fs_removeClass('productButtonIcon_frontSight00100101','active'); fs_removeClass('productButtonIcon_frontSight00200101','active'); fs_removeClass('productButtonIcon_NoFrontSight','active');
 // keep part-menu defaults from inventory
 if(a){ fs_setText('productName_frontSight001001', a.productTitle); fs_setText('productPricing_frontSight001001', a.variants['01'].price+' USD'); }
 if(b){ fs_setText('productName_frontSight002001', b.productTitle); fs_setText('productPricing_frontSight002001', b.variants['01'].price+' USD'); }
}

export function uiData_FrontSight(){ const {a,b}=fs_getProducts(); const aSel=a && a.variants['01'] && a.variants['01'].quantity===1 ? a.variants['01'] : null; const bSel=b && b.variants['01'] && b.variants['01'].quantity===1 ? b.variants['01'] : null; const anySel = aSel||bSel; fs_hideGearImages(); if(!anySel){ fs_showGearDefaults(); fs_setText('partName_FrontSight','no front sight selected'); fs_setText('partPrice_FrontSight','----- USD'); fs_addClass('productHeader_noFrontSight','active'); fs_addClass('productButtonIcon_NoFrontSight','active'); return; }
 const chosen=aSel||bSel; const group=aSel?'001001':'002001'; const img=fs_get('partImgID_'+chosen.id); if(img) img.style.display='flex'; const product=(aSel? a:b); const title=product.productTitle; const suffix=(chosen.variantTitle && chosen.variantTitle.toLowerCase()!=='no variant'? (' - '+chosen.variantTitle):'');
 // gear menu texts
 fs_setText('partName_FrontSight', title + suffix); fs_setText('partPrice_FrontSight', chosen.price+' USD');
 // part-menu header texts for selected group
 fs_setText('productName_frontSight'+group, title + suffix); fs_setText('productPricing_frontSight'+group, chosen.price+' USD');
 // clear other group's actives before setting
 fs_removeClass('productHeader_frontSight001001','active'); fs_removeClass('productHeader_frontSight002001','active'); fs_removeClass('productButtonIcon_frontSight00100101','active'); fs_removeClass('productButtonIcon_frontSight00200101','active'); fs_removeClass('productHeader_noFrontSight','active'); fs_removeClass('productButtonIcon_NoFrontSight','active');
 // actives for selected
 fs_addClass('productHeader_frontSight'+group,'active'); fs_addClass('productButtonIcon_frontSight'+group+'01','active');
}

(function(){ 
  const start=fs_get('buttonModalStartMenu_StartButton'); 
  if(start){ 
    start.addEventListener('click', function(){ 
      uiReset_frontSight(); 
      uiData_FrontSight(); 
      
      // Update 3D model after UI update
      updateModel_FrontSight();
    }); 
  }
  
  const noBtn=fs_get('buttonItems_noFrontSight'); 
  if(noBtn){ 
    noBtn.addEventListener('click', function(){ 
      uiReset_frontSight(); 
      uiData_FrontSight(); 
      
      // Update 3D model after UI update
      updateModel_FrontSight();
    }); 
  }
  
  const aBtn=fs_get('buttonItems_frontSight00100101'); 
  if(aBtn){ 
    aBtn.addEventListener('click', function(){ 
      const {a,b}=fs_getProducts(); 
      if(b){ b.variants['01'].quantity=0; } 
      if(a){ a.variants['01'].quantity=1; } 
      uiData_FrontSight(); 
      
      // Update 3D model after UI update
      const itemsID = "frontSight00100101";
      console.log(`🎯 Part button clicked: ${itemsID}`);
      handleFrontSightSelection(itemsID);
    }); 
  }
  
  const bBtn=fs_get('buttonItems_frontSight00200101'); 
  if(bBtn){ 
    bBtn.addEventListener('click', function(){ 
      const {a,b}=fs_getProducts(); 
      if(a){ a.variants['01'].quantity=0; } 
      if(b){ b.variants['01'].quantity=1; } 
      uiData_FrontSight(); 
      
      // Update 3D model after UI update
      const itemsID = "frontSight00200101";
      console.log(`🎯 Part button clicked: ${itemsID}`);
      handleFrontSightSelection(itemsID);
    }); 
  }
  
  // Add toggle button listeners for Open/Folded functionality
  // Front Sight 00100101 - Button A (Folded)
  const toggleBtn001A = fs_get('buttonModelController_frontSight00100101_A');
  if(toggleBtn001A){
    toggleBtn001A.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: frontSight00100101_A (folded)`);
      handleFrontSightToggle('frontSight00100101');
    });
  }
  
  // Front Sight 00100101 - Button B (Open)
  const toggleBtn001B = fs_get('buttonModelController_frontSight00100101_B');
  if(toggleBtn001B){
    toggleBtn001B.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: frontSight00100101_B (open)`);
      handleFrontSightToggle('frontSight00100101');
    });
  }
  
  // Front Sight 00200101 - Button A (Folded)
  const toggleBtn002A = fs_get('buttonModelController_frontSight00200101_A');
  if(toggleBtn002A){
    toggleBtn002A.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: frontSight00200101_A (folded)`);
      handleFrontSightToggle('frontSight00200101');
    });
  }
  
  // Front Sight 00200101 - Button B (Open)
  const toggleBtn002B = fs_get('buttonModelController_frontSight00200101_B');
  if(toggleBtn002B){
    toggleBtn002B.addEventListener('click', function(){
      console.log(`🔄 Toggle button clicked: frontSight00200101_B (open)`);
      handleFrontSightToggle('frontSight00200101');
    });
  }
})();

export function getSelectedFrontSight(){ const {a,b}=fs_getProducts(); if(a && a.variants['01'].quantity===1) return a.variants['01']; if(b && b.variants['01'].quantity===1) return b.variants['01']; return null; }
export function getFrontSightTotalPrice(){ const v=getSelectedFrontSight(); return v? v.price:0; }