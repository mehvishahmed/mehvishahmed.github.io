const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");

let synth = speechSynthesis,
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        //selecting "Google US English" voice as default
        let selected = voice.name === "Google US English" ? "selected" : "";
        //creating option tag with passing voice name and voice language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.name})</option>`;
        //inserting option tag beforeend of select tag
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utternance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        //if the available device voice name is equal to the user seleceted voice 
        //name then set the speech note to the user selected voice
        if(voice.name === voiceList.value){
            utternance.voice = voice;
        }
    }
    synth.speak(utternance); //speak speech/utternance
}

speechBtn.addEventListener("click", e => {
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){ //if utternance/speech is not currently in process of speaking
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            //if speaking is true then it changes it's value to false and resume the utternance/speech
            //else change it's value to true and pause the speech
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
            //checking if the utternance/speech in speaking process or not in every 100 ms
            //if not then set the value of isSpeaking to true and change the button text
            setInterval(() => {
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }
            });
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});