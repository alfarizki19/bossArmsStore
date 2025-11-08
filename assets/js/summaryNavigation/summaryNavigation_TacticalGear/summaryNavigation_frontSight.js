export function initSummaryNavigation_FrontSight() {
	const ids = [
		'summaryItemsCard_frontSight_00100101',
		'summaryItemsCard_frontSight_00200101'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuFrontSightProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_FrontSight);