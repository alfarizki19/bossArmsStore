export function initSummaryNavigation_EndPlate() {
    const ids = [
        'summaryItemsCard_endPlate_00100101',
        'summaryItemsCard_endPlate_00100102',
        'summaryItemsCard_endPlate_00100103',
        'summaryItemsCard_endPlate_00100104',
        'summaryItemsCard_endPlate_00100105',
        'summaryItemsCard_endPlate_00100106',
        'summaryItemsCard_endPlate_00100107',
        'summaryItemsCard_endPlate_00200101',
        'summaryItemsCard_endPlate_00200102',
        'summaryItemsCard_endPlate_00200103',
        'summaryItemsCard_endPlate_00200104',
        'summaryItemsCard_endPlate_00200105',
        'summaryItemsCard_endPlate_00200106',
        'summaryItemsCard_endPlate_00200107',
        'summaryItemsCard_endPlate_00200108',
        'summaryItemsCard_endPlate_00200109',
        'summaryItemsCard_endPlate_00200110'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuEndPlateProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_EndPlate);