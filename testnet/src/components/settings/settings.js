import React from "react";
import { useDispatch } from "react-redux";
import { useWindowSize } from "@react-hook/window-size";
import { useEffect } from "react";
import './settings.scss';


const Settings = ({darkTheme}) => {

    
  const dispatch = useDispatch();
  const [width] = useWindowSize();
  const storedTheme = localStorage.getItem('mode') || (window.matchMedia("(prefers-color-scheme: dark)")
  .matches ? "dark" : "light")

  useEffect(() => {
    if(storedTheme) {
      console.log(storedTheme)
      localStorage.setItem("mode", storedTheme);
      dispatch({ type: `${storedTheme}_mode` });
     if(storedTheme === "dark" && width >= 1000) {
      document.getElementById('checkbox').checked = true
     }
    }
  }, [storedTheme, dispatch, width])




  const setMode = () => {
    if (!darkTheme) {
      localStorage.setItem("mode", "dark");
      dispatch({ type: "dark_mode" });
    } else {
      localStorage.setItem("mode", "light");
      dispatch({ type: "light_mode" });
    }
  };

    return(
        <div className="settings__item" > 
          <div className="settings__content">
              <div className="mode-switcher" 
                 style={{
                     position: "relative",
                     padding: "10px",
                     display: "flex",
                     flexDirection:"column"
                 }}
               >
                    <div className="theme-switch-wrapper" >
                        <p style={{
                            padding : "10px",
                            fontWeight: "bold",
                            textTransform: "capitalize"
                        }}> {darkTheme ? "Light Mode" : "Dark Mode"}</p>
                    <label className="theme-switch  ">
                       
                        <input id="checkbox" type="checkbox" onChange={setMode} />
                        <i id="toggle-icon" className={`uil ${darkTheme ? "uil-brightness-low" : "uil-moon" } slider round`}></i>
                    {/* <img src={dark}  style={{width: "20px"}}  alt="" className=" fa-sun slider round"/> */}
                    
                    </label>
                </div>
              </div>
              <div className="wallet_disconnect">
               jsjsjss    
              </div>
          </div>
        </div>

    );
}

export default Settings;

