// Core summary trigger: responds to #summaryChartButton
// Reads quantities directly from system/itemsInventory window.part.* objects

function collectVariants(inventoryRoot) {
    const list = [];
    if (!inventoryRoot || typeof inventoryRoot !== "object") return list;
    Object.values(inventoryRoot).forEach(brandNode => {
        if (!brandNode?.products) return;
        Object.values(brandNode.products).forEach(productNode => {
            const variants = productNode?.variants || {};
            Object.values(variants).forEach(variantNode => {
                if (!variantNode?.id) return;
                list.push({ id: variantNode.id, quantity: Number(variantNode.quantity) || 0 });
            });
        });
    });
    return list;
}

function toggleSummaryContainersByVariants(prefix, variants) {
    try {
        const all = document.querySelectorAll(`[id^="summaryItems_${prefix}"]`);
        all.forEach(el => { el.style.display = "none"; });
    } catch (_) { /* noop */ }

    variants.forEach(v => {
        const containerEl = document.getElementById(`summaryItems_${v.id}`);
        if (!containerEl) return;
        containerEl.style.display = v.quantity > 0 ? "" : "none";
    });
}

export function renderSummaryAll() {
    // Handguard Upper
    const handguardVariants = collectVariants(window?.part?.handguardRailSystem);
    toggleSummaryContainersByVariants("handguardRailSystem", handguardVariants);

    // Front Sight Gear & Acc
    const frontSightVariants = collectVariants(window?.part?.frontSight);
    toggleSummaryContainersByVariants("frontSight", frontSightVariants);
}

// ===== Simple explicit logic (reset + update) =====
function getVariantQuantityById(inventoryRoot, variantId) {
    if (!inventoryRoot) return 0;
    for (const brandKey in inventoryRoot) {
        const brandNode = inventoryRoot[brandKey];
        if (!brandNode?.products) continue;
        for (const productKey in brandNode.products) {
            const productNode = brandNode.products[productKey];
            const variants = productNode?.variants || {};
            for (const variantKey in variants) {
                const v = variants[variantKey];
                if (v?.id === variantId) return Number(v.quantity) || 0;
            }
        }
    }
    return 0;
}

function resetSummary_Handguard() {
    const ids = [
        "handguardRailSystem00100101",
        "handguardRailSystem00100102",
        "handguardRailSystem00100201",
        "handguardRailSystem00100202"
    ];
    ids.forEach(id => {
        const el = document.getElementById(`summaryItems_${id}`);
        if (el) el.style.display = "none";
    });
}

function updateSummary_Handguard() {
    const root = window?.part?.handguardRailSystem;

    const q_00100101 = getVariantQuantityById(root, "handguardRailSystem00100101");
    const q_00100102 = getVariantQuantityById(root, "handguardRailSystem00100102");
    const q_00100201 = getVariantQuantityById(root, "handguardRailSystem00100201");
    const q_00100202 = getVariantQuantityById(root, "handguardRailSystem00100202");

    if (q_00100101 > 0) {
        const el = document.getElementById("summaryItems_handguardRailSystem00100101");
        if (el) el.style.display = "";
        const meta = getTitlePriceVariantById(root, "handguardRailSystem00100101");
        const nameEl = document.getElementById("summaryItemsName_handguardRailSystem00100101");
        const priceEl = document.getElementById("summaryItemsPricing_handguardRailSystem00100101");
        if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
        if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
    }
    if (q_00100102 > 0) {
        const el = document.getElementById("summaryItems_handguardRailSystem00100102");
        if (el) el.style.display = "";
        const meta = getTitlePriceVariantById(root, "handguardRailSystem00100102");
        const nameEl = document.getElementById("summaryItemsName_handguardRailSystem00100102");
        const priceEl = document.getElementById("summaryItemsPricing_handguardRailSystem00100102");
        if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
        if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
    }
    if (q_00100201 > 0) {
        const el = document.getElementById("summaryItems_handguardRailSystem00100201");
        if (el) el.style.display = "";
        const meta = getTitlePriceVariantById(root, "handguardRailSystem00100201");
        const nameEl = document.getElementById("summaryItemsName_handguardRailSystem00100201");
        const priceEl = document.getElementById("summaryItemsPricing_handguardRailSystem00100201");
        if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
        if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
    }
    if (q_00100202 > 0) {
        const el = document.getElementById("summaryItems_handguardRailSystem00100202");
        if (el) el.style.display = "";
        const meta = getTitlePriceVariantById(root, "handguardRailSystem00100202");
        const nameEl = document.getElementById("summaryItemsName_handguardRailSystem00100202");
        const priceEl = document.getElementById("summaryItemsPricing_handguardRailSystem00100202");
        if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
        if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
    }
}

