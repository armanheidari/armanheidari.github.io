const header = document.querySelector(".header")

const p_left = document.getElementById("left")
const p_right = document.getElementById("right")
const p_container = document.querySelector(".p_img_container")
const p_link = document.querySelector(".p_link")
const p_img = document.querySelector(".p_img")
const p_text = document.querySelector(".p_text")
const p_title = document.querySelector(".p_title")
const p_description = document.querySelector(".p_description")

const titles = [
    "Toxic Comment Classifier",
    "TSETMC ETL Analysis",
    "Randomuser Data Pipeline"]
const descriptions = [
    "This project aims to create a safer digital community by identifying and classifying toxic comments on social media. Using a dataset from a Kaggle competition, the model is trained to detect six types of toxicity. The data undergoes cleaning, tokenization, and padding before being processed by the model.",
    "The TSETMCE Stock Market Data Analysis Project is a Python-based solution that fetches, converts, and analyzes stock market data from TSETMC. It features four main components: data retrieval, conversion to CSV, data analysis, and logging. The project aims to provide insightful results through an HTML file, with each module offering customizable features.",
    "This project is a robust and scalable data pipeline built using Python, Kafka, NocoDB, and PostgreSQL. It is designed to fetch, process, and store data in a streamlined and efficient manner. The entire system is containerized using Docker, ensuring easy setup and deployment. The data pipeline operates by downloading data from randomuser.me."
]
const links = [
    "https://github.com/armanheidari/Deep-Learning-Toxic-Comment-Classifier",
    "https://github.com/armanheidari/TSETMC-ETL-Analysis",
    "https://github.com/armanheidari/Randomuser-Data-Pipeline"
]

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

let current_img = 1
let text_hover = 0
function change_img(direction) {
    if (! text_hover) {
        // left
        if (direction == 0) {
            current_img -= 1
            if (current_img == 0) {
                current_img = titles.length
            }
        }
        // right
        else {
            current_img += 1
            if (current_img > titles.length) {
                current_img = 1
            }
        }
    
        p_container.style.opacity = 0.7
    
        setTimeout(function() {
            p_img.src = "images/p" + current_img + ".png"
            p_title.innerHTML = titles[current_img - 1]
            p_description.innerHTML = descriptions[current_img - 1]
            p_link.href = links[current_img - 1]
            p_container.style.opacity = 1
        }, 150)
    }
}

function auto_change_img() {
    change_img(1)
    setTimeout(auto_change_img, 4000)
}

function hover_change(state) {
    text_hover = state

    if (text_hover == 1) {
        p_title.classList.add("p_hover")
        p_description.classList.add("p_hover")
    }
    else {
        p_title.classList.remove("p_hover")
        p_description.classList.remove("p_hover")

    }
}

header.addEventListener("animationend", typeHeader)

p_text.addEventListener("mouseover", () => hover_change(1))
p_text.addEventListener("mouseout", () => hover_change(0))

p_left.addEventListener("click", () => change_img(0))
p_right.addEventListener("click", () => change_img(1))
auto_change_img()