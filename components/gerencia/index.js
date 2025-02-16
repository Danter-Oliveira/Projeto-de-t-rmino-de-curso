import {
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  BackHandler,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import fundo from '../../assets/fundo.jpeg';
import styles from './style';
import seta from '../../assets/seta.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function tela_gerencia({ route }) {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Carrega as tarefas do AsyncStorage ao montar o componente
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('minhaChave');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    // Salva as tarefas no AsyncStorage sempre que o estado 'tasks' mudar
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('minhaChave', JSON.stringify(tasks));
      } catch (error) {
        console.error('Erro ao salvar tarefas:', error);
      }
    };

    saveTasks();
  }, [tasks]); // Dependência em 'tasks' para salvar apenas quando a lista for modificada

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  }, [inputRef]);

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    setModalVisible(false);
    if (newTask.trim() === '') return;

    const newTaskId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1; // Novo ID baseado no maior ID existente ou 1 se a lista estiver vazia

    const newTaskItem = { id: newTaskId, title: newTask, completed: false };
    setTasks([...tasks, newTaskItem]);
    setNewTask('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const Item = ({ titles }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', maxWidth: 298 }}>
      <CheckBox
        title={titles.title}
        checkedIcon={'check'}
        uncheckedIcon={'square-o'}
        checkedColor="red"
        uncheckedColor="green"
        checked={titles.completed}
        value={titles.completed}
        onPress={() => toggleComplete(titles.id)}
        textStyle={{
          textDecorationLine: titles.completed ? 'line-through' : 'none',
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          color: 'white',
          borderRadius: '5%',
        }}
        onPress={() => handleDelete(titles.id)}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
          }}>
          Excluir
        </Text>
      </TouchableOpacity>
    </View>
  );
  const sairDoAplicativo = () => {
      BackHandler.exitApp();
    };
  return (
    <View //elemento pai da tela
    >
      <ImageBackground //imagem de fundo da tela
        source={fundo}
        style={styles.fundo}>
        <Image //imagem do user que é recebida por parametro
          source={seta}
          style={styles.user}
        />
        <TouchableOpacity
          style={{
            //adcionat a conf dps para fechar o app:onPress={() => BackHandler.exitApp()}
            backgroundColor: 'red',
            borderRadius: '5%',
            maxWidth: 45,
            left: 15,
            alignItems: 'center',
            top: -190,
            borderRadius: '15%',
          }}
          onPress={sairDoAplicativo}>
          <Text
            style={{
              //configução do texto do botão
              color: 'white',
              typeface: 'lato',
              fontWeight: 'bold',
              left: 1,
            }}>
            SAIR
          </Text>
        </TouchableOpacity>
        <Text //texto de abertura que recebe o nomo por paramero do  route
          style={styles.text_two}>
          {' '}
          Seja bem Vindo(a) {route.params?.nome}{' '}
        </Text>
        <View //Viw da caixa de interação
          style={styles.caixa_interativa}>
          <FlatList
            data={tasks}
            renderItem={({ item }) => <Item titles={item} />}
            keyExtractor={(item) => item.id.toString()} // Adicione esta linha
          />
        </View>

        <TouchableOpacity // botão que chama a função modal para abri a caixa de texto e adicionar uma nova tarefa
          style={styles.botao}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.text_one_button}>Adicionar nova tarefa</Text>
        </TouchableOpacity>

        <Modal //Método que abe uma pequena janela por cima da tela, ele deixa os outrso itens sem foco e nessa tela que eu passo os valores que vão entrar dentro do array, ainda não consegui passar o estilo de forma extena.
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
            valida_teclado(true);
          }}>
          <View
            style={{
              backgroundColor: 'gray',
              padding: 70,
              margin: 20,
              borderRadius: 20,
              top: 156,
              height: 200,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
                position: 'absolute',
                marginHorizontal: 35,
                top: 20,
              }}>
              Adicionar item
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: 'white',
                borderWidth: 2,
                width: 300,
                textAlign: 'left',
                marginHorizontal: -35,
                color: 'white',
              }}
              ref={inputRef}
              placeholder={'Digite sua demanda'}
              placeholderTextColor={'white'}
              onChangeText={(text) => setNewTask(text)}></TextInput>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                padding: 15,
                width: 100,
                marginLeft: '74%',
                marginTop: 9,
                borderRadius: 12,
                height: 45,
              }}
              onPress={handleAddTask}>
              <Text style={{ color: 'white' }}> Ok</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'blue',
                padding: 15,
                width: 95,
                marginTop: 20,
                borderRadius: 12,
                top: -65,
                marginHorizontal: -40,
                height: 45,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white' }}> Cancelar</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}
// Ainda tenho que colocar um botão para ira para tela de configuração, e torna a forma de deletar mais interativa, e cria uma outra tela que vai abrir um menu de telas que podem ser criadas automaticamente, para organizar diferentes tipos de tarefaz, e ainda tenho que validar os erros dessa tela após deixa ela melhor, e melhorar o estilo dela
