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