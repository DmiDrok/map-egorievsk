// Установить содержимое полностью на 100%
function setContentAllMax() {
	let html = document.documentElement;
	html.style.height = window.innerHeight + "px";
}

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
	// Настройка контента будет производиться при изменении размеров экрана браузера
	window.addEventListener("resize", () => {
		setInfoWidthMax();
		setContentAllMax();
	});
	setInfoWidthMax();
	setContentAllMax();
} catch(err) {
	console.error(err);
}