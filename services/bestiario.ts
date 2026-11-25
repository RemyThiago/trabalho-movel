import bestiario from '../data/bestiary.json';

const lista: any[] = bestiario as any;

// procura o bixo pelo nome
export function buscarInimigo(nome: string) {
  const procurado = nome.trim().toLowerCase();
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].name.toLowerCase() === procurado) {
      return lista[i];
    }
  }
  return null;
}

// pesquisa de ate 5 nomes
export function sugerirNomes(texto: string) {
  const procurado = texto.trim().toLowerCase();
  const nomes: string[] = [];
  if (procurado.length < 2) {
    return nomes;
  }
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].name.toLowerCase().includes(procurado)) {
      nomes.push(lista[i].name);
      if (nomes.length === 5) {
        break;
      }
    }
  }
  return nomes;
}