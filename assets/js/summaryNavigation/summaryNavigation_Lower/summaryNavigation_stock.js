export function initSummaryNavigation_Stock() {
    const ids = [
        'summaryItemsCard_stock_00100101',
        'summaryItemsCard_stock_00100102',
        'summaryItemsCard_stock_00100103',
        'summaryItemsCard_stock_00100104',
        'summaryItemsCard_stock_00100105',
        'summaryItemsCard_stock_00200101',
        'summaryItemsCard_stock_00200102',
        'summaryItemsCard_stock_00200103'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuStockProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_Stock);

