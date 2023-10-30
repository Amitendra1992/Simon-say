let gameSeq = [];
let userSeq = [];
let score = 0;

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){       //starting the game
    // if(started == false){
    //     console.log("Game has started")
    //     started = true;
    // }
    levelUp();
});

function btnFlash(btn){                         //for flashing randomly selected button
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 300)
}

function userFlash(btn){                        //for flashing user selected button
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 300)
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIndx = Math.floor(Math.random()*btns.length);
    let ranCol = btns[randIndx];
    gameSeq.push(ranCol);                      //adding to game sequence  
    console.log(`Game-sequence: ${gameSeq}`);
    let ranBtn = document.querySelector(`.${ranCol}`);
    btnFlash(ranBtn);
}

let allBtns = document.querySelectorAll(".btn");

function checkSeq(){
    
    let c = 0;
    for(let i=0; i<userSeq.length; i++){
        if(userSeq[i] != gameSeq[i]){
            c++;
        }
    }

    if(c>0){
        h2.innerText = `Game over. Your score is ${score}. Please press any key to try again`;
        reset();
    }else if(c==0){
        score += 10;
        setTimeout(levelUp, 1000);
    }

}

function btnPress(){
    let btn = this;
    userFlash(btn);
    let userCol = btn.getAttribute("id");
    userSeq.push(userCol);                      //adding to user clicked sequence
    console.log(`User-sequence: ${userSeq}`);
    if(userSeq.length == gameSeq.length){
        checkSeq();                             //matching sequences
    }                                 
}

for(btn of allBtns){                            //When user presses button
    btn.addEventListener("click", btnPress)
}

function reset(){
    started = "false";
    level = 0;
    gameSeq = [];
    userSeq = [];
    let body = document.querySelector("body");
    body.classList.add("body");
    setTimeout(function(){
        body.classList.remove("body");
    }, 300);
}