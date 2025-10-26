// === dataController_EndPlate.mjs ===
// End Plate UI Controller (Lower Category) — two products with many variants

// Import model controller functions
import { updateModel_EndPlate, handleEndPlateSelection } from '../../modelController/modelController_Lower/modelController_EndPlate.mjs';

function ep_setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function ep_addClass(id, c) { const el = document.getElementById(id); if (el) el.classList.add(c); }
function ep_removeClass(id, c) { const el = document.getElementById(id); if (el) el.classList.remove(c); }

function ep_clearVariantButtons(group, max) { for (let i=1;i<=max;i++){ const k=(""+i).padStart(2,"0"); const b=document.getElementById("buttonItems_endPlate"+group+k); if(b) b.classList.remove("active"); } }

function ep_resetHeaderImagesToDefault(group){
    const container = document.getElementById('productContainer_endPlate'+group);
    const header = container ? container.querySelector('.itemsAccordionTypeA_Header_ImageArea') : null;
    if(header){
        header.querySelectorAll('img, image, Image').forEach(img=>img.style.display='none');
        const defId = 'productImgID_endPlate'+group+'01';
        const def = document.getElementById(defId);
        if(def && header.contains(def)) def.style.display='block';
    }
}

function ep_setHeaderIconActive(group){
    const icons = [document.getElementById('productButtonIcon_endPlate001001'), document.getElementById('productButtonIcon_endPlate002001')];
    icons.forEach(i=>{ if(i) i.classList.remove('active'); });
    const sel = document.getElementById('productButtonIcon_endPlate'+group);
    if(sel) sel.classList.add('active');
}

export function uiReset_endPlate001001(){ const p=window.part.endPlate["001"].products["001"]; Object.keys(p.variants).forEach(k=>p.variants[k].quantity=0); ep_setText("productName_endPlate001001", p.productTitle); ep_setText("productPricing_endPlate001001", p.variants["01"].price+" USD"); ep_removeClass("productHeader_endPlate001001","active"); ep_clearVariantButtons("001001",7); ep_resetHeaderImagesToDefault('001001'); }
export function uiReset_endPlate002001(){ const p=window.part.endPlate["002"].products["001"]; Object.keys(p.variants).forEach(k=>p.variants[k].quantity=0); ep_setText("productName_endPlate002001", p.productTitle); ep_setText("productPricing_endPlate002001", p.variants["01"].price+" USD"); ep_removeClass("productHeader_endPlate002001","active"); ep_clearVariantButtons("002001",10); ep_resetHeaderImagesToDefault('002001'); }

export function uiData_EndPlate(){ let s=null,g=null,t=""; { const v=window.part.endPlate["001"].products["001"].variants; for(let i=1;i<=7;i++){const k=(""+i).padStart(2,"0"); if(v[k]&&v[k].quantity===1){s=v[k]; g="001001"; t=window.part.endPlate["001"].products["001"].productTitle;} } } { const v=window.part.endPlate["002"].products["001"].variants; for(let i=1;i<=10;i++){const k=(""+i).padStart(2,"0"); if(v[k]&&v[k].quantity===1){s=v[k]; g="002001"; t=window.part.endPlate["002"].products["001"].productTitle;} } } if(!s)return; ep_setText("productPricing_endPlate"+g, s.price+" USD"); ep_addClass("productHeader_endPlate"+g, "active"); ep_setText("productName_endPlate"+g, t + (s.variantTitle.toLowerCase()!=="no variant"? (" - "+s.variantTitle):"")); // header image hide/show
    // ensure other group's header snaps to default 01 first
    ep_resetHeaderImagesToDefault(g === '001001' ? '002001' : '001001');
    (function(){
        const container = document.getElementById('productContainer_endPlate'+g);
        const header = container ? container.querySelector('.itemsAccordionTypeA_Header_ImageArea') : null;
        if(header){
            header.querySelectorAll('img, image, Image').forEach(img=>img.style.display='none');
            const hid = 'productImgID_endPlate'+g+s.id.slice(-2);
            const img = document.getElementById(hid);
            if(img && header.contains(img)) img.style.display='block';
        }
    })();
    // header icon active
    ep_setHeaderIconActive(g);
    // lower menu image + texts
    (function(){
        const nameEl = document.getElementById('partName_EndPlate');
        const container = nameEl ? nameEl.closest('.menuPartMenuOptionContainer') : null;
        const imgWrap = container ? container.querySelector('.menuPartMenuOptionImageArea') : null;
        if(imgWrap){
            imgWrap.querySelectorAll('img, image, Image').forEach(i=>i.style.display='none');
            const lid = 'partImgID_endPlate'+g+s.id.slice(-2);
            const li = document.getElementById(lid);
            if(li) li.style.display='block';
        }
    })();
    ep_setText('partName_EndPlate', t + (s.variantTitle.toLowerCase()!=='no variant'?(' - '+s.variantTitle):''));
    ep_setText('partPrice_EndPlate', s.price+' USD');
    // variant buttons
    ep_clearVariantButtons(g, g==="001001"?7:10); const b=document.getElementById("buttonItems_endPlate"+g+s.id.slice(-2)); if(b) b.classList.add("active"); }

{ const btn=document.getElementById("buttonModalStartMenu_StartButton"); if(btn) btn.addEventListener("click", function(){ uiReset_endPlate001001(); uiReset_endPlate002001(); // default header images to 01 for both groups
    ep_resetHeaderImagesToDefault('001001'); ep_resetHeaderImagesToDefault('002001');
    window.part.endPlate["001"].products["001"].variants["01"].quantity=1; uiData_EndPlate(); 
    
    // Update 3D model after UI update
    updateModel_EndPlate();
    }); }

{ for(let i=1;i<=7;i++){const k=(""+i).padStart(2,"0"); const b=document.getElementById("buttonItems_endPlate001001"+k); if(b) b.addEventListener("click", function(){ uiReset_endPlate001001(); uiReset_endPlate002001(); window.part.endPlate["001"].products["001"].variants[k].quantity=1; uiData_EndPlate(); 
    
    // Update 3D model after UI update
    const itemsID = "endPlate001001" + k;
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleEndPlateSelection(itemsID);
    }); } for(let i=1;i<=10;i++){const k=(""+i).padStart(2,"0"); const b=document.getElementById("buttonItems_endPlate002001"+k); if(b) b.addEventListener("click", function(){ uiReset_endPlate001001(); uiReset_endPlate002001(); window.part.endPlate["002"].products["001"].variants[k].quantity=1; uiData_EndPlate(); 
    
    // Update 3D model after UI update
    const itemsID = "endPlate002001" + k;
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleEndPlateSelection(itemsID);
    }); } }

export function getSelectedEndPlate(){ const a=window.part.endPlate["001"].products["001"].variants; for(let i=1;i<=7;i++){const k=(""+i).padStart(2,"0"); if(a[k]&&a[k].quantity===1)return a[k];} const b=window.part.endPlate["002"].products["001"].variants; for(let i=1;i<=10;i++){const k=(""+i).padStart(2,"0"); if(b[k]&&b[k].quantity===1)return b[k];} return null; }
export function getEndPlateTotalPrice(){ const v=getSelectedEndPlate(); return v? v.price:0; }