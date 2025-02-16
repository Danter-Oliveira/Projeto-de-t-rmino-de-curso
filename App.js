import React, { useState, useEffect } from 'react'; // Importa React, useState e useEffect
import { NavigationContainer } from '@react-navigation/native'; // Importa o NavigationContainer para envolver a navegação
import { createNativeStackNavigator } from '@react-navigation/native-stack'; // Importa o Stack Navigator
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa o AsyncStorage para persistência de dados
import cadastro from './components/registering/index'; // Importa o componente da tela de cadastro
import tela_gerencia from './components/gerencia'; // Importa o componente da tela de gerenciamento
import config from './components/config'; // Importa o componente da tela de configuração

// Cria um Stack Navigator
const Stack = createNativeStackNavigator();

// Componente principal de navegação
function AppNav() {
  // Estados:
  // hasAccessedGerencia: Armazena se o usuário já acessou a tela de gerenciamento (persistido no AsyncStorage)
  // isLoading: Indica se os dados do AsyncStorage estão sendo carregados
  const [hasAccessedGerencia, setHasAccessedGerencia] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect para carregar dados do AsyncStorage ao montar o componente
  useEffect(() => {
    // Função assíncrona para verificar o acesso
    const checkAccess = async () => {
      try {
        // Tenta obter o valor de 'hasAccessedGerencia' do AsyncStorage
        const accessed = await AsyncStorage.getItem('hasAccessedGerencia');
        // Se o valor for 'true' (string), define hasAccessedGerencia como true
        if (accessed === 'true') { 
          setHasAccessedGerencia(true);
        }
      } catch (error) {
        // Se houver um erro, exibe no console
        console.error("Erro ao verificar acesso:", error);
      } finally {
        // Define isLoading como false, indicando que o carregamento terminou
        setIsLoading(false);
      }
    };

    // Chama a função checkAccess
    checkAccess();
  }, []); // O array vazio indica que este efeito é executado apenas na montagem do componente

  // Renderiza um indicador de carregamento enquanto os dados estão sendo carregados
  if (isLoading) {
    return null; // Ou um componente de carregamento mais elaborado
  }

  // Componente de navegação
  return (
    <NavigationContainer>
      <Stack.Navigator 
        // Define a tela inicial com base no estado hasAccessedGerencia
        initialRouteName={hasAccessedGerencia ? "registering" : "gerencia"}
      >
        {/* Tela de Cadastro */}
        <Stack.Screen
          name="registering"
          component={cadastro}
          options={{ headerShown: false }}
        />

        {/* Tela de Gerenciamento */}
        <Stack.Screen
          name="gerencia"
          component={tela_gerencia}
          options={{ headerShown: false }}
          // listeners: ouve eventos de navegação na tela de gerenciamento
          listeners={{
            // Evento 'focus': chamado quando a tela ganha foco
            focus: () => {
              // Se o usuário ainda não acessou a tela (hasAccessedGerencia é false)
              if (!hasAccessedGerencia) {
                // Define hasAccessedGerencia como true no AsyncStorage
                AsyncStorage.setItem('hasAccessedGerencia', 'true');
                // Define hasAccessedGerencia como true no estado
                setHasAccessedGerencia(true);
              }
            },
          }}
        />

        {/* Tela de Configuração */}
        <Stack.Screen
          name="configurar"
          component={config}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Exporta o componente AppNav
export default AppNav;