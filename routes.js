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
  const { cardData, currentPlayer } = req.body;
  if (cardData.length === 0) {
    return res.send({ code: 200, players, currentPlayer });
  }

  let player = players.find((el) => el.name === currentPlayer.name);
  let index = players.findIndex((el) => el.name === currentPlayer.name);
  player.cards.push(cardData);
  players[index] = player;
  if (player.cards.length === 2) {
    if (players[index + 1]) {
      res.send({ code: 200, players, currentPlayer: players[index + 1] });
    } else {
      res.send({ code: 200, msg: "scan complete", players });
    }
  } else {
    res.send({ code: 200, players, currentPlayer: player });
  }
});

export default router;
