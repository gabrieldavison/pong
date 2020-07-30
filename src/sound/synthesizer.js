import * as Tone from "tone";

//Start tone.js audio context
document.body.addEventListener("click", () => {
  Tone.start();
  console.log("audio start");
});
//Creates FM synth
const synth = new Tone.FMSynth().toDestination();
const now = Tone.now();

//Triggers a note immediately
function playNote() {
  console.log("note");
  synth.triggerAttackRelease("C4", "8n", now);
}

export default playNote;
