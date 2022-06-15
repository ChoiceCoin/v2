import React from "react"
import './menuBar.scss';

const DeskMenuBar = () => {
    return(
    <div className="desk__menubar">
        <div className="desk__menuitem">
            <ul>
                <li className="desk" >
                    <a href="https://github.com/ChoiceCoin"> 
                    <span> <i class="uil uil-github"></i> </span> 
                      Github 
                     <span> <i class="uil uil-arrow-up-right"></i></span>
                    </a> 
                </li>
                <li className="desk">
                    <a href="https://twitter.com/choicecoindao?s=21&t=zofeQLzKOLgyhuzQTk6dcA">
                    <span><i class="uil uil-twitter"></i> </span> 
                    Twitter 
                    <span><i class="uil uil-arrow-up-right"></i></span> 
                  </a>
                </li>
    
            </ul>
        </div>

    </div>
    )
}

export default DeskMenuBar

