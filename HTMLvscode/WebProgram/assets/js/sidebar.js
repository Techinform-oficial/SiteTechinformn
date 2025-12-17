document.addEventListener("DOMContentLoaded", () => {

    /* ===============================
       EXPANDIR / RECOLHER SEÇÕES
    ================================== */
    document.querySelectorAll(".section-header").forEach(header => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const arrow = header.querySelector(".arrow");

            const isVisible = content.style.display === "block";

            content.style.display = isVisible ? "none" : "block";
            arrow.textContent = isVisible ? "▶" : "▼";
        });
    });


    /* ===============================
       RECOLHER / EXPANDIR SIDEBAR
    ================================== */
    // Botão da topbar
    const btnTopbar = document.getElementById("btnToggleMenu");

    // Evento do botão da topbar
    if (btnTopbar) {
        btnTopbar.addEventListener("click", toggleSidebar);
    }

});
