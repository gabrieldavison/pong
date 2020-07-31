class Sequencer {
  constructor(sequence, startNote = 0, playNote, noteLength) {
    this.sequence = sequence;
    this.noteLength = noteLength;
    this.playNote = playNote;
    this.stepCounter = startNote;
  }

  playNext() {
    this.playNote(this.sequence[this.stepCounter], this.noteLength);
    if (this.stepCounter === this.sequence.length - 1) {
      this.stepCounter = 0;
    } else {
      this.stepCounter += 1;
    }
  }
}
export default Sequencer;
