document.addEventListener("DOMContentLoaded", () => {

    "use strict";

    const body = document.body;

    const header = document.querySelector(".cabecalho-premium");

    const toggle = document.querySelector(".menu-toggle");

    const menu = document.querySelector("#menu-principal");

    const links = document.querySelectorAll("#menu-principal a");

    const topo = document.querySelector(".voltar-topo");

    const contador = document.querySelector("#contador");

    const ano = document.querySelector("#ano-atual");

    const preloader = document.querySelector(".preloader");


    /* ==========================================
       ANO AUTOMÁTICO NO RODAPÉ
    ========================================== */

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }


    /* ==========================================
       MENU PARA CELULAR
    ========================================== */

    const fecharMenu = () => {

        if (!toggle || !menu) {
            return;
        }

        toggle.classList.remove("ativo");

        menu.classList.remove("aberto");

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        body.classList.remove("menu-aberto");

    };


    if (toggle && menu) {

        toggle.addEventListener("click", () => {

            const aberto =
                menu.classList.toggle("aberto");

            toggle.classList.toggle(
                "ativo",
                aberto
            );

            toggle.setAttribute(
                "aria-expanded",
                aberto ? "true" : "false"
            );

            body.classList.toggle(
                "menu-aberto",
                aberto
            );

        });


        links.forEach((link) => {

            link.addEventListener(
                "click",
                fecharMenu
            );

        });


        document.addEventListener(
            "keydown",
            (evento) => {

                if (evento.key === "Escape") {
                    fecharMenu();
                }

            }
        );

    }


    /* ==========================================
       CABEÇALHO E BOTÃO VOLTAR AO TOPO
    ========================================== */

    const controlarRolagem = () => {

        if (header) {

            header.classList.toggle(
                "rolado",
                window.scrollY > 30
            );

        }


        if (topo) {

            topo.classList.toggle(
                "visivel",
                window.scrollY > 500
            );

        }

    };


    controlarRolagem();


    window.addEventListener(
        "scroll",
        controlarRolagem,
        {
            passive: true
        }
    );


    /* ==========================================
       ANIMAÇÕES AO ROLAR A PÁGINA
    ========================================== */

    const itensAnimados =
        document.querySelectorAll(
            ".sobre-imagem, " +
            ".sobre-texto, " +
            ".titulo-secao, " +
            ".card-servico-foto, " +
            ".foto, " +
            ".comparacao, " +
            ".video-card, " +
            ".depoimento, " +
            ".chamada-conteudo"
        );


    itensAnimados.forEach((item) => {

        item.classList.add("animar");

    });


    if ("IntersectionObserver" in window) {

        const observador =
            new IntersectionObserver(
                (entradas, observer) => {

                    entradas.forEach(
                        (entrada) => {

                            if (
                                entrada.isIntersecting
                            ) {

                                entrada.target
                                    .classList
                                    .add("visivel");

                                observer.unobserve(
                                    entrada.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        itensAnimados.forEach((item) => {

            observador.observe(item);

        });

    } else {

        itensAnimados.forEach((item) => {

            item.classList.add("visivel");

        });

    }


    /* ==========================================
       CONTADOR DOS 23 ANOS
    ========================================== */

    if (contador) {

        let contadorExecutado = false;


        const iniciarContador = () => {

            if (contadorExecutado) {
                return;
            }

            contadorExecutado = true;

            let numero = 0;


            const intervalo =
                setInterval(() => {

                    numero++;

                    contador.textContent =
                        numero;


                    if (numero >= 23) {

                        clearInterval(
                            intervalo
                        );

                    }

                }, 55);

        };


        if (
            "IntersectionObserver" in window
        ) {

            const observadorContador =
                new IntersectionObserver(
                    (entradas, observer) => {

                        entradas.forEach(
                            (entrada) => {

                                if (
                                    entrada.isIntersecting
                                ) {

                                    iniciarContador();

                                    observer.disconnect();

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.5
                    }
                );


            observadorContador.observe(
                contador
            );

        } else {

            iniciarContador();

        }

    }


    /* ==========================================
       ROLAGEM SUAVE DOS LINKS
    ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (evento) => {

                    const id =
                        link.getAttribute(
                            "href"
                        );

                    const destino =
                        document.querySelector(
                            id
                        );


                    if (destino) {

                        evento.preventDefault();

                        destino.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        });


    /* ==========================================
       TELA DE CARREGAMENTO
    ========================================== */

    window.addEventListener(
        "load",
        () => {

            setTimeout(() => {

                if (preloader) {

                    preloader.classList.add(
                        "oculto"
                    );

                }

            }, 250);

        }
    );


    /* Segurança:
       remove a tela de carregamento
       mesmo se algum arquivo demorar.
    */

    setTimeout(() => {

        if (preloader) {

            preloader.classList.add(
                "oculto"
            );

        }

    }, 2200);

});
