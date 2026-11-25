import { View, Text, TextInput } from 'react-native';
import { estilosBusca } from '../styles/estilosBusca';

export default function BuscaInimigo({
  nome,
  aoMudarNome,
  sugestoes,
  aoEscolher,
  aoAdicionar,
  total,
  aoRetirarTodos,
}: any) {
  return (
    <View style={estilosBusca.caixa}>
      <Text style={estilosBusca.rotulo}>Nome do inimigo</Text>

      <View style={estilosBusca.linha}>
        <TextInput
          style={estilosBusca.input}
          value={nome}
          onChangeText={aoMudarNome}
          placeholder="Ex: Rotworm"
        />
        <Text style={estilosBusca.botaoAdicionar} onPress={aoAdicionar}>
          Adicionar
        </Text>
      </View>

      {sugestoes.length > 0 && (
        <View style={estilosBusca.listaSugestoes}>
          {sugestoes.map((sugestao: string) => (
            <Text
              key={sugestao}
              style={estilosBusca.sugestao}
              onPress={() => aoEscolher(sugestao)}
            >
              {sugestao}
            </Text>
          ))}
        </View>
      )}

      {total > 0 && (
        <View style={estilosBusca.rodape}>
          <Text style={estilosBusca.retirarTodos} onPress={aoRetirarTodos}>
            Retirar todos
          </Text>
        </View>
      )}
    </View>
  );
}