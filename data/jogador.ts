//dados personagem
import { CHARMS } from './charms';

const tiersIniciais: { [nome: string]: number } = {};
for (let i = 0; i < CHARMS.length; i++) {
  tiersIniciais[CHARMS[i]] = 0;
}

export const jogador = {
  vidaMaxima: '',
  manaMaxima: '',
  charms: [] as string[], // nome charms liberados
  tiers: tiersIniciais,
};