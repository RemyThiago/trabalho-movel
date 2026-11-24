// Dados do personagem, usados pelas duas abas
import { CHARMS } from './charms';

// começa com todos os charms no tier 0 (não tenho)
const tiersIniciais: { [nome: string]: number } = {};
for (let i = 0; i < CHARMS.length; i++) {
  tiersIniciais[CHARMS[i]] = 0;
}

export const jogador = {
  vidaMaxima: '',
  manaMaxima: '',
  charms: [] as string[], // nomes dos charms que tenho (tier 1, 2 ou 3)
  tiers: tiersIniciais,
};