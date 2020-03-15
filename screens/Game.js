import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function Game ({ navigation }) {
   return (
     <View style={styles.container}>
       <Text>Game screen!</Text>
       <Button
        title="Go to Home"
        onPress={() => navigation.navigate('Home')}
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