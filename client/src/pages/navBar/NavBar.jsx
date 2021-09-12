import React, { useState, useEffect } from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import './navbar.css'
import { useDispatch } from 'react-redux'
import { getUserSearch } from '../../actions/navBarActions/navBarAction'
import axios from 'axios';
export default function NavBar() {

    const [showInput, setShowInput] = useState(false)

    // const [dictWord,setDictWord] = useState({})
    const dispatch = useDispatch()
    const openSearch = () => {
        setShowInput(!showInput)
    }
    const getUserInput = (e) => {

        if (e.target.value !== undefined) {
            console.log(e.target.value)
            dispatch(getUserSearch(e.target.value))
        }

    }
    useEffect(() => {
        if (!showInput) {
            dispatch(getUserSearch(""))
        }
    }, [showInput])
    // useEffect(() => {
    //     if (userInput !== "" && !showInput) {
    //         axios.get(`entries/en-gb/${userInput}`,
    //             {
    //                 headers: {
    //                     "Access-Control-Allow-Origin": "*",
    //                     "app_id": "ee6b92bb",
    //                     "app_key": "bd347c0fcb2aad96e5b79f00ee2efdcf",
    //                 },

    //             }
    //         )
    //             .then(res => {
    //                 console.log(res.data)
    //                 setDictWord(res.data)
    //             })

    //         //res.data.lexicalEntries.entries.senses.definations //defination
    //         //res.data.lexicalEntries.lexicalCategory.text //adjective

    //     }
    // }, [showInput,userInput])

    // useEffect(() => {
    //     if (Object.keys(dictWord).length > 0) {
    //         let payload = {
    //             results: JSON.stringify(dictWord)
    //         }
    //         axios.post("http://localhost:5000/dictionaryRoutes/insertWord", payload)
    //             .then(res => {
    //                 console.log(res.data)
    //             })
    //             .catch(err => {
    //                 console.log(err)
    //             })
    //             .finally()
    //     }

    // }, [dictWord])
    return (
        <div className="navbar">
            <span className="left-container">
                {
                    !showInput ?
                        <span class="title">Vocab</span>
                        :
                        <input type="text" id="search" placeholder="Search" autoFocus={true} onChange={(e) => getUserInput(e)} />
                }


            </span>
            <span className="nav-icon" onClick={(e) => openSearch(e)}>{!showInput ? <SearchOutlinedIcon fontSize="large" /> : <CloseOutlinedIcon fontSize="large" />}</span>
        </div>
    )
}
