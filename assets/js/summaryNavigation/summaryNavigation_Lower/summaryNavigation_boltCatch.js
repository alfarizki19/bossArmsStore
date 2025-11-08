export function initSummaryNavigation_BoltCatch() {
    const el = document.getElementById('summaryItemsCard_boltCatch_00100101');
    if (!el) return;
    el.addEventListener('click', () => {
        if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
        // Align with main controller navigation
        if (typeof navigateToMenu === 'function') navigateToMenu('menuBoltCatchProductMenu');
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_BoltCatch);