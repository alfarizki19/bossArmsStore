export function initSummaryNavigation_MlokAndKeymodRail() {
	// Normal MLOK cards - open menuMLOKAndKeymodRailProductMenu
	const normalIds = [
		'summaryItemsCard_mlokAndKeymodRail_00100101',
		'summaryItemsCard_mlokAndKeymodRail_00200101'
	];
    normalIds.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuMLOKAndKeymodRailProductMenu');
		});
	});
	
	// MLOK for bipod cards - open menuBipodProductMenu
	const forBipodIds = [
		'summaryItemsCard_mlokAndKeymodRail_00100101_forBipod',
		'summaryItemsCard_mlokAndKeymodRail_00200101_forBipod'
	];
	forBipodIds.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
            if (typeof navigateToMenu === 'function') navigateToMenu('menuBipodProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_MlokAndKeymodRail);