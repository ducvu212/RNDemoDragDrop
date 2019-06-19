/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import data from "./app/DotData";
import DotList from "./app/DotList";
import TestArea from "./app/TestArea";

const {width, height} = Dimensions.get("window");

type Props = {};
let updateDot = data.map(item => {
    item.isVisible = true;
    return item;
});
export default class App extends Component<Props> {
    styles = [

        {
            left: 10,
            width: 50,
            height: 50,
            position: 'absolute'
        }
        ,
        {
            left: 10,
            width: 100,
            height: 100,
            position: 'absolute',
        }
        ,
        {
            left: 15,
            width: 100,
            height: 100,
            position: 'absolute',
        }
        ,
        {
            left: 25,
            width: 100,
            height: 100,
            position: 'absolute',
        }
        ,
        {
            left: 10,
            width: 100,
            height: 100,
            position: 'absolute',
        }
        ,
        {
            left: 20,
            width: 100,
            height: 100,
            position: 'absolute',
        }
        ,
        {
            left: 10,
            width: 100,
            height: 100,
            position: 'absolute',
        }
    ];

    constructor(props) {
        super(props);
        this.state = {
            isDropAreaVisible: false,
            data: updateDot
        };
    }

    render() {
        return (
            <View style={styles.container}
            >
                <TestArea
                    dropAreaIsVisible={this.state.isDropAreaVisible}
                    setDropAreaLayout={this.setDropAreaLayout}
                    isTargeted={this.state.isDropAreaTargeted}
                />
                <DotList
                    data={this.state.data}
                    styles={this.styles}
                    scrollEnabled={!this.state.isDropAreaVisible}
                    toggleDropArea={this.toggleDropArea}
                    dropAreaIsVisible={this.state.isDropAreaVisible}
                    isDropArea={this.isDropArea}
                    targetDropArea={this.targetDropArea}
                />
            </View>
        );
    }

    toggleDropArea = (isVisible, item) => {
        if (item) {
            let dotData = [...this.state.data];
            let newData = dotData.map(item => {
                item.isVisible = !isVisible;
                return item;
            });
            let index = newData.findIndex(itm => itm.id === item.id);

            if (isVisible) {
                newData[index].isVisible = true;
            }

            this.setState({
                isDropAreaVisible: isVisible,
                data: newData
            });
        }
    };

    setDropAreaLayout = event => {
        this.setState({
            dropAreaLayout: event.nativeEvent.layout
        });
    };

    isDropArea = gesture => {
        // let dropbox = this.state.dropAreaLayout;
        return (
            // gesture.moveY > dropbox.y + DROPAREA_MARGIN &&
            // gesture.moveY < dropbox.y + dropbox.height + DROPAREA_MARGIN &&
            // gesture.moveX > dropbox.x + DROPAREA_MARGIN &&
            // gesture.moveX < dropbox.x + dropbox.width + DROPAREA_MARGIN
            gesture.moveY > (height - 100) / 2 &&
            gesture.moveY < (height - 100) / 2 + 100 &&
            gesture.moveX > (width - 100) / 2 &&
            gesture.moveX < (width - 100) / 2 + 100
        );
    };

    targetDropArea = isTargeted => {
        this.setState({
            isDropAreaTargeted: isTargeted
        });
    };

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
});
