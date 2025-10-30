export function initSummaryNavigation_Bipod() {
	const ids = [
		'summaryItemsCard_bipod_00100101'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuBipodProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_Bipod);
