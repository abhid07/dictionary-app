import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from '../navBar/NavBar'
import './homeDictionary.css'
import { useSelector } from 'react-redux'
import DictionaryCard from '../../components/DictionaryCard/DictionaryCard'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ModalComponent from '../../components/ModalComponent/ModalComponent'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export default function HomeDictionary() {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const search = useSelector(state => state.navBar.search)
    const [newWord, setNewWord] = useState("")
    const [dictWord, setDictWord] = useState({})
    const [allWords, setAllWords] = useState([])
    const [clickedWord, setClickedWord] = useState({})
    const handleOpen = () => {
        setIsModalOpen(true);
    };
    const [loader, setLoader] = useState(false)



    const onCancel = () => {
        setIsModalOpen(false)
    }
    const onSave = () => {
        setLoader(true)
        axios.get(`entries/en-gb/${newWord}`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "app_id": "ee6b92bb",
                    "app_key": "bd347c0fcb2aad96e5b79f00ee2efdcf",
                },

            }
        )
            .then(res => {
                console.log(res.data)
                let payload = {
                    results: res.data
                }
                axios.post("https://vocab-dictionary.herokuapp.com/dictionaryRoutes/insertWord", payload)
                    .then(res => {
                        console.log(res, "142")
                        axios.get("https://vocab-dictionary.herokuapp.com/dictionaryRoutes/")
                            .then(res => {
                                setAllWords(res.data.words)
                                setIsModalOpen(false)
                                setLoader(false)
                            })
                    })
            })
    }
    const onInputChange = (e) => {
        setNewWord(e.target.value)
    }

    const openWord = (e, word) => {
        setClickedWord(word)
    }

    const renderWords = () => {
        let abc = allWords.filter(word => {
            return word.results.id.includes(search.toLowerCase())
        }).map(item => {

            return (
                <>
                    {
                        item.results.results.map(word => {
                            return (
                                <>
                                    <DictionaryCard word={word} openWord={(e) => openWord(e, word)} />
                                </>
                            )
                        })
                    }
                </>
            )




        })
        return abc
    }

    const closeSingleWord = () => {
        setClickedWord({})
    }
    const renderSingleWord = () => {
        return (
            <>
                <div className="box">
                    <div className="navbar single-word-navbar">
                        <span onClick={closeSingleWord}><CloseOutlinedIcon fontSize="large" style={{ color: "black !important", cursor: "pointer" }} /></span>
                    </div>
                    <div className="home-container singlw-word-home-container">
                        <h1>{clickedWord["word"]}</h1>
                        {
                            clickedWord["lexicalEntries"].map((item, index) => {
                                return (
                                    <>

                                        <div style={{ marginTop: "10px" }}>
                                            <span style={{ marginBottom: "10px" }}>{item["lexicalCategory"]["text"]}</span>
                                            <br />

                                            {index === 0 && <span>Origin: {item["entries"][0]["etymologies"] ? item["entries"][0]["etymologies"][0] : ""}</span>}
                                            {console.log(clickedWord)}

                                            {
                                                item["entries"][0]["senses"] &&

                                                (item["entries"][0]["senses"]).map(word => (

                                                    <>
                                                        <h4 style={{ marginBottom: "10px", marginTop: "10px" }}>{word["definitions"][0]}</h4>
                                                        <div>
                                                            <ul>
                                                                {
                                                                    word["examples"] &&
                                                                    word["examples"].map(ex => {
                                                                        return (
                                                                            <>
                                                                                <li>{ex["text"]}</li>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </>
                                                )


                                                )
                                            }
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }


    useEffect(() => {
        axios.get("https://vocab-dictionary.herokuapp.com/dictionaryRoutes/")
            .then(res => {
                setAllWords(res.data.words)
            })
    }, [])

    return (

        <div class="box">
            {
                Object.keys(clickedWord).length === 0 ?
                    <>
                        <div class="header">
                            <NavBar />
                        </div>

                        <div className="home-container">
                            <div className="home-header">
                                <h2>Word List</h2>
                            </div>
                            <div className="border"></div>
                            <div className="body-container">
                                {
                                    // json.map(word=>(
                                    //     <DictionaryCard title={word.title} sub={word.sub}/>
                                    // ))
                                    // json.filter(word => {
                                    //     return word.title.includes(search)
                                    // }).map(word => (
                                    //     <DictionaryCard title={word.title} sub={word.sub} desc={word.desc} />
                                    // ))

                                    renderWords()

                                }



                            </div>
                            <Fab color="primary" aria-label="add" onClick={handleOpen}>
                                <AddIcon />
                            </Fab>

                            <ModalComponent isModalOpen={isModalOpen} onSave={onSave} onCancel={onCancel} title={"Add To Dictionary"}
                                onInputChange={onInputChange} loader={loader} />

                        </div>

                    </>
                    :
                    <>
                        {renderSingleWord()}
                    </>
            }
            {
                console.log(clickedWord)
            }
        </div>

    )
}
