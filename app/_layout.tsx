import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{ title: 'Calculadora de Charms', drawerLabel: 'Calculadora' }}
        />
        <Drawer.Screen
          name="jogador"
          options={{ title: 'Meu Personagem', drawerLabel: 'Meu Personagem' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}