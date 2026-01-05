const express = require('express');
const morgan = require('morgan');

const app = express();

// FUNC
const isDigit = new RegExp(/^\d*$/);
const random = (num) => Math.floor(Math.random() * num);

// SOLUTIONS
// 1. Be Polite, Greet the User
// Task: Create a route that responds to URLs like /greetings/<username-parameter>.
app.get('/greetings/:username', (req, res) => {
    res.send(`Hi ${req.params.username}! How are you doing?`);
});
// TEST RESULT: ✅


// 2. Rolling the Dice
// Task: Set up a route to handle URLs following the pattern /roll/<number-parameter>.
app.get('/roll/:number', (req, res) => {
    if (isDigit.test(req.params.number)) {
        res.send(`<p>You rolled a ${random(req.params.number)}!</p>`)
    } else {
        res.send(`<p>You must specify a number.</p>`);
    };
});
// TEST RESULT: ✅


// 3. I Want THAT One!
// Task: Create a route for URLs like /collectibles/<index-parameter>.
app.get('/collectibles/:idx', (req, res) => {
    const index = req.params.index;
    const collectibles = [
        { name: 'shiny ball', price: 5.95 },
        { name: 'autographed picture of a dog', price: 10 },
        { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
    ];
    // TEST RESULT: ✅

    if (isDigit.test(req.params.idx) && Number(req.params.idx) < collectibles.length) {
        res.send(`<p>Excellent choice! The ${collectibles[req.params.idx].name} can be yours for the low price of $${collectibles[req.params.idx].price}!</p>`);
    } else { res.send(`<p>This item is not yet in stock. Check back soon!</p>`) }
});


// 4. Filter Shoes by Query Parameters
app.get('/shoes', (req, res) => {
    const shoes = [
        { name: "Birkenstocks", price: 50, type: "sandal" },
        { name: "Air Jordans", price: 500, type: "sneaker" },
        { name: "Air Mahomeses", price: 501, type: "sneaker" },
        { name: "Utility Boots", price: 20, type: "boot" },
        { name: "Velcro Sandals", price: 15, type: "sandal" },
        { name: "Jet Boots", price: 1000, type: "boot" },
        { name: "Fifty-Inch Heels", price: 175, type: "heel" }
    ];

    res.send(JSON.stringify(shoes.filter(shoe =>
        shoe.price >= req.query['min-price']
        && shoe.price <= req.query['max-price'])
    ), null, 4);
});
// TEST RESULT: ✅

app.listen(3000, () => { console.log("Listening on pirt 3000. access @ [http://localhost]") });