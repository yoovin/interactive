window.onload = () => {
    let text = ""
    let monitor = document.querySelectorAll(".monitor")[0]

    window.onkeydown = (e) => {
        let pressKey
        e.preventDefault()

        if(e.keyCode == 8){
            pressKey = document.getElementById("backspace")
            text = text.slice(0, -1)
        }else if(e.keyCode == 9){
            pressKey = document.getElementById("tab")
        }else if(e.keyCode == 16){
            pressKey = document.getElementById("rshift")
        }else if(e.keyCode == 18){
            pressKey = document.getElementById("ropt")
        }else{
            pressKey = document.getElementById("c" + e.keyCode)
            text += e.key
        }
        pressKey.classList.add("clicked")

        
        monitor.innerHTML  = text
    }

    window.onkeyup = (e) => {
        e.preventDefault()
        let pressKey

        if(e.keyCode == 8){
            pressKey = document.getElementById("backspace")
        }else if(e.keyCode == 9){
            pressKey = document.getElementById("tab")
        }else if(e.keyCode == 16){
            pressKey = document.getElementById("rshift")
        }else if(e.keyCode == 18){
            pressKey = document.getElementById("ropt")
        }else{
            pressKey = document.getElementById("c" + e.keyCode)
        }
        pressKey.classList.remove("clicked")
    }
}
