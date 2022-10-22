let landmarks = document.querySelectorAll(".landmark");
let landmarksAbout = document.querySelectorAll(".about");

// Прослушка клика на документ и закрытие всплывающего окна
document.addEventListener("click", function(event) {
	if (nowActive && event.target.classList.contains("about")) {
		closeInfo(nowActive);
	}
});

let nowActive = null;

// Показать информацию
function showInfo(elem) {
	elem.classList.add("active");
	nowActive = elem;
	// Отдаляем документ
	map.style.transform = "";
	map.style.left = "";
	map.style.top = "";
	zoom = 1;
}

// Скрыть информацию
function closeInfo(elem) {
	elem.style.opacity = 0;
	let delay = parseFloat(getComputedStyle(elem).transitionDuration);
	setTimeout(function() {
		elem.classList.remove("active");
		elem.style.opacity = "";
	}, delay*1000);
	nowActive = null;
}

// Обработчики показа информации о достопримечательности при клике на иконку
for (let i = 0; i < landmarks.length; i++) {
	landmarks[i].addEventListener("click", function(event) {
		showInfo(landmarksAbout[i]);
		// Обработка клика на крестик
		landmarksAbout[i].querySelector(".close").onclick = () => {
			closeInfo(landmarksAbout[i]);
		}
	});
}

let menu = document.querySelector(".menu");
let showDirection = document.querySelector("input[name='show-direction']")
let mapImage = document.querySelector(".map");
let defaultImage = "./images/city_direction.png";
let directionImage = "./images/city3.png";

function showMenu() {
	menu.classList.add("active");
}

function closeMenu() {
	menu.classList.remove("active");
}

menu.addEventListener("mouseover", function(event) {
	console.log("тутатата")
	showMenu();
});
menu.addEventListener("mouseout", function(event) {
	closeMenu();
});
showDirection.addEventListener("change", function(event) {
	if (showDirection.checked) {
		mapImage.src = defaultImage;
	} else {
		mapImage.src = directionImage;
	}
});

let map = document.documentElement;
let objs = Array.from(document.querySelectorAll(".about"));
const minZoom = 1;
const maxZoom = 3;
const minZoomToOffset = 1.5;

let zoom = minZoom;

// Координаты для работы с перетаскиванием карты
let [x1, y1] = [null, null];
let [x2, y2] = [null, null];
let isMapMoving = false; // Карта двигается?

// Определить направление прокрутки
function getDirection(event) {
	let res = event.deltaY > 0 ? "down" : "top";
	return res;
}

// Задать приближение к карте
function setZoomMap(z, direction) {
	map.style.transform = `scale(${z})`
	if (zoom < minZoomToOffset && direction == "down") {
		map.style.transform = "scale(1)";
		setOffsetMap(0, 0);
	}
}

// Изменить значение приближения (меняем глобальную переменную)
function setCorrectZoom(direction) {
	if (direction == "top" && zoom < maxZoom) {
		zoom += 0.1;
	} else if (direction == "down" && zoom > minZoom) {
		zoom += -0.1;
	}
}


// Изменить перемещение по x y у карты
function setOffsetMap(xOffset, yOffset) {
	map.style.left = xOffset + "px";
	map.style.top = yOffset + "px";
}


// Событие на прокрутку колеса на приближение / отдаление карты
document.addEventListener("wheel", function(event) {
	if (!objs.some(item => item.classList.contains("active"))) {
		let direction = getDirection(event);
		setCorrectZoom(direction); // Меняем переменную zoom
		setZoomMap(zoom, direction); // Устанавливаем приближение для карты
	}
});

// Начало перетаскивания карты - ставим статус в true
map.addEventListener("dragstart", function(event) {
	event.preventDefault();
	x1 = event.pageX;
	y1 = event.pageY;
	isMapMoving = true;
});

// При перемещении мыши в карте
map.addEventListener("mousemove", function(event) {
	// Менять смещение будем только если карта начала двигаться
	if (isMapMoving && zoom >= minZoomToOffset) {
		x2 = event.pageX;
		y2 = event.pageY;
		let [leftOffset, topOffset] = [null, null];
		if (map.style.left) {
			let tmpLeft = parseFloat(map.style.left) + (x2 - x1) / 35;
			let tmpTop = parseFloat(map.style.top) + (y2 - y1) / 35;
			if (Math.abs(tmpLeft) <= 550) leftOffset = tmpLeft
			if (Math.abs(tmpTop) <= 400) topOffset = tmpTop;
		} else {
			leftOffset = x2 - x1;
			topOffset = y2 - y1;
		}
		setOffsetMap(leftOffset, topOffset);
	}
});

// При отжатии кнопки мыши на документе - убираем статус движения у карты
document.addEventListener("mouseup", function(event) {
	isMapMoving = false;
});

// Установить содержимое полностью на 100%
function setContentAllMax() {
	let html = document.documentElement;
	if (html.clientHeight < 1000)
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