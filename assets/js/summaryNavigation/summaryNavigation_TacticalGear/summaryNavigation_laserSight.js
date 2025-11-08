export function initSummaryNavigation_LaserSight() {
	const ids = [
		'summaryItemsCard_laserSight_00100101'
	];
	ids.forEach(id => {
		const el = document.getElementById(id);
		if (!el) return;
		el.addEventListener('click', () => {
			if (typeof closeSummaryMenu === 'function') closeSummaryMenu();
			if (typeof navigateToMenu === 'function') navigateToMenu('menuLaserSightProductMenu');
		});
	});
}

document.addEventListener('DOMContentLoaded', initSummaryNavigation_LaserSight);
