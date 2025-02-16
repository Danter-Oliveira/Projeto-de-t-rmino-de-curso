import React, { useState } from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';

export function MyList () {
  
  const [items, setItems] = useState([
    { id: 1, label: 'Item 1', checked: false },
    { id: 2, label: 'Item 2', checked: false },
    // ... mais itens
  ]);

  // passa a vericação para deletar o item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const renderItem = ({ item }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <CheckBox
          value={item.checked}
          onPress={() => {
            // Lógica para lidar com a mudança do checkbox (opcional)
          }}
        />
        <Text>{item.label}</Text>

        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Text>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
};

export default MyList;