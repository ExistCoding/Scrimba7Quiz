import { nanoid } from "nanoid";
import { useState } from "react";
import PropTypes from "prop-types";

import Question from "../Question/Question.js";

export default function QuizSite({ questions, handleAnswerButton, setReset }) {
    const [showSolution, setShowSolution] = useState(false);

    function checkAnswers() {
        setShowSolution(true);
    }

    function handlePlayAgainButton() {
        setReset((prevReset) => prevReset + 1);
        setShowSolution(false);
    }

    function getNumRightAnswers() {
        let numRightAnswers = 0;
        for (let i = 0; i < questions.length; i++) {
            numRightAnswers += questions[i].answers.filter(
                (answer) => answer.isSelected && answer.isTrue
            ).length;
        }
        return numRightAnswers;
    }

    let questionElements = [];
    if (questions) {
        questionElements = questions.map((question, index) => (
            <Question
                key={nanoid()}
                question={question}
                questionIndex={index}
                showSolution={showSolution}
                handleAnswerButton={
                    showSolution ? () => {} : handleAnswerButton
                }
            />
        ));
    }

    return (
        <div className="QuizSite__container">
            {questionElements}
            {!showSolution && (
                <button
                    onClick={checkAnswers}
                    className="QuizSite__answerButton"
                >
                    Check Answers
                </button>
            )}
            {showSolution && (
                <div className="QuizSite__solutionContainer">
                    <span className="QuizSite__rightSolutions">
                        You scored {getNumRightAnswers()}/5 correct answers
                    </span>
                    <button
                        className="QuizSite__playAgainButton"
                        onClick={handlePlayAgainButton}
                    >
                        Play again
                    </button>
                </div>
            )}
        </div>
    );
}

QuizSite.propTypes = {
    questions: PropTypes.array.isRequired,
    handleAnswerButton: PropTypes.func.isRequired,
    setReset: PropTypes.func.isRequired,
};
