import React, { Component } from "react";
// import { StyleSheet, Text, View } from "react-native";
import { StyleSheet, Text } from "react-native";

// import { NavigationBar, Title, ImageBackground, Icon, View } from "@shoutem/ui";
import { Title, ImageBackground, Icon, View } from "@shoutem/ui";

import { NavigationBar } from "@shoutem/ui/navigation";

export default class RentalCarsMobileApp extends Component {
  render() {
    return (
      // <View style={styles.container}>
      //   {/* <Text>Open up App.js to start working on your app!</Text>
      //   <Text>Changes you make will automatically reload.</Text>
      //   <Text>Shake your phone to open the developer menu.</Text> */}
      //   {/* <NavigationBar centerComponent={<Title>Rental Cars</Title>} /> */}

      //   <Text>Rental Cars Mobile App!</Text>
      //   <Text>First mobile app made by Rhyan Reyes</Text>
      //   <Text>Another line for the app</Text>
      // </View>
      <View>
        <NavigationBar
          leftComponent={<Icon name="sidebar" />}
          centerComponent={<Title>Rental Cars!</Title>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
