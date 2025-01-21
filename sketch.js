const celdas = [];
let RETICULAX = parseInt(document.getElementById("cellSize").value);
let RETICULAY;
let ancho; // ancho de la celda
let alto; // alto de la celda
const startButton = document.getElementById("start");

const azulejos = [];

const reglas = [
  { UP: 0, RIGHT: 1, DOWN: 1, LEFT: 0 }, // Tile 0
  { UP: 1, RIGHT: 1, DOWN: 3, LEFT: 0 }, // Tile 1
  { UP: 2, RIGHT: 1, DOWN: 1, LEFT: 0 }, // Tile 2
  { UP: 1, RIGHT: 1, DOWN: 3, LEFT: 2 }, // Tile 3
  { UP: 1, RIGHT: 3, DOWN: 1, LEFT: 0 }, // Tile 4
  { UP: 3, RIGHT: 3, DOWN: 3, LEFT: 1 }, // Tile 5
  { UP: 0, RIGHT: 1, DOWN: 0, LEFT: 3 }, // Tile 6
  { UP: 0, RIGHT: 2, DOWN: 1, LEFT: 1 }, // Tile 7
  { UP: 1, RIGHT: 0, DOWN: 0, LEFT: 3 }, // Tile 8
  { UP: 1, RIGHT: 3, DOWN: 3, LEFT: 0 }, // Tile 9
  { UP: 1, RIGHT: 0, DOWN: 1, LEFT: 1 }, // Tile 10
  { UP: 0, RIGHT: 2, DOWN: 1, LEFT: 0 }, // Tile 11
  { UP: 1, RIGHT: 1, DOWN: 1, LEFT: 2 }, // Tile 12
  { UP: 0, RIGHT: 1, DOWN: 0, LEFT: 3 }, // Tile 13
  { UP: 3, RIGHT: 1, DOWN: 1, LEFT: 3 }, // Tile 14
  { UP: 1, RIGHT: 1, DOWN: 3, LEFT: 2 }, // Tile 15
  { UP: 1, RIGHT: 1, DOWN: 1, LEFT: 0 }, // Tile 16
  { UP: 3, RIGHT: 0, DOWN: 1, LEFT: 3 }, // Tile 17
  { UP: 2, RIGHT: 3, DOWN: 0, LEFT: 0 }, // Tile 18
  { UP: 1, RIGHT: 0, DOWN: 2, LEFT: 1 }, // Tile 19
  // (resto de las reglas)
];

const NA = reglas.length; // número de azulejos

function preload() {
  for (let i = 0; i < NA; i++) {
    azulejos[i] = loadImage(`azulejos/tile${i}.png`);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  ancho = width / RETICULAX;
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }
  for (let i = 0; i < RETICULAX * RETICULAY; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI.slice(), // Clonar opciones iniciales
    };
  }

  if (startButton) {
    startButton.addEventListener("click", resetAll);
  } else {
    console.error("Start button not found!");
  }
}

function draw() {
  const celdasConOpciones = celdas.filter((celda) => celda.opciones.length > 0);
  const celdasDisponibles = celdasConOpciones.filter(
    (celda) => !celda.colapsada
  );

  if (celdasDisponibles.length > 0) {
    celdasDisponibles.sort((a, b) => a.opciones.length - b.opciones.length);
    const celdasPorColapsar = celdasDisponibles.filter(
      (celda) => celda.opciones.length === celdasDisponibles[0].opciones.length
    );

    const celdaSeleccionada = random(celdasPorColapsar);
    celdaSeleccionada.colapsada = true;

    const opcionSeleccionada = random(celdaSeleccionada.opciones);
    celdaSeleccionada.opciones = [opcionSeleccionada];

    for (let x = 0; x < RETICULAX; x++) {
      for (let y = 0; y < RETICULAY; y++) {
        const celdaIndex = x + y * RETICULAX;
        if (celdaIndex < celdas.length) {
          const celdaActual = celdas[celdaIndex];
          if (celdaActual.colapsada) {
            const indiceDeAzulejo = celdaActual.opciones[0];
            const reglasActuales = reglas[indiceDeAzulejo];
            image(azulejos[indiceDeAzulejo], x * ancho, y * alto, ancho, alto);
          }
        }
      }
    }
  }
}

function resetAll() {
  RETICULAX = parseInt(document.getElementById("cellSize").value);
  ancho = width / RETICULAX;
  alto = ancho;
  RETICULAY = Math.floor(height / ancho);

  background(240);

  let opcionesI = [];
  for (let i = 0; i < azulejos.length; i++) {
    opcionesI.push(i);
  }
  for (let i = 0; i < RETICULAX * RETICULAY; i++) {
    celdas[i] = {
      colapsada: false,
      opciones: opcionesI.slice(),
    };
  }
}
