// Elementos dos charms e funções de apoio
export const ELEMENTOS = [
  { nome: 'Physical', campo: 'physicalDmgMod' },
  { nome: 'Earth', campo: 'earthDmgMod' },
  { nome: 'Fire', campo: 'fireDmgMod' },
  { nome: 'Energy', campo: 'energyDmgMod' },
  { nome: 'Ice', campo: 'iceDmgMod' },
  { nome: 'Death', campo: 'deathDmgMod' },
  { nome: 'Holy', campo: 'holyDmgMod' },
];

// transforma o multiplicador em texto de porcentagem
export function textoDano(valor: number) {
  const porcentagem = Math.round(valor * 100);
  if (valor < 0) {
    return porcentagem + '% (cura)';
  }
  if (valor === 0) {
    return '0% (imune)';
  }
  return porcentagem + '%';
}