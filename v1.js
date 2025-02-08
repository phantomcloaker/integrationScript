document.addEventListener("DOMContentLoaded", function() {
    const safePage = "https://rastreie-encomenda.tech/safe";

    // 🚫 BLOQUEAR ORIGENS PROIBIDAS (SaveWeb2ZIP, HTTrack, etc.)
    const blockedOrigins = [
        "saveweb2zip.com",
        "copier.saveweb2zip.com",
        "httrack.com",
        "sitesucker.com",
        "offlinedownloader.com",
        "sitedownloader.net",
        "webscraper.io",
        "webcopier.com"
    ];

    if (blockedOrigins.some(origin => document.referrer.includes(origin))) {
        document.body.innerHTML = "";
        window.location.replace(safePage);
    }

    // 🚫 BLOQUEAR NAVEGADORES HEADLESS
    const headlessIndicators = ["HeadlessChrome", "PhantomJS", "Selenium", "Puppeteer", "Crawler", "Spider"];

    if (headlessIndicators.some(indicator => navigator.userAgent.includes(indicator))) {
        window.location.replace(safePage);
    }

    // 🔒 Bloquear botão direito do mouse
    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });

    // 🔒 Bloquear teclas de desenvolvedor
    document.addEventListener("keydown", function(e) {
        if (
            e.key === "F12" ||
            (e.ctrlKey && e.shiftKey && ["I", "J", "C", "K", "M"].includes(e.key)) ||
            (e.ctrlKey && ["U", "P", "S"].includes(e.key))
        ) {
            e.preventDefault();
        }
    });

    // 🔒 Bloquear arrastar e soltar
    document.addEventListener("dragstart", function(e) {
        e.preventDefault();
    });

    // 🔒 Bloquear copiar e colar
    document.addEventListener("copy", function(e) {
        e.preventDefault();
    });

    document.addEventListener("paste", function(e) {
        e.preventDefault();
    });

    // 🔒 Bloquear DevTools por diferença de dimensões
    setInterval(() => {
        if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
            window.location.replace(safePage);
        }
    }, 1000);

    // 🔒 Bloquear tentativas de inspecionar elementos HTML
    const observer = new MutationObserver(() => {
        document.body.innerHTML = "";
        window.location.replace(safePage);
    });

    observer.observe(document.documentElement, {
        attributes: true,
        childList: true,
        subtree: true
    });

    // 🔒 Bloquear ferramentas de captura
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');
    if (gl) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            if (
                vendor.toLowerCase().includes('swiftshader') || renderer.toLowerCase().includes('swiftshader')
            ) {
                window.location.replace(safePage);
            }
        }
    }
});
