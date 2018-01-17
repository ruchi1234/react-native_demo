import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Icon, Title, Body, Card, CardItem } from 'native-base';

import { StyleSheet, ScrollView, View, Text } from 'react-native';

import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";

//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import variable from './../../themes/variables';
const styles = require('./styles');
export default class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };

    }
    componentWillMount() {

    }
    render() {


        return (
            <Container>
                <IchallangeHeader navigate={this.props.navigation.navigate} />
                <ScrollView>
                    <View style={styles.container}>
                        <Card style={styles.cardContainer}>
                            <CardItem>
                                <View style={styles.cardItemRow}>
                                    <View style={styles.cardBody}>
                                        <View style={styles.cardBodyText}>
                                            <Text style={[styles.cardBodyTextSize, { fontWeight: 'bold' }]}>SUPER BOWL <Text style={styles.cardEnteryText}>(Private)</Text> </Text>
                                        </View>
                                        <View style={styles.cardBodyText}>
                                            <Text stye={styles.cardBodyTextSize}>KIWI</Text>
                                        </View>
                                        <View style={styles.cardBodyText}>
                                            <Text stye={styles.cardBodyTextSize}>12.8.17</Text>
                                        </View>
                                        <View style={styles.cardBodyText}>
                                            <Text stye={styles.cardBodyTextSize}>CUSTOM</Text>
                                        </View>


                                    </View>
                                    <Right style={styles.cardButtonBody}>
                                        <Button block style={styles.cardButton}>
                                            <Text style={{ color: '#fff' }}>ENTER</Text>
                                        </Button>
                                    </Right>


                                </View>

                            </CardItem>
                        </Card>
                        <Card style={styles.cardContainer}>
                            <CardItem>
                                <View style={styles.cardItemRow}>
                                    <View style={styles.cardBody}>
                                        <View style={styles.cardBodyText}>
                                            <Text style={[styles.cardBodyTextSize, { fontWeight: 'bold' }]}>SUPER BOWL <Text style={styles.cardEnteryText}>(Private)</Text> </Text>
                                        </View>
                                        <View style={styles.cardBodyText}>
                                            <Text stye={styles.cardBodyTextSize}>KIWI</Text>
                                        </View>
                                        <View style={styles.cardBodyText}>
                                            <Text stye={styles.cardBodyTextSize}>12.8.17</Text>
                                        </View>
                                        <View style={styles.cardBodyText}>
                                            <Text stye={styles.cardBodyTextSize}>CUSTOM</Text>
                                        </View>


                                    </View>
                                    <Right style={styles.cardButtonBody}>
                                        <Button block style={styles.cardButton}>
                                            <Text style={{ color: '#fff' }}>ENTER</Text>
                                        </Button>
                                    </Right>


                                </View>

                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>
                <FooterTabs />
            </Container>
        );
    }
}

