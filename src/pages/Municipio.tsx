import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Estado } from './Home';
import { api } from '../services/api'
import { ItemMunicipio } from '../components/itemMunicipio';

interface Params{
  estado: Estado;
}
export interface Municipio{
  id: number;
  nome: string;
}


export function Municipio() {
  const route = useRoute();
  const {estado} = route.params as Params;
  const [municipios, setMunicipios] = useState<Municipio[]>([])
  const navigation = useNavigation();

  async function loadMunicipios() {
    const response = await api.get<Municipio[]>(`/${estado.id}/municipios?orderBy=nome`);
    setMunicipios(response.data);
  }

  useEffect(() => {
    loadMunicipios();
    navigation.setOptions({title: estado.nome.toUpperCase()})
  }, []);

  return (
    <View style={styles.container}>
      <FlatList<Municipio>
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={municipios}
        keyExtractor={(municipio) => String(municipio.id)}
        renderItem={({ item }) => (
          <ItemMunicipio item={item}/>
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
  }
});
