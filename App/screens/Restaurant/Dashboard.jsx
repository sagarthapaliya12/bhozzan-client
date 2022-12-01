import React, { useEffect } from "react";
import Screen from "../../components/Screen";
import Paper from "../../components/Restaurant/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantUserId } from "./restaurantSlice";
import socket from "../../utils/socket";

const Dashboard = () => {
  const dispatch = useDispatch();

  const restaurantId = useSelector((state) => state.restaurantSlice.restaurantUserId);

  useEffect(() => {
    dispatch(getRestaurantUserId());
    socket.emit("join", restaurantId);
  }, [restaurantId]);

  useEffect(() => {
    socket.on("notification", (notification) => {
      console.log("new notification", notification);
    });
  }, []);

  return (
    <Screen>
      <Paper />
    </Screen>
  );
};

export default Dashboard;
