import React from 'react';
import { View, MaterialCommunityIcons, StyleSheet } from 'react-native';


function Icon(name, size=40, backgroundColor = "#ffff", iconColor = "#0000") {
    return (
        <View
        style={{
            height: size,
            width: size,
            borderRadius: size/2,
            backgroundColor,
        }}
        >
            <MaterialCommunityIcons name={name} color = {iconColor} size={size*0.5}/>
            
        </View>
    );
}
const styles = StyleSheet.create({
    
})
export default Icon;