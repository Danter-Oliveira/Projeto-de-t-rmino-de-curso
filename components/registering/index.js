//Essa é a pagina de cadastro do usuario abaixo esta os métodos importadas para montagem da pagina
import { Text, View, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from "react";
import { Input } from "react-native-elements";
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import fundo from '../../assets/fundo.jpeg';
import seta from '../../assets/seta.png';
import sombra from '../../assets/sombra.png';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


//Ess é a função que cira a tela
export default function cadastro() {
  // esssa é a const responsavel por declarar o navigator, e através dela passo os items
  const navigation = useNavigation();
  // esssa é a const responsavel por guarda o valor nome passado pelo user
  const [name, setName] = useState(null);

  // esssa é a const responsavel por amazenar um dos valores de validação do nome 
  const [errorName, setErrorName] = useState(false);
  // esssa é a const responsavel  por armazena a imagem que o user vai utilizar
  const [image, setImage] = useState(null);
  // esssa é a const responsavel por validar a imagem do user
  const [errorFoto, setErrorFoto] = useState(false)
  // esssa é a const responsavel por fazer a verificação dos inputs, se eles não teverem sido preenchidos ela retorna a mensagem de erro
  const validar = () => {
    let error = false
    setErrorName(null)
    setErrorFoto(null)
    if (name == null) {
      setErrorName('Adicione Um Nome De Usuario')
      error = true
    }
    return !error
  }
  // essa const quando o endereço e tipo da imagem na variavel para ser enviada para função abaixo
  const passa_foto = { uri: image }
  // esssa é a const responsavel autorizar a mudança de estado da pagina se a validação retornar false, ela permide que a tela seja alterada, imprime uma mensagem falando que os dados foram cadastrados e para os dados do nome e foto do user para que seja usado na próxima pagina, ela delcara a funçaõ validar e le o valor de retorna para aplicar a condição
 
 
  const [resgatado, setRegatado] = useState('')

  async function guardado(){
    try {
      await AsyncStorage.setItem('chave', name);
      console.log('Dados armazenados com sucesso!');
    } catch (error) {
      console.error('Erro ao armazenar dados:', error);
    }
  };

  // Recuperando dados
  async function getData  (){
      const nome = await AsyncStorage.getItem('chave')
    if (nome) {
      setRegatado(nome)
    }
  };

  const userName = resgatado
  
  useEffect(() => {getData()},[])

  const guardar = () => {
    if (validar()) {
      guardado()
      navigation.navigate('gerencia')
      Alert.alert('CADASTRO REALIZADO COM SUCESSO ' + userName)
      navigation.navigate("gerencia", { nome: userName, foto: seta })
    }
  }
  // essa variavel recebe uma validação de conteudo da função imagem para poder altera o icone da foto do usuario, se a const image tiver valor a variavel valor recebe 0, o que quebrea o uso da imagem sombra no capão de adicionar imagem permitindo que a imagem do ususario seja carregada
  let valor = sombra
  if (image) {
    valor = 0;
  }
  // esssa é a const responsavel por acessar a galeria do dispositivo através do ImagePicker método com interação ao SO quando ela é chamfa abre a galeria e passa a configuração da imagem para importala
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
    // ser para ver se a entrada funcionou no consolo
    console.log(result);
    // função que passa para a const imagem a imagem selecionada
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  // Esse return passa para o navigator as configuções  e interção da tela 
  return (
    //A viw abaixo recebe os valores da tela como pai
    <View style={styles.container}>

      <ImageBackground
        // responsavel pela tela de fundo
        source={fundo} style={styles.fundo}>

        <Image
          //Responsavel pela seta simbolo do App
          source={seta} style={styles.log} />

        <Text
          //responsavel pelo texto de ixibição
          style={styles.text_one}>
          Seja Muito Bem Vindo ao Seu Organizador de Tarefaz
        </Text>

        <Text
          //responsavel pelo texto de ixibição
          style={styles.text_two}>
          Para começar vamos realizar seu cadastro, preencha as informações
          abaixo
        </Text>

        <Text
          //responsavel pelo texto de solicitção
          style={styles.text_three}> Como deseja ser chamado(a)? </Text>

        <Input
          //reponsavel pela caixa que recebe os dados nome ela chama a função de validação caso não tenha sido preenchido
          style={styles.box_one}
          value={name}
          placeholder="Digite Seu Nome"
          onChangeText={(newTex) => setName(newTex)}
          errorMessage={errorName}
        />

    


        <TouchableOpacity
          //esse botõa chama a funçaõ cadastrar para enviar os dados do formulario
          style={styles.botao}
          onPress={guardar}        >
          <Text style={{
            color: 'white', typeface: 'lato', fontWeight: 'bold', left: 6, fontSize: 20
          }}>CADASTRA</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

// ainda falta melhorar as interações e itens da tela, corrigir o sistema de validação, pra que quando clicar fora do teclado ele feche, depois que o dado for adicionado o texto de red tem que sumir, e quando trocar de tela ao sair do app ou voltar para ela os valores não podem ser perdidos