(() => {
    let audio = new Audio("./src/Harudorobou.mp3")
    let audioIsPlaying = true
    let backgroundImg
    let lyricSpans
    let lyricsCount = 0
    let orderCheck = true
    let loadingSpan
    let lyricBar
    let lpdisk

    const lyrics = [
        {text:"春泥棒 -ヨルシカ-", startTime:1},
        {text:"高架橋を抜けたら", startTime:17},
        {text:"雲の隙間に青が覗いた", startTime:21},
        {text:"最近どうも暑いから", startTime:25},
        {text:"ただ風が吹くのを待ってた", startTime:28},
        {text:"木陰に座る", startTime:32},
        {text:"何か頬に付く", startTime:36},
        {text:"見上げれば頭上に咲いて散る", startTime:40},
        {text:"はらり、僕らもう息も忘れて", startTime:47},
        {text:"瞬きさえ億劫", startTime:51},
        {text:"さぁ、今日さえ明日過去に変わる", startTime:55},
        {text:"ただ風を待つ", startTime:59},
        {text:"だから僕らもう声も忘れて", startTime:62},
        {text:"さよならさえ億劫", startTime:66},
        {text:"ただ花が降るだけ", startTime:70},
        {text:"晴れり、今、春吹雪", startTime:74},
        {text:"間奏中。。。", startTime:78},
        {text:"次の日も待ち合わせ", startTime:94},
        {text:"花見の客も少なくなった", startTime:98},
        {text:"春の匂いはもう止む", startTime:101},
        {text:"今年も夏が来るのか", startTime:105},
        {text:"高架橋を抜けたら", startTime:109},
        {text:"道の先に君が覗いた", startTime:113},
        {text:"残りはどれだけかな", startTime:116},
        {text:"どれだけ春に会えるだろう", startTime:121},
        {text:"川沿いの丘", startTime:124},
        {text:"木陰に座る", startTime:128},
        {text:"また昨日と変わらず今日も咲く", startTime:132},
        {text:"花に、僕らもう息も忘れて", startTime:139},
        {text:"瞬きさえ億劫", startTime:143},
        {text:"花散らせ今吹くこの嵐は", startTime:147},
        {text:"まさに春泥棒", startTime:151},
        {text:"風に今日ももう時が流れて", startTime:154},
        {text:"立つことさえ億劫", startTime:159},
        {text:"花の隙間に空", startTime:162},
        {text:"散れり、まだ、春吹雪", startTime:166},
        {text:"間奏中。。。", startTime:170},
        {text:"今日も会いに行く", startTime:185},
        {text:"木陰に座る", startTime:189},
        {text:"溜息を吐く", startTime:193},
        {text:"花ももう終わる", startTime:197},
        {text:"明日も会いに行く", startTime:201},
        {text:"春がもう終わる", startTime:205},
        {text:"名残のるように時間が散っていく", startTime:209},
        {text:"愛を歌えば言葉足らず", startTime:217},
        {text:"踏む韻さえ億劫", startTime:220},
        {text:"花開いた今を言葉如きが語れるものか", startTime:224},
        {text:"はらり、僕らもう声も忘れて", startTime:231},
        {text:"瞬きさえ億劫", startTime:235},
        {text:"花見は僕らだけ", startTime:239},
        {text:"散るなまだ、春吹雪", startTime:243},
        {text:"あともう少しだけ", startTime:247},
        {text:"もう数えられるだけ", startTime:251},
        {text:"あと花二つだけ", startTime:262},
        {text:"もう花一つだけ", startTime:270},
        {text:"ただ葉が残るだけ", startTime:278},
        {text:"はらり、今、春仕舞い", startTime:281},
        {text:"Thanks For Watching!", startTime:286}
    ]

    window.onload = () => {
        backgroundImg = document.querySelector(".background-img")
        lyricSpans = document.querySelectorAll(".lyrics")
        loadingSpan = document.querySelector(".playing-text")
        lyricBar = document.querySelector(".lyrics-bar")
        lpdisk = document.querySelector(".disk")

        lpdisk.classList.add("playing")

        audio.play()

        backgroundImg.addEventListener("click", play, false)
        lyricBar.style.width = "35%"
        currentTimeCheck()
        typingTextAnimation()
    }

    


    // declare functions
    function play() {
        if(audioIsPlaying){
            audio.pause()
            audioIsPlaying = false
            lpdisk.classList.remove("playing")
            
        }else{
            audio.play()
            audioIsPlaying = true
            lpdisk.classList.add("playing")
        }
    }

    function setVolume(value) {
        audio.volume = value
    }

    function currentTimeCheck() {
        if(Math.floor(audio.currentTime) == lyrics[lyricsCount].startTime && orderCheck){
            lyricSpans[0].innerHTML = lyrics[lyricsCount].text
            lyricSpans[0].classList.add("visible")
            lyricSpans[1].classList.remove("visible")
            orderCheck = false
            lyricsCount++
        }else if(Math.floor(audio.currentTime) == lyrics[lyricsCount].startTime && !orderCheck){
            lyricSpans[1].innerHTML = lyrics[lyricsCount].text
            lyricSpans[1].classList.add("visible")
            lyricSpans[0].classList.remove("visible")
            orderCheck = true
            lyricsCount++
        }

        if(Math.floor(audio.currentTime) == 45){
            setVolume(0.5)
        }
        window.requestAnimationFrame(currentTimeCheck)
    }

    function typingTextAnimation() {
        let counter = true
        setInterval(()=>{
            if(counter == true){
                typing("화면 터치시 Play or Pause")
                .then(
                    ()=>typing("Made by Yoovin")
                    .then(()=>typing("now playing... 春泥棒 -ヨルシカ-").then((val)=>counter=val))
                )
                counter = false
            }
        },1000)
        
    }

    function typing(text) {
        return new Promise((resolve, reject) => {
            let i = 0
            let inPutText = text.split("")
            let typingText = setInterval(()=>{
                if(i == inPutText.length-1){
                    clearInterval(typingText)
                    setTimeout(()=>{
                        let i = loadingSpan.innerHTML.length - 1
                        let erasingText = setInterval(()=>{
                        if(i == 0){clearInterval(erasingText);resolve(true)}
                        loadingSpan.innerHTML = loadingSpan.innerHTML.slice(0, i)
                        i--
                        },100)
                    }, 5000)
                }
                loadingSpan.innerHTML += inPutText[i]
                i++
            },300)
        })
    }
})()