import React, { useState, useEffect } from "react";
import { FlatList, Text, View, StyleSheet, SafeAreaView } from "react-native";
import { openDatabase } from "react-native-sqlite-storage";

var db = openDatabase({ name: "UserDatabase.db" });

const ViewAllUser = () => {
  let [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        setFlatListItems(temp);
      });
    });
  }, []);


  let listItemView = (item) => {
    return (
      <View key={item.user_id} style={styles.itemConatiner}>
        <View style={styles.rowView}>
          <View style={styles.rowView}>
          <Text style={styles.txtTitle}>Name:</Text>
          <Text style={styles.text}>{item.user_name}</Text>
          </View>
        </View>
        <View style={styles.rowView}>
        <View style={styles.rowView}>
          <Text style={styles.txtTitle}>Email:</Text>
          <Text style={styles.text}>{item.user_email}</Text>
          </View>
          <View style={styles.rowView}>
          <Text style={styles.txtTitle}>Contact:</Text>
          <Text style={styles.text}>{item.user_contact}</Text>
          </View>
        </View>
        <View style={styles.rowView}>
        <View style={styles.rowView}>
          <Text style={styles.txtTitle}>Teacher Name:</Text>
          <Text style={styles.text}>{item && item.teacher}</Text>
          </View>
          <View style={styles.rowView}>
          <Text style={styles.txtTitle}>Subject:</Text>
          <Text style={styles.text}>{item && item.subject}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </SafeAreaView>
  );
};

export default ViewAllUser;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemConatiner: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  rowView: { flexDirection: "row", marginBottom: 5,paddingRight:10 },
  txtTitle:{ paddingRight: 10, fontSize: 14,fontWeight:'bold' },
  text: {  fontSize: 14 },
});
