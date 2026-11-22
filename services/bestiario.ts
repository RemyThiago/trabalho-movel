// Aqui fica só a busca de inimigos no arquivo bestiary.json
import bestiario from '../data/bestiary.json';

export function buscarInimigo(nome: string) {
  const procurado = nome.trim().toLowerCase();
  for (let i = 0; i < bestiario.length; i++) {
    if (bestiario[i].name.toLowerCase() === procurado) {
      return bestiario[i];
    }
  }
  return null;
}