// COnfigurção responsavel pelo stilo da pagina registring, é como o CSS puro essa função retorna toda configuração de comportamento da tela
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // configuração da imagem de fundo
  fundo: {
    width: 410,
    height: 1005,
  },
  //configurção da seta
  log: {
    marginLeft: 130,
    marginTop: 80,
    width: 140,
    height: 125,
  },
  //Configuração do botão cadastra
  botao: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    padding: 20,
    borderRadius: 20,
    width: 180,
    marginLeft: '27%',
    marginVertical: 60

  },
  //Configuração da tela pai
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  //configuração dos textos informativos
  text_one: {
    margin: 10,
    marginTop: 15,
    fontSize: 25,
    typeface: 'lato',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  //configuração dos textos informativos
  text_two: {
    margin: 10,
    marginTop: 15,
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
  //Configuração da caixa 
  box_one: {
    borderColor: 'black',
    margin: 12,
    borderWidth: 3,
    padding: 10,
    backgroundColor: "white",
  },
  user: {
    alignSelf: 'center',
    width: 12,
    padding: 100,
    height: 10,
    borderRadius: 100,
    margin: 15,
  },
  image: {
    width: 200,
    height: 200,
  },
  butt: {
    flexDirection: "row",
    alignItems: 'center',
    backgroundColor: 'red',
    borderWidth: 0.5,
    borderColor: "black",
    height: 40,
    borderRadius: 5,
    margin: 5,
  }
});
export default styles