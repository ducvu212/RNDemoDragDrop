import React, {Component} from "react";
import {Platform, ScrollView, View} from "react-native";
import Card from "./Card";

import {HEADER_MAX_HEIGHT} from "../settings/layout";
import Dot from "./Dot";

type Props = {};
export default class DotList extends Component<Props> {
    render() {
        const {data, scrollEnabled} = this.props;
        return (
            <ScrollView scrollEnabled={scrollEnabled} >
                <View style={[styles.scroll_container]}>{this.renderPairs(data)}</View>
            </ScrollView>
        );
    }

    renderPairs = data => {
        let pairs = getPairsArray(data);
        return pairs.map((pair, index) => {
            return (
                <View style={styles.pair} key={index}>
                    {this.renderCards(pair)}
                </View>
            );
        });
    };

    renderCards = pair => {
        const {
            viewAction,
            bookmarkAction,
            shareAction,
            styles,
            toggleDropArea,
            isDropArea,
            targetDropArea,
            removePokemon
        } = this.props;
        return pair.map(item => {
            return (
                <Dot
                    key={item.id}
                    item={item}
                    styles={styles}
                    toggleDropArea={toggleDropArea}
                    isDropArea={isDropArea}
                    targetDropArea={targetDropArea}
                />
            );
        });
    };
}

const getPairsArray = items => {
    const pairs_r = [];
    let pairs = [];
    let count = 0;
    items.forEach(item => {
        count += 1;
        pairs.push(item);
        if (count === 2) {
            pairs_r.push(pairs);
            count = 0;
            pairs = [];
        }
    });
    return pairs_r;
};

const styles = {
    scroll: {
        flex: 1,
    },
    pair: {
        flexDirection: "row"
    },
    scroll_container: {
        flex: 1,
        alignItems: "center",
        paddingTop: Platform.OS !== "ios" ? HEADER_MAX_HEIGHT : 0
    }
};
