import { useState } from 'react';
import { View, FlatList, Text, TextInput, Button, Alert } from 'react-native';
import CartaoInimigo from '../components/CartaoInimigo';
import ResultadoCharms from '../components/ResultadoCharms';
import { buscarInimigo } from '../services/bestiario';
import { calcularCombinacao } from '../services/calculo';
import { CHARMS } from '../data/charms';
import { jogador } from '../data/jogador';
import { estilos } from '../styles/estilos';

export default function CalculadoraScreen() {
  const [nome, setNome] = useState('');
  const [inimigos, setInimigos] = useState<any[]>([]);
  const [resultado, setResultado] = useState<any[] | null>(null);
  const [resultadoTodos, setResultadoTodos] = useState<any[] | null>(null);

  // apaga os resultados quando a hunt muda
  function limparResultados() {
    setResultado(null);
    setResultadoTodos(null);
  }

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
    limparResultados();
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
    limparResultados();
  }

  function remover(nomeInimigo: string) {
    const nova: any[] = [];
    for (let i = 0; i < inimigos.length; i++) {
      if (inimigos[i].name !== nomeInimigo) {
        nova.push(inimigos[i]);
      }
    }
    setInimigos(nova);
    limparResultados();
  }

  function calcular() {
    if (inimigos.length === 0) {
      Alert.alert('Aviso', 'Adicione inimigos à hunt');
      return;
    }
    const vida = Number(jogador.vidaMaxima);
    const mana = Number(jogador.manaMaxima);

    // 1ª conta: só com os charms que eu tenho
    const lista = calcularCombinacao(inimigos, jogador.tiers, vida, mana);
    if (lista === null) {
      Alert.alert('Aviso', 'Informe a quantidade de cada inimigo');
      return;
    }

    // 2ª conta: os charms que eu não tenho entram no tier 3
    const tiersTodos: { [nome: string]: number } = {};
    for (let i = 0; i < CHARMS.length; i++) {
      if (jogador.tiers[CHARMS[i]] > 0) {
        tiersTodos[CHARMS[i]] = jogador.tiers[CHARMS[i]];
      } else {
        tiersTodos[CHARMS[i]] = 3;
      }
    }
    const listaTodos = calcularCombinacao(inimigos, tiersTodos, vida, mana);

    setResultado(lista);
    setResultadoTodos(listaTodos);
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

  // parte de baixo da lista: botão de calcular e os dois resultados
  const rodape = (
    <View style={{ marginTop: 10 }}>
      <Button title="Calcular melhor combinação" onPress={calcular} />

      {resultado && (
        <ResultadoCharms
          titulo="Melhor combinação com os seus charms"
          lista={resultado}
          marcarNovos={false}
        />
      )}

      {resultadoTodos && (
        <ResultadoCharms
          titulo="Melhor combinação incluindo os charms que você não tem"
          lista={resultadoTodos}
          marcarNovos={true}
        />
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