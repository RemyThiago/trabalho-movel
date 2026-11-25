import { View, Text, TextInput, Button } from 'react-native';
import { textoDano } from '../services/elementos';
import { estilosCartao } from '../styles/estilosCartao';

export default function CartaoInimigo({ inimigo, aoMudarQuantidade, aoRemover }: any) {
  return (
    <View style={estilosCartao.caixa}>
      <Text style={estilosCartao.nome}>{inimigo.name}</Text>

      <View style={estilosCartao.colunas}>
        <View style={estilosCartao.coluna}>
          <Text style={estilosCartao.linha}>Vida: {inimigo.hitpoints}</Text>
          <Text style={estilosCartao.linha}>Physical: {textoDano(inimigo.physicalDmgMod)}</Text>
          <Text style={estilosCartao.linha}>Earth: {textoDano(inimigo.earthDmgMod)}</Text>
          <Text style={estilosCartao.linha}>Fire: {textoDano(inimigo.fireDmgMod)}</Text>
        </View>

        <View style={estilosCartao.coluna}>
          <Text style={estilosCartao.linha}>Energy: {textoDano(inimigo.energyDmgMod)}</Text>
          <Text style={estilosCartao.linha}>Ice: {textoDano(inimigo.iceDmgMod)}</Text>
          <Text style={estilosCartao.linha}>Death: {textoDano(inimigo.deathDmgMod)}</Text>
          <Text style={estilosCartao.linha}>Holy: {textoDano(inimigo.holyDmgMod)}</Text>
        </View>
      </View>

      <Text style={estilosCartao.rotuloQuantidade}>Quantidade na hunt:</Text>
      <TextInput
        style={estilosCartao.input}
        value={inimigo.quantidade}
        onChangeText={aoMudarQuantidade}
        keyboardType="numeric"
      />

      <Button title="Remover" onPress={aoRemover} />
    </View>
  );
}