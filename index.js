require('dotenv').config();

const express = require('express');

const fetch = require('node-fetch');
const urlApi = process.env.URL;

const cors = require('cors')
const app = express();

const {generatedInitValue} = require('./rickAndMorty/variables');
var charactersAvailable = generatedInitValue();

app.use(cors());

app.get('/rymrandom', (req, res) => {
    let ramdon = 0;
    let charId = 0;
    const chars = charactersAvailable.filter(item => item.lastPetition == '' || (new Date() - new Date(item.lastPetition) >= 600000));
    if (chars.length > 0) {
        ramdon = Math.floor((Math.random() * (chars.length)) + 1);
        charId = chars[ramdon-1].id;

        fetch(`${urlApi}/${charId}`)
        .then(data => data.json())
        .then(response => {
            res.json({
                success: true,
                char: {
                    id: charId,
                    name: response.name,
                    image: response.image,
                    status: response.status,
                    specie: response.species,
                    gender: response.gender,
                    location: response.location.name
                }
            });
        }).catch(error => {
            res.json({
                success: false,
                error: ''
            });
        });

        console.log('Esto es una prueba');

        
        charactersAvailable.forEach(charAvailable => {
            if (charAvailable.id == charId) charAvailable.lastPetition = new Date();
        });
    } else {
        res.json({
            success: false,
            error: 'Por favor espere un momento'
        });
    }
});

app.listen(process.env.PORT, () => {});