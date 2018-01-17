import React, { Component } from 'react';
import { Footer, FooterTab , Button, Icon, Text } from "native-base";

export default class FooterTabs extends Component {

    render() {
        return (
            <Footer style={{backgroundColor: '#bdc3c7'}}>
                <FooterTab>
                    <Button vertical>
                        <Icon name="home" />
                        <Text> Home  </Text>
                    </Button>
                    
                    <Button vertical>
                        <Icon name="camera" />
                       <Text> Camera  </Text>
                    </Button>

                    <Button vertical>
                     <Icon name="notifications" />
                      <Text> Alert  </Text>
                    </Button>
                    
                </FooterTab>
            </Footer>
        )
    }
}