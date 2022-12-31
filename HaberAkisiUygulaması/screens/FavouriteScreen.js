import { View, Text, StyleSheet, FlatList } from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import News from "../components/News";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default class FavouriteScreen extends React.Component {
  state = {
    searchText: "",
    searched: false,
    articles: [],
    favouriteArticles: [],
    keys: [],
  };

  getNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=tr&apiKey=ec0d6631094b44dd903c5b89cccc3b56",
        {
          params: {
            category: "general",
          },
        }
      )
      .then((response) => {
        this.setState({ articles: response.data.articles });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getAllKeys = async () => {
    let keys = [];

    try {
      keys = await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error(e);
    }

    this.setState({ keys: keys });
  };

  searchNews = () => {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=tr&apiKey=ec0d6631094b44dd903c5b89cccc3b56",
        {
          params: {
            category: "general",
            q: this.state.searchText,
          },
        }
      )
      .then((response) => {
        this.setState({ articles: response.data.articles, searched: true });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setSearchText = (text) => {
    this.setState({ searchText: text });
  };

  componentDidMount() {
    setInterval(() => {
      if (this.state.searchText === "") {
        this.setState({ searched: false });
      }

      if (!this.state.searched) {
        this.getNews();
        this.getAllKeys();
      }
    }, 1500);
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          searchText={this.state.searchText}
          setSearchText={this.setSearchText}
          onSubmit={this.searchNews}
        />

        <FlatList
          data={this.state.articles}
          renderItem={({ item }) => {
            if (this.state.keys.includes("@" + item.title)) {
              return (
                <News
                  urlToImage={item.urlToImage}
                  title={item.title}
                  description={item.description}
                  onPress={() => {
                    this.props.navigation.navigate("StackNavigator", {
                      screen: "NewsDetails",
                      params: { article: item },
                    });
                  }}
                />
              );
            }
          }}
          keyExtractor={(item) => item.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
