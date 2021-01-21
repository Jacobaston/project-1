const grid = document.querySelector('.grid')
const points = document.querySelector('#points')
const lose = document.querySelector('.lose')
const button = document.querySelector('.reset')
const up = document.querySelector('.up')
const down = document.querySelector('.down')
const left = document.querySelector('.left')
const right = document.querySelector('.right')

console.log('hello')

const width = 17 // ! DO NOT TOUCH
const cells = []

let pacMan = 194
const ghost1 = 125
const ghost2 = 128
const ghost3 = 160
const ghost4 = 162
let score = 0

// Create grid
for (let index = 0; index < width ** 2; index++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  cell.innerHTML = index // ! DO NOT TOUCH
}

const block = Array.from(document.querySelectorAll('div'))

const walls = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 25, 33, 34, 36, 37, 39, 40, 42, 44, 45, 47, 48, 50, 51, 53, 54, 56, 57, 59, 61, 62, 64, 65, 67, 68, 84, 85, 87, 88, 90, 91, 93, 95, 96, 98, 99, 101, 102, 107, 108, 110, 112, 113, 118, 119, 120, 121, 122, 132, 133, 134, 135, 141, 142, 143, 145, 146, 147, 153, 154, 155, 156, 166, 167, 168, 169, 170, 175, 176, 177, 178, 179, 180, 181, 186, 187, 189, 190, 200, 201, 203, 204, 206, 207, 209, 210, 211, 212, 213, 214, 215, 217, 218, 220, 221, 229, 237, 238, 240, 241, 242, 243, 244, 246, 248, 249, 250, 251, 252, 254, 255, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288]

const food = [18, 19, 20, 21, 22, 23, 24, 26, 27, 28, 29, 30, 31, 32, 35, 38, 41, 43, 46, 49, 55, 58, 60, 63, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 86, 89, 92, 94, 97, 100, 103, 104, 105, 106, 109, 111, 114, 115, 116, 117, 123, 124, 125, 129, 130, 131, 140, 144, 148, 157, 158, 159, 163, 164, 165, 171, 172, 173, 174, 182, 183, 184, 185, 188, 191, 192, 193, 194, 196, 197, 198, 199, 202, 208, 216, 222, 223, 224, 225, 226, 227, 228, 230, 231, 232, 233, 234, 235, 236, 239, 259, 245, 247, 253, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270]

const winner = [37, 39, 42, 45, 47, 54, 56, 58, 60, 62, 64, 72, 75, 77, 79, 81, 89, 92, 94, 96, 98, 106, 110, 113, 114, 115, 155, 159, 161, 163, 167, 172, 176, 178, 180, 181, 184, 189, 191, 193, 195, 197, 199, 201, 207, 209, 212, 214, 217, 218, 224, 226, 229, 231, 235]

// Render walls
for (let i = 0; i < walls.length; i++) {
  for (let j = 0; j < cells.length; j++) {
    if (walls[i] === Number(cells[j].innerHTML)) {
      block[j].classList.add('wall')
    }
  }
}

// Render food
for (let i = 0; i < food.length; i++) {
  for (let j = 0; j < cells.length; j++) {
    if (food[i] === Number(cells[j].innerHTML)) {
      block[j].classList.add('food')
    }
  }
}

// Render special coins
for (let i = 0; i < cells.length; i++) {
  if (Number(cells[i].innerHTML) === 52 || Number(cells[i].innerHTML) === 66 || Number(cells[i].innerHTML) === 205 || Number(cells[i].innerHTML) === 219) {
    block[i].classList.add('coin')
  }
}

// Create Pac-man initial instance 
cells[pacMan].classList.remove('pacmanRight')
pacMan += 1
cells[pacMan].classList.add('pacmanRight')

//////////-Above this line is just for grid-genoration////////////

function moveEvent(event) {
  const key = event.keyCode

  if ((key === 68 || key === 39) && !((pacMan + 1) % width === 0) && !(walls.includes(pacMan + 1))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan += 1
    cells[pacMan].classList.add('pacmanRight')
  } else if ((key === 65 || key === 37) && !(pacMan % width === 0) && !(walls.includes(pacMan - 1))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan -= 1
    cells[pacMan].classList.add('pacmanLeft')
  } else if ((key === 83 || key === 40) && !(pacMan + width >= width ** 2) && !(walls.includes(pacMan + 17))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan += width
    cells[pacMan].classList.add('pacmanDown')
  } else if ((key === 87 || key === 38) && !(pacMan < width) && !(walls.includes(pacMan - 17))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan -= width
    cells[pacMan].classList.add('pacmanUp')
  }
}

// Desktop event listeners
document.addEventListener('keydown', moveEvent)

// Mobile event listeners
function rightEvent() {
  if (!((pacMan + 1) % width === 0) && !(walls.includes(pacMan + 1))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan += 1
    cells[pacMan].classList.add('pacmanRight')
  }
}

