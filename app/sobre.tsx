import { View, Text } from 'react-native';
import { estilos } from '../styles/estilos';

export default function SobreScreen() {
  return (
    <View style={estilos.tela}>
      <Text style={estilos.titulo}>Sobre</Text>

      <Text style={{ marginBottom: 10 }}>
        Calculadora que escolhe a melhor combinação de charms do Tibia para a
        sua hunt. A quantidade de erros na parte de matemática não pode ser descrito com palavras.
      </Text>

      <Text style={{ marginBottom: 10 }}>
        Em "Meu Personagem" você informa vida, mana e o tier de cada charm. Na
        "Calculadora" você adiciona os inimigos com a quantidade e o app mostra
        a melhor combinação com os seus charms e a melhor com todos no tier 3.
      </Text>
      <Text>
        Fonte dos dados: TibiaWiki, pelo repositório tibia-json fornecido pelo meu grande amigo Kikaro (ele é muito foda).
      </Text>
    </View>
  );
}