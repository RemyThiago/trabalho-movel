// Estilos do cartão do inimigo
import { StyleSheet } from 'react-native';

export const estilosCartao = StyleSheet.create({
  caixa: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  colunas: {
    flexDirection: 'row',
  },
  coluna: {
    flex: 1,
  },
  linha: {
    fontSize: 15,
    marginBottom: 3,
  },
  rotuloQuantidade: {
    marginTop: 10,
    marginBottom: 4,
    color: '#555',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
});