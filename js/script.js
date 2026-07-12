const elementos = document.querySelectorAll(
    ".hero, .sobre, .servicos, .portfolio, .depoimentos, .footer"
);

elementos.forEach((elemento) => {
    elemento.classList.add("animar");
});

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if(entry.isIntersecting){

            entry.target.classList.add("mostrar");

        }

    });

},{
    threshold:0.2
});

elementos.forEach((elemento)=>{
    observer.observe(elemento);
});

/* ===========================
      CONTADOR DE EXPERIÊNCIA
=========================== */

const contador = document.getElementById("contador");

let iniciouContador = false;

const observerContador = new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting && !iniciouContador){

            iniciouContador = true;

            let numero = 0;

            const intervalo = setInterval(()=>{

                numero++;

                contador.textContent = numero;

                if(numero >= 23){

                    clearInterval(intervalo);

                }

            },80);

        }

    });

},{
    threshold:0.6
});

observerContador.observe(contador);

/* ===========================
      BOTÃO VOLTAR AO TOPO
=========================== */

const voltarTopo = document.querySelector(".voltar-topo");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){

        voltarTopo.classList.add("ativo");

    }else{

        voltarTopo.classList.remove("ativo");

    }

});
