import React from 'react';
import EachASA from './SuccessfulASA';


const ASAList = ({asalist}) => {
    return (
        <div>
            {
                // console.log(asalist.map(asa => {
                //     console.log(asa.name)
                // }))
                asalist.map((asa, i) => {
                    return(
                        <EachASA key={i}
                            name ={asa.name}
                            issue={asa.issue}
                            option1={asa.option1}
                            option2={asa.option2}
                            date={asa.date} />
                    )
                })
            }
        </div>
    )
}

export default ASAList;