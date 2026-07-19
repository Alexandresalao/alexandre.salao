/* ===========================
      ANIMAÇÃO AO ROLAR
=========================== */

const elementos = document.querySelectorAll(
    ".hero, .sobre, .servicos, .portfolio, .depoimentos, .footer"
);

elementos.forEach((elemento) => {
    elemento.classList.add("animar");
});

const observer = new IntersectionObserver(
    (entries, observador) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("mostrar");

                // Para de observar depois que a animação acontece
                observador.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2
    }
);

elementos.forEach((elemento) => {
    observer.observe(elemento);
});


/* ===========================
      CONTADOR DE EXPERIÊNCIA
=========================== */

const contador = document.getElementById("contador");

if (contador) {
    const numeroFinal = 23;
    let iniciouContador = false;

    const observerContador = new IntersectionObserver(
        (entries, observador) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !iniciouContador) {
                    iniciouContador = true;

                    let numero = 0;

                    const intervalo = setInterval(() => {
                        numero++;
                        contador.textContent = numero;

                        if (numero >= numeroFinal) {
                            clearInterval(intervalo);
                        }
                    }, 80);

                    // O contador só precisa ser observado uma vez
                    observador.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.6
        }
    );

    observerContador.observe(contador);
}


/* ===========================
      BOTÃO VOLTAR AO TOPO
=========================== */

const voltarTopo = document.querySelector(".voltar-topo");

if (voltarTopo) {
    window.addEventListener(
        "scroll",
        () => {
            if (window.scrollY > 400) {
                voltarTopo.classList.add("ativo");
            } else {
                voltarTopo.classList.remove("ativo");
            }
        },
        {
            passive: true
        }
    );
}

/* ===========================
      MENU HAMBÚRGUER
=========================== */

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("header nav");
const menuLinks = document.querySelectorAll("header nav a");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        menuToggle.classList.toggle("ativo");
        nav.classList.toggle("ativo");
        document.body.classList.toggle("menu-aberto");

    });

    menuLinks.forEach(link => {

        link.addEventListener("click", () => {

            menuToggle.classList.remove("ativo");
            nav.classList.remove("ativo");
            document.body.classList.remove("menu-aberto");

        });

    });

}
