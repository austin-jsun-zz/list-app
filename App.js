/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase';

export default class FlatListBasics extends Component {

  //initialize Firebase


  state = {
    data: []
  };

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyA8-LKade2X0sWNBPF4UiiVu8s9P-DTP6o",
      authDomain: "listapp-76e51.firebaseapp.com",
      databaseURL: "https://listapp-76e51.firebaseio.com",
      projectId: "listapp-76e51",
      storageBucket: "listapp-76e51.appspot.com",
      messagingSenderId: "505740590123",
      appId: "1:505740590123:web:1f4a3993d5a4933f"
    };
    firebase.initializeApp(firebaseConfig);

    firebase.database().ref('users/001').set(
      {
        name: 'Austin Sun',
        age: 18
      }
    )
    firebase.database().ref('users/002').set(
      {
        name: 'Chris',
        age: 40
      }
    )
    firebase.database().ref('users/003').set(
      {
        name: 'John',
        age: 27
      }
    )
    //firebase.database().ref('users')
    this.fetchData();
    //this.getData();
  }

  snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        //item.key = childSnapshot.key;

        returnArr.push(item);
    });
    return returnArr;
  };

  getData() {
    //let json;
    const json = firebase.database().ref('users').once('value', function(dataSnapshot) {
      return dataSnapshot.toJSON()
    });
    /*const json = firebase.database().ref('users').once('value', (data) => {
      return data.toJSON();
    })
    console.log(json);
    const newArr = Object.values(json);
    */
    this.setState({data: json})
  }

  fetchData = async () => {
    const response = await fetch("https://listapp-76e51.firebaseio.com/users.json")///firebase.database().ref().toString());
    const json = await response.json();
    /*Object.keys(json).map((key, index) => {
      const myItem = json[key];
      return myItem;
    })*/
    /*var jsonArray = json.services.map(function(item) {
      return {
        key: item.age,
        label: item.name
      };
    });
    */
    this.setState({data: Object.values(json)})
  }


  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  marginTop: 30,
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})
