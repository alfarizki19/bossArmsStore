export function initSummaryNavigation_TriggerGuard() {
    const ids = [
        'summaryItemsCard_triggerGuard_00100101',
        'summaryItemsCard_triggerGuard_00100102',
        'summaryItemsCard_triggerGuard_00100103',
        'summaryItemsCard_triggerGuard_00100104',
        'summaryItemsCard_triggerGuard_00100105',
        'summaryItemsCard_triggerGuard_00100106',
        'summaryItemsCard_triggerGuard_00100107',
        'summaryItemsCard_triggerGuard_00200101',
        'summaryItemsCard_triggerGuard_00200102',
        'summaryItemsCard_triggerGuard_00200103',
        'summaryItemsCard_triggerGuard_00200104',
        'summaryItemsCard_triggerGuard_00200105',
        'summaryItemsCard_triggerGuard_00200106',
        'summaryItemsCard_triggerGuard_00200107',
        'summaryItemsCard_triggerGuard_00200108',
        'summaryItemsCard_triggerGuard_00200109',
        'summaryItemsCard_triggerGuard_00200110'
    ];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuTriggerGuardProductMenu');
        });
    });
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_TriggerGuard);


