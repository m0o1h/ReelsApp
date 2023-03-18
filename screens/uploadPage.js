import React, { useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, Alert, TextInput } from "react-native";
import { View, Image, Text } from "react-native";
import { firebase } from "../firebase/firebase";
import { Styles } from "./Styles";
import * as ImagePicker from "expo-image-picker";
import { ActivityIndicator } from "react-native";

const UploadPage = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageTitle, setImageTitle] = useState("NewReel");
  const [imagePicked, setImagePicked] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri } = result.assets[0];
        setImage({ uri });
        setImagePicked(true);
      } else {
        Alert.alert("Delete", "Are you sure you do not want to upload the image", [
          { text: "Yes", onPress: () => { setImage(null), navigation.navigate("MainPage") } },
          { text: "No", onPress: () => pickImage() },
        ]);
      }
    } catch (error) {
      console.log("error reading an image");
    }
  };

  const uploadImage = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    const ref = firebase.storage().ref().child(filename);
    await ref.put(blob);
    const downloadURL = await ref.getDownloadURL();
    const reelsCollectionRef = firebase.firestore().collection("OTT").doc("shortform").collection("reels");
    const newReelDocRef = reelsCollectionRef.doc();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await newReelDocRef.set({
      comments: 0,
      likes: 0,
      title: imageTitle,
      videoURL: downloadURL,
      id: newReelDocRef.id,
      createdAt: timestamp,
    });
    setUploading(false);
    alert("Photo Uploaded..!!");
    setImage(null);
    navigation.navigate("MainPage");
  };

  return (
    <SafeAreaView style={Styles.container}>

      {imagePicked==false? 
        <TouchableOpacity style={Styles.uploadButton} onPress={pickImage}>
          <Text style={Styles.buttonText}>Pick Image</Text>
        </TouchableOpacity>
     
      : 

        <View style={Styles.container} >
          {uploading==true?
            <View style={Styles.container} >
              <ActivityIndicator size="large" color="blue" /> 
              <Text>Uploading Please Wait...</Text>
            </View>
          :
          <View style={Styles.container} >

            <View style={Styles.imageContainer}>
              {image && <Image source={{ uri: image.uri }} style={{ width: 500, height: 300 }} />}
            </View>

            <TextInput 
              onChangeText={(val) => setImageTitle(val)} 
              placeholder="File Name. Default: NewReels" 
              style={Styles.fileNameInputField}
            ></TextInput>
            <TouchableOpacity style={Styles.uploadButton} onPress={uploadImage}>
              <Text style={Styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>

          </View> 
          }

        </View>
      }

    </SafeAreaView>
  );
};

export default UploadPage;
