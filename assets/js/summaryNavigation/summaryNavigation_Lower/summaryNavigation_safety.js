export function initSummaryNavigation_Safety() {
    const ids = [
        'summaryItemsCard_safety_00100101',
        'summaryItemsCard_safety_00100102',
        'summaryItemsCard_safety_00100103',
        'summaryItemsCard_safety_00100104',
        'summaryItemsCard_safety_00200101',
        'summaryItemsCard_safety_00200102',
        'summaryItemsCard_safety_00200103',
        'summaryItemsCard_safety_00200104',
        'summaryItemsCard_safety_00200105',
        'summaryItemsCard_safety_00200106',
        'summaryItemsCard_safety_00200107',
        'summaryItemsCard_safety_00200108',
        'summaryItemsCard_safety_00200109',
        'summaryItemsCard_safety_00200110'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuSafetyProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_Safety);

