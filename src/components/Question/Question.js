import {nanoid} from "nanoid";

export default function Question({question, questionIndex, showSolution, handleAnswerButton}) {
    const answerElements = question.answers.map((answer, index) => {
        let classNameVar = "";
        if (!showSolution) {
            answer.isSelected? 
                classNameVar = "Question__answer Question__answer--selected":
                classNameVar = "Question__answer Question__answer--unselected";
        }
        else {
            if (answer.isTrue) {
                classNameVar = "Question__answer Question__answer--true"
            }
            else if (!answer.isTrue && answer.isSelected) {
                classNameVar = "Question__answer Question__answer--selectedFalse"
            }
            else {
                classNameVar = "Question__answer Question__answer--unselected";
            }
        }

        return <button key={nanoid()} className={classNameVar} onClick={() => handleAnswerButton(questionIndex, index)}>{answer.text}</button>
    })

    return (
        <div className="Question__container">
            <h1 className="Question__text">{question.text}</h1>
            <div className="Question__answerContainer">
                {answerElements}
            </div>
        </div>
    )
}