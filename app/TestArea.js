import React from "react";
import {Dimensions, Text, View} from "react-native";

const {width, height} = Dimensions.get("window");

const DropArea = ({dropAreaIsVisible, setDropAreaLayout, isTargeted}) => {
    const right = dropAreaIsVisible ? 0 : -500;
    const color = isTargeted ? "#5fba7d" : "#333";
    return (
        <View
            style={{right}}
            onLayout={setDropAreaLayout}
        >
            <Text style={[styles.dropAreaText, {borderColor: color}]}>Drop here</Text>
        </View>
    );
};

const styles = {
    dropArea: {
        position: "absolute",
        width: 100,
        height: 100,
        top: (height - 100) / 2,
        left: 30,
        backgroundColor: "#eaeaea",
        borderWidth: 3,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center"
    },
    dropAreaText: {
        fontSize: 15,
        position: "absolute",
        width: 100,
        height: 100,
        top: (height - 100) / 2,
        left: (width - 100) / 2,
        backgroundColor: "#eaeaea",
        borderWidth: 3,
        borderStyle: "dashed",
        alignItems: "center",
        justifyContent: "center",
        textAlign: 'center'
    }
};

export default DropArea;
