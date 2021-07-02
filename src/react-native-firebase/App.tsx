import React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
// import analytics from '@react-native-firebase/analytics';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setCurrentUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Firestore example
  useEffect(() => {
    (async () => {
      const ref = await firestore().collection("your_collection").doc("your_doc_id").get()
      const data = ref.data()
      console.log("data:", data)
    })()
  }, [])

  // Firebase Authentication example
  useEffect(() => {
    auth().onAuthStateChanged(currentUser => {
      console.log("currentUser:", currentUser)
      setCurrentUser(currentUser);
      if (loading) setLoading(false);
    });
  }, []);

  const onLogin = () => {
    auth().signInAnonymously().then(currentUser => {
      Alert.alert(
        "Firebase Auth",
        "User authenticated!",
        [
          { text: "OK" }
        ]
      );
    }).catch(err => {
      console.error("error", err)
    })
  }

  return (
    <View style={{ flex: 1, paddingVertical: 80, paddingHorizontal: 20 }}>
      { user ? (
        <View>
          <Text>Welcome, { user.uid }</Text>
          <Button title="Signout" onPress={() => auth().signOut()} />
        </View>
      ) : (
        <View>
          <Text>You are not authenticated.</Text>
          <Button title="SignIn Anonymously" onPress={onLogin} />
        </View>
      ) }
    </View>
  )
}

export default App;
