document.addEventListener("DOMContentLoaded", function() {
    const hint = document.querySelector(".click-hint");
    const background = document.querySelector(".background");
    const audio = document.getElementById("background-music");

    let clicked = false;

    document.body.addEventListener("click", function() {
        if (!clicked) {
            hint.style.opacity = "0";
            audio.play();

            // Плавный сдвиг фона вверх
            background.style.transition = "transform 2s ease-in-out";
            background.style.transform = "translateY(-50%)";

            // Запускаем рисование сердца через 1 секунду
            setTimeout(drawHeart, 1000);
            clicked = true;
        } else {
            createExplosion(event.clientX, event.clientY);
        }
    });

    function drawHeart() {
        let heart = document.createElement("div");
        heart.classList.add("heart-animation");
        document.body.appendChild(heart);
    }

    function createExplosion(x, y) {
        let explosion = document.createElement("div");
        explosion.classList.add("explosion");
        explosion.style.left = `${x}px`;
        explosion.style.top = `${y}px`;
        document.body.appendChild(explosion);

        setTimeout(() => explosion.remove(), 1000);
    }
});
