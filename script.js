document.addEventListener("DOMContentLoaded", () => {

    // Menu responsivo para celular
    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
            navLinks.style.flexDirection = "column";
        });
    }

    const music = document.getElementById("bg-music");
    const btnInicio = document.querySelector('a[href="#inicio"]');

    let tocando = false;

    // 🔥 FUNÇÃO COM FADE-IN
    function tocarMusicaComFade() {
        music.volume = 0;
        music.play();

        let vol = 0;
        const maxVol = 0.2; // volume final (20%)

        const fade = setInterval(() => {
            if (vol < maxVol) {
                vol += 0.01;
                music.volume = vol;
            } else {
                clearInterval(fade);
            }
        }, 100);
    }

    // ▶️ tocar ao clicar em "Início"
    btnInicio.addEventListener("click", () => {
        if (!tocando) {
            tocarMusicaComFade();
            tocando = true;
        }
    });

    // Redirecionamento ao clicar nos cards de projetos
    const cards = document.querySelectorAll(".project-card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const url = card.getAttribute("data-url");
            if (url && url !== "#") {
                window.open(url, "_blank");
            }
        });
    });

    // Mostrar porcentagem ao tocar/hover em cada skill
    const skillCards = document.querySelectorAll(".skill-card");
    skillCards.forEach(card => {
        card.addEventListener("touchstart", () => {
            card.classList.add("active");
        });
        card.addEventListener("touchend", () => {
            setTimeout(() => card.classList.remove("active"), 800);
        });
    });

    // Sistema de scroll + máscara
    const sections = document.querySelectorAll(".section-container");
    const navItems = document.querySelectorAll(".nav-links a");
    const doomMask = document.querySelector(".doom-mask");
    const heroSection = document.querySelector("#inicio");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });

        // 🎭 animação máscara
        if (doomMask && heroSection) {
            const startScroll = 10;
            const endScroll = 120;

            const progress = Math.min(
                Math.max((window.pageYOffset - startScroll) / (endScroll - startScroll), 0),
                1
            );

            const translateY = -225 + progress * 210;

            doomMask.style.transform = `translate(-50%, ${translateY}px)`;
            doomMask.style.opacity = progress;
        }
    });
});