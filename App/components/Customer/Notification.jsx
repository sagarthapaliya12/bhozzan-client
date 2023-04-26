import { useState, useEffect, useRef } from "react";
import { Text, View,} from "react-native";
import * as Notifications from "expo-notifications";
import colors from "../../config/colors";
import registerForPushNotificationsAsync from "../../utils/registerForPushNotification.";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={{ backgroundColor: colors.white }}>
      {/* <Text>Notification</Text>
      <Text>Your expo push token: {expoPushToken}</Text> */}
    </View>
  );
};

export default Notification;
