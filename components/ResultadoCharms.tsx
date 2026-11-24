// Quadro com o resultado do cálculo (charm → inimigo)
import { View, Text } from 'react-native';
import { textoDano } from '../services/elementos';
import { jogador } from '../data/jogador';
import { estilos } from '../styles/estilos';

type Props = {
  titulo: string;
  lista: any[];
  marcarNovos: boolean;
};

export default function ResultadoCharms(props: Props) {
  return (
    <View style={estilos.resultado}>
      <Text style={estilos.subtitulo}>{props.titulo}</Text>

      {props.lista.length === 0 && <Text>Nenhum charm ajuda nessa hunt.</Text>}

      {props.lista.map((item) => (
        <Text key={item.charm}>
          {item.charm} (T{item.tier}) → {item.inimigo} ({textoDano(item.valor)})
          {props.marcarNovos && jogador.tiers[item.charm] === 0
            ? ' – você não tem'
            : ''}
        </Text>
      ))}
    </View>
  );
}