import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';
import { StyleSheet, ScrollView, View } from 'react-native';
import IchallangeHeader from "./../../components/header/";
import FooterTabs from "./../../components/Footer/";
const styles = require('./styles');
export default class ContactList extends Component {
    render() {
        return (
            <Container>
                <IchallangeHeader navigate={this.props.navigation.navigate} />
                <ScrollView>
                <View style={styles.container}>
                    <List style={{backgroundColor:'#fff'}}>
                        <ListItem itemDivider>
                            <Text>A</Text>
                        </ListItem>
                        <ListItem >
                            <Text>Aaron Bennet</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Ali Connors</Text>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>B</Text>
                        </ListItem>
                        <ListItem>
                            <Text>Bradley Horowitz</Text>
                        </ListItem>
                    </List>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}
