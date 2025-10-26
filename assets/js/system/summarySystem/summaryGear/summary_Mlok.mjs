// Summary controller for MLOK/Keymod Rail (Gear)

function collectVariants_mlok() {
    const root = window?.part?.mlokAndKeymodRail;
    const items = [];
    if (!root) return items;
    for (const brandKey in root) {
        const products = root[brandKey]?.products || {};
        for (const productKey in products) {
            const productNode = products[productKey];
            const productTitle = productNode?.productTitle || "";
            const variants = productNode?.variants || {};
            for (const vKey in variants) {
                const v = variants[vKey];
                if (!v?.id) continue;
                items.push({ id: v.id, quantity: Number(v.quantity) || 0, title: productTitle, variantTitle: v.variantTitle || "", price: Number(v.price) });
            }
        }
    }
    return items;
}

function formatUsd(n) { const num = Number(n); return isFinite(num) ? `${num.toFixed(2)} USD` : ""; }

function composeName(productTitle, variantTitle) {
    const vt = (variantTitle || "").trim();
    if (!vt || vt.toLowerCase() === "no variant") return productTitle || "";
    return `${productTitle || ""} - ${vt}`;
}

export function resetSummary_Mlok() {
    try {
        document.querySelectorAll('[id^="summaryItems_mlokAndKeymodRail"]').forEach(el => { el.style.display = "none"; });
        document.querySelectorAll('[id^="summaryItems_mlokAndKeymodRail"][id$="_ForBipod"]').forEach(el => { el.style.display = "none"; });
    } catch (_) {}
}

export function updateSummary_Mlok() {
    const variants = collectVariants_mlok();
    const mode = (typeof window !== 'undefined' && window.__mlokSummaryMode) ? window.__mlokSummaryMode : 'normal';
    variants.forEach(v => {
        const idNormal = v.id;
        const idBipod = `${v.id}_ForBipod`;
        const normalEl = document.getElementById(`summaryItems_${idNormal}`);
        const bipodEl = document.getElementById(`summaryItems_${idBipod}`);
        const shouldShow = v.quantity > 0;
        // hide both by default (in case reset was not called)
        if (normalEl) normalEl.style.display = "none";
        if (bipodEl) bipodEl.style.display = "none";
        if (!shouldShow) return;
        if (mode === 'forBipod') {
            if (bipodEl) {
                bipodEl.style.display = "";
                const nameEl = document.getElementById(`summaryItemsName_${idBipod}`);
                const priceEl = document.getElementById(`summaryItemsPricing_${idBipod}`);
                if (nameEl) nameEl.textContent = composeName(v.title, v.variantTitle) + ' For Bipod';
                if (priceEl && v.price !== undefined) priceEl.textContent = formatUsd(v.price);
            }
        } else {
            if (normalEl) {
                normalEl.style.display = "";
                const nameEl = document.getElementById(`summaryItemsName_${idNormal}`);
                const priceEl = document.getElementById(`summaryItemsPricing_${idNormal}`);
                if (nameEl) nameEl.textContent = composeName(v.title, v.variantTitle);
                if (priceEl && v.price !== undefined) priceEl.textContent = formatUsd(v.price);
            }
        }
    });
}

window.resetSummary_Mlok = resetSummary_Mlok;
window.updateSummary_Mlok = updateSummary_Mlok;