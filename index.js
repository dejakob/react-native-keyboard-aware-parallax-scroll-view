import React, { Component } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareAnimatedScrollView } from 'react-native-keyboard-aware-scroll-view';

const DEFAULT_HEIGHT = 200;
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    relativeWrapper: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    imagePlaceholder: {
        width: '100%',
        position: 'relative',
    },
});

/**
 * <ParallaxKeyboardAwareScrollView />
 * @returns {React.Component} parallax keyboard aware scrollView
 */
class ParallaxKeyboardAwareScrollView extends Component {
    static get propTypes() {
        return {
            imageHeight: PropTypes.number,
            onScroll: PropTypes.func,
            backgroundImage: PropTypes.object,
            background: PropTypes.func,
            header: PropTypes.func,
        };
    }

    constructor() {
        super();

        this.state = {
            scrollY: new Animated.Value(0),
        };

        this.createScrollHandler = this.createScrollHandler.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderBackground = this.renderBackground.bind(this);
    }

    get height() {
        return this.props.imageHeight || DEFAULT_HEIGHT;
    }

    /**
     * Create scroll handler for the scrollView
     * @param {Function} extraEvent
     *  Event that is needed by the keyboard aware scrollView
     * @returns {Function} scroll handler
     */
    createScrollHandler(extraEvent) {
        return Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            y: this.state.scrollY,
                        },
                    },
                },
            ],
            {
                listener: (e) => {
                    if (typeof this.props.onScroll === 'function') {
                        this.props.onScroll(e);
                    }
                    extraEvent(e);
                },
                useNativeDriver: true,
            },
        );
    }

    renderHeader() {
        if (typeof this.props.header === 'function') {
            return this.props.header();
        }

        return null;
    }

    renderBackground() {
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [Math.round((-120 / DEFAULT_HEIGHT) * this.height), 0],
            outputRange: [2.2, 1],
            extrapolate: 'clamp',
        });
        const backgroundStyle = [
            styles.backgroundImage,
            { height: this.height, transform: [{ scale: headerHeight }] },
        ];

        if (
            typeof this.props.backgroundImage === 'object' &&
            this.props.backgroundImage !== null
        ) {
            return (
                <Animated.Image
                  style={backgroundStyle}
                  source={this.props.backgroundImage}
                  resizeMode="cover"
                />
            );
        }

        if (typeof this.props.background === 'function') {
            return (
                <Animated.View
                  style={backgroundStyle}
                >
                    {this.props.background()}
                </Animated.View>
            );
        }

        return null;
    }

    render() {
        return (
            <View
              style={styles.wrapper}
            >
                {this.renderBackground()}

                <KeyboardAwareAnimatedScrollView
                  style={styles.wrapper}
                  createScrollHandler={this.createScrollHandler}
                  scrollEventThrottle={32}
                  ref={(akasw) => { this.scrollView = akasw; }}
                >
                    <View
                      style={styles.relativeWrapper}
                    >
                        <View
                          style={[styles.imagePlaceholder, { height: this.height }]}
                        >
                            {this.renderHeader()}
                        </View>

                        {this.props.children}
                    </View>
                </KeyboardAwareAnimatedScrollView>
            </View>
        );
    }
}

export default ParallaxKeyboardAwareScrollView;
