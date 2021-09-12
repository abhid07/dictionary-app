import React from 'react'

export default function DictionaryCard({word,openWord}) {

    return (
        <>
            <div className="home-body" onClick={openWord}>
                <h3 style={{marginBottom:"10px"}}>
                    {word["word"]}
                    {console.log(word)}
                </h3>
                {
                    word["lexicalEntries"].map(item => {
                        return (
                            <>
                                <p style={{marginBottom:"10px"}}>
                                    ({item["lexicalCategory"]["text"]})
                                    <span> {item["entries"][0]["senses"][0]["definitions"][0]} </span>
                                    {
                                        console.log(item["entries"][0]["senses"][0]["definitions"][0])
                                    }
                                </p>
                            </>
                        )
                    })
                }
                <div className="border"></div>
            </div>
            
        </>
    )
}
