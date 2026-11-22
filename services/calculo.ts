// Aqui fica só o cálculo da melhor combinação de charms
import { REGRAS } from '../data/charms';

// 8% da vida do inimigo dividido por 5% = 160%
const LIMITE = 1.6;

function contem(lista: string[], nome: string) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === nome) {
      return true;
    }
  }
  return false;
}

// quanto o charm vale contra um inimigo (1 = dano normal, 1.25 = 125%, bla bla bla)
export function valorDoCharm(regra: any, inimigo: any, vida: number, mana: number) {
  if (regra.tipo === 'elemento') {
    return inimigo[regra.campo];
  }
  let valor = 0;
  if (regra.tipo === 'vida') {
    valor = vida / inimigo.hitpoints;
  } else {
    valor = mana / 2 / inimigo.hitpoints;
  }
  if (valor > LIMITE) {
    valor = LIMITE;
  }
  return valor;
}

export function calcularCombinacao(
  inimigos: any[],
  liberados: string[],
  vida: number,
  mana: number
) {
  // soma das quantidades de toda a hunt
  let total = 0;
  for (let i = 0; i < inimigos.length; i++) {
    total = total + Number(inimigos[i].quantidade);
  }
  if (total === 0) {
    return null;
  }

  // marca o q ja usou
  const charmUsado: boolean[] = [];
  for (let c = 0; c < REGRAS.length; c++) {
    charmUsado.push(!contem(liberados, REGRAS[c].nome));
  }
  const inimigoUsado: boolean[] = [];
  for (let m = 0; m < inimigos.length; m++) {
    inimigoUsado.push(false);
  }

  const resultado: any[] = [];
  for (let rodada = 0; rodada < inimigos.length; rodada++) {
    let melhorPontos = 0;
    let melhorC = -1;
    let melhorM = -1;

    for (let c = 0; c < REGRAS.length; c++) {
      for (let m = 0; m < inimigos.length; m++) {
        if (!charmUsado[c] && !inimigoUsado[m]) {
          const valor = valorDoCharm(REGRAS[c], inimigos[m], vida, mana);
          const peso = Number(inimigos[m].quantidade) / total;
          if (valor * peso > melhorPontos) {
            melhorPontos = valor * peso;
            melhorC = c;
            melhorM = m;
          }
        }
      }
    }

    if (melhorC === -1) {
      break;
    }

    charmUsado[melhorC] = true;
    inimigoUsado[melhorM] = true;
    resultado.push({
      charm: REGRAS[melhorC].nome,
      inimigo: inimigos[melhorM].name,
      valor: valorDoCharm(REGRAS[melhorC], inimigos[melhorM], vida, mana),
      pontos: melhorPontos,
    });
  }

  return resultado;
}