const grid = document.querySelector('.grid')

const width = 17 // ! DO NOT TOUCH
const cells = []

let pacMan = 194
let ghost1 = 125
let ghost2 = 126
let ghost3 = 127
let ghost4 = 143

// Create grid
for (let index = 0; index < width ** 2; index++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  cell.innerHTML = index // ! DO NOT TOUCH
}

const block = Array.from(document.querySelectorAll('div'))

const walls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 25, 33, 34, 36, 37, 39, 40, 42, 44, 45, 47, 48, 50, 51, 53, 54, 56, 57, 59, 61, 62, 64, 65, 67, 68, 84, 85, 87, 88, 90, 91, 92, 93, 94, 95, 96, 98, 99, 101, 102, 107, 113, 118, 119, 120, 121, 122, 124, 130, 132, 133, 134, 135, 153, 154, 155, 156, 158, 164, 166, 167, 168, 169, 170, 175, 176, 177, 178, 179, 180, 181, 186, 187, 189, 190, 200, 201, 203, 204, 206, 207, 209, 210, 211, 212, 213, 214, 215, 217, 218, 220, 221, 229, 237, 238, 240, 241, 242, 243, 244, 246, 248, 249, 250, 251, 252, 254, 255, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288]

const food = [18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 35, 38, 41, 43, 46, 49, 55, 58, 60, 63, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 86, 89, 97, 100, 103, 104, 105, 106, 114, 115, 116, 117, 123, 131, 140, 148, 157, 165, 171, 172, 173, 174, 182, 183, 184, 185, 188, 191, 192, 193, 194, 196, 197, 198, 199, 202, 208, 216, 222, 223, 224, 225, 226, 227, 228, 230, 231, 232, 233, 234, 235, 236, 239, 259, 245, 247, 253, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270]

for (let i = 0; i < walls.length; i++) {
  for (let j = 0; j < cells.length; j++) {
    if (walls[i] === Number(cells[j].innerHTML)) {
      block[j].classList.add('wall')
    }
  }
}

for (let i = 0; i < food.length; i++) {
  for (let j = 0; j < cells.length; j++) {
    if (food[i] === Number(cells[j].innerHTML)) {
      block[j].innerHTML = '•'
      block[j].classList.add('food')
    }
  }
}

for (let i = 0; i < cells.length; i++) {
  if (Number(cells[i].innerHTML) === 52 || Number(cells[i].innerHTML) === 66 || Number(cells[i].innerHTML) === 205 || Number(cells[i].innerHTML) === 219) {
    block[i].classList.add('coin')
  }
}

//////////-Above this line is just for grid-genoration////////////

// Create characters
// Pac-man
cells[pacMan].classList.remove('pacmanRight')
pacMan += 1
cells[pacMan].classList.add('pacmanRight')

// Ghost 1
cells[ghost1].classList.remove('ghost-1')
ghost1 += 1
cells[ghost1].classList.add('ghost-1')
// Ghost 2
cells[ghost2].classList.remove('ghost-2')
ghost2 += 1
cells[ghost2].classList.add('ghost-2')
// Ghost 3
cells[ghost3].classList.remove('ghost-1')
ghost3 += 1
cells[ghost3].classList.add('ghost-1')
// Ghost 4
cells[ghost4].classList.remove('ghost-1')
ghost4 += 1
cells[ghost4].classList.add('ghost-1')

// Movement of character
document.addEventListener('keyup', (event) => {
  const key = event.keyCode
  console.log()

  if ((key === 68 || key === 39) && !((pacMan + 1) % width === 0) && !(walls.includes(pacMan + 1))) {
    removeFood()
    removeRecurrence()
    pacMan += 1
    cells[pacMan].classList.add('pacmanRight')
  } else if ((key === 65 || key === 37) && !(pacMan % width === 0) && !(walls.includes(pacMan - 1))) {
    removeFood()
    removeRecurrence()
    pacMan -= 1
    cells[pacMan].classList.add('pacmanLeft')
  } else if ((key === 83 || key === 40) && !(pacMan + width >= width ** 2) && !(walls.includes(pacMan + 17))) {
    removeFood()
    removeRecurrence()
    pacMan += width
    cells[pacMan].classList.add('pacmanDown')
  } else if ((key === 87 || key === 38) && !(pacMan < width) && !(walls.includes(pacMan - 17))) {
    removeFood()
    removeRecurrence()
    pacMan -= width
    cells[pacMan].classList.add('pacmanUp')
  }
})

function removeRecurrence() {
  cells[pacMan].classList.remove('pacmanRight')
  cells[pacMan].classList.remove('pacmanUp')
  cells[pacMan].classList.remove('pacmanDown')
  cells[pacMan].classList.remove('pacmanLeft')
}

// Pacman eats food
function removeFood() {
  for (let i = 0; i < food.length; i++) {
    if (pacMan === food[i]) {
      block[food[i]].classList.remove('food')
      block[food[i]].innerHTML = ''
    }
  }
}