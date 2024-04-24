import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';



const BASE_URL = 'https://rickandmortyapi.com/api/character'; 
function App(): React.JSX.Element {

  const [characters, setCharacters] = useState([]);


  const getCharacters = async () => {

    try {
      const response = await fetch(BASE_URL);

      const data = await response.json();

      console.log(data);
  
    } catch(e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getCharacters();
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <Text>Code interview with connor!</Text>
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