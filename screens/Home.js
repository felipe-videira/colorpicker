import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Home ({ navigation }) {
   return (
     <View style={styles.container}>
       <Text>Home screen!</Text>
       <Button
        title="Go to Game"
        onPress={() => navigation.navigate('Game')}
      />
     </View>
   );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});