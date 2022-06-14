import express from "express";

const router = express.Router();
let players = [
  { name: "Jhon", cards: [] },
  { name: "Doe", cards: [] },
  { name: "Justin", cards: [] },
  { name: "Chris", cards: [] },
  { name: "Adi", cards: [] },
  { name: "Alex", cards: [] },
  { name: "Ronaldo", cards: [] },
  { name: "Rohan", cards: [] },
];

router.get("/distributeCards", async (req, res) => {
  res.send({ code: 200, players, currentPlayer: players[0] });
});

router.post("/scanCardData", async (req, res) => {
  let { cardData } = req.body;
  if (cardData.length === 0) {
    return res.send({
      code: 200,
      players,
      currentPlayer: players.find((el) => el.cards.length < 2),
    });
  }
  let player = players.find((el) => el.cards.length < 2);
  let index = players.findIndex((el) => el.name < 2);
  player.cards.push(cardData);
  players[index] = player;
  if (player.cards.length >= 2) {
    console.log("next player", players[index]);
    if (index + 1 <= players.length) {
      res.send({ code: 200, players, currentPlayer: players[index + 1] });
    } else {
      res.send({ code: 200, msg: "scan complete", players });
    }
  } else {
    res.send({ code: 200, players, currentPlayer: player });
  }
});

router.get("/reset", async (req, res) => {
  let p = [];
  players.forEach((plaayer) => {
    p.push({ ...plaayer, cards: [] });
  });

  players = [...p];

  res.send({ code: 200, players });
});

export default router;
