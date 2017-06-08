# React Native Keyboard Aware Parallax ScrollView

## Motivation
We needed a parallax view with native animation and
a scrollView that scrolls automatically when focussing a TextField.

## Setup
Install the dependency with npm or yarn:

```
yarn add dejakob/react-native-keyboard-aware-parallax-scroll-view
```

Import into your component
```
import ParallaxKeyboardAwareScrollView from 'react-native-keyboard-aware-parallax-scroll-view'; 
```

## Example
```
function ExampleComponent(props) {
    return (
        <ParallaxKeyboardAwareScrollView
          backgroundImage={{ uri: kitchenPicture }}
          imageHeight={160}
          onScroll={props.onScroll}
        >
            {renderContent()}
        </ParallaxKeyboardAwareScrollView>
    );
}
```

## Properties
|Name |Type |Default value |Description |
|-----|-----|--------------|------------|
|imageHeight|Number|200|The height of the header image|
|onScroll|Function||Additional scroll handler|
|backgroundImage|Object||Image resource for the background image|
|background|Function||Instead of an image, render a component on the background (function that returns component)|
|header|Function||Function that renders header overlay component|

## Methods
To use scrollToPostion and other scrollView methods,
just use the reference.scrollView (e.g. this.kapsv.scrollView.scrollToPosition)

```
<ParallaxKeyboardAwareScrollView
  ref={(kapsv) => { this.kapsv = kapsv; }}
>
  {renderContent()}
</ParallaxKeyboardAwareScrollView>
```

## Contribute
Make sure eslint has no issues before making a PR

```
npm run lint
```