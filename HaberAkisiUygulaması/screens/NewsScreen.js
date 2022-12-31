import { View, StyleSheet, FlatList, Text } from "react-native";
import React from "react";
import SearchBar from "../components/SearchBar";
import News from "../components/News";
import axios from "axios";

export default class NewsScreen extends React.Component {
  state = {
    searchText: "",
    articles: [],
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
        this.setState({ articles: response.data.articles });
      })
      .catch(function (error) {
        console.log(error);
      });
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

  setSearchText = (text) => {
    this.setState({ searchText: text });
  };

  componentDidMount() {
    this.getNews();
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
          renderItem={({ item }) => (
            <News
              url={item.url}
              urlToImage={item.urlToImage}
              title={item.title}
              description={item.description}
              publishedAt={item.publishedAt}
              sourceName={item.source.name}
              onPress={() => {
                this.props.navigation.navigate("StackNavigator", {
                  screen: "NewsDetails",
                  params: { article: item },
                });
              }}
            />
          )}
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
