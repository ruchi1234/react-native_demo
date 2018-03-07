import React, { Component } from 'react';
import { Container, Header, Left, Right, Button, Title, Body, List, ListItem, Thumbnail, Segment, Content, Card, CardItem, Input, Item } from 'native-base';

import { NativeModules, StyleSheet, ScrollView, View, Text, Modal, TouchableHighlight, ActivityIndicator, NetInfo, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";

//import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import variable from './../../themes/variables';
import styles from './style';

//import { fetchLobby } from './actions';
import { connect } from "react-redux";
import Loader from './../Loader';
import { fetchProfile, changePassword, deleteChallange, updateProfileImage } from './actions';
import { connectionStateError, modalHandler } from './../../action';

import Icon from 'react-native-vector-icons/FontAwesome';

const imageURL = require("../../../img/profile.png");




class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {

            seg: 1,
            error: "",
            avatarSource: imageURL,

        };
        if (!this.props.internetStatus) {
            this.props.fetchProfile(this.props.logged_in_user_id, function (response) {
                //console.log("response"+JSON.stringify(props));
                //this.state.avatarSource;
                //this.setState({avatarSource: response})
            }
            );
        }
        else {
            this.props.connectionStateError();
        }


    }

    componentDidMount() {
        console.log("internetStatus" + this.props.internetStatus);



    }

    uploadImage() {
        // More info on all the options is below in the README...just some common use cases shown here
        var options = {
            title: 'Select Avatar',

            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response.data);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                //let source = { uri: response.uri };
                let source;
                // You can also display the image using data:
                if (response.type === 'data') { 
                    source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                }
                else{
                    source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                }
                this.props.profile.image = source;
                /*
                this.setState({
                    avatarSource: source
                });
                */
                this.props.updateProfileImage(source,this.props.logged_in_user_id)
            }
        });
    }

    _toggleModal = () => { this.props.modalHandler(true) }
    closeModal = () => { this.props.modalHandler(false) };
    submitModal = () => {

        let oldPass = this.state.oldPassword;
        let newPass = this.state.newPassword;
        let cnfPass = this.state.confPassword;
        this.setState({ error: '' });
        let errorList = {};
        if (this.state.oldPassword === undefined || this.state.oldPassword === '') {
            errorList.oldPasswordError = '* Required';


            oldPass = '';
        }
        if (this.state.newPassword === undefined || this.state.newPassword === '') {
            errorList.newPasswordError = '* Required';


            newPass = '';
        }
        if (this.state.confPassword === undefined || this.state.confPassword === '') {
            errorList.cnfPasswordError = '* Required';




            cnfPass = '';
        }
        if (newPass.length < 6 && newPass != '') {
            errorList.newPasswordError = '* too short';



        }
        if (cnfPass != '') {
            if (!this.passwordsMatch(newPass, cnfPass)) {
                errorList.cnfPasswordError = '* Not match';

                // this.setState({error: {cnfPasswordError: 'Not match'}});

            }
        }
        if (Object.keys(errorList).length != 0) {
            this.setState({ 'error': errorList });
        }
        else {
            let formdata = {
                oldPassword: this.state.newPassword,
                newPassword: this.state.oldPassword,
                confPassword: this.state.confPassword,
                user_id: this.props.logged_in_user_id
            }
            //console.log(this.props.dispatch);
            this.props.changePassword(formdata)

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
                        <Loader
                            loading={this.props.loadingIndicator} />

                        <Modal
                            transparent={true}
                            animationType={'none'}
                            visible={this.props.isModalVisible}
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
                                            name='confPassword'
                                            value={this.state.confPassword}
                                            placeholder="Confirm Password"
                                            secureTextEntry={true}
                                            placeholderTextColor="#95a5a6"
                                            onChangeText={(value) => { this.setState({ confPassword: value }) }}
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
                                  
                                    <Thumbnail source={{uri: this.props.profile.image}} style={styles.thumbnailContainer} />
                                    <TouchableOpacity onPress={this.uploadImage.bind(this)}>
                                        <Icon name="edit" size={15} color={variable.backgroundColor} style={{position:'relative',top:50,left:-15}}/>
                                    </TouchableOpacity>
                                </Left>
                                <Body style={{ borderBottomWidth: 0,marginLeft: 8 }}>
                                    <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',width:190}}>
                                        <View style={{ alignItems: 'flex-start'}}>
                                            <Text>{this.props.profile.username}</Text>
                                            <Text>{this.props.profile.email}</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-end'}}>
                                             <TouchableOpacity onPress={()=>{this.props.navigation.navigate('ProfileEdit')}}>
                                                <Icon name="edit" size={25} color={variable.backgroundColor} />
                                             </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row", marginTop: 10 }}>
                                        <View>
                                            <Button block style={styles.listButton} onPress={() => this.props.navigation.navigate('ContactList')}>
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
                                this.props.currentChallange &&
                                <Card style={styles.cardContainer}>

                                    {this.props.currentChallange.map((challangeList, index) => (
                                        <CardItem key={challangeList._id} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <View style={styles.cardItemRow}>
                                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Challange', { challange_id: challangeList._id }) }}>
                                                    <View style={styles.cardBody}>
                                                        <View style={styles.cardBodyText}>
                                                            <Text style={[styles.cardBodyTextSize, { fontWeight: 'bold' }]}>{challangeList.challengeName}<Text style={styles.cardEnteryText}>({challangeList.entry})</Text> </Text>
                                                        </View>
                                                        <View style={styles.cardBodyText}>
                                                            <Text stye={styles.cardBodyTextSize}><Text stye={styles.listHeading}>Status: </Text> {challangeList.myStatus}</Text>
                                                        </View>
                                                        <View style={styles.cardBodyText}>
                                                            <Text stye={styles.cardBodyTextSize}><Text stye={styles.listHeading}>Last Date: </Text> {challangeList.Date}</Text>
                                                        </View>
                                                        <View style={styles.cardBodyText}>
                                                            <Text stye={styles.cardBodyTextSize}><Text stye={styles.listHeading}>Category: </Text> {challangeList.category}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <Right style={styles.cardButtonBody}>
                                                    {challangeList.myStatus == 'Manager' &&
                                                        <Button block style={challangeList.is_publish ? styles.cardButtonDisable : styles.cardButton} disabled={challangeList.isEnterDisable}>
                                                            <Text style={{ color: '#fff' }}>Publish</Text>
                                                        </Button>
                                                    }
                                                    {challangeList.myStatus == 'Manager' &&
                                                        <Button block style={styles.cardButton} onPress={this.props.deleteChallange(challangeList._id,index)}>
                                                            <Text style={{ color: '#fff' }}>Delete</Text>
                                                        </Button>
                                                        
                                                    }
                                                    {challangeList.myStatus != 'Manager' &&
                                                        <Button block style={challangeList.isEnterDisable ? styles.cardButtonDisable : styles.cardButton} disabled={challangeList.isEnterDisable}>
                                                            <Text style={{ color: '#fff' }}>ENTER</Text>
                                                        </Button>
                                                    }
                                                </Right>


                                            </View>

                                        </CardItem>
                                    ))}
                                </Card>



                            }
                            {this.state.seg === 2 &&
                                this.props.oldChallange &&
                                <Card style={styles.cardContainer}>
                                    
                                        {
                                            this.props.oldChallange.map((challangeList, index) => (
                                        <CardItem key={challangeList._id} style={{ paddingLeft: 10, paddingRight: 10 }}>
                                            <View style={styles.cardItemRow}>
                                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Challange', { challange_id: challangeList._id }) }}>
                                                    <View style={styles.cardBody}>
                                                        <View style={styles.cardBodyText}>
                                                            <Text style={[styles.cardBodyTextSize, { fontWeight: 'bold' }]}>{challangeList.challengeName}<Text style={styles.cardEnteryText}>({challangeList.entry})</Text> </Text>
                                                        </View>
                                                        <View style={styles.cardBodyText}>
                                                            <Text stye={styles.cardBodyTextSize}><Text stye={styles.listHeading}>Status: </Text> {challangeList.myStatus}</Text>
                                                        </View>
                                                        <View style={styles.cardBodyText}>
                                                            <Text stye={styles.cardBodyTextSize}><Text stye={styles.listHeading}>Last Date: </Text> {challangeList.Date}</Text>
                                                        </View>
                                                        <View style={styles.cardBodyText}>
                                                            <Text stye={styles.cardBodyTextSize}><Text stye={styles.listHeading}>Category: </Text> {challangeList.Category}</Text>
                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                                <Right style={styles.cardButtonBody}>
                                                    {challangeList.myStatus == 'Manager' &&
                                                        <Button block style={challangeList.is_publish ? styles.cardButtonDisable : styles.cardButton} disabled={challangeList.isEnterDisable}>
                                                            <Text style={{ color: '#fff' }}>Publish</Text>
                                                        </Button>
                                                        
                                                    }
                                                    {challangeList.myStatus == 'Manager' &&
                                                        <Button block style={challangeList.is_publish ? styles.cardButtonDisable : styles.cardButton} disabled={challangeList.isEnterDisable}>
                                                            <Text style={{ color: '#fff' }}>Delete</Text>
                                                        </Button>
                                                        
                                                    }
                                                    {challangeList.isEnterDisable && challangeList.myStatus != 'Manager' && 
                                                        <Button block style={challangeList.isEnterDisable ? styles.cardButtonDisable : styles.cardButton} disabled={challangeList.isEnterDisable}>
                                                            <Text style={{ color: '#fff' }}>ENTER</Text>
                                                        </Button>
                                                    }
                                                </Right>


                                            </View>

                                        </CardItem>
                                    ))}
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
// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {
    //console.log(state);
    //signupReducer
    const { loadingIndicator, profile, currentChallange, oldChallange, loadingIndicatorModal } = state.profileReducer;
    const { internetStatus, isModalVisible, logged_in_user_id } = state.globalReducer;
    


    return {

        loadingIndicator,
        profile,
        currentChallange,
        oldChallange,
        loadingIndicatorModal,
        isModalVisible,
        internetStatus,
        logged_in_user_id
        //login_user
    }

};
export default connect(mapStateToProps,
    { fetchProfile, changePassword, deleteChallange, modalHandler, connectionStateError, updateProfileImage }
)
    (Profile);

