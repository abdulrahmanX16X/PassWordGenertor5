const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(cors());

const Letters = [
    ..."abcdefghijklmnopqrstuvwxyz",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
];

const Numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Symbols = [
    "!", "@", "#", "$", "%", "^", "&", "*",
    "(", ")", "-", "_", "+", "=", "[", "]",
    "{", "}", "|", ";", ":", "'", "\"",
    ",", ".", "<", ">", "?", "/", "~", "`"
];

function randomChoices(arr, k) {
    const result = [];
    for (let i = 0; i < k; i++) {
        result.push(arr[Math.floor(Math.random() * arr.length)]);
    }
    return result;
}

app.post("/Gen", (req, res) => {

    const numLetters = Number(req.body.Num_letters) || 0;
    const numNumbers = Number(req.body.Num_numbers) || 0;
    const numSymbols = Number(req.body.Num_symbols) || 0;

    let total = numLetters + numNumbers + numSymbols;

    if (total > 30) {
        const ratio = 30 / total;
        numLetters = Math.round(numLetters * ratio);
        numNumbers = Math.round(numNumbers * ratio);
        numSymbols = Math.round(numSymbols * ratio);
        total = numLetters + numNumbers + numSymbols; // للتأكد
    }

    let pass = [
        ...randomChoices(Letters, numLetters),
        ...randomChoices(Numbers, numNumbers),
        ...randomChoices(Symbols, numSymbols)
    ];

    pass.sort(() => Math.random() - 0.5);
    pass = pass.join("");

    res.status(200).json({
        succeed: true,
        password: pass
    });
});

const GeneratePass = async () => {
  try {
    const Res = await axios.post(
      "https://passwordgenertor5.onrender.com/Gen",
      {
        Num_letters: 3,
        Num_numbers: 3,
        Num_symbols: 3,
      }
    );

    console.log("Password:", Res.data);
  } catch (error) {
    console.error("Error generating password:", error);
  }
};

setInterval(() => {
  GeneratePass();
}, 60000);
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

});


