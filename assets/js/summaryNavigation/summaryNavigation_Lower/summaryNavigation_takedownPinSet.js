export function initSummaryNavigation_TakedownPinSet() {
    const ids = [
        'summaryItemsCard_takedownPinSet_00100101',
        'summaryItemsCard_takedownPinSet_00100102',
        'summaryItemsCard_takedownPinSet_00200101',
        'summaryItemsCard_takedownPinSet_00200102',
        'summaryItemsCard_takedownPinSet_00200103',
        'summaryItemsCard_takedownPinSet_00200104',
        'summaryItemsCard_takedownPinSet_00200105',
        'summaryItemsCard_takedownPinSet_00200106',
        'summaryItemsCard_takedownPinSet_00200107',
        'summaryItemsCard_takedownPinSet_00200108',
        'summaryItemsCard_takedownPinSet_00200109',
        'summaryItemsCard_takedownPinSet_00200110',
        'summaryItemsCard_takedownPinSet_00300101'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuTakedownPinSetProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_TakedownPinSet);

