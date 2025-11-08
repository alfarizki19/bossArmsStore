// Summary visibility controller for Muzzle Device

function getQuantityById_MD(variantId) {
    const root = window?.part?.muzzleDevice;
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

export function resetSummary_MuzzleDevice() {
    const ids = [
        "muzzleDevice00100101",
        "muzzleDevice00100201",
        "muzzleDevice00100301",
        "muzzleDevice00100302",
        "muzzleDevice00200201",
        "muzzleDevice00200202"
    ];
    ids.forEach(id => {
        const el = document.getElementById(`summaryItems_${id}`);
        if (el) el.style.display = "none";
    });
}

function getTitleAndPriceById_MD(variantId) {
    const root = window?.part?.muzzleDevice;
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
                    return { title: productTitle, price: Number(v.price) };
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

export function updateSummary_MuzzleDevice() {
    const ids = [
        "muzzleDevice00100101",
        "muzzleDevice00100201",
        "muzzleDevice00100301",
        "muzzleDevice00100302",
        "muzzleDevice00200201",
        "muzzleDevice00200202"
    ];
    ids.forEach(id => {
        const qty = getQuantityById_MD(id);
        if (qty > 0) {
            const el = document.getElementById(`summaryItems_${id}`);
            if (el) el.style.display = "";

            const meta = getTitleAndPriceById_MD(id);
            const nameEl = document.getElementById(`summaryItemsName_${id}`);
            const priceEl = document.getElementById(`summaryItemsPricing_${id}`);
            if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
            if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
        }
    });
}

window.resetSummary_MuzzleDevice = resetSummary_MuzzleDevice;
window.updateSummary_MuzzleDevice = updateSummary_MuzzleDevice;


