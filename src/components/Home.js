import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Modal,
  ImageBackground,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { useUserContext } from './UserContext';
import axios from 'axios';
import { Video} from 'react-native-video';

const WordSearchScreen = ({ navigation }) => {
  const [betAmount, setBetAmount] = useState('');
  const [balance, setBalance] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { userData } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertText, setAlertText] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
 
 

  const toggleAlertModal = () => {
    setAlertVisible(!isAlertVisible);
  };

  const fetchBalance = async () => {
    try {
      const userId = userData.id;
      const response = await axios.get(`https://heavenly-onyx-bun.glitch.me/getBalance?userId=${userId}`);
      const data = response.data;
      const balance = parseFloat(data.balance).toFixed(2);
      console.log(balance)
      setBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);
  

   if (balance <= 10){
    alert("Low balance , Deposit!!")
   }


  const onRefresh = () => {
    setRefreshing(true);
    fetchBalance()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchBalance();
  }, []);


  

  const handleStartGame = async () => {
    navigation.navigate('games');
  };
  

  const navigateToUserProfile = () => {
    navigation.navigate('User'); 
    fetchBalance();
  };

  const navigateToNotify = () => {
    navigation.navigate('notify'); 
  };

  return (
    <ImageBackground
      source={require('../assets/back.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        {/* Top-left user icon */}
        <TouchableOpacity
          style={styles.userIcon}
          onPress={navigateToUserProfile}
        >
          <Image
            source={require('../assets/user.png')} 
            style={styles.iconImage}
          />
        </TouchableOpacity>

        <Text style={[styles.balance, { marginTop: 56, textAlign: 'left' }]}>
  {'R ' + balance}
</Text>


        {/* Top-right bell icon */}
        <TouchableOpacity style={styles.bellIcon} onPress={navigateToNotify}>
          <Image
            source={require('../assets/bell.png')}
            style={styles.iconImage}
          />
        </TouchableOpacity>

        <FlatList
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={[{ key: 'balance' }]}
          renderItem={() => (
            <>
             
              
             

              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartGame}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.startButtonText}>Start Game</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        />
        <Modal
        visible={isAlertVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleAlertModal}
      >
        <View style={styles.alertModalContainer}>
          <TouchableOpacity onPress={toggleAlertModal} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.alertText}>{alertText}</Text>
        </View>
      </Modal>
      </View>
    </ImageBackground>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: 'red', 
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertText: {
    fontSize: 18,
    color: 'red', 
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  alertModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balance: {
    fontSize: 16,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
  },
  iconImage: {
    width: 34,
    height: 34,
  },
  userIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    paddingTop: 25,
  },
  bellIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingTop: 25,
  },
});

export default WordSearchScreen;
