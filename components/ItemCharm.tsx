import { View, Text, Switch } from 'react-native';  //linha + lista dos charm
import { estilos } from '../styles/estilos';

type Props = {
  nome: string;
  liberado: boolean;
  aoTrocar: () => void;
};

export default function ItemCharm(props: Props) {
  return (
    <View style={estilos.item}>
      <Text style={estilos.textoItem}>{props.nome}</Text>
      <Switch value={props.liberado} onValueChange={props.aoTrocar} />
    </View>
  );
}