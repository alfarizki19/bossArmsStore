export function initSummaryNavigation_MagazineRelease() {
    const ids = [
        'summaryItemsCard_magazineRelease_00100101',
        'summaryItemsCard_magazineRelease_00100102',
        'summaryItemsCard_magazineRelease_00100103',
        'summaryItemsCard_magazineRelease_00200101',
        'summaryItemsCard_magazineRelease_00200102',
        'summaryItemsCard_magazineRelease_00200103',
        'summaryItemsCard_magazineRelease_00200104',
        'summaryItemsCard_magazineRelease_00200105',
        'summaryItemsCard_magazineRelease_00200106',
        'summaryItemsCard_magazineRelease_00200107',
        'summaryItemsCard_magazineRelease_00200108',
        'summaryItemsCard_magazineRelease_00200109',
        'summaryItemsCard_magazineRelease_00200110'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuMagazineReleaseProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_MagazineRelease);