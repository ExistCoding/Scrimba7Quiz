export default function IntroSite(props) {
    return (
        <div className="IntroSite__container">
            <h1 className="IntroSite__header">Quizzical</h1>
            <p className="IntroSite__description">How many answers can you guess?</p>
            <button onClick={props.handleStartButton} className="IntroSite__startButton">Start Quiz</button>
        </div>
    )
}