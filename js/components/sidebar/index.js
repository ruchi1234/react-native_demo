import React, { Component } from "react";
import { Image } from "react-native";
import { isLoggedInUser } from './../../action';
import {connect} from 'react-redux';

import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
	Button,
	View,
	StyleProvider,
	getTheme,
	variables,
} from "native-base";

import styles from "./style";

const drawerCover = require("../../../img/drawer-cover.png");

const drawerImage = require("../../../img/logo-ichallenge.png");

const datas = [
	{
		name: "Home",
		route: "Home",
		icon: "phone-portrait",
		bg: "#C5F442",
	},
	{
		name: "Lobby",
		route: "Lobby",
		
	},
	{
		name: "Profile",
		route: "Profile",
		
	},
	{
		name: "ProfileEdit",
		route: "ProfileEdit"
	},
	{
		name: "AddChallange",
		route: "AddChallange"
	},
	{
		name: "ContactList",
		route: "ContactList"
	},
	{
		name: "Logout",
		route: "Logout"
	}
	
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	
	
	}

	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<View source={drawerCover} style={styles.drawerCover}>
						<Image square style={styles.drawerImage} source={drawerImage} />
					</View>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>
							}
						
					/>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    const { loadingIndicator,isLogin,logged_in_user_id,initialRoute } = state.checkLoginReducer;
    
    return {
        isLogin,
        loadingIndicator,
        logged_in_user_id,
        initialRoute
      }

}
export default  connect(mapStateToProps,{isLoggedInUser})(SideBar);
