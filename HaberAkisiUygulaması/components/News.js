import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import moment from "moment/moment";

export default class News extends React.Component {
  render() {
    return (
      <Pressable style={styles.container} onPress={() => this.props.onPress()}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            flex: 1,
            padding: 4,
            borderTopLeftRadius: 20,
          }}
        >
          <Text style={styles.title}>{this.props.title}</Text>

          <Text style={styles.description} numberOfLines={2}>
            {this.props.description}
          </Text>

          <View style={styles.data}>
            <Text style={styles.date}>
              Tarih:
              <Text style={styles.date2}>
                {"  "}
                {moment(this.props.publishedAt).format("MMM Do YY")}
              </Text>
            </Text>
          </View>

          <View style={{ marginTop: 4 }}>
            <Text style={{ fontWeight: "bold" }}>
              Kaynak: <Text style={styles.source}>{this.props.sourceName}</Text>
            </Text>
          </View>
        </View>

        <Image
          source={{
            uri: this.props.urlToImage,
          }}
          style={styles.image}
        />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 0,
    shadowOpacity: 0.5,
    shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5,
    },
    backgroundColor: "#fff",
    marginTop: 10,
  },
  image: {
    height: 180,
    width: "40%",
    marginLeft: "2%",
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  title: {
    fontSize: 14,
    fontWeight: "800",
    marginTop: 10,
  },
  description: {
    fontSize: 11,
    fontWeight: "400",
    marginTop: 13,
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  author: {
    fontWeight: "bold",
    fontSize: 10,
  },
  heading: {
    fontSize: 11,
  },
  date: {
    fontSize: 12,
    fontWeight: "bold",
  },
  source: {
    fontSize: 14,
    marginTop: 10,
  },
  date2: {
    fontSize: 12,
  },
});
