class Sequencer {
  constructor(sequence, startNote, playNote, noteLength, display) {
    this.sequence = sequence;
    this.noteLength = noteLength;
    this.playNote = playNote;
    this.stepCounter = startNote;
    this.display = display;
    this.setInitialStepDisplay();
  }

  playNext() {
    this.playNote(this.sequence[this.stepCounter], this.noteLength);
    if (this.stepCounter === this.sequence.length - 1) {
      this.stepCounter = 0;
    } else {
      this.stepCounter += 1;
    }
    this.display.activateStep(this.stepCounter);
  }

  setInitialStepDisplay() {
    this.display.activateStep(this.stepCounter);
  }
}
export default Sequencer;
