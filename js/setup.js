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

// Установить нормальный размер текста в описании памятника
function setCorrectHeightText() {
	let landmarksAbout = document.querySelectorAll(".about .container");
	for (let land of landmarksAbout) {
		let header = land.querySelector("h3");
		let content = land.querySelector(".content");
		let correctHeight = land.clientHeight - parseFloat(getComputedStyle(land).paddingTop)*2 - header.clientHeight - parseFloat(getComputedStyle(content).marginTop)
		content.style.height = correctHeight + "px";
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
	setCorrectHeightText();
} catch(err) {
	console.error(err);
}