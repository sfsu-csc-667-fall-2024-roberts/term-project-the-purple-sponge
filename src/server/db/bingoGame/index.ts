import db from "../connection";
import {
    CREATE_CARD,
    DELETE_CARD,
    SELECT_CARD,
    UPDATE_MARKED,
    CARD_EXISTS
} from "./sql";

// Datatype for card

type bingoCard = {
    id: number,
    session_id: number, 
    user_id: number, 
    card_data: number[][], 
    card_marker_locations: boolean[][], 
    is_bingo: boolean
}

// Helper method for creating new bingo cards
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}

function makeNewCard() {
    var newCard:number[][] = [[-1,-1,-1,-1,-1],
                              [-1,-1,-1,-1,-1],
                              [-1,-1,0,-1,-1],
                              [-1,-1,-1,-1,-1],
                              [-1,-1,-1,-1,-1]];

    var i:number;
    var j:number;
    var added:number[] = [-1,-1,-1,-1,-1];

    for (i = 0; i < 5; i++) {
      // Ignore FREE space
      if (i == 2) {
        added[2] = 0;
      }

      for (j = 0; j < 5; j++) {
        // Keep generating number if there is duplicate
        while(added.includes(newCard[j][i])) {
          newCard[j][i] = (i * 15) + getRandomInt(15) + 1;
        }
      }

      // Reset checker
      added = [-1,-1,-1,-1,-1];
    }

    return newCard;
}


// Creation of a new bingo card
const createCard = async (
    session_id: number, 
    user_id: number 
): Promise<bingoCard> => {
    console.log("Creating new Bingo Card for " + user_id + " in Session " + session_id);

    const newCard:number[][] = makeNewCard();
    const newMarked:boolean[][] = [[false,false,false,false,false],
                                   [false,false,false,false,false],
                                   [false,false,true,false,false],
                                   [false,false,false,false,false],
                                   [false,false,false,false,false]]

    return await db.one(CREATE_CARD, [
      session_id, 
      user_id,
      newCard,
      newMarked
    ]);
};

// Get a bingo card
const findCard = async (
    session_id: number, 
    user_id: number 
): Promise<bingoCard> => {
    console.log("Getting Bingo Card of " + user_id + " in Session " + session_id);
    return await db.one(SELECT_CARD, [session_id, user_id]);
};

// Delete and existing bingo card
const deleteCard = async (
    session_id: number, 
    user_id: number 
): Promise<bingoCard> => {
    console.log("Deleting Bingo Card of " + user_id + " in Session " + session_id);
    return await db.one(DELETE_CARD, [session_id, user_id]);
};


// Changes marked bingoCard
const changeMarked = async (
    newMarked:boolean[][],
    session_id: number, 
    user_id: number 
): Promise<bingoCard> => {
    console.log("Changing Bingo Card of " + user_id + " in Session " + session_id);
    return await db.one(UPDATE_MARKED, [newMarked, session_id, user_id]);
};

const cardExists = async (
    session_id: number, 
    user_id: number 
): Promise<boolean> => {
    console.log("Findimg Bingo Card of " + user_id + " in Session " + session_id);
    return await db.one(CARD_EXISTS, [session_id, user_id]);
};


export default {createCard, findCard, deleteCard, changeMarked, cardExists};