import {nanoid} from "nanoid";

export default function Question({questionObject, handleAnswerButton}) {
    const answerElements = questionObject.shuffledAnswers.map((answerObject) => 
        <button 
            key={nanoid()} 
            className={answerObject.isSelected?
                "Question__answer Question__answer--selected":
                "Question__answer Question__answer--unselected"} onClick={() => handleAnswerButton(questionObject.index, answerObject.index)}>{answerObject.answer}</button>
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