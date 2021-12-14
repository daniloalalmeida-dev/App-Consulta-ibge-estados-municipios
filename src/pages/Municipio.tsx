import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { Estado } from './Home';
import { api } from '../services/api';
import { ItemMunicipio } from '../components/itemMunicipio';

export interface Params {
  estado: Estado;
}
export interface Municipio {
  id: number;
  nome: string;
}

export function Municipio() {
  const route = useRoute();
  const { estado } = route.params as Params;
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [list, setList] = useState(municipios);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  async function loadMunicipios() {
    const response = await api.get<Municipio[]>(
      `/${estado.id}/municipios?orderBy=nome`
    );
    setMunicipios(response.data);
  }

  async function showMunicipioData() {
    alert('Estado ' + estado.sigla)
  }

  useEffect(() => {
    if (!searchText) {
      setList(municipios)
      loadMunicipios();
      navigation.setOptions({ title: estado.nome.toUpperCase() });
    } else {
      setList(
        municipios.filter(
          (item) =>
            item.nome.toUpperCase().indexOf(searchText.toUpperCase()) > -1
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
        placeholder="Buscar município"
        placeholderTextColor={'#00b4d8'}
        maxLength={40}
      />
      <FlatList<Municipio>
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ItemMunicipio item={item} onPress={() => showMunicipioData()} />}
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
