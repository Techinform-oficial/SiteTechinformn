import { httpGet } from "../utils/http.js";

// MOCK enquanto backend não existe
const arquivosMock = {
    corrente: [
        {
            titulo: "Relatório Técnico Inicial",
            processo: "PROC-2024/0012",
            classificacao: "Administrativo",
            data: "2024-08-05",
            responsavel: "João Silva",
            status: "andamento"
        }
    ]
};

export async function listarArquivoCorrente() {
    // futuramente:
    // return httpGet("/arquivos/corrente");
    return arquivosMock.corrente;
}
