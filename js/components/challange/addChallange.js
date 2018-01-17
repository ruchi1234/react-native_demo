import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, ScrollView } from "react-native";
import { Container } from "native-base";
import ChallangeForm from './challangeForm';

import variable from './../../themes/variables';

import IchallangeHeader from "./../../components/header/";

export default class AddChallange extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <Container>
                <IchallangeHeader navigate={this.props.navigation.navigate} />
                <ScrollView>
                    <ChallangeForm />
                </ScrollView>
            </Container>
        )
    }
}
