'use strict'

document.addEventListener('keydown', function (evento) {
   
    if (evento.keyCode == 32) {
     
        if (nivel.muerto == false) {
            if (trex.saltando == false) {
                saltar();
            }
        } else {
            nivel.velociadad = 9;
            nube.velociadad = 2;
            cactus.x = ancho + 100;
            nube.x = ancho + 100;
            nivel.marcador = 0;
            nivel.muerto = false;
        }
    }
});

var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes() {
    imgRex = new Image();
    imgNube = new Image();
    imgCactus = new Image();
    imgSuelo = new Image();


    imgRex.src = 'img/rex.png';
    imgNube.src = 'img/nuebe.png';
    imgCactus.src = 'img/cactus.png';
    imgSuelo.src = 'img/suelo.png';
}




var ancho = 700;
var alto = 300;
var canvas, ctx;


function inicializa() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
}


function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}




var suelo = 200;

var trex = {
    y: suelo, 
    vy: 0, 
    gravedad: 2,
    salto: 28,
    vymax: 9,
    saltando: false
};

var nivel = {
    velociadad: 9,
    marcador: 0,
    muerto: false
};

var cactus = {
    x: ancho + 100, 
    y: suelo - 25 
};

var nube = {
    x: 400,
    y: 100,
    velociadad: 2
};

var suelog = {
    x: 0,
    y: suelo + 30
};


function dibujaRex() {
  
    ctx.drawImage(imgRex, 0, 0, 88, 94, 100, trex.y, 50, 50);
}



function dibujaCactus() {
    ctx.drawImage(imgCactus, 0, 0, 50, 96, cactus.x, cactus.y, 38, 75);
}

function logicaCactus() {
    if (cactus.x < -100) {
        cactus.x = ancho + 100;
        nivel.marcador++;
    } else {
        cactus.x -= nivel.velociadad;
    }
}


function dibujaSuelo() {
    ctx.drawImage(imgSuelo, suelog.x, 0, 700, 30, 0, suelog.y, 700, 30);
}

function logicaSuelo() {
    if (suelog.x > 700) {
        suelog.x = 0;
    } else {
        suelog.x += nivel.velociadad;
    }
}


function dibujaNube() {
    ctx.drawImage(imgNube, 0, 0, 93, 27, nube.x, nube.y, 82, 31);
}

function logicaNube() {
    if (nube.x < -100) {
        nube.x = ancho + 100;
    } else {
        nube.x -= nube.velociadad;
    }
}



function saltar() {
    trex.saltando = true;
    trex.vy = trex.salto;
}


function gravedad() {
    if (trex.saltando == true) {
        if (trex.y - trex.vy - trex.gravedad > suelo) {
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        } else {
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
    }
}



function colision() {
    if (cactus.x >= 100 && cactus.x <= 150) {
        if (trex.y >= suelo - 25) {
            nivel.muerto = true;
            nivel.velociadad = 0;
            nube.velociadad = 0;
        }
    }
}


function puntacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`, 600, 50);

    if (nivel.muerto == true) {
        ctx.font = "60px impact";
        ctx.fillText(`GAME OVER`, 240, 150);
    }
}


var FPS = 50; 


setInterval(function () {
    principal();
  
}, 1000 / FPS);



function principal() {
    borraCanvas();
    gravedad();
    colision();
    logicaSuelo();
    logicaCactus();
    logicaNube();
    dibujaSuelo();
    dibujaCactus();
    dibujaNube();
    dibujaRex();
    puntacion();
}