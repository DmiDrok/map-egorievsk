// Установка всплывающих окон в размер экрана
function setInfoWidthMax() {
	let landmarksAbout = document.querySelectorAll(".landmark__about");
	let screenWidth = parseFloat(getComputedStyle(document.documentElement).width);
	for (let land of landmarksAbout) {
		land.style.width = screenWidth + "px";
	}
}

// Запуск настраивающих функций
try {
	window.addEventListener("resize", setInfoWidthMax);
	setInfoWidthMax();
} catch(err) {
	console.error(err);
}