// Summary visibility controller for Bolt Carrier Group

function getQuantityById_BCG(variantId) {
    const root = window?.part?.boltCarrierGroup;
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

function getTitleAndPriceById_BCG(variantId) {
    const root = window?.part?.boltCarrierGroup;
    if (!root) return { title: "", price: undefined };
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
                    return { title: productTitle, variantTitle: v.variantTitle || "", price: Number(v.price) };
                }
            }
        }
    }
    return { title: "", price: undefined };
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

export function resetSummary_BoltCarrierGroup() {
    const ids = [
        "boltCarrierGroup00100101",
        "boltCarrierGroup00200101",
        "boltCarrierGroup00200201"
    ];
    ids.forEach(id => {
        const el = document.getElementById(`summaryItems_${id}`);
        if (el) el.style.display = "none";
    });
}

export function updateSummary_BoltCarrierGroup() {
    const ids = [
        "boltCarrierGroup00100101",
        "boltCarrierGroup00200101",
        "boltCarrierGroup00200201"
    ];
    ids.forEach(id => {
        const qty = getQuantityById_BCG(id);
        if (qty > 0) {
            const el = document.getElementById(`summaryItems_${id}`);
            if (el) el.style.display = ""; // let CSS classes define the display (flex/grid)

            // Update name and price fields
            const { title, variantTitle, price } = getTitleAndPriceById_BCG(id);
            const nameEl = document.getElementById(`summaryItemsName_${id}`);
            const priceEl = document.getElementById(`summaryItemsPricing_${id}`);
            if (nameEl && title) nameEl.textContent = composeName(title, variantTitle);
            if (priceEl && price !== undefined) priceEl.textContent = formatUsd(price);
        }
    });
}

window.resetSummary_BoltCarrierGroup = resetSummary_BoltCarrierGroup;
window.updateSummary_BoltCarrierGroup = updateSummary_BoltCarrierGroup;