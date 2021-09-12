import express from 'express'
import {getWordDictionary,postWordDictionary} from '../controller/dictionary.js'
const router = express.Router();

//get all words
router.get('/', getWordDictionary)

//add word into dictionary
router.post('/insertWord',postWordDictionary)

export default router;