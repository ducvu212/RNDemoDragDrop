import React, {Component} from "react";
import {Animated, Easing, PanResponder} from "react-native";
import Icon from 'react-native-vector-icons/Octicons';

type Props = {};
export default class Dot extends Component<Props> {
    constructor(props) {
        super(props);

        this.pan = new Animated.ValueXY();
        this.scaleValue = new Animated.Value(0);
        this.opacityValue = new Animated.Value(2);

        this.cardScale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 0.5, 1]
        });

        this.cardOpacity = this.opacityValue.interpolate({
            inputRange: [0, 1, 2],
            outputRange: [0, 0.5, 1]
        });
    }

    componentWillMount() {
        const {
            item,
            toggleDropArea,
            isDropArea,
            targetDropArea,
        } = this.props;

        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.pan.setOffset({x: this.pan.x._value, y: this.pan.y._value});
                this.pan.setValue({x: 0, y: 0});
                Animated.parallel([
                    Animated.timing(this.scaleValue, {
                        toValue: 0.5,
                        duration: 250,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }),
                    Animated.timing(this.opacityValue, {
                        toValue: 1,
                        duration: 250,
                        easing: Easing.linear,
                        useNativeDriver: true
                    })
                ]).start();

                this.pan.setValue({x: 0, y: 0});
                toggleDropArea(true, item);
            },
            onPanResponderMove: (e, gesture) => {
                Animated.event([null, {dx: this.pan.x, dy: this.pan.y}])(e, gesture);
                if (isDropArea(gesture)) {
                    targetDropArea(true);
                } else {
                    targetDropArea(false);
                }
            },
            onPanResponderRelease: (e, gesture) => {
                toggleDropArea(false, item);
                if (isDropArea(gesture)) {
                    Animated.parallel([
                        Animated.event([null, {
                            dx: this.pan.x,
                            dy: this.pan.y,
                        }])(e, gesture),
                        Animated.timing(this.opacityValue, {
                            toValue: 2,
                            duration: 250,
                            easing: Easing.linear,
                            useNativeDriver: true
                        }),
                        Animated.timing(this.scaleValue, {
                            toValue: 1,
                            duration: 250,
                            easing: Easing.linear,
                            useNativeDriver: true
                        }),
                    ]).start();
                } else {
                    Animated.parallel([
                        Animated.timing(this.scaleValue, {
                            toValue: 1,
                            duration: 250,
                            easing: Easing.linear,
                            useNativeDriver: true
                        }),
                        Animated.timing(this.opacityValue, {
                            toValue: 2,
                            duration: 250,
                            easing: Easing.linear,
                            useNativeDriver: true
                        }),
                        Animated.spring(this.pan, {
                            toValue: {x: 0, y: 0},
                            friction: 5,
                            useNativeDriver: true
                        })
                    ]).start();
                }
                this.pan.flattenOffset();
            }
        });
    }

    render() {
        const {
            item,
        } = this.props;
        let [translateX, translateY] = [this.pan.x, this.pan.y];

        let transformStyle = {
            ...styles.card,
            opacity: item.isVisible ? this.cardOpacity : 0,
            transform: [{translateX}, {translateY}, {scale: this.cardScale}]
        };

        return (
            <Animated.View style={transformStyle} {...this.panResponder.panHandlers}>
                <Icon style={this.props.styles[item.id - 1]} name={'primitive-dot'} size={64} color={item.color}/>
            </Animated.View>
        );
    }
}

const styles = {
    card: {
        width: 50,
        height: 50,
        margin: 80,
    },
    name: {
        fontSize: 15,
        color: "#333",
        fontWeight: "bold"
    },
};
