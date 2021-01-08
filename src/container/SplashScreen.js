import React, {useState, useEffect, Component} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({animating: false});
      this.props.navigation.navigate('Home');
    }, 2000);
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          animating={this.state.animating}
          color="#FFFFFF"
          size="large"
          style={styles.activityIndicator}
        />
      </View>
    );
  }
}

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
