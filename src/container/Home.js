import React, {useState, useEffect, Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Register from './Register';

var db = openDatabase({name: 'UserDatabase.db'});

const Home = ({navigation}) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(40),user_contact INT(10))',
              [],
            );
          }
        },
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <Text style={styles.text}>
          Example of SQLite Database in React Native
        </Text>
        <Register />
      </View>
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: 'grey',
  },
});
