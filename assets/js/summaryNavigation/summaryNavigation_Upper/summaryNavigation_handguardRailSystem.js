export function initSummaryNavigation_HandguardRailSystem() {
	const ids = [
		'summaryItemsCard_handguardRailSystem_00100101',
		'summaryItemsCard_handguardRailSystem_00100102',
		'summaryItemsCard_handguardRailSystem_00200101',
		'summaryItemsCard_handguardRailSystem_00200102'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuHandguardRailSystemProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_HandguardRailSystem);
