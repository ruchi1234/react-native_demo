import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Icon, Title, Body, List, ListItem, Thumbnail, Segment, Content, Card, CardItem } from 'native-base';
import { StyleSheet, ScrollView, View, Text, ActivityIndicator } from 'react-native';
import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";
import { connect } from 'react-redux';
//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import variable from './../../themes/variables';
import styles from './style';

import { challengeInfo } from './actions'

const imageURL = require("../../../img/profile.png");

class Challange extends Component {

    constructor(props) {
        super(props);
        this.state = {
          
        };
        
    }
    componentDidMount() {
        this.props.challengeInfo(this.props.logged_in_user_id,this.props.navigation.state.params.challange_id);
    }
    render() {


        return (
            <Container>
                <IchallangeHeader navigate={this.props.navigation.navigate} />

                <View style={styles.container}>
                    <View>

                        {this.props.loadingIndicator &&
                            <ActivityIndicator animating size="large" />
                        }
                        {this.props.challenge_info &&
                        <List >
                            <ListItem avatar style={styles.listContainer}>

                                <Body style={{ borderBottomWidth: 0 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 5 }}>Challange</Text>
                                    <Text>{this.props.challenge_info.challengeName}</Text>
                                    <Text>Manager : {this.props.challenge_info.manager}</Text>
                                    <Text>Prize : <Text> {this.props.challenge_info.prize} </Text></Text>

                                </Body>

                            </ListItem>
                        </List>
                        }
                    </View>
                    <ScrollView style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <View>
                            <List>
                                {this.props.player_list &&
                                this.props.player_list.map((player, index) => (
                                <ListItem avatar style={styles.playerListContainer} key={player._id}>
                                    <Left>
                                        <Thumbnail source={imageURL} />
                                    </Left>
                                    <Body style={{ borderBottomWidth: 0 }}>
                                        <Text>Ranking: <Text>{player.rank}</Text></Text>
                                        <Text>{player.player_name}</Text>


                                    </Body>
                                    <Right style={{ borderBottomWidth: 0 }}>
                                        <Text>Score: <Text>{player.total_marks}/{player.max_marks}</Text></Text>
                                    </Right>
                                </ListItem>
                                ))}
                                
                            </List>
                        </View>
                    </ScrollView>
                </View>

                <FooterTabs />
            </Container>
        );
    }
}
// This is the state of global app and not state of your Component

const mapStateToProps = (state) => {
    const { internetStatus, isModalVisible } = state.globalReducer;
    const { login_user, logged_in_user_id } = state.checkLoginReducer;
    const { loadingIndicator, challenge_info , player_list } = state.challangeReducer;
    console.log("challenge_info"+ JSON.stringify(challenge_info));
    return {

        internetStatus,
        login_user,
        logged_in_user_id,
        isModalVisible,
        player_list,
        loadingIndicator,
        challenge_info

    }

};
export default connect(mapStateToProps,
    { challengeInfo }
)(Challange);


