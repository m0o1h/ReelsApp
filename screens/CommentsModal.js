import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Modal,
    FlatList,
    Button,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from "react-native";
import { firebase } from "../firebase/firebase";
import { Styles } from "./Styles";
import { ToShowAndCloseModal } from "../atoms/GlobalVariable";
import { useRecoilState } from "recoil";
import { MaterialIcons } from "@expo/vector-icons";

const CommentsModal = ({ navigation, route, docId, commentsCount }) => {
  const [commetnsModelShowen, setCommetnsModelShowen] = useRecoilState(ToShowAndCloseModal);
  const videoRef = firebase.firestore().collection("OTT").doc("shortform").collection("reels");
  const commentsRef = firebase.firestore().collection("OTT").doc("shortform").collection("reels").doc(docId).collection("enteredComments");
  const [comments, setComments] = useState([]);

  const [addData, setAddData] = useState("");

  useEffect(() => {
    const unsubscribe = commentsRef
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const commentsfetchecd = [];
        querySnapshot.forEach((doc) => {
          const { heading } = doc.data();
          commentsfetchecd.push({
            id: doc.id,
            heading,
          });
        });
        setComments(commentsfetchecd);
      });
    return unsubscribe;
  }, []);

  const addComments = () => {
    if (addData && addData.length > 0) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp();
      const data = {
        heading: addData,
        createdAt: timestamp,
      };
      commentsRef
        .add(data)
        .then(() => {
          videoRef.doc(docId).update({
            comments: commentsCount + 1,
          });
          setAddData(""), Keyboard.dismiss();
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  const deleteComment = (item) => {
    commentsRef.doc(item.id).delete()
      .then(() => {
        videoRef.doc(docId).update({
          comments: commentsCount - 1,
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <View style={{flex:1}} >
        <TouchableOpacity
        onPress={()=>setCommetnsModelShowen(false)}
        style={Styles.modalCloseTouchable}
        ></TouchableOpacity>
      <View style={Styles.modal}>
        <View style={{backgroundColor:'black', width:'40%', height:'1%', borderRadius:5}} ></View>
            <FlatList
              data={comments}
              style={Styles.flatlist}
              scrollEnabled={true}
              renderItem={({ item }) => {
                return (
                  <View style={Styles.modalFlatlistinnercontainer}>
                    <Text style={Styles.modalFlatlistinnerText}>
                      {item.heading}
                    </Text>
                    <MaterialIcons
                      name="delete"
                      size={24}
                      color="black"
                      style={Styles.modalFlatlistinnerDeleteButton}
                      onPress={() => deleteComment(item)}
                    />
                  </View>
                );
              }}
            />
          <View style={Styles.modalTextInputButtonLayout}>
            <TextInput
              placeholder="Add Comment"
              onChangeText={(val) => setAddData(val)}
              value={addData}
              multiline={true}
              style={Styles.commentsInput}
            />
            <Button title="Post" onPress={addComments} />
          </View>
      </View>
      </View>
  );
};

export default CommentsModal;
