import express from "express";

const router = express.Router();

let players = [];

router.get("/distributeCards", async (req, res) => {
  res.send({ code: 200, players });
});

router.post("scanCardData", async (req, res) => {
  const { cardData } = req.body;
  let player = {
    label: players.length + 1,
    card: cardData,
  };

  players.push(player);

  res.send({ code: 200, msg: "card added", players });
});

export default router;
