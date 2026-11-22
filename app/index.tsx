import { useState } from 'react';
import { View, FlatList, Text, TextInput, Button, Alert } from 'react-native';
import CartaoInimigo from '../components/CartaoInimigo';
import { buscarInimigo } from '../services/bestiario';
import { estilos } from '../styles/estilos';

export default function CalculadoraScreen() {
  const [nome, setNome] = useState('');
  const [inimigos, setInimigos] = useState<any[]>([]);

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
  }

  function remover(nomeInimigo: string) {
    const nova: any[] = [];
    for (let i = 0; i < inimigos.length; i++) {
      if (inimigos[i].name !== nomeInimigo) {
        nova.push(inimigos[i]);
      }
    }
    setInimigos(nova);
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

  return (
    <FlatList
      contentContainerStyle={estilos.tela}
      keyboardShouldPersistTaps="handled"
      data={inimigos}
      keyExtractor={(item) => item.name}
      ListHeaderComponent={cabecalho}
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