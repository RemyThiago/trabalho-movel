import { useState } from 'react';
import { View, FlatList, Text, TextInput } from 'react-native';
import ItemCharm from '../components/ItemCharm';
import { CHARMS } from '../data/charms';
import { jogador } from '../data/jogador';
import { estilos } from '../styles/estilos';

export default function JogadorScreen() {
  const [vidaMaxima, setVidaMaxima] = useState(jogador.vidaMaxima);
  const [manaMaxima, setManaMaxima] = useState(jogador.manaMaxima);
  const [tiers, setTiers] = useState<{ [nome: string]: number }>(jogador.tiers);

  // guarda o valor aqui vvv
  function mudarVida(texto: string) {
    setVidaMaxima(texto);
    jogador.vidaMaxima = texto;
  }

  function mudarMana(texto: string) {
    setManaMaxima(texto);
    jogador.manaMaxima = texto;
  }

  function escolherTier(nomeCharm: string, tier: number) {
    const novos = { ...tiers, [nomeCharm]: tier };
    setTiers(novos);
    jogador.tiers = novos;

    // lista dos charms q tenho
    const liberados: string[] = [];
    for (let i = 0; i < CHARMS.length; i++) {
      if (novos[CHARMS[i]] > 0) {
        liberados.push(CHARMS[i]);
      }
    }
    jogador.charms = liberados;
  }


  const cabecalho = (
    <View>
      <Text style={estilos.titulo}>Meu Personagem</Text>

      <Text>Vida máxima:</Text>
      <TextInput
        style={estilos.input}
        value={vidaMaxima}
        onChangeText={mudarVida}
        keyboardType="numeric"
        placeholder="Ex: 6000"
      />

      <Text>Mana máxima:</Text>
      <TextInput
        style={estilos.input}
        value={manaMaxima}
        onChangeText={mudarMana}
        keyboardType="numeric"
        placeholder="Ex: 3000"
      />

      <Text style={estilos.subtitulo}>Charms:</Text>
      <Text style={{ marginBottom: 10 }}>
        Escolha o tier de cada charm. "Não" é um charm que você não tem.
      </Text>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={estilos.tela}
      keyboardShouldPersistTaps="handled"
      data={CHARMS}
      extraData={tiers}
      keyExtractor={(item) => item}
      ListHeaderComponent={cabecalho}
      renderItem={({ item }) => (
        <ItemCharm
          nome={item}
          tier={tiers[item]}
          aoEscolher={(tier) => escolherTier(item, tier)}
        />
      )}
    />
  );
}