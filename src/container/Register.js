import React, { useState, useEffect, Component } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import Mytextinput from "../component/Mytextinput";
import Mybutton from "../component/Mybutton";
import { Picker } from "@react-native-picker/picker";

var db = openDatabase({ name: "UserDatabase.db" });
const teacherList = [
  { id: 1, name: "Teacher1" },
  { id: 2, name: "Teacher2" },
  { id: 3, name: "Teacher3" },
  { id: 4, name: "Teacher4" },
];
const subjectList = [
  { id: 1, name: "English" },
  { id: 2, name: "Science" },
  { id: 3, name: "Hindi" },
  { id: 4, name: "Maths" },
];
const RegisterUser = (props) => {
  let [userName, setUserName] = useState("");
  let [userEmail, setUserEmail] = useState("");
  let [userContact, setUserContact] = useState("");
  let [teacher, setTeacher] = useState("");
  let [subject, setSubject] = useState("");

  let register_user = () => {
    console.log(userName, userEmail, userContact, teacher, subject);

    if (!userName) {
      alert("Please fill name");
      return;
    }

    if (!userEmail) {
      alert("Please fill email");
      return;
    }
    if (!userContact) {
      alert("Please fill Contact Number");
      return;
    }
    if (!teacher) {
      alert("Please select teacher");
      return;
    }
    if (!subject) {
      alert("Please select subject");
      return;
    }
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO table_user (user_name, user_email, user_contact,teacher,subject) VALUES (?,?,?,?,?)",
        [userName, userEmail, userContact, teacher, subject],
        (tx, results) => {
          console.log("Results", results);
          if (results.rowsAffected > 0) {
            clearInputs();
            Alert.alert(
              "Success",
              "You are Registered Successfully",
              [
                {
                  text: "Ok",
                  onPress: () => props.navigation.navigate("Home"),
                },
              ],
              { cancelable: false }
            );
          } else alert("Registration Failed");
        }
      );
    });
  };
  const clearInputs = () => {
    console.log("clearinputs");
    setUserName("");
    setUserEmail("");
    setUserContact("");
  };
  const onChangeName = (value) => {
    console.log("value ***", value);
    if (value !== 0) {
      setTeacher(value);
    }
  };
  const onChangeSubject = (value) => {
    console.log("subject ***", value);
    if (value !== 0) {
      setSubject(value);
    }
  };
  const renderPickerTeacher = () => {
    return (
      teacherList &&
      teacherList.length > 0 &&
      teacherList.map((category) => {
        return (
          <Picker.Item
            key={category && category.id}
            label={category && category.name}
            value={category && category.name}
          />
        );
      })
    );
  };
  const renderPickerSubject = () => {
    return (
      subjectList &&
      subjectList.length > 0 &&
      subjectList.map((category) => {
        return (
          <Picker.Item
            key={category && category.id}
            label={category && category.name}
            value={category && category.name}
          />
        );
      })
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={{ flex: 1, padding: 10 }}>
          <ScrollView keyboardShouldPersistTaps='handled'>
            <KeyboardAvoidingView
              behavior='padding'
              style={{ flex: 1, justifyContent: "space-between" }}
            >
              <Mytextinput
                placeholder='Enter Name'
                onChangeText={(userName) => setUserName(userName)}
                style={{ padding: 10 }}
                value={userName}
              />
              <Mytextinput
                placeholder='Enter Email'
                onChangeText={(userEmail) => setUserEmail(userEmail)}
                style={{ padding: 10 }}
                value={userEmail}
                keyboardType='email-address'
              />
              <Mytextinput
                placeholder='Enter Contact No'
                onChangeText={(userContact) => setUserContact(userContact)}
                maxLength={10}
                keyboardType='numeric'
                style={{ padding: 10 }}
                value={userContact}
              />
              <View style={{ flexDirection: "row" }}>
                <Picker
                  selectedValue={teacher}
                  style={styles.pickerContainer}
                  onValueChange={(value) => onChangeName(value)}
                >
                  <Picker.Item
                    label='Select Teacher'
                    value=''
                    color='#626262'
                  />
                  {renderPickerTeacher()}
                </Picker>
                <Picker
                  selectedValue={subject}
                  style={styles.pickerContainer}
                  onValueChange={(value) => onChangeSubject(value)}
                >
                  <Picker.Item
                    label='Select Subject'
                    value=''
                    color='#626262'
                  />
                  {renderPickerSubject()}
                </Picker>
              </View>
              <Mybutton title='Submit' customClick={register_user} />
              <Mybutton
                title='View All'
                customClick={() => props.navigation.navigate("ViewList")}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;

const styles = StyleSheet.create({
  pickerContainer: {
    height: 40,
    width: "50%",
    marginBottom: 10,
  },
  selectedImage: {
    height: 150,
    width: 150,
    alignItems: "flex-end",
  },
  selectedImageContainer: {
    alignItems: "center",
  },
  captureContainer: {
    width: "40%",
    borderRadius: 10,
    marginTop: 0,
    marginLeft: 10,
    elevation: 3,
  },
  photoContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    marginBottom: 10,
  },
});
