//are de pesquisados bixo
import { StyleSheet } from 'react-native';

export const estilosBusca = StyleSheet.create({
  caixa: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rotulo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  botaoAdicionar: {
    marginLeft: 8,
    height: 44,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#2e7d32',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 44,
  },
  sugestao: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  listaSugestoes: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  rodape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },
  contagem: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  retirarTodos: {
    color: '#c62828',
    fontWeight: 'bold',
    fontSize: 15,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
});