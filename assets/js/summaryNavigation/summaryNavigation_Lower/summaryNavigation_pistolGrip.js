export function initSummaryNavigation_PistolGrip() {
    const ids = [
        'summaryItemsCard_pistolGrip_00100101',
        'summaryItemsCard_pistolGrip_00100102',
        'summaryItemsCard_pistolGrip_00100103',
        'summaryItemsCard_pistolGrip_00200101',
        'summaryItemsCard_pistolGrip_00200102',
        'summaryItemsCard_pistolGrip_00200103',
        'summaryItemsCard_pistolGrip_00200104',
        'summaryItemsCard_pistolGrip_00200105',
        'summaryItemsCard_pistolGrip_00200106',
        'summaryItemsCard_pistolGrip_00200107'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuPistolGripProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_PistolGrip);