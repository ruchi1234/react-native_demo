
import React, { Component } from 'react';
import { Text, Header, Button, Icon, Right, Left, Body, Title } from 'native-base';
import { StyleSheet } from "react-native";
import variable from './../../themes/variables';
export default class IchallangeHeader extends Component {

    render() {
        return (
            <Header style={styles.headerBar}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigate("DrawerOpen")}
                        
                    >
                        <Icon name="menu" style={styles.title} />
                    </Button>
                </Left>
                <Body>
                    <Title style={styles.title}>Headers</Title>
                </Body>
                <Right />

            </Header>

        )
    }
}
const styles = StyleSheet.create({
    headerBar : {
        backgroundColor: variable.backgroundColor
    },
    title:
    {
        color: '#fff'
    }
})