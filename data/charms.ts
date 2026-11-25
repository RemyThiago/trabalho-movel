// charms
export const CHARMS = [
  'Wound',
  'Enflame',
  'Poison',
  'Freeze',
  'Zap',
  'Curse',
  'Divine Wrath',
  'Overpower',
  'Overflux',
];

// % de chance de ativação em cada tier
export const CHANCES = [0, 0.05, 0.1, 0.11];

export const REGRAS = [
  { nome: 'Wound', tipo: 'elemento', campo: 'physicalDmgMod' },
  { nome: 'Enflame', tipo: 'elemento', campo: 'fireDmgMod' },
  { nome: 'Poison', tipo: 'elemento', campo: 'earthDmgMod' },
  { nome: 'Freeze', tipo: 'elemento', campo: 'iceDmgMod' },
  { nome: 'Zap', tipo: 'elemento', campo: 'energyDmgMod' },
  { nome: 'Curse', tipo: 'elemento', campo: 'deathDmgMod' },
  { nome: 'Divine Wrath', tipo: 'elemento', campo: 'holyDmgMod' },
  { nome: 'Overpower', tipo: 'vida', campo: '' },
  { nome: 'Overflux', tipo: 'mana', campo: '' },
];