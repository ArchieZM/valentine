// script.js

document.addEventListener("DOMContentLoaded", function() {

    /* Функция для создания плавающих слов */
    function createFloatingWord() {
        const words = ["любимая", "красивая", "лучший свет в моей жизни", "неповторимая"];
        const word = words[Math.floor(Math.random() * words.length)];
        const span = document.createElement('span');
        span.className = 'floating-word';
        span.innerText = word;
        span.style.left = Math.random() * 100 + '%';
        span.style.top = Math.random() * 100 + '%';
        document.body.appendChild(span);
        setTimeout(() => { span.remove(); }, 5000);
    }
    setInterval(createFloatingWord, 3000);

    /* Функция для создания плавающих сердечек */
    function createFloatingHeart() {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.innerText = '♥';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        document.body.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 5000);
    }
    setInterval(createFloatingHeart, 4000);

    // Флаг, отслеживающий, запускалась ли уже анимация рисования сердца
    let heartDrawn = false;

    /* Функция для рисования неонового сердца с анимацией */
    function drawNeonHeart() {
        // Создаем SVG для неонового контура сердца
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("id", "heart-container");
        svg.setAttribute("width", "200");
        svg.setAttribute("height", "200");
        svg.setAttribute("viewBox", "0 0 32 29.6");

        // Создаем путь для контура сердца
        const path = document.createElementNS(svgNS, "path");
        path.setAttribute("class", "neon-heart");
        // Путь задаёт форму сердца
        path.setAttribute("d", "M23.6,0c-3.4,0-6.4,1.9-8,4.7C13.8,1.9,10.8,0,7.4,0C3.3,0,0,3.3,0,7.4 c0,4.3,3.4,7.8,8.6,12.1l7.4,6.6l7.4-6.6C28.6,15.2,32,11.7,32,7.4C32,3.3,28.7,0,24.6,0H23.6z");
        svg.appendChild(path);
        document.body.appendChild(svg);

        // После завершения анимации рисования добавляем пульсирующее сердце внутри
        setTimeout(() => {
            const innerHeart = document.createElementNS(svgNS, "text");
            innerHeart.setAttribute("x", "50%");
            innerHeart.setAttribute("y", "50%");
            innerHeart.setAttribute("dominant-baseline", "middle");
            innerHeart.setAttribute("text-anchor", "middle");
            innerHeart.setAttribute("fill", "#ff69b4");
            innerHeart.setAttribute("font-size", "10");
            innerHeart.textContent = "♥";
            innerHeart.classList.add("pulsing-heart");
            svg.appendChild(innerHeart);
        }, 2500);
    }

    /* Функция для эффекта "взрыва" частиц при повторном клике */
    function createExplosion(x, y) {
        // Создаем множество частиц
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            // Случайное направление и расстояние
            const angle = Math.random() * 2 * Math.PI;
            const distance = 50 + Math.random() * 50;
            const dx = Math.cos(angle) * distance;
            const dy = Math.sin(angle) * distance;
            particle.style.setProperty('--dx', dx + 'px');
            particle.style.setProperty('--dy', dy + 'px');
            document.body.appendChild(particle);
            setTimeout(() => { particle.remove(); }, 1000);
        }
        // Одновременно создаются романтические слова в месте клика
        const explosionWords = ["обожаю", "ты – моя радость", "сердечко"];
        explosionWords.forEach(word => {
            const span = document.createElement('span');
            span.className = 'floating-word';
            span.innerText = word;
            span.style.left = (x + Math.random() * 30 - 15) + 'px';
            span.style.top = (y + Math.random() * 30 - 15) + 'px';
            document.body.appendChild(span);
            setTimeout(() => { span.remove(); }, 5000);
        });
    }

    // Обработка кликов по экрану
    document.addEventListener('click', function(event) {
        // Сдвигаем фон вверх (добавляем класс с анимацией)
        document.body.classList.add('shift-up');

        // Если анимация сердца ещё не запускалась – запускаем её
        if (!heartDrawn) {
            setTimeout(drawNeonHeart, 700);
            heartDrawn = true;
        } else {
            // Если сердце уже нарисовано – запускаем эффект взрыва частиц в точке клика
            createExplosion(event.clientX, event.clientY);
        }
    });
});
