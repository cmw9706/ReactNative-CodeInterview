import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList} from 'react-native';



const BASE_URL = 'https://rickandmortyapi.com/api/character'; 
function App(): React.JSX.Element {

  const [characters, setCharacters] = useState([]);


  const getCharacters = async () => {

    try {
      const response = await fetch(BASE_URL);

      const data = await response.json();

      setCharacters(data.results);

      console.log(data.results);
  
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCharacters();
  }, [])

  const renderItem = ({item}) => {
    <Text>{item.name}</Text>
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text>Characters:</Text>
      {
        characters.length ? (
          <FlatList 
            data={characters}
            renderItems={}
            keyExtractor={item => item.id.toString()}
          />
        ) : null
      }
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});