import React, {useState, useEffect, Component} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import Mytextinput from '../component/Mytextinput';
import Mybutton from '../component/Mybutton';
var db = openDatabase({name: 'UserDatabase.db'});

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [userContact, setUserContact] = useState('');

  let register_user = () => {
    console.log(userName, userContact, userAddress);

    if (!userName) {
      alert('Please fill name');
      return;
    }

    if (!userEmail) {
      alert('Please fill email');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }

    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_email,user_contact) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <KeyboardAvoidingView
              behavior="padding"
              style={{flex: 1, justifyContent: 'space-between'}}>
              <Mytextinput
                placeholder="Enter Name"
                onChangeText={(userName) => setUserName(userName)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Email"
                onChangeText={(userEmail) => setUserEmail(userEmail)}
                style={{padding: 10}}
              />
              <Mytextinput
                placeholder="Enter Contact No"
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType="numeric"
                style={{padding: 10}}
              />

              <Mybutton title="Submit" customClick={register_user} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
