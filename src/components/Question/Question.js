import { nanoid } from "nanoid";
import PropTypes from "prop-types";

export default function Question({
    question,
    questionIndex,
    showSolution,
    handleAnswerButton,
}) {
    const answerElements = question.answers.map((answer, index) => {
        let classNameVar = "";
        if (!showSolution) {
            classNameVar = answer.isSelected
                ? "Question__answer Question__answer--selected"
                : "Question__answer Question__answer--unselected";
        } else {
            if (answer.isTrue) {
                classNameVar = "Question__answer Question__answer--true";
            } else if (!answer.isTrue && answer.isSelected) {
                classNameVar =
                    "Question__answer Question__answer--selectedFalse";
            } else {
                classNameVar = "Question__answer Question__answer--unselected";
            }
        }

        return (
            <button
                key={nanoid()}
                className={classNameVar}
                onClick={() => handleAnswerButton(questionIndex, index)}
            >
                {answer.text}
            </button>
        );
    });

    return (
        <div className="Question__container">
            <h1 className="Question__text">{question.text}</h1>
            <div className="Question__answerContainer">{answerElements}</div>
        </div>
    );
}

Question.propTypes = {
    question: PropTypes.object.isRequired,
    questionIndex: PropTypes.number.isRequired,
    showSolution: PropTypes.bool.isRequired,
    handleAnswerButton: PropTypes.func.isRequired,
};
