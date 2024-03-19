const header = document.querySelector(".header")
const clay = document.getElementById("illustration1")

function typeHeader() {
    const content = "print(\"Welcome to my portfolio...\")"

    let func = document.querySelector(".func")
    let paran = document.querySelectorAll(".paran")
    let str = document.querySelector(".str")

    for(let i = 0; i < content.length; i++) {
        let index = content.length - i - 1
        setTimeout(function() {
            if (index < 5) {
                func.innerHTML += content[index]
            }
            else if (index == 5) {
                paran[0].innerHTML += content[index]
            }
            else if (index == content.length - 1) {
                paran[1].innerHTML += content[index]
            }
            else {
                str.innerHTML += content[index]
            }
        }, (content.length - i - 1) * 350);
    }
}

header.addEventListener("animationend", typeHeader)

let imageNumber = 1;
let intervalId

function startChangingImage() {
    intervalId = setInterval(changeImage, 1000);
}

function stopChangingImage() {
    clearInterval(intervalId);
}

function changeImage() {
    clay.style.opacity = 1;
    setTimeout(function() {
        imageNumber++;
        if (imageNumber > 100) {
            imageNumber = 1;
        }
        clay.src = 'images/Assets/Clay_Black' + ("000" + imageNumber).slice(-4) + '.png';
        clay.style.opacity = 0.7;
        console.log(imageNumber)
    }, 500);
}

clay.addEventListener("mouseover", startChangingImage)
clay.addEventListener("mouseout", stopChangingImage)