function getTitlePriceVariantById(inventoryRoot, variantId) {
    if (!inventoryRoot) return { title: "", price: undefined };
    for (const brandKey in inventoryRoot) {
        const brandNode = inventoryRoot[brandKey];
        if (!brandNode?.products) continue;
        for (const productKey in brandNode.products) {
            const productNode = brandNode.products[productKey];
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

// Generic name/price updater for all categories present in window.part
function updateAllSummaryNamesAndPrices() {
    if (!window.part) return;
    Object.values(window.part).forEach(categoryNode => {
        if (!categoryNode || typeof categoryNode !== "object") return;
        Object.values(categoryNode).forEach(brandNode => {
            const products = brandNode?.products || {};
            Object.values(products).forEach(productNode => {
                const productTitle = productNode?.productTitle || "";
                const variants = productNode?.variants || {};
                Object.values(variants).forEach(v => {
                    if (!v?.id) return;
                    const nameEl = document.getElementById(`summaryItemsName_${v.id}`);
                    const priceEl = document.getElementById(`summaryItemsPricing_${v.id}`);
                    if (nameEl) nameEl.textContent = composeName(productTitle, v.variantTitle);
                    if (priceEl && v.price !== undefined) priceEl.textContent = formatUsd(v.price);
                });
            });
        });
    });
}

function resetSummary_FrontSight() {
    const ids = [
        "frontSight00100101",
        "frontSight00200101"
    ];
    ids.forEach(id => {
        const el = document.getElementById(`summaryItems_${id}`);
        if (el) el.style.display = "none";
    });
}

function updateSummary_FrontSight() {
    const root = window?.part?.frontSight;
    const q_00100101 = getVariantQuantityById(root, "frontSight00100101");
    const q_00200101 = getVariantQuantityById(root, "frontSight00200101");

    if (q_00100101 > 0) {
        const el = document.getElementById("summaryItems_frontSight00100101");
        if (el) el.style.display = "";
        const meta = getTitlePriceVariantById(root, "frontSight00100101");
        const nameEl = document.getElementById("summaryItemsName_frontSight00100101");
        const priceEl = document.getElementById("summaryItemsPricing_frontSight00100101");
        if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
        if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
    }
    if (q_00200101 > 0) {
        const el = document.getElementById("summaryItems_frontSight00200101");
        if (el) el.style.display = "";
        const meta = getTitlePriceVariantById(root, "frontSight00200101");
        const nameEl = document.getElementById("summaryItemsName_frontSight00200101");
        const priceEl = document.getElementById("summaryItemsPricing_frontSight00200101");
        if (nameEl && meta.title) nameEl.textContent = composeName(meta.title, meta.variantTitle);
        if (priceEl && meta.price !== undefined) priceEl.textContent = formatUsd(meta.price);
    }
}

// Expose simple functions (optional)
window.resetSummary_Handguard = resetSummary_Handguard;
window.updateSummary_Handguard = updateSummary_Handguard;
window.resetSummary_FrontSight = resetSummary_FrontSight;
window.updateSummary_FrontSight = updateSummary_FrontSight;

// Attach to summaryChartButton
function attachSummaryTrigger() {
    const btn = document.getElementById("summaryChartButton");
    if (!btn) return;
    btn.addEventListener("click", () => {
        try {
            // Simple explicit sequence per your spec
            resetSummary_Handguard();
            updateSummary_Handguard();
            resetSummary_FrontSight();
            updateSummary_FrontSight();
            // Upper parts
            if (typeof window.resetSummary_Barel === "function") window.resetSummary_Barel();
            if (typeof window.updateSummary_Barel === "function") window.updateSummary_Barel();
            if (typeof window.resetSummary_BoltCarrierGroup === "function") window.resetSummary_BoltCarrierGroup();
            if (typeof window.updateSummary_BoltCarrierGroup === "function") window.updateSummary_BoltCarrierGroup();
            if (typeof window.resetSummary_ChargingHandle === "function") window.resetSummary_ChargingHandle();
            if (typeof window.updateSummary_ChargingHandle === "function") window.updateSummary_ChargingHandle();
            if (typeof window.resetSummary_EjectionPortCover === "function") window.resetSummary_EjectionPortCover();
            if (typeof window.updateSummary_EjectionPortCover === "function") window.updateSummary_EjectionPortCover();
            if (typeof window.resetSummary_ForwardAssists === "function") window.resetSummary_ForwardAssists();
            if (typeof window.updateSummary_ForwardAssists === "function") window.updateSummary_ForwardAssists();
            if (typeof window.resetSummary_MuzzleDevice === "function") window.resetSummary_MuzzleDevice();
            if (typeof window.updateSummary_MuzzleDevice === "function") window.updateSummary_MuzzleDevice();
            if (typeof window.resetSummary_UpperReceiver === "function") window.resetSummary_UpperReceiver();
            if (typeof window.updateSummary_UpperReceiver === "function") window.updateSummary_UpperReceiver();
            // Lower parts
            if (typeof window.resetSummary_BoltCatch === "function") window.resetSummary_BoltCatch();
            if (typeof window.updateSummary_BoltCatch === "function") window.updateSummary_BoltCatch();
            if (typeof window.resetSummary_BufferAndSpringKit === "function") window.resetSummary_BufferAndSpringKit();
            if (typeof window.updateSummary_BufferAndSpringKit === "function") window.updateSummary_BufferAndSpringKit();
            if (typeof window.resetSummary_BufferTube === "function") window.resetSummary_BufferTube();
            if (typeof window.updateSummary_BufferTube === "function") window.updateSummary_BufferTube();
            if (typeof window.resetSummary_EndPlate === "function") window.resetSummary_EndPlate();
            if (typeof window.updateSummary_EndPlate === "function") window.updateSummary_EndPlate();
            if (typeof window.resetSummary_LowerReceiver === "function") window.resetSummary_LowerReceiver();
            if (typeof window.updateSummary_LowerReceiver === "function") window.updateSummary_LowerReceiver();
            if (typeof window.resetSummary_Magazine === "function") window.resetSummary_Magazine();
            if (typeof window.updateSummary_Magazine === "function") window.updateSummary_Magazine();
            if (typeof window.resetSummary_MagazineRelease === "function") window.resetSummary_MagazineRelease();
            if (typeof window.updateSummary_MagazineRelease === "function") window.updateSummary_MagazineRelease();
            if (typeof window.resetSummary_PistolGrip === "function") window.resetSummary_PistolGrip();
            if (typeof window.updateSummary_PistolGrip === "function") window.updateSummary_PistolGrip();
            if (typeof window.resetSummary_Safety === "function") window.resetSummary_Safety();
            if (typeof window.updateSummary_Safety === "function") window.updateSummary_Safety();
            if (typeof window.resetSummary_Stock === "function") window.resetSummary_Stock();
            if (typeof window.updateSummary_Stock === "function") window.updateSummary_Stock();
            if (typeof window.resetSummary_TakedownPinSet === "function") window.resetSummary_TakedownPinSet();
            if (typeof window.updateSummary_TakedownPinSet === "function") window.updateSummary_TakedownPinSet();
            if (typeof window.resetSummary_Trigger === "function") window.resetSummary_Trigger();
            if (typeof window.updateSummary_Trigger === "function") window.updateSummary_Trigger();
            if (typeof window.resetSummary_TriggerGuard === "function") window.resetSummary_TriggerGuard();
            if (typeof window.updateSummary_TriggerGuard === "function") window.updateSummary_TriggerGuard();
            // Gear & Accessories
            if (typeof window.resetSummary_Bipod === "function") window.resetSummary_Bipod();
            if (typeof window.updateSummary_Bipod === "function") window.updateSummary_Bipod();
            if (typeof window.resetSummary_LaserSight === "function") window.resetSummary_LaserSight();
            if (typeof window.updateSummary_LaserSight === "function") window.updateSummary_LaserSight();
            if (typeof window.resetSummary_Mlok === "function") window.resetSummary_Mlok();
            if (typeof window.updateSummary_Mlok === "function") window.updateSummary_Mlok();
            if (typeof window.resetSummary_OpticSight === "function") window.resetSummary_OpticSight();
            if (typeof window.updateSummary_OpticSight === "function") window.updateSummary_OpticSight();
            if (typeof window.resetSummary_RearSight === "function") window.resetSummary_RearSight();
            if (typeof window.updateSummary_RearSight === "function") window.updateSummary_RearSight();
            // Ensure names and prices (with variant) are populated across all parts
            updateAllSummaryNamesAndPrices();
            // Or use the generic approach:
            // renderSummaryAll();
        } catch (e) {
            console.warn("summary update failed", e);
        }
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", attachSummaryTrigger);
} else {
    attachSummaryTrigger();
}

// Expose to window for manual invocation if needed
window.renderSummaryAll = renderSummaryAll;