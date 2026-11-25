import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
import { View, FlatList, Text, Button, Alert } from 'react-native';
import BuscaInimigo from '../components/BuscaInimigo';
import CartaoInimigo from '../components/CartaoInimigo';
import ResultadoCharms from '../components/ResultadoCharms';
import { buscarInimigo, sugerirNomes } from '../services/bestiario';
import { calcularCombinacao } from '../services/calculo';
import { CHARMS } from '../data/charms';
import { jogador } from '../data/jogador';
import { estilos } from '../styles/estilos';

export default function CalculadoraScreen() {
  const insets = useSafeAreaInsets();
  const [nome, setNome] = useState('');
  const [inimigos, setInimigos] = useState<any[]>([]);
  const [resultado, setResultado] = useState<any[] | null>(null);
  const [resultadoTodos, setResultadoTodos] = useState<any[] | null>(null);

  // nomes sugeridos
  let sugestoes = sugerirNomes(nome);
  if (sugestoes.length === 1 && sugestoes[0].toLowerCase() === nome.trim().toLowerCase()) {
    sugestoes = [];
  }

  // apaga os resultados
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
    // não duplicar
    for (let i = 0; i < inimigos.length; i++) {
      if (inimigos[i].name === encontrado.name) {
        Alert.alert('Aviso', 'Esse inimigo já está na lista');
        return;
      }
    }

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

  function removerTodos() {
    setInimigos([]);
    limparResultados();
  }

  function calcular() {
    if (inimigos.length === 0) {
      Alert.alert('Aviso', 'Adicione inimigos à hunt');
      return;
    }
    const vida = Number(jogador.vidaMaxima);
    const mana = Number(jogador.manaMaxima);

    // conta com meus charms
    const lista = calcularCombinacao(inimigos, jogador.tiers, vida, mana);
    if (lista === null) {
      Alert.alert('Aviso', 'Informe a quantidade de cada inimigo');
      return;
    }

    // conta com os melhores charms possiveis
    const tiersTodos: { [nome: string]: number } = {};
    for (let i = 0; i < CHARMS.length; i++) {
      tiersTodos[CHARMS[i]] = 3;
    }
    const listaTodos = calcularCombinacao(inimigos, tiersTodos, vida, mana);

    setResultado(lista);
    setResultadoTodos(listaTodos);
  }

  // titulo e pesquisa
  const cabecalho = (
    <View>
      <Text style={estilos.titulo}>Calculadora de Charms</Text>
      <BuscaInimigo
        nome={nome}
        aoMudarNome={setNome}
        sugestoes={sugestoes}
        aoEscolher={setNome}
        aoAdicionar={adicionar}
        total={inimigos.length}
        aoRetirarTodos={removerTodos}
      />
    </View>
  );

  // botao de calcular e os 2 resultados
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
          titulo="Melhor combinação com todos os charms no tier 3"
          lista={resultadoTodos}
          marcarNovos={true}
        />
      )}
    </View>
  );

  return (
    <FlatList
      contentContainerStyle={[estilos.tela, { paddingBottom: insets.bottom + 30 }]} 
      keyboardShouldPersistTaps="handled"
      data={inimigos}
      keyExtractor={(item) => item.name}
      ListHeaderComponent={cabecalho}
      ListFooterComponent={rodape}
      ListEmptyComponent={<Text>Nenhum inimigo adicionado ainda.</Text>}
      renderItem={({ item }) => (
        <CartaoInimigo
          inimigo={item}
          aoMudarQuantidade={(texto: string) => mudarQuantidade(item.name, texto)}
          aoRemover={() => remover(item.name)}
        />
      )}
    />
  );
}