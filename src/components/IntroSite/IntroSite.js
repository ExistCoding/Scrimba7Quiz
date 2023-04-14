export default function IntroSite({questions, handleStartButton}) {
    return (
        <div className="IntroSite__container">
            <h1 className="IntroSite__header">Quizzical</h1>
            <p className="IntroSite__description">How many answers can you guess?</p>
            {questions && <button onClick={handleStartButton} className="IntroSite__startButton">Start Quiz</button>}
        </div>
    )
}