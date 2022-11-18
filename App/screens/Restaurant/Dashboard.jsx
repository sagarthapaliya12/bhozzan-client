import React, { useEffect } from "react";
import Screen from "../../components/Screen";
import Paper from "../../components/Restaurant/Paper";
import { useDispatch } from "react-redux";
import {  getRestaurantUserId } from "./restaurantSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRestaurantUserId());
  }, []);

  return (
    <Screen>
      <Paper />
    </Screen>
  );
};

export default Dashboard;
