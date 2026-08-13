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


                    if (!id || id === "#") {
                        return;
                    }


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
       LIGHTBOX
       ABRIR FOTOS EM TELA GRANDE
    ========================================== */

    const lightbox =
        document.querySelector("#lightbox");

    const lightboxImagem =
        document.querySelector("#lightbox-imagem");

    const lightboxFechar =
        document.querySelector(".lightbox-fechar");


    /*
       Seleciona as imagens que poderão
       ser ampliadas.

       1 - Fotos dos serviços
       2 - Fotos do portfólio
       3 - Fotos de antes e depois
    */

    const imagensAmpliaveis =
        document.querySelectorAll(
            ".card-servico-foto img, " +
            ".foto img, " +
            ".comparacao img"
        );


    const abrirLightbox = (imagem) => {

        if (!lightbox || !lightboxImagem) {
            return;
        }


        lightboxImagem.src =
            imagem.currentSrc || imagem.src;

        lightboxImagem.alt =
            imagem.alt || "Imagem ampliada";


        lightbox.classList.add(
            "ativo"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        body.style.overflow =
            "hidden";

    };


    const fecharLightbox = () => {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "ativo"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        body.style.overflow =
            "";


        /*
           Aguarda a animação terminar
           antes de remover a imagem.
        */

        setTimeout(() => {

            if (
                lightboxImagem &&
                !lightbox.classList.contains(
                    "ativo"
                )
            ) {

                lightboxImagem.src = "";

            }

        }, 300);

    };


    imagensAmpliaveis.forEach(
        (imagem) => {

            /*
               Indica que a imagem
               pode ser clicada.
            */

            imagem.setAttribute(
                "tabindex",
                "0"
            );


            imagem.setAttribute(
                "role",
                "button"
            );


            imagem.setAttribute(
                "aria-label",
                imagem.alt
                    ? "Ampliar imagem: " +
                      imagem.alt
                    : "Ampliar imagem"
            );


            /*
               Clique ou toque.
            */

            imagem.addEventListener(
                "click",
                () => {

                    abrirLightbox(
                        imagem
                    );

                }
            );


            /*
               Também permite abrir
               pelo teclado.
            */

            imagem.addEventListener(
                "keydown",
                (evento) => {

                    if (
                        evento.key === "Enter" ||
                        evento.key === " "
                    ) {

                        evento.preventDefault();

                        abrirLightbox(
                            imagem
                        );

                    }

                }
            );

        }
    );


    /*
       Botão X.
    */

    if (lightboxFechar) {

        lightboxFechar.addEventListener(
            "click",
            fecharLightbox
        );

    }


    /*
       Clicar no fundo preto
       também fecha.
    */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (evento) => {

                if (
                    evento.target ===
                    lightbox
                ) {

                    fecharLightbox();

                }

            }
        );

    }


    /* ==========================================
       TECLA ESC
    ========================================== */

    document.addEventListener(
        "keydown",
        (evento) => {

            if (
                evento.key === "Escape"
            ) {

                /*
                   Primeiro fecha a foto,
                   caso esteja aberta.
                */

                if (
                    lightbox &&
                    lightbox.classList.contains(
                        "ativo"
                    )
                ) {

                    fecharLightbox();

                }


                /*
                   Também fecha o menu
                   do celular.
                */

                fecharMenu();

            }

        }
    );


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


    /*
       Segurança:
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
