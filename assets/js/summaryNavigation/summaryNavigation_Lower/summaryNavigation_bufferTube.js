export function initSummaryNavigation_BufferTube() {
    const el = document.getElementById('summaryItemsCard_bufferTube_00100101');
    if (!el) return;
    el.addEventListener('click', () => {
        if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
        if (typeof navigateToMenu === 'function') navigateToMenu('menuBufferTubeProductMenu');
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_BufferTube);


