import React, { useState, useEffect, Component } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";
import Register from "./Register";

var db = openDatabase({ name: "UserDatabase.db" });

const Home = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log("item:", res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql("DROP TABLE IF EXISTS table_user", []);
            txn.executeSql(
              "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(40),user_contact INT(10),teacher VARCHAR(20),subject VARCHAR(20))",
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Register navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    color: "grey",
  },
});
