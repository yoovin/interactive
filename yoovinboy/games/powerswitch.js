export default class PowerSwitch {
    constructor(ctx){
        this.ctx = ctx
        this.animation
        this.y = 0
    }

    turnOn(isInsert, callback){
        if(isInsert){
            if(this.animation % 2 == 0){
                this.ctx.font = '30px "Press Start 2P"'
                this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
                this.ctx.fillText("YOOVIN BOY®", 30, this.y)
                if(this.y == 200){
                    setTimeout(()=>{
                        callback()
                    },3000)
                    return
                }
                this.y+=2
            }
        }else{
            this.ctx.font = '25px "Press Start 2P"'
            this.ctx.fillText("Please Insert", 40, 180)
            this.ctx.fillText("Game Pack!", 80, 230)
        }
        this.animation = requestAnimationFrame(()=>this.turnOn(isInsert, callback))
    }

    
    turnOff() {
        cancelAnimationFrame(this.animation)
        this.y = 0
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }
}