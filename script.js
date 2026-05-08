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