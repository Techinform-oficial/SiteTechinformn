// Variáveis de estado para navegação fictícia
let historyStack = ["OneDrive > TECHiNFORM - Pessoal"];
let historyIndex = 0;

const btnBack = document.getElementById("btnBack");
const btnForward = document.getElementById("btnForward");
const btnRefresh = document.getElementById("btnRefresh");
const addressBar = document.getElementById("addressBar");
const searchInput = document.getElementById("searchInput");
const fileTableBody = document.getElementById("fileTableBody");
const treeItems = document.querySelectorAll(".file-tree .tree-item");

// Função para atualizar estado dos botões de navegação
function updateNavButtons() {
    btnBack.disabled = historyIndex <= 0;
    btnForward.disabled = historyIndex >= historyStack.length - 1;
}

// Evento clique nos botões de navegação
btnBack.addEventListener("click", () => {
    if (historyIndex > 0) {
        historyIndex--;
        addressBar.value = historyStack[historyIndex];
        // TODO: Atualizar visualização dos arquivos baseado no endereço
    }
    updateNavButtons();
});

btnForward.addEventListener("click", () => {
    if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        addressBar.value = historyStack[historyIndex];
        // TODO: Atualizar visualização dos arquivos baseado no endereço
    }
    updateNavButtons();
});

btnRefresh.addEventListener("click", () => {
    // TODO: Recarregar visualização atual
    alert("Atualizando visualização...");
});

// Endereço manual (não funcional, só efeito visual)
addressBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        // Navegar para endereço digitado
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(addressBar.value);
        historyIndex++;
        updateNavButtons();
        // TODO: Atualizar visualização de arquivos
        alert(`Navegar para: ${addressBar.value}`);
    }
});

// Busca simples na lista de arquivos pelo nome
searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();

    [...fileTableBody.rows].forEach(row => {
        const nameCell = row.querySelector(".file-name-cell");
        if (!nameCell) return;
        const text = nameCell.textContent.toLowerCase();
        row.style.display = text.includes(filter) ? "" : "none";
    });
});

// Seleção de pasta na árvore
treeItems.forEach(item => {
    item.addEventListener("click", () => {
        // Remove active de todos
        treeItems.forEach(i => i.classList.remove("active"));
        // Marca ativo o clicado
        item.classList.add("active");
        // Atualiza endereço
        addressBar.value = `OneDrive > TECHiNFORM - Pessoal > ${item.textContent.trim()}`;
        // Adiciona ao histórico
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(addressBar.value);
        historyIndex++;
        updateNavButtons();
        // TODO: Atualizar arquivos da pasta selecionada
    });
});

// Ordenação simples clicando no header da tabela
document.querySelectorAll(".file-list th").forEach(th => {
    th.addEventListener("click", () => {
        const sortKey = th.getAttribute("data-sort");
        sortTableByColumn(sortKey);
    });
});

function sortTableByColumn(sortKey) {
    const rowsArray = Array.from(fileTableBody.rows);
    let asc = true;

    // Detectar se já está ordenado desc para inverter
    if (fileTableBody.getAttribute("data-sort-key") === sortKey) {
        asc = fileTableBody.getAttribute("data-sort-dir") !== "asc";
    }

    rowsArray.sort((a, b) => {
        let aText = "";
        let bText = "";
        switch (sortKey) {
            case "name":
                aText = a.querySelector(".file-name-cell").textContent.trim().toLowerCase();
                bText = b.querySelector(".file-name-cell").textContent.trim().toLowerCase();
                break;
            case "status":
                aText = a.querySelector(".icon-cell").textContent.trim();
                bText = b.querySelector(".icon-cell").textContent.trim();
                break;
            case "modified":
                aText = new Date(a.cells[2].textContent.trim()).getTime();
                bText = new Date(b.cells[2].textContent.trim()).getTime();
                break;
            case "type":
                aText = a.cells[3].textContent.trim().toLowerCase();
                bText = b.cells[3].textContent.trim().toLowerCase();
                break;
            case "size":
                aText = parseSize(a.cells[4].textContent.trim());
                bText = parseSize(b.cells[4].textContent.trim());
                break;
        }

        if (aText < bText) return asc ? -1 : 1;
        if (aText > bText) return asc ? 1 : -1;
        return 0;
    });

    // Reaplicar ordenação na tabela
    rowsArray.forEach(row => fileTableBody.appendChild(row));

    fileTableBody.setAttribute("data-sort-key", sortKey);
    fileTableBody.setAttribute("data-sort-dir", asc ? "asc" : "desc");
}

// Auxiliar para converter tamanho em KB, MB para bytes para ordenar
function parseSize(sizeStr) {
    if (!sizeStr) return 0;
    let size = parseFloat(sizeStr);
    if (sizeStr.toLowerCase().includes("kb")) return size * 1024;
    if (sizeStr.toLowerCase().includes("mb")) return size * 1024 * 1024;
    return size;
}

