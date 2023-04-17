import {nanoid} from "nanoid";
import {useState} from "react";

import Question from "../Question/Question.js";

export default function QuizSite({questions, handleAnswerButton}) {
    const [showSolution, setShowSolution] = useState(false);
    //prevent change of answers after showing solutions?

    function checkAnswers() {
        setShowSolution(true);
    }

    let questionElements = [];
    if (questions) {
        questionElements = questions.map((question) => (
            <Question key={nanoid()} questionObject={question} handleAnswerButton={handleAnswerButton}/>
        ))
    }

    return (
        <div className="QuizSite__container">
            {questionElements}
            {!showSolution && <button onClick={checkAnswers} className="QuizSite__answerButton">Check Answers</button>}
            {showSolution && 
                <div className="QuizSite__solutionContainer">
                    <p className="QuizSite__rightSolutions">SolutionPlaceholder</p>
                    <button className="QuizSite__playAgainButton">Play again</button>
                </div>
            }
        </div>
    )
}