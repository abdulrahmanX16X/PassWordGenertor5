const express = require("express");
const cors = require("cors");

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

    let pass = [
        ...randomChoices(Letters, numLetters),
        ...randomChoices(Numbers, numNumbers),
        ...randomChoices(Symbols, numSymbols)
    ];

    pass.sort(() => Math.random() - 0.5);
    pass = pass.join("");

    res.status(200).json({
        succeed: true,
        Password: pass
    });
});
const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});