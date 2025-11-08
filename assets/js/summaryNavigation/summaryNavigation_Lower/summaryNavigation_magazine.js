export function initSummaryNavigation_Magazine() {
    const ids = [
        'summaryItemsCard_magazine_00100101',
        'summaryItemsCard_magazine_00200101'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuMagazineProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_Magazine);