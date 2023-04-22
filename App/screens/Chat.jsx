import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";

const Chat = () => {
	return (
		<Screen>
      <Text>
        chat screen
      </Text>
			
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {},
});

// export default Chat;
// import React from 'react';
// import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
// import {
//   Container,
//   Card,
//   UserInfo,
//   UserImgWrapper,
//   UserImg,
//   UserInfoText,
//   UserName,
//   PostTime,
//   MessageText,
//   TextSection,
// } from '../components/Customer/MessageStyles';

// const Messages = [
//   {
//     id: '1',
//     userName: 'Jenny Doe',
//     userImg: require('../assets/Avatar.jpg'),
//     messageTime: '4 mins ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '2',
//     userName: 'John Doe',
// 	userImg: require('../assets/Avatar.jpg'),
//     messageTime: '2 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '3',
//     userName: 'Ken William',
// 	userImg: require('../assets/Avatar.jpg'),
//     messageTime: '1 hours ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '4',
//     userName: 'Selina Paul',
//     userImg: require('../assets/Avatar.jpg'),    
//     messageTime: '1 day ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
//   {
//     id: '5',
//     userImg: require('../assets/Avatar.jpg'),
//     userName: 'Christy Alex',
//     messageTime: '2 days ago',
//     messageText:
//       'Hey there, this is my test for a post of my social app in React Native.',
//   },
// ];

// const Chat = ({navigation}) => {
//     return (
//       <Container>
//         <FlatList 
//           data={Messages}
//           keyExtractor={item=>item.id}
//           renderItem={({item}) => (
//             
//               <UserInfo>
//                 <UserImgWrapper>
//                   <UserImg source={item.userImg} />
//                 </UserImgWrapper>
//                 <TextSection>
//                   <UserInfoText>
//                     <UserName>{item.userName}</UserName>
//                     <PostTime>{item.messageTime}</PostTime>
//                   </UserInfoText>
//                   <MessageText>{item.messageText}</MessageText>
//                 </TextSection>
//               </UserInfo>
//             </Card>
//           )}
//         />
//       </Container>
//     );
// };

// export default Chat;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, 
//     alignItems: 'center', 
//     justifyContent: 'center'
//   },
// });