import {addDoc, collection, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { RPSChoice, RPSGame, RPSResult } from "@/types/rps";

export async function createRPSGame(
    gameName: string,
    host: {
        uid: string;
        name: string;
    }
) {

    return await addDoc(
        collection(db, "games"),
        {
            gameType: "rps",
            gameName,
            host,
            guest: null,
            status: "waiting",
            round: 1,
            score: {
                player1: 0,
                player2: 0,
            },
            currentRound: {
                player1Choice: null,
                player2Choice: null,
                winner: "",
            },
        }
    );
}

export async function joinRPSGame(
    gameId: string,
    guest: {
        uid: string;
        name: string;
    },
) {
    const gameRef = 
        doc(db, "games", gameId);

    await updateDoc(gameRef, {
        guest,
        status: "playing",
    });
}

export async function submitChoice(
    gameId: string,
    player: "player1" | "player2",
    choice: RPSChoice,
) {
    const gameRef =
        doc(db, "games", gameId);

    const snapshot =
        await getDoc(gameRef);

    const game = 
        snapshot.data() as RPSGame;

    if (!game) return;

    await updateDoc(gameRef, {
        currentRound: {
            ...game.currentRound,

            [player === "player1"
                ? "player1Choice"
                : "player2Choice"]: choice,
        },
    });
}

export async function updateRound(
    gameId: string,
    winner: RPSResult,
    player1Score: number,
    player2Score: number,
) {
    const gameRef =
        doc(db, "games", gameId);

    await updateDoc(gameRef, {

        score: {
            player1: player1Score,
            player2: player2Score,
        },

        "currentRound.winner": winner,
    });
}

export async function nextRound(
    gameId: string,
    round: number,
) {
    const gameRef =
        doc(db, "games", gameId);

    await updateDoc(gameRef, {
        round,
        currentRound: {
            player1Choice: null,
            player2Choice: null,
            winner: "",
        },
    });
}

export async function finishGame(
    gameId: string,
) {
    const gameRef =
        doc(db, "games", gameId);

    await updateDoc(gameRef, {
        status: "finished",
    });
}

export async function leaveGame(gameId: string) {
    const gameRef = doc(db, "games", gameId);

    await updateDoc(gameRef, {
        status: "left",
    });
}

export function subscribeToGame(
    gameId: string,
    callback: (game: RPSGame) => void,
) {
    const gameRef =
        doc(db, "games", gameId);

    return onSnapshot(
        gameRef,
        (snapshot) => {
            const game =
                snapshot.data() as RPSGame;
            
            if (!game) return;

            callback(game);
        }
    );
}