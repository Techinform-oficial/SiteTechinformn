import { listarArquivoCorrente } from "../api/arquivo.js";

export async function carregarArquivoCorrente() {
    const dados = await listarArquivoCorrente();
    return dados.map(doc => ({
        ...doc,
        statusLabel: statusToLabel(doc.status)
    }));
}

function statusToLabel(status) {
    const map = {
        andamento: "Em andamento",
        pendente: "Pendente",
        concluido: "Concluído"
    };
    return map[status] || status;
}
