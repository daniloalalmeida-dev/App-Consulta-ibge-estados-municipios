import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { color } from 'react-native-elements/dist/helpers';
import { Estado } from '../pages/Home';

export interface Props {
  data: Estado[];
  setData: React.Dispatch<React.SetStateAction<Estado[]>>;
}

const SearchItem: React.FC<Props> = ({data, setData}) => {
  const [search, setSearch] = useState('');

  const searchFilterFunction = (text: string) => {
    const newData = data.filter((estado) => {
      return estado.nome.toUpperCase().includes(text.toUpperCase())
      
    }) 
    setData(newData);
  }

  return (
    <TextInput
      placeholder="Buscar"
      onChangeText={searchFilterFunction}
    />
  );
};

export default SearchItem;
