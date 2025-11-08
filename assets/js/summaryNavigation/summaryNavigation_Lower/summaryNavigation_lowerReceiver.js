export function initSummaryNavigation_LowerReceiver() {
    const ids = [
        'summaryItemsCard_lowerReceiver_00100101',
        'summaryItemsCard_lowerReceiver_00100102'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuLowerReceiverProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_LowerReceiver);


