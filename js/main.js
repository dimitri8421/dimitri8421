exec = 0;
modal1 = {};
const tempo = setInterval(async()=> {
    if (window.screen.height > window.screen.width) {
        if (!document.querySelector('.modall1')) {
            document.querySelector('.main').style.display = "none";
            document.querySelector('footer').style.display = "none";
            
            modal1 = Swal.fire({
                html: '<div class="modall1" style="align-items: baseline;margin: 1em;"><div style="font-size: 1.5em;font-family: sans-serif;">Por favor gire a tela do celular</div><img src="img/girar-tela.png" style="height: 34px;padding: 10px;"></div>',
                showConfirmButton: false,
                allowOutsideClick: false
            })
        }

    } else {
        document.querySelector('.main').style.display = "";
        document.querySelector('footer').style.display = "flex";
        modal1.close?.();
        if (!document.querySelector('.modall2')) {
            if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
                Swal.fire({
                    html: "<div class='modall2'>Click em OK para abrir tela cheia</div>",
                    customClass: {
                        confirmButton: "#1936c1"
                    },
                    allowOutsideClick: false
                }).then(()=> {
                    toggleFullScreen();
                })
            }

        }
        
    }
    
},500);

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function dois_digitos(numero) { return numero <= 9 ? '0' + numero.toString() : numero.toString(); }
var dias_semana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'S&Aacute;B'];
function exibir_relogio() {
    var hoje = new Date();
    var data_atual = dois_digitos(hoje.getDate()) + '/' + dois_digitos(hoje.getMonth() + 1) + '/' + dois_digitos(hoje.getFullYear());
    var hora_atual = dois_digitos(hoje.getHours()) + ':' + dois_digitos(hoje.getMinutes()) + ':' + dois_digitos(hoje.getSeconds());
    document.querySelector('#cabecalho').innerHTML = dias_semana[hoje.getDay()] + ' ' + data_atual + ' ' + hora_atual;
};

fetch("js/config.json").then(d => {
    d.json().then(d => {
        configs = d;
        document.querySelector('.esquerda').innerHTML = configs["1"];
    })
})

fetch("js/eleicao2022.json").then(d => {
    d.json().then(d => {
        dataJSON = d;
    })
});

document.querySelector('.corrige').addEventListener("click", () => {
    corrige();
})

document.querySelector('.comfirma').addEventListener("click", () => {
    comfirma();
})

document.querySelector(".branco").addEventListener("click", () => {
    branco();
})

function arrumaP() {
    document.querySelectorAll('.footer > p').forEach((e, i) => {
        (i == 0) ? e.style.margin = "5px 4px" : "";
        (i == 1) ? e.style.margin = "-5px 18px" : "";
        (i == 2) ? e.style.margin = "3px 30px" : "";

    });
}

function barraAnimada() {
    document.querySelector(".progress-bar").animate([
        { width: '70%' }
    ], {
        duration: 2000,
    }).finished.then(d => {
        document.querySelector(".container").style.display = "none";
        document.querySelector('.fim').style.display = "block";
        document.querySelector("#longo").play();
        exibir_relogio();
        setInterval(exibir_relogio, 500);
    })
}
function puxaPartido(valor) {
    if ((valor.length == 2)) {
        const tipo = dataJSON.partes[document.querySelector('#tipo').value];
        const resultado = dataJSON[tipo].find(e => e['political_party_number'] == valor) ?? "NÚMERO ERRADO";


        if ((resultado != "NÚMERO ERRADO")) {
            document.querySelector('.resuPartido').innerHTML = resultado['political_party_abbreviation'];
            document.querySelectorAll('.busca')[1].style.display = "flex";
            document.querySelectorAll('.none').forEach(e => e.style.display = "block");
        } else {
            document.querySelector('.numeroErrado').innerHTML = resultado;
            document.querySelectorAll('.none').forEach(e => e.style.display = "block");
            document.querySelector('.voto').innerHTML = "VOTO NULO";
        }
        arrumaP();
    }
}

