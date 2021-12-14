import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TextInputComponent,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { api } from '../services/api';
import { ItemEstado } from '../components/itemEstado';
import { Municipio } from './Municipio';

export interface Estado {
  id: number;
  nome: string;
  sigla: string;
  regiao: string;
}

export default function Home() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [list, setList] = useState(estados);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  async function loadEstados() {
    const response = await api.get('?orderBy=nome');
    setEstados(response.data);
  }

  function handleToMunicipio(item: Estado) {
    navigation.navigate('Municipio', { estado: item });
  }

  useEffect(() => {
    if (!searchText) {
      setList(estados)
      loadEstados()
    } else {
      setList(
        estados.filter(
          item =>
            item.nome.toUpperCase().indexOf(searchText.toUpperCase()) > -1 ||
            item.sigla.toUpperCase().indexOf(searchText.toUpperCase()) > -1
        )
      );
    }
  }, [searchText]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
        placeholder="Digite o nome ou sigla do estado"
        placeholderTextColor={'#00b4d8'}
        maxLength={40}
      />
      <FlatList<Estado>
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <ItemEstado item={item} onPress={() => handleToMunicipio(item)} />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#caf0f8',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#00b4d8',
    padding: 10,
  },
});
