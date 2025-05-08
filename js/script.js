const darkBtn = document.getElementById("darkModeToggle");
const icon = darkBtn.querySelector("i");

function applyTheme(mode) {
    const isDark = mode === "dark";
    document.body.classList.toggle("dark", isDark);
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
}

(function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        applyTheme(prefersDark ? "dark" : "light");
    }
})();

darkBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    icon.classList.toggle("fa-moon", !isDark);
    icon.classList.toggle("fa-sun", isDark);
});


const menuBtn = document.getElementById("menuToggle");
const navItems = document.getElementById("navItems");

menuBtn.addEventListener("click", () => {
    navItems.classList.toggle("show");
});

document.querySelectorAll(".nav-item a").forEach(link => {
    link.addEventListener("click", () => {
        navItems.classList.remove("show");
    });
});

const animatedElements = document.querySelectorAll('.animate-on-scroll');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach(element => {
    observer.observe(element);
});

const backToTopBtn = document.getElementById("backToTopBtn");

window.onscroll = () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const currentFile = window.location.pathname.split("/").pop();

if (currentFile === "index.html") {
    const greetingText = document.getElementById("greeting-text");
    const hour = new Date().getHours();
    let greeting = "";

    if (hour >= 0 && hour < 5) {
        greeting = "It's late night. Take some rest!";
    } else if (hour >= 5 && hour < 8) {
        greeting = "Good early morning!";
    } else if (hour >= 8 && hour < 12) {
        greeting = "Good morning!";
    } else if (hour >= 12 && hour < 17) {
        greeting = "Good afternoon!";
    } else if (hour >= 17 && hour < 20) {
        greeting = "Good evening!";
    } else if (hour >= 20 && hour < 24) {
        greeting = "Good night!";
    } else {
        greeting = "Hello!";
    }

    greetingText.innerText = greeting;
} else if (currentFile === "contact.html") {
    const nameField = document.getElementById("nameField");
    const emailField = document.getElementById("emailField");
    const messageField = document.getElementById("messageField");

    localStorage.getItem("formData") && (() => {
        const formData = JSON.parse(localStorage.getItem("formData"));
        nameField.value = formData.name || "";
        emailField.value = formData.email || "";
        messageField.value = formData.message || "";
    })();
}

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get("name").trim();
    const email = formData.get("email").trim();
    const message = formData.get("message").trim();

    let isValid = true;

    nameError.innerText = "";
    emailError.innerText = "";
    messageError.innerText = "";

    if (!name) {
        nameError.innerText = "Please enter your name.";
        isValid = false;
    } else if (name.length < 3) {
        nameError.innerText = "Name must be at least 3 characters.";
        isValid = false;
    } else if (name.length > 50) {
        nameError.innerText = "Name must be less than 50 characters.";
        isValid = false;
    }

    if (!email) {
        emailError.innerText = "Please enter your email.";
        isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError.innerText = "Please enter a valid email address.";
        isValid = false;
    }

    if (!message) {
        messageError.innerText = "Please enter your message.";
        isValid = false;
    } else if (message.length < 10) {
        messageError.innerText = "Message must be at least 10 characters.";
        isValid = false;
    } else if (message.length > 500) {
        messageError.innerText = "Message must be less than 500 characters.";
        isValid = false;
    }

    if (isValid) {
        const formDataObj = {
            name: name,
            email: email,
            message: message
        };
        localStorage.setItem("formData", JSON.stringify(formDataObj));
        alert("Form saved to local storage!");
    }
};

