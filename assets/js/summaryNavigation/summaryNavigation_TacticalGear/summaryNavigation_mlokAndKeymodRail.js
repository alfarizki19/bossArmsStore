export function initSummaryNavigation_MlokAndKeymodRail() {
	const ids = [
		'summaryItemsCard_mlokAndKeymodRail_00100101',
		'summaryItemsCard_mlokAndKeymodRail_00200101'
	];
    ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuMLOKAndKeymodRailProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_MlokAndKeymodRail);
