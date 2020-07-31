const speech = new SpeechSynthesisUtterance();
global.toSpeech = async ( text ) => {
    speech.text = text;
    window.speechSynthesis.speak( speech );
}