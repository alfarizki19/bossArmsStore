export function initSummaryNavigation_BufferAndSpringKit() {
    const el = document.getElementById('summaryItemsCard_bufferAndSpringKit_00100101');
    if (!el) return;
    el.addEventListener('click', () => {
        if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
        if (typeof navigateToMenu === 'function') navigateToMenu('menuBufferAndSpringKitProductMenu');
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_BufferAndSpringKit);


