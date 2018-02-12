import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Icon, Title, Body, Card, CardItem } from 'native-base';

import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';

import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";
import variable from './../../themes/variables';

import { fetchLobby } from './actions';
import { connect } from "react-redux";
import Loader from './../Loader';

const styles = require('./styles');
class Lobby extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false
        };

    }
    componentWillMount() {
        console.log(this.props);
        this.props.fetchLobby(this.props.logged_in_user_id);
    }
    goToChallenge()
    {
        console.log("goToChalange is clicked");
    }
    render() {


        return (
            <Container>
                <IchallangeHeader navigate={this.props.navigation.navigate} />
                <ScrollView>
                    <View style={styles.container}>
                   
                        {this.props.lobbyChallange.map((challenge, index) => (
                            <Card style={styles.cardContainer} key={challenge._id}>
                                <CardItem>
                                    <View style={styles.cardItemRow}>
                                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Challange',{challange_id: challenge._id })}}>
                                        <View style={styles.cardBody}>
                                            <View style={styles.cardBodyText}>
                                                <Text style={[styles.cardBodyTextSize, { fontWeight: 'bold' }]}>{challenge.challengeName}<Text style={styles.cardEnteryText}>({challenge.entry})</Text> </Text>
                                            </View>
                                            <View style={styles.cardBodyText}>
                                                <Text stye={styles.cardBodyTextSize}>{challenge.manager}</Text>
                                            </View>
                                            <View style={styles.cardBodyText}>
                                                <Text stye={styles.cardBodyTextSize}>{challenge.Date}</Text>
                                            </View>
                                            <View style={styles.cardBodyText}>
                                                <Text stye={styles.cardBodyTextSize}>CUSTOM</Text>
                                            </View>


                                        </View>
                                        </TouchableOpacity>
                                        <Right style={styles.cardButtonBody}>
                                            <Button block style={challenge.isEnterDisable ? styles.cardButtonDisable: styles.cardButton} disabled={challenge.isEnterDisable} onPess={this.goToChallenge.bind(this)}>
                                                <Text style={{ color: '#fff' }}>ENTER</Text>
                                            </Button>
                                        </Right>
                                    </View>

                                </CardItem>
                            </Card>
                        ))}
              
                    </View>
                </ScrollView>
                <FooterTabs />
            </Container>
        );
    }
}
// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
    //console.log(state);
    //signupReducer
    const { loadingIndicator, lobbyList, lobbyChallange } = state.lobbyReducer;
    const { internetStatus, logged_in_user_id } = state.globalReducer;


    return {

        loadingIndicator,
        lobbyList,
        lobbyChallange,
        internetStatus,
        logged_in_user_id
    }

};


export default connect(mapStateToProps,
    { fetchLobby }
)(Lobby)