function upEvent() {
  if (!(pacMan < width) && !(walls.includes(pacMan - 17))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan -= width
    cells[pacMan].classList.add('pacmanUp')
  }
}

function downEvent() {
  if (!(pacMan + width >= width ** 2) && !(walls.includes(pacMan + 17))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan += width
    cells[pacMan].classList.add('pacmanDown')
  }
}

function leftEvent() {
  if (!(pacMan % width === 0) && !(walls.includes(pacMan - 1))) {
    removeFood()
    special()
    removeRecurrence()
    pacMan -= 1
    cells[pacMan].classList.add('pacmanLeft')
  }
}

right.addEventListener('click', rightEvent)
up.addEventListener('click', upEvent)
down.addEventListener('click', downEvent)
left.addEventListener('click', leftEvent)

function removeRecurrence() {
  cells[pacMan].classList.remove('pacmanRight')
  cells[pacMan].classList.remove('pacmanUp')
  cells[pacMan].classList.remove('pacmanDown')
  cells[pacMan].classList.remove('pacmanLeft')
}

// Pacman eats food
function removeFood() {
  if (cells[pacMan].classList.contains('food')) {
    cells[pacMan].classList.remove('food')
    score = score + 10
    points.innerHTML = score
    checkForWinner()
  }
}

// Special coins
function special() {
  if (cells[pacMan].classList.contains('coin')) {
    cells[pacMan].classList.remove('coin')
    score = score + 100
    points.innerHTML = score
  }
}

// Random movement of ghosts
function getCoordinates(index) {
  return [index % width, Math.floor(index / width)]
}

function moveGhost(ghost, color) {
  const movement = [+1, + width, -1, - width]
  let direction = 1

  const [ghostX, ghostY] = getCoordinates(ghost)
  const [pacManX, pacManY] = getCoordinates(pacMan)
  const [ghostNextX, ghostNextY] = getCoordinates(ghost + direction)

  function isXCoordCloser() {
    if ((ghostNextX - pacManX) > (ghostX - pacManX)) {
      return true
    } else return false
  }

  function isYCoordCloser() {
    if ((ghostNextY - pacManY) > (ghostY - pacManY)) {
      return true
    } else return false
  }

  ghostimerId = setInterval(function () {
    if (!cells[ghost + direction].classList.contains('wall')) {
      cells[ghost].classList.remove(color)

      if (isXCoordCloser() || isYCoordCloser()) {
        ghost += direction
        cells[ghost].classList.add(color)
        direction = movement[Math.floor(Math.random() * movement.length)]
      } else {
        cells[ghost].classList.add(color)
        direction = movement[Math.floor(Math.random() * movement.length)]
      }
      cells[ghost].classList.add(color)
    } else direction = movement[Math.floor(Math.random() * movement.length)]

    if (cells[ghost].classList.contains('pacmanRight') || cells[ghost].classList.contains('pacmanLeft') || cells[ghost].classList.contains('pacmanUp') || cells[ghost].classList.contains('pacmanDown')) {
      lose.innerHTML = `Game Over! You scored ${points.innerHTML} points`
      clearIntervals()
      document.removeEventListener('keydown', moveEvent)
      right.removeEventListener('click', rightEvent)
      up.removeEventListener('click', upEvent)
      down.removeEventListener('click', downEvent)
      left.removeEventListener('click', leftEvent)
    }
  }, 250)
}

moveGhost(ghost1, 'ghost-1')
moveGhost(ghost2, 'ghost-2')
moveGhost(ghost3, 'ghost-3')
moveGhost(ghost4, 'ghost-4')

function clearIntervals() {
  clearInterval(1)
  clearInterval(2)
  clearInterval(3)
  clearInterval(4)
}

function checkForWinner() {
  if (score >= 100) {
    clearIntervals()
    removeRecurrence()

    for (let i = 0; i < walls.length; i++) {
      for (let j = 0; j < cells.length; j++) {
        if (walls[i] === Number(cells[j].innerHTML)) {
          block[j].classList.remove('wall')
        }
      }
    }

    for (let i = 0; i < winner.length; i++) {
      for (let j = 0; j < cells.length; j++) {
        if (winner[i] === Number(cells[j].innerHTML)) {
          block[j].classList.add('winner')
        } else {
          block[j].classList.add('wall')
        }
      }
    }

    document.removeEventListener('keydown', moveEvent)
    right.removeEventListener('click', rightEvent)
    up.removeEventListener('click', upEvent)
    down.removeEventListener('click', downEvent)
    left.removeEventListener('click', leftEvent)

    setTimeout(() => {
      location.reload()
    }, 6000)
  }
}

function reset() {
  button.addEventListener('click', () => {
    location.reload()
  })
}
reset()