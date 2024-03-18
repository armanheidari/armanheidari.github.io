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

typeHeader();
