// Summary visibility controller for Forward Assist

function getQuantityById_FA(variantId) {
    const root = window?.part?.forwardAssist;
    if (!root) return 0;
    for (const brandKey in root) {
        const brandNode = root[brandKey];
        const products = brandNode?.products || {};
        for (const productKey in products) {
            const variants = products[productKey]?.variants || {};
            for (const vKey in variants) {
                const v = variants[vKey];
                if (v?.id === variantId) return Number(v.quantity) || 0;
            }
        }
    }
    return 0;
}

export function resetSummary_ForwardAssists() {
    const ids = [
        "forwardAssists00100101",
        "forwardAssists00100102"
    ];
    ids.forEach(id => {
        const el = document.getElementById(`summaryItems_${id}`);
        if (el) el.style.display = "none";
    });
}

function getTitleAndPriceById_FA(variantId) {
    const root = window?.part?.forwardAssist;
    if (!root) return { title: "", price: undefined, variantTitle: "" };
    for (const brandKey in root) {
        const brandNode = root[brandKey];
        const products = brandNode?.products || {};
        for (const productKey in products) {
            const productNode = products[productKey];
            const productTitle = productNode?.productTitle || "";
            const variants = productNode?.variants || {};
            for (const vKey in variants) {
                const v = variants[vKey];
                if (v?.id === variantId) {
                    return { 
                        title: productTitle, 
                        price: Number(v.price),
                        variantTitle: v?.variantTitle || ""
                    };
                }
            }
        }
    }
    return { title: "", price: undefined, variantTitle: "" };
}

function formatUsd(amount) {
    const n = Number(amount);
    if (!isFinite(n)) return "";
    return `${n.toFixed(2)} USD`;
}

function composeName(productTitle, variantTitle) {
    const vt = (variantTitle || "").trim();
    if (!vt || vt.toLowerCase() === "no variant") return productTitle || "";
    return `${productTitle || ""} - ${vt}`;
}

export function updateSummary_ForwardAssists() {
    const ids = [
        "forwardAssists00100101",
        "forwardAssists00100102"
    ];
    ids.forEach(id => {
        const qty = getQuantityById_FA(id);
        if (qty > 0) {
            const el = document.getElementById(`summaryItems_${id}`);
            if (el) el.style.display = "";

            const meta = getTitleAndPriceById_FA(id);
            const nameEl = document.getElementById(`summaryItemsName_${id}`);
            const priceEl = document.getElementById(`summaryItemsPricing_${id}`);
            if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
            if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
        }
    });
}

window.resetSummary_ForwardAssists = resetSummary_ForwardAssists;
window.updateSummary_ForwardAssists = updateSummary_ForwardAssists;