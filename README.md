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

The game is built using a grid. A 17 x 17 square is created using JavaScript. HTML divs are created using a for loop and appended as children of the grid.

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

## Challenges
