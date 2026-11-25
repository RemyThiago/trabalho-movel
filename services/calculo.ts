// desgraça de calculo da melhor combinação
import { REGRAS, CHANCES } from '../data/charms';

// limite por causa do overflux/overpower
const LIMITE = 1.6;

// os demais
const BASE = 0.05;

// modificador com a resistencia do inimigo
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
  tiers: { [nome: string]: number },
  vida: number,
  mana: number
) {
  // pra ter ctz q vc colocou inimigos
  let total = 0;
  for (let i = 0; i < inimigos.length; i++) {
    total = total + Number(inimigos[i].quantidade);
  }
  if (total === 0) {
    return null;
  }


  const charmUsado: boolean[] = [];
  for (let c = 0; c < REGRAS.length; c++) {
    // charm tier 0 considerado usado
    charmUsado.push(!(tiers[REGRAS[c].nome] > 0));
  }
  const inimigoUsado: boolean[] = [];
  for (let m = 0; m < inimigos.length; m++) {
    inimigoUsado.push(false);
  }

  const resultado: any[] = [];

  // matematica por pareamento
  for (let rodada = 0; rodada < inimigos.length; rodada++) {
    let melhorPontos = 0;
    let melhorC = -1;
    let melhorM = -1;

    for (let c = 0; c < REGRAS.length; c++) {
      for (let m = 0; m < inimigos.length; m++) {
        if (!charmUsado[c] && !inimigoUsado[m]) {
          const valor = valorDoCharm(REGRAS[c], inimigos[m], vida, mana);
          const quantidade = Number(inimigos[m].quantidade);
          const chance = CHANCES[tiers[REGRAS[c].nome]];
          const pontos = inimigos[m].hitpoints * quantidade * BASE * valor * chance;
          if (pontos > melhorPontos) {
            melhorPontos = pontos;
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
      tier: tiers[REGRAS[melhorC].nome],
      inimigo: inimigos[melhorM].name,
      valor: valorDoCharm(REGRAS[melhorC], inimigos[melhorM], vida, mana),
      pontos: melhorPontos,
    });
  }

  return resultado;
}