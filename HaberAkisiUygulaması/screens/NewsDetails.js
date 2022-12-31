import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  ScrollView,
  Share,
} from "react-native";
import React from "react";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from "react-native-webview";
import { Entypo } from "@expo/vector-icons";

export default class NewsDetails extends React.Component {
  state = {
    starColor: "white",
    showSource: false,
  };

  async componentDidMount() {
    let keys = [];

    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error(e);
    }

    if (keys.includes("@" + this.props.route.params.article.title)) {
      this.setState({ starColor: "#E0BD3C" });
    } else {
      this.setState({ starColor: "white" });
    }
  }

  goToSource = () => {
    this.setState({ goToSource: true });
  };

  storeData = async (key) => {
    try {
      await AsyncStorage.setItem("@" + key, "");
    } catch (e) {
      console.error(e);
    }
  };

  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem("@" + key);
    } catch (e) {
      console.error(e);
    }
  };

  share = async () => {
    const shareOptions = {
      message: this.props.route.params.article.url,
    };

    try {
      await Share.share(shareOptions);
    } catch (error) {
      console.log("Error =>", error);
    }
  };

  render() {
    const { article } = this.props.route.params;

    if (this.state.goToSource) {
      console.log(this.props.route.params.article.url);
      return (
        <View style={{ width: "100%", height: "100%" }}>
          <WebView
            style={{ flex: 1 }}
            source={{ uri: this.props.route.params.article.url }}
          />

          <Button
            title="Haber Kaynağını Kapat"
            onPress={() => this.setState({ goToSource: false })}
            style={{ position: "absolute", bottom: 0 }}
          ></Button>
        </View>
      );
    } else {
      return (
        <ScrollView>
          <View style={styles.container2}>
            {/* <IconButton icon="share" size={40} onPress={() => this.share()} /> */}
            <View>
              <Entypo
                name="share"
                size={40}
                color="black"
                style={{ marginTop: 14 }}
                onPress={() => this.share()}
              />
            </View>

            <IconButton
              icon="star"
              iconColor={this.state.starColor}
              size={40}
              onPress={async () => {
                if (this.state.starColor === "white") {
                  this.storeData(article.title);

                  let keys = [];

                  try {
                    keys = await AsyncStorage.getAllKeys();
                  } catch (e) {
                    console.error(e);
                  }

                  if (
                    keys.includes("@" + this.props.route.params.article.title)
                  ) {
                    this.setState({ starColor: "#E0BD3C" });
                  } else {
                    this.setState({ starColor: "white" });
                  }
                } else {
                  this.removeValue(article.title);

                  let keys = [];

                  try {
                    keys = await AsyncStorage.getAllKeys();
                  } catch (e) {
                    console.error(e);
                  }

                  if (
                    keys.includes("@" + this.props.route.params.article.title)
                  ) {
                    this.setState({ starColor: "#E0BD3C" });
                  } else {
                    this.setState({ starColor: "white" });
                  }
                }
              }}
            />
          </View>

          <Image
            source={{
              uri: article.urlToImage,
            }}
            style={styles.image}
          />
          <Text style={styles.title}>{article.title}</Text>

          <Text style={styles.description}>{article.content}</Text>

          <Text style={styles.author}>YAZAR: {article.author}</Text>

          <Text style={styles.date}>TARİH: {article.publishedAt}</Text>

          <Text style={styles.source}>KAYNAK: {article.source.name}</Text>
          <Text> </Text>
          <View
            style={{
              borderWidth: 1,
              padding: 1,
              borderRadius: 15,
              borderStyle: "dashed",
            }}
          >
            <Button
              title="Haber Kaynağına Git"
              onPress={this.goToSource}
            ></Button>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container2: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
  title: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    height: 200,
    width: "100%",
    marginTop: 15,
  },
  description: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 10,
  },
  author: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  date: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  source: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: "600",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
});
