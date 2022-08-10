import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';

function AppText({children, style}) {
    return (
        <Text style={[styles.text, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontFamily: Platform.OS === "android"? "Inter" : "Avenir" 
    }
})

export default AppText;