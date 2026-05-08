// obtener canvas del HTML
const canvas = document.getElementById("canvas");

// obtener contexto 2D
const ctx = canvas.getContext("2d");

// ==========================================
// CONSTANTES DE REGION CODE
// ==========================================

// punto dentro del viewport -> 0000
const INSIDE = 0;

// punto a la izquierda -> 0001
const LEFT = 1;

// punto a la derecha -> 0010
const RIGHT = 2;

// punto abajo -> 0100
const BOTTOM = 4;

// punto arriba -> 1000
const TOP = 8;

// ==========================================
// DATOS DEL VIEWPORT
// ==========================================

// esquina izquierda inferior
let xmin = 100;
let ymin = 100;

// esquina derecha superior
let xmax = 400;
let ymax = 300;

// ==========================================
// VARIABLE PARA CAMBIAR ESCENAS
// ==========================================

let escenaActual = 0;

// ==========================================
// CASOS DE PRUEBA
// ==========================================
const escenas = [

    // línea totalmente dentro
    {
        nombre: "Linea dentro",

        linea: {
            x1:150,
            y1:150,
            x2:300,
            y2:250
        }
    },

    // línea totalmente fuera
    {
        nombre: "Linea fuera",

        linea: {
            x1:20,
            y1:20,
            x2:80,
            y2:80
        }
    },

    // línea entrando al viewport
    {
        nombre: "Linea entrando",

        linea: {
            x1:20,
            y1:200,
            x2:250,
            y2:200
        }
    },

    // línea saliendo del viewport
    {
        nombre: "Linea saliendo",

        linea: {
            x1:250,
            y1:200,
            x2:600,
            y2:200
        }
    },

    // línea atravesando el viewport
    {
        nombre: "Linea atravesando",

        linea: {
            x1:20,
            y1:50,
            x2:600,
            y2:350
        }
    }

];
// ==========================================
// FUNCION PARA DIBUJAR PIXELES
// ==========================================

function plotPixel(x, y, color="white"){

    // color del pixel
    ctx.fillStyle = color;

    // invertir eje Y
    let canvasY = canvas.height - y;

    // dibujar pixel
    ctx.fillRect(x, canvasY, 2, 2);
}

// ==========================================
// FUNCION PARA DIBUJAR LINEAS
// ==========================================

function dibujarLinea(x1, y1, x2, y2, color="white"){

    // diferencias
    let dx = x2 - x1;
    let dy = y2 - y1;

    // pasos
    let pasos = Math.max(
        Math.abs(dx),
        Math.abs(dy)
    );

    // incrementos
    let incrementoX = dx / pasos;
    let incrementoY = dy / pasos;

    // punto inicial
    let x = x1;
    let y = y1;

    // recorrer línea
    for(let i=0; i<=pasos; i++){

        plotPixel(
            Math.round(x),
            Math.round(y),
            color
        );

        x += incrementoX;
        y += incrementoY;
    }
}

// ==========================================
// FUNCION PARA DIBUJAR VIEWPORT
// ==========================================

function dibujarViewport(){

    // línea inferior
    dibujarLinea(
        xmin,
        ymin,
        xmax,
        ymin,
        "cyan"
    );

    // línea derecha
    dibujarLinea(
        xmax,
        ymin,
        xmax,
        ymax,
        "cyan"
    );

    // línea superior
    dibujarLinea(
        xmax,
        ymax,
        xmin,
        ymax,
        "cyan"
    );

    // línea izquierda
    dibujarLinea(
        xmin,
        ymax,
        xmin,
        ymin,
        "cyan"
    );
}

// ==========================================
// CALCULAR REGION CODE
// ==========================================

function calcularCodigo(x, y){

    // iniciar dentro
    let codigo = INSIDE;

    // izquierda
    if(x < xmin)
        codigo |= LEFT;

    // derecha
    else if(x > xmax)
        codigo |= RIGHT;

    // abajo
    if(y < ymin)
        codigo |= BOTTOM;

    // arriba
    else if(y > ymax)
        codigo |= TOP;

    return codigo;
}

// ==========================================
// CONVERTIR A BINARIO
// ==========================================

function binario(numero){

    return numero
        .toString(2)
        .padStart(4,"0");
}

// ==========================================
// ALGORITMO COHEN-SUTHERLAND
// ==========================================

