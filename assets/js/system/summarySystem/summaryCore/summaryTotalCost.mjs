// Total cost calculator: sums quantity * price from window.part across all categories

function formatUsd(n) {
    const num = Number(n);
    if (!isFinite(num)) return "0.00 USD";
    return `${num.toFixed(2)} USD`;
}

function collectAllVariants() {
    const items = [];
    const root = window?.part;
    if (!root || typeof root !== "object") return items;

    Object.values(root).forEach(categoryNode => {
        if (!categoryNode || typeof categoryNode !== "object") return;
        Object.values(categoryNode).forEach(brandNode => {
            const products = brandNode?.products || {};
            Object.values(products).forEach(productNode => {
                const productTitle = productNode?.productTitle || "";
                const variants = productNode?.variants || {};
                Object.values(variants).forEach(v => {
                    if (!v?.id) return;
                    items.push({
                        id: v.id,
                        productTitle,
                        variantTitle: v.variantTitle || "",
                        price: Number(v.price) || 0,
                        quantity: Number(v.quantity) || 0
                    });
                });
            });
        });
    });
    return items;
}

export function computeTotalsFromInventory() {
    const items = collectAllVariants();
    let subtotal = 0;
    let totalQuantity = 0;

    items.forEach(item => {
        if (item.quantity > 0 && item.price > 0) {
            subtotal += item.quantity * item.price;
            totalQuantity += item.quantity;
        }
    });

    const result = { subtotal, totalQuantity, items };
    window.summaryTotals = result; // for debugging/inspection
    return result;
}

export function renderTotals() {
    const totals = computeTotalsFromInventory();
    const formatted = formatUsd(totals.subtotal);

    const elA = document.getElementById("summaryTextTotalBelanja");
    if (elA) elA.textContent = formatted;

    const elB = document.getElementById("modalSummaryTotalBelanja");
    if (elB) elB.textContent = formatted;
}

function resetTotalsDisplay() {
    const elA = document.getElementById("summaryTextTotalBelanja");
    if (elA) elA.textContent = "0 USD";
    const elB = document.getElementById("modalSummaryTotalBelanja");
    if (elB) elB.textContent = "0 USD";
}

// Attach triggers: summaryChartButton and any button with id starting with "buttonItems_"
function attachTotalCostTriggers() {
    try {
        const btn = document.getElementById("summaryChartButton");
        if (btn) btn.addEventListener("click", () => { try { resetTotalsDisplay(); requestAnimationFrame(() => renderTotals()); } catch (_) {} });
        const startBtn = document.getElementById("buttonModalStartMenu_StartButton");
        if (startBtn) startBtn.addEventListener("click", () => { try { resetTotalsDisplay(); requestAnimationFrame(() => renderTotals()); } catch (_) {} });
    } catch (_) {}

    // Delegate clicks on item buttons (support clicks on child elements)
    document.addEventListener("click", (ev) => {
        try {
            const t = ev.target;
            if (!(t instanceof Element)) return;
            const triggerEl = t.closest('[id^="buttonItems_"]');
            if (triggerEl) {
                resetTotalsDisplay();
                requestAnimationFrame(() => renderTotals());
            }
        } catch (_) {}
    }, true);

    // Also handle keyboard activation (Enter/Space) on item buttons
    document.addEventListener("keydown", (ev) => {
        try {
            if (ev.key !== "Enter" && ev.key !== " ") return;
            const t = ev.target;
            if (!(t instanceof Element)) return;
            if (t.id && typeof t.id === "string" && t.id.startsWith("buttonItems_")) {
                renderTotals();
            }
        } catch (_) {}
    }, true);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        attachTotalCostTriggers();
        try { renderTotals(); } catch (_) {}
    });
} else {
    attachTotalCostTriggers();
    try { renderTotals(); } catch (_) {}
}

// Expose to window for manual triggering
window.renderTotals = renderTotals;
window.computeTotalsFromInventory = computeTotalsFromInventory;