import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Icon, Title, Body, List, ListItem, Thumbnail, Segment, Content, Card, CardItem } from 'native-base';

import { StyleSheet, ScrollView, View, Text } from 'react-native';

import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";

//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import variable from './../../themes/variables';
import styles from './style';
const imageURL = require("../../../img/profile.png");
export default class Challange extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            seg: 1
        };

    }
    componentWillMount() {

    }
    render() {


        return (
            <Container>
                <IchallangeHeader navigate={this.props.navigation.navigate} />
               
                    <View style={styles.container}>
                        <View>
                            <List >
                                <ListItem avatar style={styles.listContainer}>

                                    <Body style={{ borderBottomWidth: 0 }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Challange</Text>
                                        <Text>Walking Dead Kc</Text>
                                        <Text>Manager : Kiwi</Text>
                                        <Text>Prize : <Text> Kiwi Kiwi Kiwi Kiwi Kiwi Kiwi</Text></Text>

                                    </Body>

                                </ListItem>
                            </List>
                        </View>
                        <ScrollView style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <View>
                            <List>
                                <ListItem avatar style={styles.playerListContainer}>
                                    <Left>
                                        <Thumbnail source={imageURL} />
                                    </Left>
                                    <Body style={{ borderBottomWidth: 0 }}>
                                        <Text>Ranking: <Text>1</Text></Text>
                                        <Text>Kiwi Paul Ravkin</Text>
                                        
                                       
                                    </Body>
                                    <Right style={{ borderBottomWidth: 0 }}>
                                    <Text>Score: <Text>86/100</Text></Text>
                                    </Right>
                                </ListItem>
                                <ListItem avatar style={styles.playerListContainer}>
                                    <Left>
                                        <Thumbnail source={imageURL} />
                                    </Left>
                                    <Body style={{ borderBottomWidth: 0 }}>
                                        <Text>Ranking: <Text>2</Text></Text>
                                        <Text>Kiwi Paul Ravkin</Text>
                                        
                                       
                                    </Body>
                                    <Right style={{ borderBottomWidth: 0 }}>
                                    <Text>Score: <Text>96/100</Text></Text>
                                    </Right>
                                </ListItem>
                            </List>
                        </View>
                        </ScrollView>
                    </View>
               
                <FooterTabs />
            </Container>
        );
    }
}

