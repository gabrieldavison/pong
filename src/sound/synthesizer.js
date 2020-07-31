import * as Tone from "tone";

//Start tone.js audio context
document.body.addEventListener("click", () => {
  Tone.start();
  console.log("audio start");
});
//Creates FM synth
const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
const now = Tone.now();

//Triggers a note immediately
function playNote(note, length) {
  console.log("note");
  synth.triggerAttackRelease(note, length);
}

export default playNote;
