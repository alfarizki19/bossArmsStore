export function initSummaryNavigation_Barrel() {
	const ids = [
		// Exclude barel_00100101 per instruction (not available)
		'summaryItemsCard_barel_00200101'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuBarrelProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_Barrel);
