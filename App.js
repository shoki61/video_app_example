import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  Image,
  Button,
  SafeAreaView,
} from 'react-native';
import Video from 'react-native-video';
import VideoList from 'react-native-video-list';

import AVATAR from './batman.jpeg';
import HEART from './heart.png';
import CHAT from './chat.jpeg';

const {width} = Dimensions.get('window');

const data = [
  {
    id: 'post-1',
    user: 'User 1',
    videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4`,
    likes: 103,
    comments: 56,
  },
  {
    id: 'post-2',
    user: 'User 2',
    likes: 223,
    comments: 43,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'post-3',
    user: 'User 3',
    likes: 89,
    videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4`,
    comments: 89,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'post-4',
    user: 'User 4',
    likes: 398,
    comments: 105,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    id: 'post-5',
    user: 'User 5',
    videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4`,
    likes: 309,
    comments: 232,
  },
  {
    id: 'post-6',
    user: 'User 6',
    videoUrl: `https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4`,
    likes: 189,
    comments: 127,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    id: 'post-7',
    user: 'User 7',
    likes: 401,
    comments: 36,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
];

const Stack = createNativeStackNavigator();

const About = ({navigation}) => {
  return (
    <View>
      <Text style={{margin: 30}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Text>
      <Button title="back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MyPage = ({navigation}) => {
  return (
    <>
      <VideoList
        data={data}
        renderItem={({item, setPaused, paused, isVisible}) => (
          <View style={styles.postContainer}>
            <View style={styles.userInfo}>
              <Image source={AVATAR} style={styles.avatar} />
              <Text style={styles.username}>{item.user}</Text>
            </View>
            {item.text?.length > 0 && (
              <Text style={styles.postText}>{item.text}</Text>
            )}
            {item.videoUrl?.length > 0 && (
              <TouchableOpacity
                onPress={() => {
                  if (item.videoUrl?.length > 0) {
                    if (isVisible) {
                      setPaused(!paused);
                    }
                  }
                }}>
                <Video
                  source={{uri: item.videoUrl}}
                  style={styles.video}
                  paused={paused}
                  resizeMode="cover"
                  repeat
                />
              </TouchableOpacity>
            )}
            <View style={styles.interactions}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{width: 20, height: 20}} source={HEART} />
                <Text style={styles.interactionText}>{item.likes}</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image style={{width: 20, height: 20}} source={CHAT} />
                <Text style={styles.interactionText}>{item.comments}</Text>
              </View>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => navigation.navigate('AboutStack')}>
        <Text style={{color: '#fff'}}>About</Text>
      </TouchableOpacity>
    </>
  );
};

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={MyPage} />
      <Tab.Screen name="About" component={About} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Tabs} />
          <Stack.Screen name="AboutStack" component={About} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postText: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  video: {
    width: width,
    aspectRatio: 16 / 9,
  },
  playButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButtonText: {
    color: 'white',
    fontSize: 50,
  },
  interactions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  interactionText: {
    marginLeft: 8,
  },
  aboutButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 50,
    width: 50,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 99,
  },
});

export default App;
