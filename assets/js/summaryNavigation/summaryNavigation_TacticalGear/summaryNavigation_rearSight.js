export function initSummaryNavigation_RearSight() {
	const ids = [
		'summaryItemsCard_rearSight_00100101',
		'summaryItemsCard_rearSight_00200101'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuRearSightProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_RearSight);