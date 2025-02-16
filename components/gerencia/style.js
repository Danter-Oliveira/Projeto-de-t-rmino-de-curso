// COnfigurção responsavel pelo stilo da pagina gerencia, é como o CSS puro essa função retorna toda configuração de comportamento da tela
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // configuração da imagem de fundo
  fundo: {
    width: 410,
    height: 1005,
  },
  caixa_interativa: {
    alignitems: 'center',
    backgroundColor: "white",
    justifyContent: 'center',
    padding: 10,
    width: 390,
    height: 450,
    left: 12,
    borderStyle: "solid",
    borderBlockColor: "black",
    borderRadius: 10,
    borderWidth: 3,
    //marginVertical:-80
  },
  //Configuração do botão cadastra
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 20,
    width: 250,
    marginLeft: '20%',
    marginVertical: 30

  },
  //Configuração da tela pai
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  //configuração dos textos informativos
  text_one_button: {
    color: "white",
    fontSize: 20,
    typeface: 'lato',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //configuração dos textos informativos
  text_two: {
    margin: 10,
    marginTop: 5,
    fontSize: 19,
    typeface: 'lato',
    fontWeight: 'bold',
    textAlign: 'center',

  },
  //configuração dos textos informativos
  text_three: {
    margin: 10,
    marginTop: 15,
    fontSize: 19,
    typeface: 'lato',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //configuração dos textos informativos
  text_four: {
    margin: 10,
    marginTop: 15,
    fontSize: 19,
    typeface: 'lato',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box_one: {
    borderColor: 'black',
    margin: 12,
    borderWidth: 3,
    padding: 10,
    backgroundColor: "white"
  },
  user: {
    alignSelf: 'center',
    width: 12,
    padding: 100,
    height: 10,
    borderRadius: 100,
    margin: 15,
  },
  lixo: {
    alignSelf: 'center',
    width: 5,
    padding: 25,
    height: 5,
    borderRadius: 100,
    margin: 15,
    top: -210,
    left: 160
  }
});
export default styles