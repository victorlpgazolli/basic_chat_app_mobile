import React, { Component } from "react";
import { TextInput, StyleSheet, Text, View, Linking} from "react-native";
var PushNotification = require("react-native-push-notification");
var SendIntentAndroid = require('react-native-send-intent');
import io from "socket.io-client";
 var lurl = "http://victor-chat-app.herokuapp.com";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: "",
      chatMessages: []
    };
  }
  componentDidMount() {
    this.socket = io.connect(lurl);
    // this.socket = io(lurl + ":3000")
    this.socket.on("user alive", msg => {
      setInterval(() => io.emit('user alive', "user alive"), 5000);
    })
    
    this.socket.on("chat message", msg => {
      
      if(msg.startsWith("/url")){
        Linking.openURL(msg.substring(5)) 
        PushNotification.localNotification({
        message: msg.substring(5),
      //   /* Android Only Properties */
      //   // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      //   // ticker: "My Notification Ticker", // (optional)
        autoCancel: true, // (optional) default: true
      //   // largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      //   // smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      //   // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      //   // subText: "This is a subText", // (optional) default: none
      //   // color: "red", // (optional) default: system default
      //   // vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      //   // tag: 'some_tag', // (optional) add tag to message
      //   // group: "group", // (optional) add group to message
      //   // ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: "high", // (optional) set notification priority, default: high
      //   // visibility: "private", // (optional) set notification visibility, default: private
      //   // importance: "high", // (optional) set notification importance, default: high
      })
      }else{
        this.setState({ chatMessages: [...this.state.chatMessages, msg] });
      }
    });
  }

  submitChatMessage() {
    this.socket.emit("chat message", this.state.chatMessage);
    this.setState({ chatMessage: "" });
  }

  render() {
    const chatMessages = this.state.chatMessages.map(chatMessage => (
      <Text key={chatMessage}>{chatMessage}</Text>
    ));

    return (
      <View style={styles.container}>
        <TextInput
          style={{ height: 40, borderWidth: 2 }}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({ chatMessage });
          }}
        />
        {chatMessages}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});