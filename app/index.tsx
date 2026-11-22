import { useState } from 'react';
import { View, FlatList, Text, TextInput, Button, Alert } from 'react-native';
import CartaoInimigo from '../components/CartaoInimigo';
import { buscarInimigo } from '../services/bestiario';
import { calcularCombinacao } from '../services/calculo';
import { textoDano } from '../services/elementos';
import { jogador } from '../data/jogador';
import { estilos } from '../styles/estilos';

export default function CalculadoraScreen() {
  const [nome, setNome] = useState('');
  const [inimigos, setInimigos] = useState<any[]>([]);
  const [resultado, setResultado] = useState<any[] | null>(null);

  function adicionar() {
    const encontrado = buscarInimigo(nome);
    if (!encontrado) {
      Alert.alert('Aviso', 'Inimigo não encontrado');
      return;
    }
    // não deixa adicionar o mesmo inimigo duas vezes
    for (let i = 0; i < inimigos.length; i++) {
      if (inimigos[i].name === encontrado.name) {
        Alert.alert('Aviso', 'Esse inimigo já está na lista');
        return;
      }
    }
    // guarda o inimigo junto com a quantidade (começa vazia)
    setInimigos([...inimigos, { ...encontrado, quantidade: '' }]);
    setNome('');
    setResultado(null);
  }

  function mudarQuantidade(nomeInimigo: string, texto: string) {
    const nova: any[] = [];
    for (let i = 0; i < inimigos.length; i++) {
      if (inimigos[i].name === nomeInimigo) {
        nova.push({ ...inimigos[i], quantidade: texto });
      } else {
        nova.push(inimigos[i]);
      }
    }
    setInimigos(nova);
    setResultado(null);
  }

  function remover(nomeInimigo: string) {
    const nova: any[] = [];
    for (let i = 0; i < inimigos.length; i++) {
      if (inimigos[i].name !== nomeInimigo) {
        nova.push(inimigos[i]);
      }
    }
    setInimigos(nova);
    setResultado(null);
  }

  function calcular() {
    if (inimigos.length === 0) {
      Alert.alert('Aviso', 'Adicione inimigos à hunt');
      return;
    }
    if (jogador.charms.length === 0) {
      Alert.alert('Aviso', 'Libere charms na aba Meu Personagem');
      return;
    }
    const vida = Number(jogador.vidaMaxima);
    const mana = Number(jogador.manaMaxima);
    const lista = calcularCombinacao(inimigos, jogador.charms, vida, mana);
    if (lista === null) {
      Alert.alert('Aviso', 'Informe a quantidade de cada inimigo');
      return;
    }
    setResultado(lista);
  }

  // parte de cima da lista: título, caixa de texto e botão
  const cabecalho = (
    <View>
      <Text style={estilos.titulo}>Calculadora de Charms</Text>

      <Text>Nome do inimigo:</Text>
      <TextInput
        style={estilos.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Rotworm"
      />
      <Button title="Adicionar" onPress={adicionar} />

      <Text style={{ marginTop: 20 }}>Inimigos na hunt: {inimigos.length}</Text>
    </View>
  );

  // parte de baixo da lista: botão de calcular e resultado
  const rodape = (
    <View style={{ marginTop: 10 }}>
      <Button title="Calcular melhor combinação" onPress={calcular} />

      {resultado && (
        <View style={estilos.resultado}>
          <Text style={estilos.subtitulo}>Melhor combinação</Text>
          {resultado.length === 0 && (
            <Text>Nenhum charm liberado ajuda nessa hunt.</Text>
          )}
          {resultado.map((item) => (
            <Text key={item.charm}>
              {item.charm} → {item.inimigo} ({textoDano(item.valor)})
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={estilos.tela}
      keyboardShouldPersistTaps="handled"
      data={inimigos}
      keyExtractor={(item) => item.name}
      ListHeaderComponent={cabecalho}
      ListFooterComponent={rodape}
      ListEmptyComponent={<Text>Nenhum inimigo adicionado ainda.</Text>}
      renderItem={({ item }) => (
        <CartaoInimigo
          inimigo={item}
          aoMudarQuantidade={(texto) => mudarQuantidade(item.name, texto)}
          aoRemover={() => remover(item.name)}
        />
      )}
    />
  );
}