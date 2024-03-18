
let mainColor = localStorage.getItem('color-option');

let backgroundOption = true;

let backInterval;

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove('active');
        if (element.dataset.color === mainColor) {
            element.classList.add('active')
        }
    });
}



let toggleSettingsIcon = document.querySelector(".toggle-Settings .icon");
let settingsBox = document.querySelector(".settings-box");
toggleSettingsIcon.onclick = function () {
    this.classList.toggle("fa-spin");
    settingsBox.classList.toggle("open");

};
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem('color-option', e.target.dataset.color);
        handleActive(e);
    });
});

let backgroundLocalItem = localStorage.getItem('background_option');

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem === 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
        
    }
    document.querySelectorAll(".random-background span").forEach(element => {
        element.classList.remove('active');
    });
    
    if (backgroundLocalItem === 'true') {
        document.querySelector('.yes').classList.add('active')
    }else {
        document.querySelector('.no').classList.add('active')
    }
}

const randomBackEl = document.querySelectorAll(".random-background span");
randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e);

        if (e.target.dataset.background === 'yes') {
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backInterval);
            localStorage.setItem("background_option", false);
        }
    });
});

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.webp", "02.jpeg", "03.jpg", "04.jpeg", "05.webp"];

function randomizeImgs() {
    if (backgroundOption === true) {
        backInterval = setInterval ( () => {
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            landingPage.style.backgroundImage = 'url("images/'+ imgsArray[randomNumber] +'")';
        }, 1000);
    }
};
randomizeImgs();

// Select Skills
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
// skills offset top
let skillsOffsetTop = ourSkills.offsetTop;

// Outer height
let skillsouterheight = ourSkills.offsetHeight;

//window Height 
let windowHeight = this.innerHeight;

//window ScrollTop
let windowScrollTop = this.scrollY;

    if (windowScrollTop > (skillsOffsetTop + skillsouterheight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};

// Create Popup With The Image

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach(img => {

    img.addEventListener('click', (e) => {
        // Create Overlay Element
        let overlay = document.createElement('div');

        // Ass  Class To overlay
        overlay.className = 'popup-overlay';

        // Apend Overlay to body
        document.body.appendChild(overlay);

        //Create The Popup
        let popupBox = document.createElement("div");

        // Add Class To The Popup Box
        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            //create Heading
            let imageHeading = document.createElement("h3");

            //Create Text For Heading
            let imgText = document.createTextNode(img.alt);

            //Apend The Text To The Heading
            imageHeading.appendChild(imgText);

            //Apend The Heading To The Popup Box
            popupBox.appendChild(imageHeading);
        }

        // Create The Image
        let popupImage = document.createElement("img");
        
        //Set Image Source

        popupImage.src = img.src;

        //Apend Image to Popup Box
        popupBox.appendChild(popupImage);

        // Apend The Popup Box To The body
        document.body.appendChild(popupBox);

        //Create The Close Span
        let closeSpan = document.createElement('span');

        //Create The Close Span Text

        let closeText = document.createTextNode('X');

        //Apend The CloseText To The Close Span
        closeSpan.appendChild(closeText);

        //Add Class To closeSpan
        closeSpan.className = 'close-span';

        //Add The Close Span To Tha Popup Box
        popupBox.appendChild(closeSpan);
    });

});

//Close Popup
document.addEventListener('click', function (e) {
    if (e.target.className == 'close-span') {

        //Remove The Current Popup
        e.target.parentNode.remove();

        //Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
});

//Select All Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

//Select All links

const allLinks = document.querySelectorAll(".links a");

function scrollToSections(elements) {
    elements.forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

scrollToSections(allBullets);
scrollToSections(allLinks);

//Handle Active State
function handleActive(ev) {
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove('active');
    });

    ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
    
    bulletsSpan.forEach(span => {
        span.classList.remove('active');
    });

    if (bulletLocalItem === 'block') {
        bulletsContainer.style.display = 'block';
        document.querySelector('.bullets-option .yes').classList.add("active");
    }else {
        bulletsContainer.style.display = 'none';
        document.querySelector('.bullets-option .no').classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if(span.dataset.display === 'show') {
            bulletsContainer.style.display = 'block';
            localStorage.setItem("bullets_option", 'block');
        }else {
            bulletsContainer.style.display = 'none';
            localStorage.setItem("bullets_option", 'none');
            
        }

        handleActive(e);
    });
});

//Reset Button 
document.querySelector(".reset-options").onclick = function () {
    //localStorage.clear();
    localStorage.removeItem("color-option");
    localStorage.removeItem("background_option");
    localStorage.removeItem("bullets_option");
    window.location.reload();
}

//Toggle Menu
let toggleButton = document.querySelector(".toggle-menu");
let tLinks = document.querySelector('.links');

toggleButton.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");
    
    tLinks.classList.toggle("open");
};

document.addEventListener('click', (e) => {
    if (e.target !== toggleButton && e.target !== tLinks) {

        if(tLinks.classList.contains("open")) {

            tLinks.classList.toggle("open");
            
            toggleButton.classList.toggle("menu-active");
        }
    }
});

//stop propagation on menu
tLinks.onclick = function (e) {
    e.stopPropagation();
};




