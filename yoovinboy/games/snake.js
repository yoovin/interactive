export default function SnakeGame(ctx) {
    class SnakePart{
        constructor(x, y){
            this.x = x
            this.y = y
        }
    }
    let tileCount = 20
    let tileSize = ctx.canvas.width / tileCount - 2
    let headX = 10
    let headY = 10
    let snakeParts = []
    let tailLength = 2
    
    let appleX = 5
    let appleY = 5
    
    let xVelocity = 0
    let yVelocity = 0
    let playing = 0
    
    let score = 0

    let isStart = false
    let isPause = false
    let gameOver = false
    
    //game loop
    this.play = () =>{
        if(!isStart){
            this.firstPage()
        }

        if(playing % 10 == 0){
            this.changeSnakePosition()
            this.isGameOver()
            if(gameOver){
                return
            }
            
            this.clearScreen()  
            this.checkAppleCollision()
            this.drawApple()
            this.drawSnake()
            this.drawScore()
        }
        playing = requestAnimationFrame(this.play)
    }

    this.start = () => {
        if(!isStart){
            isStart = true
        }
    }

    this.restart = () => {
    if(gameOver){
        this.reset()
        this.play()
        }
    }

    this.reset = () => {
    gameOver = false
    snakeParts = []
    tailLength = 2
    appleX = 5
    appleY = 5
    xVelocity = 0
    yVelocity = 0
    playing = 0
    score = 0
    headX = 10
    headY = 10
    }

    this.turnOff = () => {
        isStart = false
        cancelAnimationFrame(playing)
        this.reset()
        this.clearScreen()
    }

    this.pauseGame = () =>{
        if(gameOver || !isStart)return
        if(isPause){
            this.play()
            isPause = false
        }else{
            cancelAnimationFrame(playing)
            ctx.fillStyle = "white"
            ctx.font = "50px 'Press Start 2P'"
            ctx.fillText("-Pause-", 30, ctx.canvas.height / 2 - 50)
            ctx.font = "15px 'Press Start 2P'"
            ctx.fillText("Press Start To Continue",30 , ctx.canvas.height / 2)
            isPause = true
        }
    }
    
    this.isGameOver=()=>{
        if(yVelocity == 0 && xVelocity == 0){
            gameOver = false
            return
        }
    
        //walls
        if(headX < 0){
            gameOver = true;
        }
        else if(headX == tileCount){
            gameOver = true
        }
        else if(headY < 0){
            gameOver = true
        }
        else if(headY == tileCount){
            gameOver = true
        }
    
        for(let i=0; i < snakeParts.length; i++){
            let part = snakeParts[i]
            if(part.x == headX && part.y == headY){
                gameOver = true
                break
            }
        }
    
        if(gameOver) {
            ctx.fillStyle = "white"
            ctx.font = "30px 'Press Start 2P'"
            ctx.fillText("-Game Over!-", 30, ctx.canvas.height / 2 - 50)
            ctx.font = "18px 'Press Start 2P'"
            ctx.fillText("Press A To Restart",45 , ctx.canvas.height / 2)
        }
    
        return
    }

    this.firstPage = () => {
        ctx.fillStyle = "white"
        ctx.font = "30px 'Press Start 2P'"
        ctx.fillText("Snake Game", 45, ctx.canvas.height / 2 - 50)
        ctx.font = "18px 'Press Start 2P'"
        ctx.fillText("Press Arrow To Start",20 , ctx.canvas.height / 2)
        ctx.font = "10px 'Press Start 2P'"
        ctx.fillText("Start BTN => Pause / Countinue",45 , ctx.canvas.height / 2 + 100)
    }
    
    this.drawScore=()=>{
        ctx.fillStyle = "white"
        ctx.font = "20px 'Press Start 2P'"
        ctx.fillText(`Score ${score}`, ctx.canvas.width - 180, 30)
    }
    
    this.clearScreen=()=>{
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    }
    
    this.drawSnake=()=>{
        ctx.fillStyle = 'green'
        for(let i=0; i < snakeParts.length; i++){
            let part = snakeParts[i]
            ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
        }
    
        snakeParts.push(new SnakePart(headX, headY))
        if(snakeParts.length > tailLength){
            snakeParts.shift()
        }
        ctx.fillStyle = "orange"
        ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)
    
    }
    
    this.drawApple=()=>{
        ctx.fillStyle = "red"
        ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
    }
    
    this.checkAppleCollision=()=>{
        if(appleX == headX && appleY == headY){
            appleX = Math.floor(Math.random() * tileCount)
            appleY = Math.floor(Math.random() * tileCount)
            tailLength++
            score++
        }
    }
    
    this.changeSnakePosition = ()=>{
        headX = headX + xVelocity
        headY = headY + yVelocity
    }
    

    // Key Controll
    this.keyDownTop = () => {
        this.start()
        if(yVelocity == 1)
            return
        yVelocity = -1
        xVelocity = 0
    }

    this.keyDownBottom = () =>{
        this.start()
        if(yVelocity == -1)
            return
        yVelocity = 1
        xVelocity = 0
    }

    this.keyDownLeft = () =>{
        this.start()
        if(xVelocity == 1)
            return
        yVelocity = 0
        xVelocity = -1
    }

    this.keyDownRight = () =>{
        this.start()
        if(xVelocity == -1)
            return
        yVelocity = 0
        xVelocity = 1
    }

    this.keyDownStart = () => {
        this.pauseGame()
    }

    this.keyDownSelect = () => {
    }

    this.keyDownA = () => {
        this.restart()
    }

    this.keyDownB = () => {
    }
}