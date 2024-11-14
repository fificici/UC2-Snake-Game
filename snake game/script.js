const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

let tileSize = 20
let snake = [{x: 10, y: 10}]
let dx = 0
let dy = 0
let food = {x: 15, y: 15}  // Corrigido para um objeto
let gameOver = false
let paused = false

function drawSnake () {
    ctx.fillStyle = '#7fff00'

    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize)
    })
}

function drawFood () {
    ctx.fillStyle = '#dc143c'

    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize)
}

function moveSnake () {
    if (!paused) {
        const head = { x: snake[0].x + dx, y: snake[0].y + dy }
        snake.unshift(head)

        if (head.x === food.x && head.y === food.y) {
            generateFood()  // Gera comida nova após comer
        } else {
            snake.pop()
        }

        if (checkCollision()) {
            gameOver = true
            setTimeout(() => {
                location.reload()
            }, 5000)
        }
    }
}

function generateFood() {
    food.x = Math.floor(Math.random() * canvas.width / tileSize)
    food.y = Math.floor(Math.random() * canvas.height / tileSize)
}

function clearCanvas () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function update() {
    clearCanvas()
    drawFood()
    drawSnake()
    moveSnake()
    if (!gameOver) {
        setTimeout(update, 100)
    } else {
        ctx.fillStyle = '#f8f8ff'
        ctx.font = '30px Times New Roman'
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2)
    }
}

function checkCollision () {
    let head = snake[0]
    // Verifica colisão com o próprio corpo
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true
        }
    }
    // Verifica colisão com as bordas
    return head.x < 0 || head.x >= canvas.width / tileSize || head.y < 0 || head.y >= canvas.height / tileSize
}

function main () {
    update()
}

document.addEventListener('keydown', e => {
    if (!gameOver && !paused) {
        switch (e.key) {
            case 'ArrowUp':
                if (dy === 0){
                    dx = 0
                    dy = -1
                }
                break
            case 'ArrowDown':
                if (dy === 0) {
                    dx = 0
                    dy = 1
                }
                break
            case 'ArrowLeft':
                if (dx === 0) {
                    dx = -1
                    dy = 0
                }
                break
            case 'ArrowRight':
                if (dx === 0) {
                    dx = 1
                    dy = 0
                }
        }
    }
})

let pause = document.getElementById('pause')
pause.addEventListener('click', () => {
    paused = !paused
    pause.textContent = paused ? 'Resume' : 'Pause'  // Corrigido para textContent
})

main()
