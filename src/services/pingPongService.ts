import {
    addDoc,
    collection,
    doc,
    updateDoc,
    onSnapshot,
  } from "firebase/firestore";
  
  import { db } from "@/firebase/config";
  
  export async function createPingPongGame(
    playerId:string
  ){
    const game = await addDoc(
      collection(db,"pingpongGames"),
      {
        player1: playerId,
        player2:null,
        status:"waiting",
        scorePlayer1:0,
        scorePlayer2:0,
        winner:"",
      }
    );

    return game.id;
  
  }
  
  export async function joinPingPongGame(
    gameId:string,
    playerId:string
  ){
  
    const gameRef =
      doc(
        db,
        "pingpongGames",
        gameId
      );
  
    await updateDoc(
      gameRef,
      {
  
        player2:playerId,
        status:"playing",
  
      }
    );
  
  }
  
  export function listenPingPongGame(
    gameId:string,
    callback:any
  ){
  
    const gameRef =
      doc(
        db,
        "pingpongGames",
        gameId
      );
  
    return onSnapshot(
      gameRef,
      (snapshot)=>{
  
        callback(
          snapshot.data()
        );
  
      }
    );
  
  }
  
  export async function savePingPongResult(
    gameId:string,
    data:any
  ){
  
    const gameRef =
      doc(
        db,
        "pingpongGames",
        gameId
      );
  
    await updateDoc(
      gameRef,
      data
    );
  
  }