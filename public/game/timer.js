function startTimer(duration) {
	var timer = duration, minutes, seconds;
	setInterval(function () {
		minutes = parseInt(timer / 60, 10)
		seconds = parseInt(timer % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		TimerMinutes.textContent = minutes;
		TimerSeconds.textContent = seconds;

		if (--timer < 0) {
			timer = duration;
		}
	}, 1000);
}

window.onload = function () {
	var OurTime = 60 * 1.5;
	startTimer(OurTime);
};