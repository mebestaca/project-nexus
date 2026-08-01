import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

import {
  doc,
  onSnapshot
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { useEffect } from "react";


export default function LobbyScreen() {

  const { gameId } =
    useLocalSearchParams<{
      gameId:string
    }>();


  useEffect(()=>{

    if(!gameId) return;


    const gameRef =
      doc(db,"games",gameId);


    const unsubscribe =
      onSnapshot(gameRef,(snapshot)=>{

        const game =
          snapshot.data();


        if(
          game?.playerO
        ){

          router.replace({
            pathname:"/game",
            params:{
              gameId
            }
          });

        }

      });


    return unsubscribe;


  },[gameId]);



  return(

    <View>

      <Text>
        Waiting for another player...
      </Text>

    </View>

  );

}