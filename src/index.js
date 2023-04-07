import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom/client";

import blobLemony from "./ressources/blobLemony.png";
import blobBaby from "./ressources/blobBaby.png";

import IntroSite from "./components/IntroSite/IntroSite.js";
import QuizSite from "./components/QuizSite/QuizSite.js";

function App() {
    const [currSite, setCurrSite] = useState(<IntroSite handleStartButton={handleStartButton}/>);

    function handleStartButton() {
        setCurrSite(<QuizSite />)
    }

    return (
        <div className="App__container">
            <img className="App__blob App__blob--lemony" src={blobLemony}/>
            <img className="App__blob App__blob--baby" src={blobBaby}/>
            {currSite}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<App />);