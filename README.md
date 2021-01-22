### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive
# Pacman

## Overview
Pacman was my first ever front-end development project, produced as a part of a General Assemebly Immersive Software Engineering bootcamp.

My task was to create a grid-based game rendered in the browser that utilised 'vanilla' JavaScript, HTML and CSS.

Given a list of options from GA, I chose to re-create the classic game **Pac-Man**. I chose to stick to the retro styling of the classic pacman game, sticking to the original pacman/ghost images and the neon style maze.

The project was to consolidate my beginners' knowledge of JavaScript and interacting with the DOM that I had learn't over the first 3 weeks of the course

You can play the game [here](https://jacobaston.github.io/project-1/)

## The Brief 

- **Render a game in the browser**
- **Design logic for winning & visually display a winning message**
- **Include separate HTML / CSS / JavaScript files**
- Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
- Use **Javascript** for **DOM manipulation**
- **Deploy your game online**, where the rest of the world can access it
- Use **semantic markup** for HTML and CSS (adhere to best practices)

## The Technologies used 

- HTML5
- CSS3
- JavaScript (ES6)
- Git and GitHub
- Google Fonts

## The Approach

### The Grid

The game is built using a grid. A 17 x 17 square is created using JavaScript. HTML divs are created using a for loop and appended as children of the grid, then stored in an array called 'cells'.

 ```js
const grid = document.querySelector('.grid')

const width = 17 
const cells = []
 
for (let index = 0; index < width ** 2; index++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.appendChild(cell)
  cells.push(cell)
  cell.innerHTML = index
}
 ```
 The walls, food and the special coins were then rendered to the grid using an array of grid indicies, then looping through the arrays to match the corrosponding index on the grid.
 
 ```js
 const block = Array.from(document.querySelectorAll('div'))

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
 ```
## Ghost movement

- A single function is used to determine each ghost's movement. As in the original game, ghosts will look to move closer to pacman as they chase him around the board. 
  - The function starts by grabbing the current position of all the ghosts and pacman, then stores these in an array
  - Once the coordinates have been obtained two further functions within the main function compare the positions on the X & Y axis
  - A interval timer is then added in order to call the comparison functions for pacman and the ghosts, checking the positions every .25 of a second. If the ghost eventually finds pacman the game will then end 

```js
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
 ```
 
## Challenges
