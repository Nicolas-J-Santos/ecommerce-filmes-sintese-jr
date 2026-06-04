const express = require('express')
const Filme = require('../models/modelsFilme')
const router = new express.Router()

router.get('/', async (req, res) => {
    try {
        
        const blocos = {}

        blocos['simonfavorites'] = await Filme.findById('686dab6767cab6606e7dc506')
        blocos['bestsellers'] = await Filme.find().sort({ revenue: -1 }).limit(6)
        blocos['action'] = await Filme.find({ genres: { $regex: 'action', $options: 'i'} }).sort({ revenue: -1 }).limit(6)
        
        blocos['brazilian'] = await Filme.findById('686dab6767cab6606e7dd069')
        blocos['horror'] = await Filme.find({ genres: { $regex: 'horror', $options: 'i'} }).sort({ revenue: -1 }).limit(6)
        blocos['romance'] = await Filme.find({ genres: { $regex: 'romance', $options: 'i'} }).sort({ revenue: -1 }).limit(6)

        blocos['anime'] = await Filme.findById('686dab6767cab6606e7dc562')
        blocos['fantasy'] = await Filme.find({ genres: { $regex: 'fantasy', $options: 'i'} }).sort({ revenue: -1 }).limit(6)

        // for (const genre of genres) {
        //     const filmes = await Filme.find({ genres: { $regex: genre, $options: 'i'} }).sort({ revenue: -1 }).limit(18)

        //     filmesPorGenero[genre] = filmes
        // }

        res.status(200).json(blocos)
    } catch (e) {
        res.status(500).json({message: 'Erro ao encontrar filmes', e })
    }
})

module.exports = router