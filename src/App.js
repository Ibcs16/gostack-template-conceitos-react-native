import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Icon from 'react-native-vector-icons/MaterialIcons';

import user from './assets/user.jpg';
import api from "./services/api";

export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res =>
      setRepositories(res.data.map(repo =>
        ({...repo, liked: false}))
      )
    );
  }, []);

  async function handleLikeRepository(id) {
    const response = await api.post(`repositories/${id}/like`);
    
    const { likes } = response.data;

    const repoIndex = repositories.findIndex(repo => repo.id === id);

    setRepositories(prev => {
      prev[repoIndex].likes = likes;
      prev[repoIndex].liked = true
      console.log('prev', prev);
      return [...prev];
    });
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <View style={styles.userInfo}>
          <Image style={styles.userImg} source={user}/>
          <Text style={styles.userNameText}>Iago Brayham</Text>
          <Text style={styles.userNickText}>Ibcs16</Text>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={.9}
            testID={`like-button-1`}
          >
            <Icon name="add" size={32} color="#333" style={styles.buttonText} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider}>
          <Text style={styles.dividerText}>Meus repositórios</Text>
        </View>
        {repositories.length === 0 && <Text style={styles.emptyListText}>Você não possui repositórios..</Text>}
        <FlatList
          data={repositories}
          keyExtractor={repo => repo.id}
          renderItem={ ({ item: repo }) => (
            <View style={styles.repositoryContainer}>
            <Text style={styles.repository}>{repo.title}</Text>
  
            <Text style={styles.urlText}>{repo.url.substring(0,20)}...</Text>
  
            <View style={styles.techsContainer}>
              { repo.techs.map(tech => <Text key={tech} style={styles.tech}>{tech}</Text> )}
            </View>
  
            <View style={styles.likesContainer}>
              <TouchableOpacity
                onPress={() => handleLikeRepository(repo.id)}
                testID={`like-button-${repo.id}`}
              >
                {
                  !repo.liked ?
                    <Icon name="favorite-border" size={32} color="#fff" />
                  :
                    <Icon name="favorite" size={32} color="#fff" />
                }
              </TouchableOpacity>
              <Text
                style={styles.likeText}
                testID={`repository-likes-${repo.id}`}
              >
                {repo.likes} curtida{`${repo.likes>1 && 's'}`}
              </Text>
            </View>
  
           
          </View>
        
          )}
        >

        </FlatList>
       
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: "#F0F4F7",
    paddingHorizontal: 15
  },
  userInfo: {
    marginBottom: 60,
    backgroundColor: "#3A2BB8",
    textAlign: 'center',
    color: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 40,
    borderRadius: 20
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 12
  },
  userNameText: {
    color: '#fff',
    fontSize: 24,
    marginTop: 10
  },
  userNickText: {
    color: '#fff',
    fontSize: 22,
    opacity: .5,
    marginTop: 10,
    marginBottom: 20
  },
  divider: {
    alignItems: 'center',
    marginBottom: 20
  },
  dividerText: {
    color: "#3A2BB8",
    fontSize: 24,
    fontWeight: 'bold'
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 20,
    color: "#3A2BB8",
    opacity: .5
  },
  repositoryContainer: {
    backgroundColor: "#3A2BB8",
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderRadius: 20,
    minHeight: 150,
    marginBottom: 15
  },
  repository: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#fff',
  },
  urlText: {
    fontSize: 20,
    marginTop: 4,
    textAlign: 'center',
    color: "#fff",
    opacity: .4,
  },  
  techsContainer: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  tech: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "rgba(0, 0, 0, .5)",
    borderRadius: 5
  },
  likesContainer: {
    position: 'absolute',
    right: 20,
    top: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    // marginTop: 10,
    height: 60,
    position: 'absolute',
    bottom: -30,
    width: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  buttonText: {
    opacity: .5
  },
  likeButton: {

  }
});
