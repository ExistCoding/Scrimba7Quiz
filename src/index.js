import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom/client";

import blobLemony from "./ressources/blobLemony.png";
import blobBaby from "./ressources/blobBaby.png";

import IntroSite from "./components/IntroSite/IntroSite.js";
import QuizSite from "./components/QuizSite/QuizSite.js";

//refactor api response into simpler state that takes only necessary parameters

function App() {
    const [questions, setQuestions] = useState(null);
    const [currSite, setCurrSite] = useState("Intro");

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json(res))
            .then(res => res.results.map((question) => shuffleAnswers(question)))
            .then(res => res.map((question, index) => ({...question, index, questionString: decodeHtml(question.question)})))
            .then(res => setQuestions(res));
    }, [])

    function handleStartButton() {
        setCurrSite("Quiz")
    }

    //Returns array of objects in random sequence, containing answer text and isSelected status initialized
    //  as false
    function shuffleAnswers(question) {
        const allAnswers = [...question.incorrect_answers, question.correct_answer]
        let shuffledAnswers = [...allAnswers];
        for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffledAnswers[i];
            shuffledAnswers[i] = shuffledAnswers[j]
            shuffledAnswers[j] = temp;
        }
        shuffledAnswers = shuffledAnswers.map((answer, index) => ({answer, index, isSelected: false}))
        return {...question, shuffledAnswers: shuffledAnswers};
    }

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    function handleAnswerButton(questionIndex, answerIndex) {
        setQuestions(prevQuestions => {
            let newQuestions = [...prevQuestions];
            newQuestions[questionIndex].shuffledAnswers[answerIndex].isSelected = 
                !prevQuestions[questionIndex].shuffledAnswers[answerIndex].isSelected;
            return newQuestions;
        })
    }

    console.log(questions);
    return (
        <div className="App__container">
            <img className="App__blob App__blob--lemony" src={blobLemony}/>
            <img className="App__blob App__blob--baby" src={blobBaby}/>
            {currSite === "Intro" && <IntroSite questions={questions} handleStartButton={handleStartButton}/>}
            {currSite === "Quiz" && <QuizSite questions={questions} handleAnswerButton={handleAnswerButton}/>}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<App />);