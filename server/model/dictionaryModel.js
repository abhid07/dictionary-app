import mongoose from 'mongoose'

const dictionarySchema = mongoose.Schema({
    results: mongoose.SchemaTypes.Mixed
})

const Dictionary = mongoose.model('Dictionary', dictionarySchema)

export default Dictionary