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
