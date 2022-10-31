import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'

export default function App() {
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])  
 
  const testID = 'Loading'
  const accessibilityLabel = 'App is loading books'

  const fetchBooks = async () => {
    fetch('https://fudap-books-api.herokuapp.com/books/')
  .then((response) => response.json())
  .then((json) => setData(json))
  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
  }

  useEffect(
    () => {
  fetchBooks();
    }, []
  );


  return (
    <View style={{ flex: 1, padding: 24, backgroundColor: 'white', alignItems: 'center',justifyContent: 'center' }}>
      {
        isLoading ? <ActivityIndicator testID= {testID} accessibilityLabel={accessibilityLabel}/> :
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', top: 60}}>
        <FlatList 
        data={data} 
        keyExtractor={item=> item.id.toString()} 
        accessibilityLabel='books'
        renderItem={({item}) => (
          <View style={{flex: 1, alignItems: 'flex-start',justifyContent: 'center', backgroundColor:'blue', height:100,
          margin:4, borderRadius:10, padding:6, 
          }} testID="book">
            <Text>Title:  {item.title}</Text>
            <Text>Author: {item.author}</Text>
          </View>
        )}
      />
 </View>
 }
    </View>)
 
}

