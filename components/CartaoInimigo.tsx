// Quadro com os dados de um inimigo e a quantidade dele na hunt
import { View, Text, TextInput, Button } from 'react-native';
import { textoDano } from '../services/elementos';
import { estilos } from '../styles/estilos';

type Props = {
  inimigo: any;
  aoMudarQuantidade: (texto: string) => void;
  aoRemover: () => void;
};

export default function CartaoInimigo(props: Props) {
  const inimigo = props.inimigo;

  return (
    <View style={estilos.resultado}>
      <Text style={estilos.subtitulo}>{inimigo.name}</Text>
      <Text>Vida: {inimigo.hitpoints}</Text>
      <Text>Physical: {textoDano(inimigo.physicalDmgMod)}</Text>
      <Text>Earth: {textoDano(inimigo.earthDmgMod)}</Text>
      <Text>Fire: {textoDano(inimigo.fireDmgMod)}</Text>
      <Text>Energy: {textoDano(inimigo.energyDmgMod)}</Text>
      <Text>Ice: {textoDano(inimigo.iceDmgMod)}</Text>
      <Text>Death: {textoDano(inimigo.deathDmgMod)}</Text>
      <Text>Holy: {textoDano(inimigo.holyDmgMod)}</Text>

      <Text style={{ marginTop: 10 }}>Quantidade na hunt:</Text>
      <TextInput
        style={estilos.input}
        value={inimigo.quantidade}
        onChangeText={props.aoMudarQuantidade}
        keyboardType="numeric"
        placeholder="Ex: 600"
      />

      <Button title="Remover" onPress={props.aoRemover} />
    </View>
  );
}