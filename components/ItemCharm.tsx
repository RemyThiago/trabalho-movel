// Uma linha da lista de charms: nome e escolha do tier
import { View, Text } from 'react-native';
import { estilos } from '../styles/estilos';

type Props = {
  nome: string;
  tier: number;
  aoEscolher: (tier: number) => void;
};

export default function ItemCharm(props: Props) {
  return (
    <View style={estilos.item}>
      <Text style={estilos.textoItem}>{props.nome}</Text>
      <Text
        style={props.tier === 0 ? estilos.tierMarcado : estilos.tier}
        onPress={() => props.aoEscolher(0)}
      >
        Não
      </Text>
      <Text
        style={props.tier === 1 ? estilos.tierMarcado : estilos.tier}
        onPress={() => props.aoEscolher(1)}
      >
        T1
      </Text>
      <Text
        style={props.tier === 2 ? estilos.tierMarcado : estilos.tier}
        onPress={() => props.aoEscolher(2)}
      >
        T2
      </Text>
      <Text
        style={props.tier === 3 ? estilos.tierMarcado : estilos.tier}
        onPress={() => props.aoEscolher(3)}
      >
        T3
      </Text>
    </View>
  );
}