// --- 1. أكواد القائمة المنسدلة للهواتف ---
const menu = document.getElementById("nav-links");
const menuIcon = document.querySelector(".menu-icon");
const navItems = document.querySelectorAll(".nav-links li a");

menuIcon.addEventListener("click", function(event) {
    menu.classList.toggle("active");
    event.stopPropagation();
});

document.addEventListener("click", function(event) {
    const isMenuOpen = menu.classList.contains("active");
    const isClickOutsideMenu = !menu.contains(event.target);
    const isClickOutsideIcon = !menuIcon.contains(event.target);

    if (isMenuOpen && isClickOutsideMenu && isClickOutsideIcon) {
        menu.classList.remove("active");
    }
});

navItems.forEach(item => {
    item.addEventListener("click", function() {
        menu.classList.remove("active");
    });
});

// --- 2. كود الساعة الرقمية ---
function updateClock() {
    const clockElement = document.getElementById('digital-clock');
    if (!clockElement) return;

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; 

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    clockElement.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}

setInterval(updateClock, 1000);
updateClock();

// --- 3. محرك التصميم الذكي بدون ضبابية (Clear Smart Theme) ---
const themePicker = document.getElementById('theme-picker');
const dynamicStyle = document.createElement('style');
document.head.appendChild(dynamicStyle);

function getBeautifulTheme(hex) {
    let r = parseInt(hex.substr(1, 2), 16) / 255;
    let g = parseInt(hex.substr(3, 2), 16) / 255;
    let b = parseInt(hex.substr(5, 2), 16) / 255;

    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    } else { h = 0; s = 0; }

    let H = Math.round(h * 360);
    let S = Math.round(s * 100);
    let L = Math.round(l * 100);

    let yiq = ((r * 255 * 299) + (g * 255 * 587) + (b * 255 * 114)) / 1000;
    let isLight = yiq >= 128;

    let textColor = isLight ? `hsl(${H}, ${Math.min(S, 30)}%, 12%)` : `hsl(${H}, ${Math.min(S, 30)}%, 96%)`;
    let mutedText = isLight ? `hsl(${H}, ${Math.min(S, 20)}%, 35%)` : `hsl(${H}, ${Math.min(S, 20)}%, 80%)`;
    let accentH = (H + 40) % 360;
    let accentL = isLight ? Math.max(25, L - 40) : Math.min(75, L + 30);
    let accentColor = `hsl(${accentH}, 85%, ${accentL}%)`;

    // استخدام ألوان شفافة نقية بدون Backdrop-filter
    let glassBg = isLight ? `hsla(${H}, ${S}%, 100%, 0.8)` : `hsla(${H}, ${S}%, 0%, 0.7)`;
    let glassBorder = isLight ? `hsla(${H}, ${S}%, 0%, 0.1)` : `hsla(${H}, ${S}%, 100%, 0.1)`;

    return { bg: hex, text: textColor, muted: mutedText, accent: accentColor, glassBg, glassBorder };
}

themePicker.addEventListener('input', (e) => {
    const theme = getBeautifulTheme(e.target.value);
    
    dynamicStyle.innerHTML = `
        body {
            background: ${theme.bg} !important;
            background-image: none !important;
            transition: background 0.4s ease;
        }

        h1, h2, h3, h4, h5, h6, .logo, .title, .project-title, .info-card h3 {
            color: ${theme.text} !important;
            transition: color 0.4s ease;
        }
        
        p, span, li, a, .bio-text, .copyright, .section__text__p2, .info-card p {
            color: ${theme.muted} !important;
            transition: color 0.4s ease;
        }

        i, .section__text__p1, .digital-clock {
            color: ${theme.accent} !important;
            transition: color 0.4s ease;
        }

        /* الحاوية العلوية: تمت إزالة الضبابية (blur) */
        .top-center-container {
            background: ${theme.glassBg} !important;
            border: 1px solid ${theme.glassBorder} !important;
            padding: 10px 40px !important;
            border-radius: 60px !important;
            backdrop-filter: none !important; /* تم إلغاء التغبيش */
            box-shadow: 0 8px 20px rgba(0,0,0,0.1) !important;
        }

        /* البطاقات: تمت إزالة الضبابية (blur) */
        .info-card, .floating-skill, .project-card, .contact-info-upper-container, .nav-links {
            background: ${theme.glassBg} !important;
            border: 1px solid ${theme.glassBorder} !important;
            backdrop-filter: none !important; /* تم إلغاء التغبيش */
            box-shadow: 0 4px 15px rgba(0,0,0,0.05) !important;
        }

        .gradient-button {
            color: ${theme.text} !important;
            border: 2px solid ${theme.accent} !important;
            background: transparent !important;
            transition: all 0.3s ease;
        }
        
        .gradient-button:hover {
            background: ${theme.accent} !important;
            color: ${theme.bg} !important;
        }

        .experience-title-floating {
            color: ${theme.text} !important;
            border: 2px solid ${theme.accent} !important;
            background: ${theme.glassBg} !important;
            backdrop-filter: none !important;
        }
    `;
});
