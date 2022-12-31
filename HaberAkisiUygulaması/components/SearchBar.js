import { View, TextInput, Text, StyleSheet } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

const SearchBar = (props) => {
  return (
    <View>
      <TextInput
        placeholder="Arama Yapın."
        style={sytles.input}
        value={props.searchText}
        onChangeText={(text) => props.setSearchText(text)}
        onSubmitEditing={props.onSubmit}
      />

      <Feather
        style={{ position: "absolute", right: 10, top: 7 }}
        name="search"
        size={25}
      />
    </View>
  );
};

export default SearchBar;

const sytles = StyleSheet.create({
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    color: "#000",
    borderWidth: 1,
  },
});
