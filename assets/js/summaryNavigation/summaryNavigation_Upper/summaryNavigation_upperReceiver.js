export function initSummaryNavigation_UpperReceiver() {
	const ids = [
		'summaryItemsCard_upperReceiver_00100101',
		'summaryItemsCard_upperReceiver_00100102'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuUpperReceiver');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_UpperReceiver);