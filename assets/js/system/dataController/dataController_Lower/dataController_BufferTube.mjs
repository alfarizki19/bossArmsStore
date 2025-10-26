// === dataController_BufferTube.mjs ===
// Buffer Tube UI Controller (Lower Category) — single product, single variant

// Import model controller functions
import { updateModel_BufferTube, handleBufferTubeSelection } from '../../modelController/modelController_Lower/modelController_BufferTube.mjs';

function bt_setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function bt_addClass(id, c) { const el = document.getElementById(id); if (el) el.classList.add(c); }
function bt_removeClass(id, c) { const el = document.getElementById(id); if (el) el.classList.remove(c); }

export function uiReset_bufferTube001001() {
    const product = window.part.bufferTube["001"].products["001"]; product.variants["01"].quantity = 0;
    bt_setText("productName_bufferTube001001", product.productTitle);
    bt_setText("productPricing_bufferTube001001", product.variants["01"].price + " USD");
    bt_removeClass("productHeader_bufferTube001001", "active");
    // remove active on header icon (no id, use query selector)
    (function(){ const icon = document.querySelector('#productHeader_bufferTube001001 .itemsAccordionTypeA_OpenAccordion_ButtonIcon'); if (icon) icon.classList.remove('active'); })();
    // lower menu reset
    bt_setText("partName_BufferTube", "-----");
    bt_setText("partPrice_BufferTube", "-----");
}

export function uiData_BufferTube() {
    const v = window.part.bufferTube["001"].products["001"].variants["01"];
    if (v.quantity !== 1) return;
    bt_setText("productPricing_bufferTube001001", v.price + " USD");
    bt_addClass("productHeader_bufferTube001001", "active");
    const title = window.part.bufferTube["001"].products["001"].productTitle;
    const suffix = v.variantTitle.toLowerCase() !== "no variant" ? (" - " + v.variantTitle) : "";
    bt_setText("productName_bufferTube001001", title + suffix);
    // header icon active
    (function(){ const icon = document.querySelector('#productHeader_bufferTube001001 .itemsAccordionTypeA_OpenAccordion_ButtonIcon'); if (icon) icon.classList.add('active'); })();
    // lower menu update
    const lmImg = document.getElementById("partImgID_bufferTube00100101"); if (lmImg) lmImg.style.display = "flex";
    bt_setText("partName_BufferTube", title + suffix);
    bt_setText("partPrice_BufferTube", v.price + " USD");
}

// Start default
{
    const btn = document.getElementById("buttonModalStartMenu_StartButton"); if (btn) btn.addEventListener("click", function(){ uiReset_bufferTube001001(); window.part.bufferTube["001"].products["001"].variants["01"].quantity = 1; uiData_BufferTube(); 
    
    // Update 3D model after UI update
    updateModel_BufferTube();
    });
}

// Selection button
{
    const b = document.getElementById("buttonItems_bufferTube00100101"); if (b) b.addEventListener("click", function(){ uiReset_bufferTube001001(); window.part.bufferTube["001"].products["001"].variants["01"].quantity = 1; uiData_BufferTube(); 
    
    // Update 3D model after UI update
    const itemsID = "bufferTube00100101";
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleBufferTubeSelection(itemsID);
    });
}

export function getSelectedBufferTube(){ const v=window.part.bufferTube["001"].products["001"].variants["01"]; return v.quantity===1?v:null; }
export function getBufferTubeTotalPrice(){ const v=getSelectedBufferTube(); return v? v.price:0; }