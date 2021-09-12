import Dictionary from '../model/dictionaryModel.js'

export const getWordDictionary = (req, res) => {
    Dictionary.find()
        .then((words) => {
            res.json({ words, message: "Dictionary fetched successfully" })
        })
        .catch((err) => {
            res.json({ message: "Error while fetching words" })
        })
}

export const postWordDictionary = (req, res) => {
    const dictionary = new Dictionary(req.body)
    dictionary.save()
        .then((word) => {
            res.json({ word: word, message: "Word added into dictionary successfully" })
        })
        .catch((err) => {
            res.json({ message: "Error while inserting word" })
            console.log(err)
        })
}