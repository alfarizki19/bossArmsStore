// === dataController_BoltCatch.mjs ===
// Bolt Catch UI Controller (Lower Category)

function bc_setText(id, text) { const el = document.getElementById(id); if (el) el.textContent = text; }
function bc_addClass(id, c) { const el = document.getElementById(id); if (el) el.classList.add(c); }
function bc_removeClass(id, c) { const el = document.getElementById(id); if (el) el.classList.remove(c); }

export function uiReset_boltCatch001001() {
    // Single product, single variant 01
    const product = window.part.boltCatch["001"].products["001"]; // Extended Bolt Catch
    product.variants["01"].quantity = 0;
    bc_setText("productName_boltCatch001001", product.productTitle);
    bc_setText("productPricing_boltCatch001001", product.variants["01"].price + " USD");
    bc_removeClass("productHeader_boltCatch001001", "active");
    bc_removeClass("productButtonIcon_boltCatch001001", "active");
    // lower part menu
    bc_setText("partName_BoltCatch", "-----");
    bc_setText("partPrice_BoltCatch", "-----");
}

export function uiData_BoltCatch() {
    const product = window.part.boltCatch["001"].products["001"];
    const v = product.variants["01"];
    if (v.quantity !== 1) return;

    // header
    bc_setText("productPricing_boltCatch001001", v.price + " USD");
    bc_addClass("productHeader_boltCatch001001", "active");
    bc_addClass("productButtonIcon_boltCatch001001", "active");

    // product img (only one)
    const pImg = document.getElementById("productImgID_" + v.id);
    if (pImg) pImg.style.display = "flex";

    // lower menu
    const variantSuffix = (v.variantTitle && v.variantTitle.toLowerCase() !== "no variant") ? (" - " + v.variantTitle) : "";
    bc_setText("productName_boltCatch001001", product.productTitle + variantSuffix);
    bc_setText("partName_BoltCatch", product.productTitle + variantSuffix);
    bc_setText("partPrice_BoltCatch", v.price + " USD");
}

// Start default
{
    const btn = document.getElementById("buttonModalStartMenu_StartButton");
    if (btn) {
        btn.addEventListener("click", function () {
            uiReset_boltCatch001001();
            window.part.boltCatch["001"].products["001"].variants["01"].quantity = 1;
            uiData_BoltCatch();
        });
    }
}

// Selection
{
    const b = document.getElementById("buttonItems_boltCatch00100101");
    if (b) b.addEventListener("click", function () {
        uiReset_boltCatch001001();
        window.part.boltCatch["001"].products["001"].variants["01"].quantity = 1;
        uiData_BoltCatch();
    });
}

export function getSelectedBoltCatch() { const v = window.part.boltCatch["001"].products["001"].variants["01"]; return v.quantity === 1 ? v : null; }
export function getBoltCatchTotalPrice() { const v = getSelectedBoltCatch(); return v ? v.price : 0; }


