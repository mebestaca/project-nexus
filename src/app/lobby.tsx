import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect } from "react";
import { subscribeToGame } from "@/services/gameService";


export default function LobbyScreen() {

  const { gameId } =
    useLocalSearchParams<{
      gameId:string
    }>();


  useEffect(()=>{

    if(!gameId) return;


    const unsubscribe =
      subscribeToGame(
        gameId,
        (game) => {


          if (!game) return;


          if (game.playerO) {

            router.replace({
              pathname: "/tictactoe",
              params:{
                gameId,
              },
            });

          }


        }
      );


    return unsubscribe;


  }, [gameId]);



  return (

    <View>

      <Text>
        Waiting for another player...
      </Text>


      <Text>
        Game ID: {gameId}
      </Text>

    </View>

  );

}