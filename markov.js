/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }

    this.chains = chains;
  }

  /** choose a random element from an array */

  static choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // start at a random word
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choose(keys);
    let output = [];

    // add more words to output until we reach numWords OR hit a null
    while (output.length < numWords && key !== null) {
      // add the current key to the output array of words
      output.push(key);
      // rebind the key to now be a randomly chosen word from the list of words that come
      // after that word in the sample text
      key = MarkovMachine.choose(this.chains.get(key));
    }

    return output.join(" ");
  }
}

// let mm = new MarkovMachine("the cat in the hat");
// console.log(mm.makeText(numWords=50));

module.exports = {
  MarkovMachine,
};
