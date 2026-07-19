document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const body = document.body;
    const cabecalho = document.querySelector(".cabecalho-premium");
    const botaoMenu = document.querySelector(".menu-toggle");
    const menu = document.querySelector("#menu-principal");
    const linksMenu = document.querySelectorAll("#menu-principal a");
    const voltarTopo = document.querySelector(".voltar-topo");
    const contador = document.querySelector("#contador");
    const anoAtual = document.querySelector("#ano-atual");
    const preloader = document.querySelector(".preloader");

    // Atualiza o ano automaticamente
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // ---------------- MENU MOBILE ----------------

    function fecharMenu() {
        if (!botaoMenu || !menu) return;

        botaoMenu.classList.remove("ativo");
        menu.classList.remove("aberto");
        botaoMenu.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-aberto");
    }

    function abrirMenu() {
        if (!botaoMenu || !menu) return;

        botaoMenu.classList.add("ativo");
        menu.classList.add("aberto");
        botaoMenu.setAttribute("aria-expanded", "true");
        body.classList.add("menu-aberto");
    }

    if (botaoMenu && menu) {

        botaoMenu.addEventListener("click", () => {

            if (menu.classList.contains("aberto")) {
                fecharMenu();
            } else {
                abrirMenu();
            }

        });

        linksMenu.forEach(link => {

            link.addEventListener("click", fecharMenu);

        });

        document.addEventListener("keydown", (e) => {

            if (e.key === "Escape") {
                fecharMenu();
            }

        });

        window.addEventListener("resize", () => {

            if (window.innerWidth > 900) {
                fecharMenu();
            }

        });

    }

    // ---------------- HEADER ----------------

    function atualizarHeader() {

        if (!cabecalho) return;

        if (window.scrollY > 30) {

            cabecalho.classList.add("rolado");

        } else {

            cabecalho.classList.remove("rolado");

        }

        if (voltarTopo) {

            if (window.scrollY > 500) {

                voltarTopo.classList.add("visivel");

            } else {

                voltarTopo.classList.remove("visivel");

            }

        }

    }

    atualizarHeader();

    window.addEventListener("scroll", atualizarHeader);

    // ---------------- ANIMAÇÕES ----------------

    const elementos = document.querySelectorAll(

        ".sobre-imagem, .sobre-texto, .titulo-secao, .card, .foto, .depoimento, .chamada-conteudo"

    );

    elementos.forEach(el => {

        el.classList.add("animar");

    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, obs) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visivel");

                    obs.unobserve(entry.target);

                }

            });

        }, {

            threshold: 0.15

        });

        elementos.forEach(el => {

            observer.observe(el);

        });

    } else {

        elementos.forEach(el => {

            el.classList.add("visivel");

        });

    }

    // ---------------- CONTADOR ----------------

    if (contador) {

        let iniciado = false;

        function animarContador() {

            if (iniciado) return;

            iniciado = true;

            const total = 23;

            const tempo = 1500;

            const inicio = performance.now();

            function atualizar(now) {

                const progresso = Math.min(

                    (now - inicio) / tempo,

                    1

                );

                const valor = Math.floor(

                    progresso * total

                );

                contador.textContent = valor;

                if (progresso < 1) {

                    requestAnimationFrame(atualizar);

                } else {

                    contador.textContent = total;

                }

            }

            requestAnimationFrame(atualizar);

        }

        if ("IntersectionObserver" in window) {

            const contadorObserver = new IntersectionObserver((entries, obs) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        animarContador();

                        obs.disconnect();

                    }

                });

            }, {

                threshold: 0.5

            });

            contadorObserver.observe(contador);

        } else {

            animarContador();

        }

    }

    // ---------------- MENU ATIVO ----------------

    const secoes = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const observerSecoes = new IntersectionObserver((entries) => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const id = entry.target.id;

                linksMenu.forEach(link => {

                    const href = link.getAttribute("href");

                    if (href === "#" + id) {

                        link.classList.add("ativo");

                    } else {

                        link.classList.remove("ativo");

                    }

                });

            });

        }, {

            threshold: 0.4

        });

        secoes.forEach(secao => {

            observerSecoes.observe(secao);

        });

    }

    // ---------------- SCROLL SUAVE ----------------

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function(e) {

            const destino = document.querySelector(

                this.getAttribute("href")

            );

            if (!destino) return;

            e.preventDefault();

            destino.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        });

    });

    // ---------------- PRELOADER ----------------

    window.addEventListener("load", () => {

        if (preloader) {

            setTimeout(() => {

                preloader.classList.add("oculto");

            }, 300);

        }

    });

    setTimeout(() => {

        if (preloader) {

            preloader.classList.add("oculto");

        }

    }, 2500);

});
