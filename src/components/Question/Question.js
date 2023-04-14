import {nanoid} from "nanoid";

export default function Question({questionObject, handleAnswerButton}) {
    const answerElements = questionObject.shuffledAnswers.map((answerObject) => 
        <button key={nanoid()} className="Question__answer" onClick={() => handleAnswerButton(questionObject.index, answerObject.index)}>{answerObject.answer}</button>
    )

    return (
        <div className="Question__container">
            <h1 className="Question__text">{questionObject.questionString}</h1>
            <div className="Question__answerContainer">
                {answerElements}
            </div>
        </div>
    )
}