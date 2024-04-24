import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList, Image} from 'react-native';



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

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={item.image}
        style={styles.charaterImage}
      />
      <Text style={styles.charaterName}>{item.name}</Text>
    </View>
  )


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Characters:</Text>
      {
        characters.length ? (
          <FlatList 
            data={characters}
            renderItem={renderItem}
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
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  characterImage: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    marginRight: 10
  },
  characterName: {
    fontSize: 16
  }
});