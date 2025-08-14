// Horizontal Timeline JS
document.addEventListener('DOMContentLoaded', function () {
	const timelineSection = document.getElementById('achievements');
	if (!timelineSection) return;

	// Dates
	const dateLinks = Array.from(timelineSection.querySelectorAll('.cd-h-timeline__date'));
	// Event cards (columns)
	const eventCols = Array.from(timelineSection.querySelectorAll('.row.justify-content-center > .col-12'));
	// Navigation buttons
	const prevBtn = timelineSection.querySelector('.cd-h-timeline__navigation--prev');
	const nextBtn = timelineSection.querySelector('.cd-h-timeline__navigation--next');

	let currentIndex = dateLinks.findIndex(link => link.classList.contains('cd-h-timeline__date--selected'));
	if (currentIndex === -1) currentIndex = 0;

	function updateTimeline(index) {
		// Clamp index
		index = Math.max(0, Math.min(index, dateLinks.length - 1));
		currentIndex = index;
		// Update selected date
		dateLinks.forEach((link, i) => {
			link.classList.toggle('cd-h-timeline__date--selected', i === index);
		});
		// Show only the corresponding event card
		eventCols.forEach((col, i) => {
			col.style.display = (i === index) ? '' : 'none';
		});
		// Update navigation button states
		if (prevBtn) {
			prevBtn.classList.toggle('cd-h-timeline__navigation--inactive', index === 0);
		}
		if (nextBtn) {
			nextBtn.classList.toggle('cd-h-timeline__navigation--inactive', index === dateLinks.length - 1);
		}
	}

	// Initial state
	updateTimeline(currentIndex);

	// Date click
	dateLinks.forEach((link, i) => {
		link.addEventListener('click', function (e) {
			e.preventDefault();
			updateTimeline(i);
		});
	});

	// Prev/Next navigation
	if (prevBtn) {
		prevBtn.addEventListener('click', function (e) {
			e.preventDefault();
			if (currentIndex > 0) {
				updateTimeline(currentIndex - 1);
			}
		});
	}
	if (nextBtn) {
		nextBtn.addEventListener('click', function (e) {
			e.preventDefault();
			if (currentIndex < dateLinks.length - 1) {
				updateTimeline(currentIndex + 1);
			}
		});
	}
});

