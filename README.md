# React Native Keyboard Aware Parallax ScrollView

## Motivation
We needed a parallax view with native animation and
a scrollView that scrolls automatically when focussing a TextField.
As seen in the FLAVR app, which is available on
[Google play](https://play.google.com/store/apps/details?id=be.flavr) and 
[iTunes store](https://itunes.apple.com/be/app/flavr-buy-homemade-meals-from-your-neighbours/id1121681824?mt=8).
Note: we included the new parallax scroll in the latest version, which will be released soon.


![Preview](https://media.giphy.com/media/PY1p6I2ckFK5q/giphy.gif)

(Screenshot belongs to FLAVR NV, all rights reserved)

## Setup
Install the dependency with npm or yarn:

```
yarn add react-native-keyboard-aware-parallax-scroll-view
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
