import React, {useState, useEffect} from "react"
import ReactDOM from "react-dom/client";

import blobLemony from "./ressources/blobLemony.png";
import blobBaby from "./ressources/blobBaby.png";

import IntroSite from "./components/IntroSite/IntroSite.js";
import QuizSite from "./components/QuizSite/QuizSite.js";

function App() {
    const [questions, setQuestions] = useState(null);
    const [currSite, setCurrSite] = useState("Intro");
    const [reset, setReset] = useState(0);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5")
            .then(res => res.json(res))
            .then(res => restructureData(res.results))
            .then(res => setQuestions(res));
    }, [reset])

    function restructureData(rawData) {

        function restructureQuestion(rawQuestion) {
            const indexCorrectAnswer = Math.floor(Math.random() * (rawQuestion.incorrect_answers.length + 1));
            let answerArray = rawQuestion.incorrect_answers.map(answer => 
                ({
                    text: decodeHtml(answer),
                    isSelected: false,
                    isTrue: false
                })
            );
            answerArray.splice(indexCorrectAnswer, 0, 
                {
                    text: decodeHtml(rawQuestion.correct_answer),
                    isSelected: false,
                    isTrue: true
                }
            );
            return {
                category: rawQuestion.category,
                difficulty: rawQuestion.difficulty,
                text: decodeHtml(rawQuestion.question),
                answers: answerArray
            };
        }

        function decodeHtml(html) {
            var txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }

        return rawData.map(rawQuestion => restructureQuestion(rawQuestion));
    }

    function handleStartButton() {
        setCurrSite("Quiz")
    }

    function handleAnswerButton(questionIndex, answerIndex) {
        setQuestions(prevQuestions => {
            let newQuestions = [...prevQuestions];
            for (let i = 0; i < prevQuestions[questionIndex].answers.length; i++) {
                if (i === answerIndex) {
                    newQuestions[questionIndex].answers[answerIndex].isSelected = 
                        !prevQuestions[questionIndex].answers[answerIndex].isSelected;
                }
                else {
                    newQuestions[questionIndex].answers[i].isSelected = false;
                }
            }
            
            return newQuestions;
        })
    }

    return (
        <div className="App__container">
            <img className="App__blob App__blob--lemony" src={blobLemony}/>
            <img className="App__blob App__blob--baby" src={blobBaby}/>
            {currSite === "Intro" && <IntroSite questions={questions} handleStartButton={handleStartButton}/>}
            {currSite === "Quiz" && <QuizSite questions={questions} handleAnswerButton={handleAnswerButton} setReset={setReset}/>}
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("reactRoot"));
root.render(<App />);