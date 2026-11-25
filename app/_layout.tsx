import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{ drawerLabel: 'Calculadora', title: 'Calculadora de Charms' }}
        />
        <Drawer.Screen
          name="jogador"
          options={{ drawerLabel: 'Meu Personagem', title: 'Meu Personagem' }}
        />
        <Drawer.Screen
          name="sobre"
          options={{ drawerLabel: 'Sobre', title: 'Sobre' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}