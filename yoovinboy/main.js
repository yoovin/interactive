import PowerSwitch from "./games/powerswitch.js"
import SnakeGame from "./games/snake.js"

/* 
Todos
테트리스, 비행기게임 등 다른 게임 구현

*/

(()=>{
    let selectedGame
    let games = {snake:"", tetris:""}
    let canvas,
        gamepacks,
        ctx,
        powerSwitch,
        powerLight,
        machine,
        snakeGame,
    

    // Declare buttons
        onoffButton,
        buttonA,
        buttonB,
        startButton,
        selectButton,
        rudderTop,
        rudderleft,
        rudderRight,
        rudderBottom

    // Check variables write present tense
    let isPackClick
    let isMachineOn = false
    let isInsert = false

    window.onload = () => {
        gamepacks = document.querySelectorAll(".gamepack")
        canvas = document.querySelector(".canvas")
        ctx = canvas.getContext("2d")
        powerSwitch = new PowerSwitch(ctx)
        games.snake = new SnakeGame(ctx)
        powerLight = document.querySelector(".light")
        machine = document.querySelector(".machine-body")

        for(let i=0; i < gamepacks.length; i++){
            gamepacks[i].addEventListener("click",() => {
                if(isInsert && !isMachineOn){
                    gamepacks[i].classList.remove("inserted")
                    selectedGame = ""
                    isInsert = false
                }else{
                    gamepacks[i].classList.add("inserted")
                    selectedGame = gamepacks[i].dataset.game
                    isInsert = true
                }
            },false)
        }





        // Declare buttons
        onoffButton = document.querySelector(".machine-onoff-button")
        buttonA = document.querySelector(".button.a")
        buttonB = document.querySelector(".button.b")
        startButton = document.querySelector(".button.start")
        selectButton = document.querySelector(".button.select")
        rudderTop = document.querySelector(".rudder.top")
        rudderleft = document.querySelector(".rudder.left")
        rudderRight = document.querySelector(".rudder.right")
        rudderBottom = document.querySelector(".rudder.bottom")

        onoffButton.addEventListener("click", onoffButtonHandler, false)
        buttonA.addEventListener("click", aButtonHandler, false)
        buttonB.addEventListener("click", bButtonHandler, false)
        startButton.addEventListener("click", startButtonHandler, false)
        selectButton.addEventListener("click", selectButtonHandler, false)

        rudderTop.addEventListener("click",rudderTopHandler, false)
        rudderleft.addEventListener("click",rudderLeftHandler, false)
        rudderRight.addEventListener("click",rudderRightHandler, false)
        rudderBottom.addEventListener("click",rudderBottomHandler, false)
    }

    // BUTTON HANDLER

    function onoffButtonHandler() {
        if(isMachineOn){
            onoffButton.classList.remove("on")
            powerLight.classList.remove("on")
            isMachineOn = false
            if(games[selectedGame])
            games[selectedGame].turnOff()
            powerSwitch.turnOff()
        }else{
            onoffButton.classList.add("on")
            powerLight.classList.add("on")
            isMachineOn = true
            powerSwitch.turnOn(isInsert,()=>{
                games[selectedGame].play()
            })
        }
        
    }

    function aButtonHandler() {
        games[selectedGame].keyDownA()
    }

    function bButtonHandler() {
        games[selectedGame].keyDownB()
    }

    function startButtonHandler() {
        games[selectedGame].keyDownStart()
    }

    function selectButtonHandler() {
        games[selectedGame].keyDownSelect()
    }

    function rudderTopHandler() {
        games[selectedGame].keyDownTop()
    }

    function rudderLeftHandler() {
        games[selectedGame].keyDownLeft()
    }

    function rudderRightHandler() {
        games[selectedGame].keyDownRight()
    }

    function rudderBottomHandler() {
        games[selectedGame].keyDownBottom()
    }


})()