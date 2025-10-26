// Summary System for Barrel (Upper)

function getBarrelVariantsFromInventory() {
    const root = window?.part?.barrel;
    const results = [];
    if (!root) return results;
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
                results.push({ id: v.id, quantity: Number(v.quantity) || 0, title: productTitle, price: Number(v.price) });
            }
        }
    }
    return results;
}

export function renderBarrelSummary() {
    const variants = getBarrelVariantsFromInventory();

    // Hide all containers by default to avoid showing placeholders for non-existent IDs
    try {
        const allContainers = document.querySelectorAll('[id^="summaryItems_barrel"]');
        allContainers.forEach(el => { el.style.display = "none"; });
    } catch (_) { /* noop */ }

    variants.forEach(variant => {
        const containerId = `summaryItems_${variant.id}`;

        const containerEl = document.getElementById(containerId);
        if (!containerEl) return; // Skip elements not defined in template

        const show = variant.quantity > 0;
        containerEl.style.display = show ? "" : "none";
    });
}

// Expose to window only (core will trigger this)
window.renderBarrelSummary = renderBarrelSummary;