import * as Tone from "tone";

//Start tone.js audio context

const startAudio = document.getElementById("start-audio");
startAudio.addEventListener("click", () => {
  Tone.start();
  console.log("audio start");
});

//Creates FM synth
const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
const now = Tone.now();

//Triggers a note immediately
function playNote(note, length) {
  synth.triggerAttackRelease(note, length);
}

export default playNote;
