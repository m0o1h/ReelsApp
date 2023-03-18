import React,{useState, useEffect} from "react";
import { Button, FlatList, Dimensions, TouchableOpacity, Modal, TextInput } from "react-native";
import { View, Image, Text, } from "react-native";
import {firebase} from "../firebase/firebase";
import {Styles} from './Styles';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CommentsModal from "./CommentsModal";
import { ToShowAndCloseModal } from "../atoms/GlobalVariable";
import { useRecoilState } from "recoil";


const MainPage =({navigation}) => {
  const [video, setVideo] = useState([]);
  const videoRef = firebase.firestore().collection('OTT').doc('shortform').collection('reels');
  const [commetnsModelShowen, setCommetnsModelShowen] = useRecoilState(ToShowAndCloseModal);
  const [commentsId, setCommentsId]= useState(null);
  const [commentsCount, setCommentsCount] = useState(null)

  const [timestamp, setTimestamp] = useState(null);

  useEffect(()=>{
    const unsubscribe = videoRef
    .orderBy('createdAt', 'desc')
    .onSnapshot((querySnapshot)=>{
      const videoFetched = [];
      querySnapshot.forEach((doc)=>{
        const {likes} = doc.data();
        const {comments} = doc.data();
        const {title} = doc.data();
        const {videoURL} = doc.data();
        const {id} = doc.data();
        const {createdAt} = doc.data();
        videoFetched.push({
          likes,
          comments,
          videoURL,
          title,
          id,
          createdAt,
        });
      });
      setVideo(videoFetched);
    });
    return unsubscribe;
  },[]);

  const updateLikes = (item) => {
      try {
        videoRef.doc(item.id).update({
          likes: item.likes + 1,
        });
      } catch (error) {
        console.log(error);
      }
    
  };

  const showModal =(item)=>{
    setCommentsId(item.id)
    setCommentsCount(item.comments)
    setCommetnsModelShowen(true)
  }


  return (
    <View style={Styles.flatlistoutercontainer}>

       {/* Displaying Comments in this Modal */}
      {commetnsModelShowen==true && 
      <Modal
        transparent={true}
        animationType={"fade"}
        visible={commetnsModelShowen}
        onBackdropPress={() => setCommetnsModelShowen(false)}
      >
      <CommentsModal docId={commentsId} commentsCount={commentsCount} />
      </Modal>
      }

      <FlatList
        data={video}
        style={Styles.flatlist}
        snapToAlignment={"start"}
        decelerationRate={0.6}
        snapToInterval={Dimensions.get("window").height}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={Styles.flatlistinnercontainer}>
              <Image
                source={{ uri: item.videoURL }}
                style={Styles.flatListImage}
              ></Image>
              <Text style={Styles.titleText}>Name: {item.title}</Text>
              {/* format the timestamp value into a string
              new Date(video.createdAt.toDate()).toLocaleString(); */}
              <Text style={{...Styles.titleText, top:30}} >TimeStamp: {item.createdAt && new Date(item.createdAt.toDate()).toLocaleString()}</Text>

              <TouchableOpacity
                onPress={() => updateLikes(item)}
                style={{ ...Styles.floatingTouchableOpacity, bottom: 145 }}
              >
                <AntDesign name="like1" size={24} color='red'/>
                <Text style={Styles.likeCommentsText}>{item.likes}</Text>
              </TouchableOpacity>

              {/* To update Comments */}
              <TouchableOpacity
                onPress={() => showModal(item)}
                style={{ ...Styles.floatingTouchableOpacity, bottom: 85 }}
              >
                <FontAwesome name="commenting" size={24} color="white" />
                <Text style={Styles.likeCommentsText}>{item.comments}</Text>
              </TouchableOpacity>

              {/* To Upload new files */}
              <TouchableOpacity onPress={()=>navigation.navigate('UploadPage')} style={{...Styles.floatingTouchableOpacity, bottom:45  }} >
                <AntDesign name="cloudupload" size={30} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>

    </View>
  );
}

export default MainPage;