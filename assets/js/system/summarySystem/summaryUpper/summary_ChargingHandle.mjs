// Summary visibility controller for Charging Handle

function getQuantityById_CH(variantId) {
    const root = window?.part?.chargingHandle;
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

export function resetSummary_ChargingHandle() {
    const ids = [
        "chargingHandle00100101",
        "chargingHandle00100102",
        "chargingHandle00200101",
        "chargingHandle00300101",
        "chargingHandle00300102",
        "chargingHandle00300103",
        "chargingHandle00400101",
        "chargingHandle00400102",
        "chargingHandle00400103",
        "chargingHandle00400104",
        "chargingHandle00400105",
        "chargingHandle00400106",
        "chargingHandle00400107",
        "chargingHandle00400108",
        "chargingHandle00400109",
        "chargingHandle00400110"
    ];
    ids.forEach(id => {
        const el = document.getElementById(`summaryItems_${id}`);
        if (el) el.style.display = "none";
    });
}

function getTitleAndPriceById_CH(variantId) {
    const root = window?.part?.chargingHandle;
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

export function updateSummary_ChargingHandle() {
    const ids = [
        "chargingHandle00100101",
        "chargingHandle00100102",
        "chargingHandle00200101",
        "chargingHandle00300101",
        "chargingHandle00300102",
        "chargingHandle00300103",
        "chargingHandle00400101",
        "chargingHandle00400102",
        "chargingHandle00400103",
        "chargingHandle00400104",
        "chargingHandle00400105",
        "chargingHandle00400106",
        "chargingHandle00400107",
        "chargingHandle00400108",
        "chargingHandle00400109",
        "chargingHandle00400110"
    ];
    ids.forEach(id => {
        const qty = getQuantityById_CH(id);
        if (qty > 0) {
            const el = document.getElementById(`summaryItems_${id}`);
            if (el) el.style.display = "";

            const meta = getTitleAndPriceById_CH(id);
            const nameEl = document.getElementById(`summaryItemsName_${id}`);
            const priceEl = document.getElementById(`summaryItemsPricing_${id}`);
            if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
            if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
        }
    });
}

window.resetSummary_ChargingHandle = resetSummary_ChargingHandle;
window.updateSummary_ChargingHandle = updateSummary_ChargingHandle;