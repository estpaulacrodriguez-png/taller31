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