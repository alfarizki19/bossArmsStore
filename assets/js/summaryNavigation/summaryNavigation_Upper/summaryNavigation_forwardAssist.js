export function initSummaryNavigation_ForwardAssist() {
	const ids = [
		'summaryItemsCard_forwardAssists_00100101',
		'summaryItemsCard_forwardAssists_00100102'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuForwardAssistProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_ForwardAssist);
