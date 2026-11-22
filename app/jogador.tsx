import { useState } from 'react';
import { View, FlatList, Text, TextInput } from 'react-native';
import ItemCharm from '../components/ItemCharm';
import { CHARMS } from '../data/charms';
import { jogador } from '../data/jogador';
import { estilos } from '../styles/estilos';

export default function JogadorScreen() {
  const [vidaMaxima, setVidaMaxima] = useState(jogador.vidaMaxima);
  const [manaMaxima, setManaMaxima] = useState(jogador.manaMaxima);
  const [liberados, setLiberados] = useState<string[]>(jogador.charms);

  // cada um guarda valor na tela e jogador.ts
  function mudarVida(texto: string) {
    setVidaMaxima(texto);
    jogador.vidaMaxima = texto;
  }

  function mudarMana(texto: string) {
    setManaMaxima(texto);
    jogador.manaMaxima = texto;
  }

  function estaLiberado(nomeCharm: string) {
    for (let i = 0; i < liberados.length; i++) {
      if (liberados[i] === nomeCharm) {
        return true;
      }
    }
    return false;
  }

  function trocarCharm(nomeCharm: string) {
    let nova: string[] = [];
    if (estaLiberado(nomeCharm)) {
      for (let i = 0; i < liberados.length; i++) {
        if (liberados[i] !== nomeCharm) {
          nova.push(liberados[i]);
        }
      }
    } else {
      nova = [...liberados, nomeCharm];
    }
    setLiberados(nova);
    jogador.charms = nova;
  }

  // campos de cima
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

      <Text style={estilos.subtitulo}>Charms liberados:</Text>
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={estilos.tela}
      keyboardShouldPersistTaps="handled"
      data={CHARMS}
      extraData={liberados}
      keyExtractor={(item) => item}
      ListHeaderComponent={cabecalho}
      renderItem={({ item }) => (
        <ItemCharm
          nome={item}
          liberado={estaLiberado(item)}
          aoTrocar={() => trocarCharm(item)}
        />
      )}
    />
  );
}