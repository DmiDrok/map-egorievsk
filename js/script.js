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