export function initSummaryNavigation_Trigger() {
    const ids = [
        'summaryItemsCard_trigger_00100101',
        'summaryItemsCard_trigger_00200101',
        'summaryItemsCard_trigger_00200102',
        'summaryItemsCard_trigger_00200103'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuTriggerProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_Trigger);


