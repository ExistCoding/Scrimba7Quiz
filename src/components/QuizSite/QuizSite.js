import {nanoid} from "nanoid";

import Question from "../Question/Question.js";

export default function QuizSite({questions, handleAnswerButton}) {
    let questionElements = [];
    if (questions) {
        questionElements = questions.map((question) => (
            <Question key={nanoid()} questionObject={question} handleAnswerButton={handleAnswerButton}/>
        ))
        console.log(questionElements);
    }

    return (
        <div className="QuizSite__container">
            {questionElements}
            <button className="QuizSite__answerButton">Check Answers</button>
        </div>
    )
}