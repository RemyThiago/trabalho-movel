import { View, Text } from 'react-native';
import { jogador } from '../data/jogador';
import { estilos } from '../styles/estilos';

export default function ResultadoCharms({ titulo, lista, marcarNovos }: any) {
  return (
    <View style={estilos.resultado}>
      <Text style={estilos.subtitulo}>{titulo}</Text>

      {lista.map((item: any) => {
        const tierAtual = jogador.tiers[item.charm];
        let aviso = '';
        if (marcarNovos) {
          if (tierAtual === 0) {
            aviso = ' – você não tem';
          } else if (tierAtual < item.tier) {
            aviso = ' – subir do T' + tierAtual;
          }
        }
        return (
          <Text key={item.charm}>
            {item.charm} (T{item.tier}) → {item.inimigo}:{' '}
            {Math.round(item.valor * 100)}% de dano elemental{aviso}
          </Text>
        );
      })}
    </View>
  );
}