import React, { Component } from 'react';
import { Container, Header, Content, Text, Item, Input, Button } from 'native-base';
import { StyleSheet, ScrollView, View, FlatList, ActivityIndicator, Modal } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";
import { getContactList, updateContact, saveContact } from './actions'
import { connectionStateError, modalHandler } from './../../action';
import { connect } from "react-redux";
import ActionButton from 'react-native-action-button';
const styles = require('./styles');
const imageURL = require("../../../img/profile.png");
import variable from './../../themes/variables';
/*
const ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2
});
*/
class ContactList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            contactName: '',
            contactPhone: '',
            contactEmail: '',
            contactUserId: '',
            error: {},
            isUpdate: false,
            updateContactIndex: null
            
        }
    }
    componentWillMount() {
       
        this.props.getContactList(this.props.logged_in_user_id, function () {
            console.log()
        });
     

    }
    searchFilter() {
        console.log("Hello" + this.state.searchText);
       

    }
    updateContact(index) {
        this.setState(
                        {
                            isUpdate: true,
                            contactName: this.props.contactList[index].contact_name,
                            contactPhone: this.props.contactList[index].contact_mobile,
                            contactEmail: this.props.contactList[index].contact_email,
                            contactUserId: this.props.contactList[index]._id,
                            updateContactIndex: index
                        }
                    );
        this._toggleModal();
       
    }
    addContact()
    {
        this.setState(
        {
            isUpdate: false,
            updateContactIndex: null
        })
        this._toggleModal();
    }
    _toggleModal = () => { this.props.modalHandler(true) }
    closeModal = () => { this.props.modalHandler(false) };
    submitModal = () => {
        let cname = this.state.contactName;
        let cphone = this.state.contactPhone;
        let cemail = this.state.contactEmail;
        this.setState({error: ''});
        let errorList = {};
        if (this.state.contactName === undefined || this.state.contactName === '') {
            errorList.contactNameError = '* Required';
            cname = '';
        }
        if (this.state.contactPhone === undefined || this.state.contactPhone === '') {
            errorList.contactPhoneError = '* Required';
            cphone = '';
        }
        if (this.state.contactEmail === undefined || this.state.contactEmail === '') {
            errorList.contactEmailError = '* Required';
            cemail = '';
        }
        if (Object.keys(errorList).length != 0) {
            this.setState({'error': errorList});
        }
        else{
            
            if(this.state.isUpdate)
            {
                let formdata = {
                    contact_id: this.state.contactUserId,
                    contact_name: cname,
                    contact_mobile: cphone,
                    contact_email: cemail,
                    user_id : this.props.logged_in_user_id,
    
                }
                this.props.updateContact(formdata,this.state.updateContactIndex,function(){

                });
            }
            else{
                let formdata = {
                    contact_name: cname,
                    contact_mobile: cphone,
                    contact_email: cemail,
                    user_id : this.props.logged_in_user_id,
                }

                this.props.saveContact(formdata,function(){

                });
            }
            
        }

    }

    renderHeader = () => {
        return <SearchBar placeholder="Type Here..." lightTheme round onChangeText={(text) => this.setState({ searchText: text })} value={this.state.searchText} />;
    };
    showEmptyListView = () => {
        return <View><Text></Text></View>
    } 

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };
    renderFooter = () => {
        if (!this.props.isLoadingConatct) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    render() {
        let dataSource 
       
            dataSource = this.state.searchText
                ? this.props.contactList.filter(contactList => {
                    return contactList.contact_name.indexOf(this.state.searchText) > -1;
                })
                : this.props.contactList;
      
        

       
        //const dataSource = ds.cloneWithRows(filteredAssets);

        return (
            <Container>
                <IchallangeHeader navigate={this.props.navigation.navigate} />
                <ScrollView>

                    <Modal
                        transparent={true}
                        animationType={'none'}
                        visible={this.props.isModalVisible}
                        onRequestClose={() => { console.log('close modal') }}>
                        <View style={styles.modalBackground}>
                            <View style={styles.activityIndicatorWrapper}>

                                <Item error={this.state.error.contactNameError !== undefined}>
                                    <Input
                                        name='contactName'
                                        value={this.state.contactName}
                                        placeholder="Name"
                                        placeholderTextColor="#95a5a6"
                                        onChangeText={(value) => { this.setState({ contactName: value }) }}
                                    />
                                    {this.state.error.contactNameError !== undefined ? <Text style={{ paddingLeft: 3, paddingRight: 3, color: variable.backgroundColor }}>{this.state.error.contactNameError}</Text> : <Text />}
                                </Item>
                                <Item error={this.state.error.contactPhoneError !== undefined}>
                                    <Input
                                        name='contactPhone'
                                        value={this.state.contactPhone}
                                        placeholder="Phone"
                                        placeholderTextColor="#95a5a6"
                                        onChangeText={(value) => { this.setState({ contactPhone: value }) }}
                                    />
                                    {this.state.error.contactPhoneError !== undefined ? <Text style={{ paddingLeft: 3, paddingRight: 3, color: variable.backgroundColor }}>{this.state.error.contactPhoneError}</Text> : <Text />}
                                </Item>
                                <Item error={this.state.error.contactEmailError !== undefined}>
                                    <Input
                                        name='contactEmail'
                                        value={this.state.contactEmail}
                                        placeholder="Email"
                                        placeholderTextColor="#95a5a6"
                                        onChangeText={(value) => { this.setState({ contactEmail: value }) }}
                                    />
                                    {this.state.error.contactEmailError !== undefined ? <Text style={{ paddingLeft: 3, paddingRight: 3, color: variable.backgroundColor }}>{this.state.error.contactEmailError}</Text> : <Text />}
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
                    <View style={styles.container}>
                        <List>
                            
                            <FlatList

                                data={dataSource}
                                renderItem={({ item,index }) => (
                                   
                                    <ListItem
                                        roundAvatar
                                        title={item.contact_name}
                                        subtitle={item.contact_email}
                                        avatar={{ uri: "../../../img/profile.png" }}
                                        containerStyle={{ borderBottomWidth: 0 }}
                                        onPress={this.updateContact.bind(this,index)}
                                        key={item._id}
                                       
                                    />
                                )}
                                keyExtractor={item => item._id}
                                ItemSeparatorComponent={this.renderSeparator}
                                ListHeaderComponent={this.renderHeader}
                                ListFooterComponent={this.renderFooter}
                                //onRefresh={this.handleRefresh}
                                //refreshing={this.state.refreshing}
                                //onEndReached={this.handleLoadMore}
                                ListEmptyComponent={this.showEmptyListView()}
                                onEndReachedThreshold={50}
                            />
                           
                          
                        </List>
                       
                    </View>
                </ScrollView>
                    <ActionButton
                            buttonColor="rgba(231,76,60,1)"
                            onPress={this.addContact.bind(this)}
                    />
            </Container>
        );
    }
}


// This is the state of global app and not state of your Component
const mapStateToProps = (state) => {

    const { internetStatus, isModalVisible, logged_in_user_id } = state.globalReducer;
    const { isLoadingConatct, seed, contactList, contactError, refreshing } = state.contactReducer;
   
    console.log("logged_in_user_id" + logged_in_user_id);

    return {

        isLoadingConatct,
        seed,
        contactList,
        contactError,
        refreshing,
        internetStatus,
        logged_in_user_id,
        isModalVisible

    }

};
export default connect(mapStateToProps,
    { getContactList, modalHandler , updateContact, saveContact}
)
(ContactList);
