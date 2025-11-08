// Summary controller for Front Sight (Gear)

function collectVariants_frontSight() {
    const root = window?.part?.frontSight;
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

export function resetSummary_FrontSight() {
    try { document.querySelectorAll('[id^="summaryItems_frontSight"]').forEach(el => { el.style.display = "none"; }); } catch (_) {}
}

export function updateSummary_FrontSight() {
    const variants = collectVariants_frontSight();
    variants.forEach(v => {
        const container = document.getElementById(`summaryItems_${v.id}`);
        if (!container) return;
        if (v.quantity > 0) {
            container.style.display = "";
            const nameEl = document.getElementById(`summaryItemsName_${v.id}`);
            const priceEl = document.getElementById(`summaryItemsPricing_${v.id}`);
            if (nameEl) nameEl.textContent = composeName(v.title, v.variantTitle);
            if (priceEl && v.price !== undefined) priceEl.textContent = formatUsd(v.price);
        }
    });
}

// Override window handlers so core will call these
window.resetSummary_FrontSight = resetSummary_FrontSight;
window.updateSummary_FrontSight = updateSummary_FrontSight;


