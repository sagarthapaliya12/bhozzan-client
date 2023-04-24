import { StyleSheet, View } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { Send, Bubble, GiftedChat } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import Screen from "../../components/Screen";
import colors from "../../config/colors";

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: require("../../assets/restaurants/kfc.jpg"),
        },
      },
      {
        _id: 2,
        text: "Hello there",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: require("../../assets/restaurants/kfc.jpg"),
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 2, marginRight: 5 }}
            size={40}
            color={colors.secondary}
          />
        </View>
      </Send>
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={25} color={colors.dark} />;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: colors.secondary,
          },
        }}
        textStyle={{
          right: styles.rightBubbleTextStyle, // Add the style for the text color here
        }}
      />
    );
  };

  return (
    <Screen>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  rightBubbleTextStyle: {
    color: "#4e4848",
  },
});
