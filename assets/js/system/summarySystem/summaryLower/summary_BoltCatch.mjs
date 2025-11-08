// Summary controller for Bolt Catch (Lower)

function collectVariants_boltCatch() {
    const root = window?.part?.boltCatch;
    const items = [];
    if (!root) return items;
    for (const brandKey in root) {
        const brandNode = root[brandKey];
        const products = brandNode?.products || {};
        for (const productKey in products) {
            const productNode = products[productKey];
            const productTitle = productNode?.productTitle || "";
            const variants = productNode?.variants || {};
            for (const vKey in variants) {
                const v = variants[vKey];
                if (!v?.id) continue;
                items.push({ id: v.id, quantity: Number(v.quantity) || 0, title: productTitle, price: Number(v.price) });
            }
        }
    }
    return items;
}

function formatUsd(n) {
    const num = Number(n);
    if (!isFinite(num)) return "";
    return `${num.toFixed(2)} USD`;
}

function composeName(productTitle, variantTitle) {
    const vt = (variantTitle || "").trim();
    if (!vt || vt.toLowerCase() === "no variant") return productTitle || "";
    return `${productTitle || ""} - ${vt}`;
}

export function resetSummary_BoltCatch() {
    try {
        document.querySelectorAll('[id^="summaryItems_boltCatch"]').forEach(el => { el.style.display = "none"; });
    } catch (_) { /* noop */ }
}

export function updateSummary_BoltCatch() {
    const variants = collectVariants_boltCatch();
    variants.forEach(v => {
        const container = document.getElementById(`summaryItems_${v.id}`);
        if (!container) return;
        if (v.quantity > 0) {
            container.style.display = "";
            const nameEl = document.getElementById(`summaryItemsName_${v.id}`);
            const priceEl = document.getElementById(`summaryItemsPricing_${v.id}`);
            if (nameEl && v.title) nameEl.textContent = composeName(v.title, v.variantTitle);
            if (priceEl && v.price !== undefined) priceEl.textContent = formatUsd(v.price);
        }
    });
}

window.resetSummary_BoltCatch = resetSummary_BoltCatch;
window.updateSummary_BoltCatch = updateSummary_BoltCatch;


