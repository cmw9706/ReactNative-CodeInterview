import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, FlatList, Image, View, TextInput} from 'react-native';



const BASE_URL = 'https://rickandmortyapi.com/api/character'; 
function App(): React.JSX.Element {

  const [characters, setCharacters] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);


  const getCharacters = async () => {

    try {
      setLoading(true);

      let actualURL = BASE_URL;
      if(search) {
        actualURL = BASE_URL + 'name=' + search.toLocaleLowerCase();
      }

      const response = await fetch(actualURL);

      const data = await response.json();

      setCharacters(data.results);

      console.log(data.results);
  
    } catch(e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCharacters();
  }, [search])

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={{
          uri: item.image
        }}
        style={styles.characterImage}
      />
      <Text style={styles.characterName}>{item.name}</Text>
    </View>
  )


  return (
    <SafeAreaView style={styles.container}>
      <TextInput 
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Search charcters..."
      />
      {
        loading ? (
          <Text>Loading Characters...</Text>
        ) : (
          <FlatList 
            data={characters}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={<Text>No charcters found.</Text>}
          />
        )
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
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20
  },
  characterImage: {
    width: 60,
    height: 60,
    borderRadius: 60/2,
    marginRight: 10
  },
  characterName: {
    fontSize: 16
  },
  searchInput: {
    height: 40,
    width: '90%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  }
});