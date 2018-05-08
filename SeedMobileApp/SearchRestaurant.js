import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

// Se mere her https://docs.expo.io/versions/v27.0.0/sdk/location
//

class className extends Component {
    state = {
        location: null,
        errorMessage: null,
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
        let text = 'Waiting..';
        let latitudet;
        let longitude;
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        } else if (this.state.location) {
            latitudet = this.state.location.coords.latitude;
            longitude = this.state.location.coords.longitude;
            text = JSON.stringify(this.state.location);
        }

        return (
            <View style={styles.container}>
                <Text>Søg efter en restaurant ud fra din lokation</Text>
                <Text style={styles.paragraph}>{text}</Text>
                <Text style={styles.paragraph}>Latitude: {latitudet}</Text>
                <Text style={styles.paragraph}>Longtitude: {longitude}</Text>
            </View>
        );
    }
}

export default className;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        textAlign: 'center',
    },
});
