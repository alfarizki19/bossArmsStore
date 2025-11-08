// Total cost calculator: sums quantity * price from window.part across all categories

console.log("📦 Loading summaryTotalCost.mjs...");

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
    // Format with $ prefix for new UI
    const formattedWithDollar = "$" + totals.subtotal.toFixed(2);

    console.log("💰 Rendering totals:", totals.subtotal, formattedWithDollar);

    // Old IDs (if exist)
    const elA = document.getElementById("summaryTextTotalBelanja");
    if (elA) elA.textContent = formatted;

    const elB = document.getElementById("modalSummaryTotalBelanja");
    if (elB) elB.textContent = formatted;

    // New IDs
    const elC = document.getElementById("summaryTotalPrice");
    if (elC) {
        elC.textContent = formattedWithDollar;
        console.log("✅ Updated summaryTotalPrice:", formattedWithDollar);
    } else {
        console.warn("⚠️ summaryTotalPrice element not found");
    }

    const elD = document.getElementById("summarySideMenuTotalPrice");
    if (elD) {
        elD.textContent = formattedWithDollar;
        console.log("✅ Updated summarySideMenuTotalPrice:", formattedWithDollar);
    } else {
        console.warn("⚠️ summarySideMenuTotalPrice element not found");
    }
}

function resetTotalsDisplay() {
    const elA = document.getElementById("summaryTextTotalBelanja");
    if (elA) elA.textContent = "0 USD";
    const elB = document.getElementById("modalSummaryTotalBelanja");
    if (elB) elB.textContent = "0 USD";
    
    // New IDs
    const elC = document.getElementById("summaryTotalPrice");
    if (elC) elC.textContent = "$0.00";
    const elD = document.getElementById("summarySideMenuTotalPrice");
    if (elD) elD.textContent = "$0.00";
}

// Attach triggers: summaryChartButton, loader-start-button, and product card clicks
function attachTotalCostTriggers() {
    try {
        const btn = document.getElementById("summaryChartButton");
        if (btn) btn.addEventListener("click", () => { try { resetTotalsDisplay(); requestAnimationFrame(() => renderTotals()); } catch (_) {} });
        
        // Old start button
        const startBtn = document.getElementById("buttonModalStartMenu_StartButton");
        if (startBtn) startBtn.addEventListener("click", () => { try { resetTotalsDisplay(); requestAnimationFrame(() => renderTotals()); } catch (_) {} });
        
        // New start button (loader-start-button)
        const loaderStartBtn = document.getElementById("loader-start-button");
        if (loaderStartBtn) loaderStartBtn.addEventListener("click", () => { 
            try { 
                resetTotalsDisplay(); 
                requestAnimationFrame(() => renderTotals()); 
            } catch (_) {} 
        });
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
            
            // Also handle product card clicks (new UI)
            const productCard = t.closest('[id^="productCard_"]');
            if (productCard) {
                // Small delay to allow quantity to be updated first
                setTimeout(() => {
                    resetTotalsDisplay();
                    requestAnimationFrame(() => renderTotals());
                }, 50);
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
        console.log("✅ summaryTotalCost: DOM ready, attaching triggers");
        attachTotalCostTriggers();
        try { renderTotals(); } catch (e) { console.error("❌ Error rendering totals:", e); }
    });
} else {
    console.log("✅ summaryTotalCost: DOM already ready, attaching triggers");
    attachTotalCostTriggers();
    try { renderTotals(); } catch (e) { console.error("❌ Error rendering totals:", e); }
}

console.log("✅ summaryTotalCost.mjs loaded");

// Expose to window for manual triggering
window.renderTotals = renderTotals;
window.computeTotalsFromInventory = computeTotalsFromInventory;