function cohenSutherland(x1, y1, x2, y2){

    // calcular region codes
    let codigo1 = calcularCodigo(x1,y1);
    let codigo2 = calcularCodigo(x2,y2);

    // variable de aceptación
    let aceptada = false;

    while(true){

       // ==================================
        // ACEPTACION TRIVIAL
        // ambos puntos están dentro
        // ==================================

        if((codigo1 | codigo2) === 0){

            aceptada = true;
            break;
        }

        // ==================================
        // RECHAZO TRIVIAL
        // ambos puntos comparten región
        // ==================================

        else if((codigo1 & codigo2) !== 0){

            break;
        }

        // ==================================
        // RECORTE PARCIAL
        // ==================================

        else{

            let codigoExterior;
            let x, y;

            // escoger punto externo
            if(codigo1 !== 0)
                codigoExterior = codigo1;

            else
                codigoExterior = codigo2;

            // ARRIBA
            if(codigoExterior & TOP){

                x = x1 + (x2 - x1) *
                    (ymax - y1) / (y2 - y1);

                y = ymax;
            }

            // ABAJO
            else if(codigoExterior & BOTTOM){

                x = x1 + (x2 - x1) *
                    (ymin - y1) / (y2 - y1);

                y = ymin;
            }

            // DERECHA
            else if(codigoExterior & RIGHT){

                y = y1 + (y2 - y1) *
                    (xmax - x1) / (x2 - x1);

                x = xmax;
            }

            // IZQUIERDA
            else if(codigoExterior & LEFT){

                y = y1 + (y2 - y1) *
                    (xmin - x1) / (x2 - x1);

                x = xmin;
            }

            // actualizar punto 1
            if(codigoExterior === codigo1){

                x1 = x;
                y1 = y;

                codigo1 = calcularCodigo(x1,y1);
            }

            // actualizar punto 2
            else{

                x2 = x;
                y2 = y;

                codigo2 = calcularCodigo(x2,y2);
            }
        }
    } 
}
 
    // retornar resultado
    return{

        visible: aceptada,

        x1,
        y1,

        x2,
        y2
    };


// ==========================================
// DIBUJAR ESCENA
// ==========================================

function dibujarEscena(){

    // limpiar canvas
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    // dibujar viewport
    dibujarViewport();

    // obtener escena actual
    let escena = escenas[escenaActual];

    // mostrar nombre
    document.getElementById(
        "nombreEscena"
    ).innerText = escena.nombre;

    // obtener línea
    let l = escena.linea;

    // dibujar línea original
    dibujarLinea(
        l.x1,
        l.y1,
        l.x2,
        l.y2,
        "gray"
    );

    // aplicar algoritmo
    let resultado = cohenSutherland(
        l.x1,
        l.y1,
        l.x2,
        l.y2
    );
        // obtener códigos
    let c1 = calcularCodigo(l.x1,l.y1);
    let c2 = calcularCodigo(l.x2,l.y2);

    // mostrar código P1
    document.getElementById("code1")
        .innerText = binario(c1);

    // mostrar código P2
    document.getElementById("code2")
        .innerText = binario(c2);

    // mostrar operación AND
    document.getElementById("and")
        .innerText = binario(c1 & c2);

    // línea visible
    if(resultado.visible){

        // dibujar línea recortada
        dibujarLinea(
            resultado.x1,
            resultado.y1,
            resultado.x2,
            resultado.y2,
            "lime"
        );

        // aceptación trivial
        if((c1 | c2) === 0){

            document.getElementById(
                "resultado"
            ).innerText =
                "Aceptacion trivial";
             }
     // recorte parcial
        else{

            document.getElementById(
                "resultado"
            ).innerText =
                "Recorte parcial";
        }
    }
  // rechazo trivial
    else{

        document.getElementById(
            "resultado"
        ).innerText =
            "Rechazo trivial";

        // línea rechazada
        dibujarLinea(
            l.x1,
            l.y1,
            l.x2,
            l.y2,
            "red"
        );
    }
}
// ==========================================
// SIGUIENTE ESCENA
// ==========================================

function siguienteEscena(){

    escenaActual++;

    // volver al inicio
    if(escenaActual >= escenas.length)
        escenaActual = 0;

    dibujarEscena();
}

// ==========================================
// ESCENA ANTERIOR
// ==========================================

function anteriorEscena(){

    escenaActual--;

    // volver al final
    if(escenaActual < 0)
        escenaActual = escenas.length - 1;

    dibujarEscena();
}
