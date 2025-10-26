// Render Handguard summary items based on inventory quantities
// Only display product title and price (no brand)

function getHandguardVariantsFromInventory() {
    const results = [];
    const inventoryRoot = window?.part?.handguardRailSystem;
    if (!inventoryRoot || typeof inventoryRoot !== "object") {
        return results;
    }

    Object.values(inventoryRoot).forEach(brandNode => {
        if (!brandNode?.products) return;
        Object.values(brandNode.products).forEach(productNode => {
            const productTitle = productNode?.productTitle || "";
            const variants = productNode?.variants || {};
            Object.values(variants).forEach(variantNode => {
                if (!variantNode) return;
                results.push({
                    id: variantNode.id, // e.g., handguardRailSystem00100101
                    productTitle,
                    price: typeof variantNode.price === "number" ? variantNode.price : Number(variantNode.price),
                    quantity: typeof variantNode.quantity === "number" ? variantNode.quantity : Number(variantNode.quantity)
                });
            });
        });
    });

    return results;
}

export function renderHandguardSummary() {
    const variants = getHandguardVariantsFromInventory();

    // Hide all containers by default to avoid showing placeholders for non-existent IDs
    try {
        const allContainers = document.querySelectorAll('[id^="summaryItems_handguardRailSystem"]');
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
window.renderHandguardSummary = renderHandguardSummary;

