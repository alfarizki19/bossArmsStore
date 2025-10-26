// === dataController_BufferAndSpringKit.mjs ===
// Buffer And Spring Kit UI Controller (Lower Category) — single product, single variant

// Import model controller functions
import { updateModel_BufferAndSpringKit, handleBufferAndSpringKitSelection } from '../../modelController/modelController_Lower/modelController_BufferAndSpringKit.mjs';

function bsk_setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function bsk_addClass(id, c) { const el = document.getElementById(id); if (el) el.classList.add(c); }
function bsk_removeClass(id, c) { const el = document.getElementById(id); if (el) el.classList.remove(c); }

export function uiReset_bufferAndSpringKit001001() {
    const product = window.part.bufferAndSpringKit["001"].products["001"]; product.variants["01"].quantity = 0;
    bsk_setText("productName_bufferAndSpringKit001001", product.productTitle);
    bsk_setText("productPricing_bufferAndSpringKit001001", product.variants["01"].price + " USD");
    bsk_removeClass("productHeader_bufferAndSpringKit001001", "active");
    bsk_removeClass("productButtonIcon_bufferAndSpringKit001001", "active");
    // lower menu reset
    bsk_setText("partName_BufferAndSpringKit", "-----");
    bsk_setText("partPrice_BufferAndSpringKit", "-----");
}

export function uiData_BufferAndSpringKit() {
    const v = window.part.bufferAndSpringKit["001"].products["001"].variants["01"]; if (v.quantity !== 1) return;
    bsk_setText("productPricing_bufferAndSpringKit001001", v.price + " USD");
    bsk_addClass("productHeader_bufferAndSpringKit001001", "active");
    bsk_addClass("productButtonIcon_bufferAndSpringKit001001", "active");
    const title = window.part.bufferAndSpringKit["001"].products["001"].productTitle;
    const suffix = v.variantTitle.toLowerCase() !== "no variant" ? (" - " + v.variantTitle) : "";
    bsk_setText("productName_bufferAndSpringKit001001", title + suffix);
    // lower menu update
    const lmImg = document.getElementById("partImgID_bufferAndSpringKit00100101"); if (lmImg) lmImg.style.display = "flex";
    bsk_setText("partName_BufferAndSpringKit", title + suffix);
    bsk_setText("partPrice_BufferAndSpringKit", v.price + " USD");
}

// Start default
{
    const btn = document.getElementById("buttonModalStartMenu_StartButton"); if (btn) btn.addEventListener("click", function(){ uiReset_bufferAndSpringKit001001(); window.part.bufferAndSpringKit["001"].products["001"].variants["01"].quantity = 1; uiData_BufferAndSpringKit(); 
    
    // Update 3D model after UI update
    updateModel_BufferAndSpringKit();
    });
}

// Selection
{
    const b = document.getElementById("buttonItems_bufferAndSpringKit00100101"); if (b) b.addEventListener("click", function(){ uiReset_bufferAndSpringKit001001(); window.part.bufferAndSpringKit["001"].products["001"].variants["01"].quantity = 1; uiData_BufferAndSpringKit(); 
    
    // Update 3D model after UI update
    const itemsID = "bufferAndSpringKit00100101";
    console.log(`🎯 Part button clicked: ${itemsID}`);
    handleBufferAndSpringKitSelection(itemsID);
    });
}

export function getSelectedBufferAndSpringKit(){ const v=window.part.bufferAndSpringKit["001"].products["001"].variants["01"]; return v.quantity===1?v:null; }
export function getBufferAndSpringKitTotalPrice(){ const v=getSelectedBufferAndSpringKit(); return v? v.price:0; }