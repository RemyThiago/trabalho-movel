import { StyleSheet } from 'react-native';

export const estilos = StyleSheet.create({
  tela: { padding: 20 },
  titulo: { fontSize: 22, marginBottom: 10 },
  subtitulo: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10 },
  resultado: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  textoItem: { flex: 1 },
  tier: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#999',
  },
  tierMarcado: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#cfe3ff',
  },
});