import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Icon, Title, Body, List, ListItem, Thumbnail, Segment, Content, Card, CardItem, Input, Item } from 'native-base';

import { StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight } from 'react-native';

import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";

//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import variable from './../../themes/variables';

import styles from './style';
const imageURL = require("../../../img/profile.png");

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signedIn: false,
            checkedSignIn: false,
            seg: 1,
            isModalVisible: false,
            error: {}

        };

    }
    componentWillMount() {

    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })
    closeModal = () => this.setState({ isModalVisible: false });
    submitModal = () => {

        let oldPass = this.state.oldPassword;
        let newPass = this.state.newPassword;
        let cnfPass = this.state.confPassword;
        //this.setState({error: ''})
        let errorList = this.state.error;
        if (this.state.oldPassword === undefined || this.state.oldPassword === '') {
            errorList.oldPasswordError = '* Required';

            this.setState(errorList);
            oldPass = '';
        }
        if (this.state.newPassword === undefined || this.state.newPassword === '') {
            errorList.newPasswordError = '* Required';

            this.setState(errorList);

            newPass = '';
        }
        if (this.state.cnfPassword === undefined || this.state.cnfPassword === '') {
            errorList.cnfPasswordError = '* Required';

            this.setState(errorList);


            cnfPass = '';
        }
        if (newPass.length < 6 && newPass != '') {
            errorList.newPasswordError = '* too short';
            this.setState(errorList);


        }
        if (cnfPass != '') {
            if (!this.passwordsMatch(newPass, cnfPass)) {
                errorList.cnfPasswordError = '* Not match';
                this.setState(errorList);
                // this.setState({error: {cnfPasswordError: 'Not match'}});

            }
        }
        if (Object.keys(this.state.error).length != 0) {

        }
        else {
            let formdata = {
                oldPassword:this.state.newPassword,
                newPassword:this.state.oldPassword,
                cnfPassword: this.state.cnfPassword
            }
            fetch('http://innorade.in/seller/location/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData: formData,
                    
                })
            })
                .then((response) => response.json())
                .then(function (json) {

                    if (json.status == 200) {
                        if (Object.keys(json.responseData).length != 0) {
                            let user_id = json.responseData.admin_user_id;
                            let user_info = json.responseData;
                            AsyncStorage.setItem("user_id", user_id);
                            AsyncStorage.setItem("user_info", JSON.stringify(user_info));
                            //this.props.navigation.navigate('Dashboard');
                            navigation("Dashboard")

                        }
                        else {

                            alert(json.message);


                        }
                    }
                    else {

                    }
                    let userInfo = json.responseData;
                })
                .catch(function (error) {
                    console.log(error.message);
                })
        }


    }
    passwordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };
    render() {


        return (

            <Container>


                <IchallangeHeader navigate={this.props.navigation.navigate} />
                <ScrollView style={{ paddingLeft: 0, paddingRight: 0 }}>
                    <View style={styles.container}>


                        <Modal
                            transparent={true}
                            animationType={'none'}
                            visible={this.state.isModalVisible}
                            onRequestClose={() => { console.log('close modal') }}>
                            <View style={styles.modalBackground}>
                                <View style={styles.activityIndicatorWrapper}>

                                    <Item error={this.state.error.oldPasswordError !== undefined}>
                                        <Input
                                            name='oldPassword'
                                            value={this.state.oldPassword}
                                            placeholder="Old Password"
                                            secureTextEntry={true}
                                            placeholderTextColor="#95a5a6"
                                            onChangeText={(value) => { this.setState({ oldPassword: value }) }}
                                        />
                                        {this.state.error.oldPasswordError !== undefined ? <Text style={{ paddingLeft: 3, paddingRight: 3, color: variable.backgroundColor }}>{this.state.error.oldPasswordError}</Text> : <Text />}
                                    </Item>
                                    <Item error={this.state.error.oldPasswordError !== undefined}>
                                        <Input
                                            name='newPassword'
                                            value={this.state.newPassword}
                                            placeholder="New Password"
                                            secureTextEntry={true}
                                            placeholderTextColor="#95a5a6"
                                            onChangeText={(value) => { this.setState({ newPassword: value }) }}
                                        />
                                        {this.state.error.newPasswordError !== undefined ? <Text style={{ paddingLeft: 3, paddingRight: 3, color: variable.backgroundColor }}>{this.state.error.newPasswordError}</Text> : <Text />}
                                    </Item>
                                    <Item error={this.state.error.cnfPasswordError !== undefined}>
                                        <Input
                                            name='cnfPassword'
                                            value={this.state.cnfPassword}
                                            placeholder="Confirm Password"
                                            secureTextEntry={true}
                                            placeholderTextColor="#95a5a6"
                                            onChangeText={(value) => { this.setState({ cnfPassword: value }) }}
                                        />
                                        {this.state.error.cnfPasswordError !== undefined ? <Text style={{ paddingLeft: 3, paddingRight: 3, color: variable.backgroundColor }}>{this.state.error.cnfPasswordError}</Text> : <Text />}
                                    </Item>
                                    <View style={{ flex: 1, flexDirection: "row", marginTop: 14, justifyContent: 'center' }}>
                                        <View>
                                            <Button block style={[{ width: 90, marginTop: 10 }, styles.listButtonSec]} onPress={this.submitModal}>
                                                <Text style={{ color: '#fff' }}>Submit</Text>
                                            </Button>
                                        </View>
                                        <View>
                                            <Button block style={[{ width: 90, marginTop: 10 }, styles.listButtonSec]} onPress={this.closeModal}>
                                                <Text style={{ color: '#fff' }}>Cancel</Text>
                                            </Button>
                                        </View>

                                    </View>

                                </View>
                            </View>
                        </Modal>
                        <List >
                            <ListItem avatar style={styles.listContainer}>
                                <Left>
                                    <Thumbnail source={imageURL} style={styles.thumbnailContainer} />
                                </Left>
                                <Body style={{ borderBottomWidth: 0 }}>
                                    <Text>Kiwi</Text>
                                    <Text>Paul Ravkin</Text>
                                    <Text>paul.ravkin@gmail.com</Text>
                                    <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                                        <View>
                                            <Button block style={styles.listButton}>
                                                <Text style={{ color: '#fff' }}>Contacts</Text>
                                            </Button>
                                        </View>
                                        <View>
                                            <Button block style={styles.listButtonSec} onPress={this._toggleModal}>
                                                <Text style={{ color: '#fff' }}>Change Password</Text>
                                            </Button>
                                        </View>

                                    </View>
                                </Body>

                            </ListItem>
                        </List>
                        <Segment>
                            <Button
                                first
                                active={this.state.seg === 1 ? true : false}
                                onPress={() => this.setState({ seg: 1 })}
                                style={[styles.tabHeader, this.state.seg === 1 ? { backgroundColor: variable.backgroundColor } : { backgroundColor: '#e74c3c' }]}
                            >
                                <Text style={{ color: '#fff' }}>Current</Text>
                            </Button>
                            <Button
                                active={this.state.seg === 2 ? true : false}
                                onPress={() => this.setState({ seg: 2 })}
                                style={[styles.tabHeader, this.state.seg === 2 ? { backgroundColor: variable.backgroundColor } : { backgroundColor: '#e74c3c' }]}
                            >
                                <Text style={{ color: '#fff' }}>History</Text>
                            </Button>

                        </Segment>
                        <Content padder>
                            {this.state.seg === 1 &&
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



                            }
                            {this.state.seg === 2 &&
                                <Card style={styles.cardContainer}>
                                    <CardItem>
                                        <View style={styles.cardItemRow}>
                                            <View style={styles.cardBody}>
                                                <View style={styles.cardBodyText}>
                                                    <Text style={[styles.cardBodyTextSize, { fontWeight: 'bold' }]}>SUPER History <Text style={styles.cardEnteryText}>(Private)</Text> </Text>
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
                            }

                        </Content>

                    </View>
                </ScrollView>
                <FooterTabs />
            </Container>
        );
    }
}

