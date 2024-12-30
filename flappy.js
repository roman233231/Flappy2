let bird = new Image()
bird.src = "img/bird.png"

let back = new Image()
back.src = "img/back.png"

let pipeBottom = new Image()
pipeBottom.src = "img/pipeBottom.png"

let pipeUp = new Image()
pipeUp.src = "img/pipeUp.png"

let road = new Image()
road.src = "img/road.png"

let fly_audio = new Audio()
fly_audio.src = "audio/fly.mp3"

let score_audio = new Audio()
score_audio.src = "audio/score.mp3"

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

canvas.width = 256
canvas.height = 512

let score_text = document.getElementById("score")
let best_score_text = document.getElementById("best_score")

let score = 0
let best_score = 0

let xPos = 10
let yPos = 150

let velY = 0
let gravity = 0.2

let pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}

let gap = 110

let Pauses =  false
function game_pause(){
    Pauses = !Pauses
}


document.addEventListener("keydown", function(event) {
    if(event.code === "Space")
        moveUp()
})

function draw() {
    if(Pauses)  return

    ctx.drawImage(back, 0, 0)
    ctx.drawImage(bird, xPos, yPos)
   
    if (yPos + bird.height >= canvas.height - road.height){
         reload()
    }
    
         velY += gravity
        yPos += velY
        for (let  i = 0; i < pipe.length; i++){
        if (pipe[i].x < -pipeUp.width){
            pipe.shift()
        }
        else {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
            pipe[i].x -=2
            if (pipe[i].x == 80){
            pipe.push({
             x: canvas.width,
             y:Math.floor(Math.random() * pipeUp.height) - pipeUp.height
        })
         }
        }
             if(xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
         (yPos <= pipe[i].y + pipeUp.height ||
            yPos + bird.height >= pipe[i].y + pipeUp.height + gap
        ))
        {
            reload()
        }
        if(pipe[i].x == 0){
            score++
            
            score_audio.play()
        }
    }
            ctx.drawImage(road, 0, canvas.height - road.height)
            score_text.innerHTML = "Score: " + score
            best_score_text.innerHTML = "Best score: " + best_score
    }
setInterval(draw, 20)

function reload() {
    if (score > best_score){
        best_score = score
    }
    score = 0
    xPos = 10
    yPos = 150
    velY = 0
    gravity = 0.2
    pipe = []
    pipe[0] = {
    x: canvas.width,
    y: 0
}
}
 function moveUp(){
    velY = -4
    fly_audio.play()
 }

canvas.addEventListener('click', moveUp)