function puxaCandidato(valor, quantidadeN) {
    if ((valor.length == quantidadeN)) {
        const tipo = dataJSON.partes[document.querySelector('#tipo').value];
        const resultado = dataJSON[tipo].find(e => e['electoral_number'] == valor) ?? "CANDIDATO INEXISTENTE";

        if ((resultado != "CANDIDATO INEXISTENTE")) {
            if ((valor.length == 2)) {
                document.querySelector('.resuPartido').innerHTML = resultado['political_party_abbreviation'];
                document.querySelectorAll('.busca')[1].style.display = "flex";
                document.querySelectorAll('.none').forEach(e => e.style.display = "block");
                arrumaP();
            }
            const urlBase = "https://f.i.uol.com.br/folha/eleicoes/";
            const imgCandidato = document.querySelector('.imgCandidato');
            const comfirmaVoto = document.querySelector('.comfirmaVoto');

            const mobile = window.screen.width <= 900 ? " 0% 0% / 3.3em" : " 0% 0% / 7em";
            document.querySelector('.resuNome').innerHTML = resultado['electoral_name'];
            document.querySelectorAll('.busca')[0].style.display = "flex";
            imgCandidato.style.background = `url(${urlBase}${resultado.photo})${mobile}`;
            // imgCandidato.style["background-size"] = "7em";

            comfirmaVoto.innerHTML = "CONFIRA SEU VOTO";
            comfirmaVoto.style.display = "block"
            document.querySelectorAll('.footer p').forEach(e => e.style.display = "none");


            setTimeout(() => {
                comfirmaVoto.innerHTML = "";
                document.querySelectorAll('.footer p').forEach(e => e.style.display = "block");
                comfirmaVoto.style.display = "none"
                document.querySelector("#completo").value = "sucesso";

            }, 2000);

        } else {
            document.querySelector('.numeroErrado').innerHTML = resultado;
            document.querySelector('.voto').innerHTML = "VOTO DE LEGENDA"
        }
    }
}

function corrige() {
    const quadrado = document.querySelectorAll('.quadrado');
    const pisca = document.querySelector('.pisca');
    const none = document.querySelectorAll('.none');
    const res = document.querySelectorAll(".res");
    const busca = document.querySelectorAll(".busca");
    const resultado = document.querySelector("#resultado");
    const imgCandidato = document.querySelector(".imgCandidato");
    const numeroErrado = document.querySelector(".numeroErrado");
    const voto = document.querySelector(".voto");
    const gif = document.querySelector(".gif");

    pisca?.classList.remove('pisca');
    quadrado.forEach((e, i) => {
        if ((i == 0)) {
            e.classList.add('pisca');
        }
        e.innerHTML = "";
    });
    none.forEach(e => e.style.display = "none");
    res.forEach(e => e.innerHTML = "");
    busca.forEach(e => e.style.display = "none");
    resultado.value = "";
    imgCandidato.style.display = "none";
    imgCandidato.style.background = "";
    numeroErrado.innerHTML = "";
    voto.innerHTML = "";
    gif.style.display = "block";
}

function comfirma() {
    const comfirma = document.querySelector("#completo");
    const tipo = document.querySelector('#tipo');
    if ((comfirma.value == "sucesso")) {
        document.querySelector("#curto").play();
        tipo.value = Number(tipo.value) + 1;
        document.querySelector('.esquerda').innerHTML = configs[tipo.value];
        document.querySelector('#resultado').value = "";
        document.querySelector('#completo').value = "";
        if ((tipo.value == "6")) {
            barraAnimada();
        }

    }

}

function branco() {
    const comfirmaVoto = document.querySelector('.comfirmaVoto');
    document.querySelector(".preencher").style.display = "none";
    document.querySelectorAll(".none").forEach(e => e.style.display = "block");

    comfirmaVoto.innerHTML = "CONFIRA SEU VOTO";
    comfirmaVoto.style.display = "block"
    arrumaP();
    document.querySelectorAll('.footer p').forEach(e => e.style.display = "none");
    document.querySelector('.voto').innerHTML = "VOTO EM BRANCO";
    document.querySelector('.texto').style.display = "none";
    document.querySelector('.gif').style.display = "none";
    setTimeout(() => {
        comfirmaVoto.innerHTML = "";
        document.querySelectorAll('.footer p').forEach(e => e.style.display = "block");
        comfirmaVoto.style.display = "none"
        document.querySelector("#completo").value = "sucesso";

    }, 2000);

}
function btnNumerico(e) {
    document.querySelector('.gif').style.display = "none"
    const pisca = document.querySelector('.pisca');
    const proximo = pisca?.nextSibling ?? "nao existe";

    if (pisca) {
        const resultado = document.querySelector('#resultado');
        resultado.value = resultado.value += e.innerHTML;
        pisca.innerHTML = e.innerHTML;
        pisca.classList.remove('pisca');

        if ((resultado.value.length == 2)) {
            if ((document.querySelectorAll('.quadrado').length == "2")) {
                puxaCandidato(resultado.value, document.querySelectorAll('.quadrado').length);
            } else {
                puxaPartido(resultado.value);
            }
        } else if (resultado.value.length > 2) {
            puxaCandidato(resultado.value, document.querySelectorAll('.quadrado').length);
        }
    }

    if ((proximo == "nao existe")) {
        return;
    }

    proximo.classList.add('pisca');
}
const botaosNumerico = document.querySelectorAll('.btn-click');

botaosNumerico.forEach(e => {
    e.addEventListener("click", (el) => {
        btnNumerico(e);
    })
})


// document.querySelector('h1').innerHTML = "TELA: " + window.screen.width;
