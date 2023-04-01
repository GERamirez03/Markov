const { MarkovMachine } = require('./markov.js')

describe('MarkovMachine class', function() {

    test('constructor should create instances of expected classes', function() {
        let mm = new MarkovMachine("this is a test sentence for the Markov Machine class");
        
        expect(mm).toBeInstanceOf(MarkovMachine);
        expect(mm.words).toBeInstanceOf(Array);
        expect(mm.chains).toBeInstanceOf(Map);
    });

    test('makeChains constructs chains correctly', function() {
        let mm = new MarkovMachine("aa bb cc aa BB aa BB");

        expect(mm.chains).toEqual(new Map([
            ["aa", ["bb", "BB", "BB"]],
            ["bb", ["cc"]],
            ["cc", ["aa"]],
            ["BB", ["aa", null]]
        ]));
    });

    test('choose picks an element from given array', function () {
        expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
        expect([1, 2, 3]).toContain(MarkovMachine.choice([1, 2, 3]));
    });
    
    test('generates semi-predictable text', function () {
        let mm = new MarkovMachine("a b c");
        let text = mm.makeText();
        expect(["a b c", "b c", "c"]).toContain(text);
    });

    test('makeText should return a string with word count less than or equal to numWords', function() {
        let mm = new MarkovMachine("the quick brown fox jumps over the lazy dog");
        
        expect(mm.makeText(numWords=5).split(" ").length).toBeLessThanOrEqual(5);
        expect(mm.makeText(numWords=10).split(" ").length).toBeLessThanOrEqual(10);
        expect(mm.makeText(numWords=25).split(" ").length).toBeLessThanOrEqual(25);
        expect(mm.makeText(numWords=50).split(" ").length).toBeLessThanOrEqual(50);
        expect(mm.makeText(numWords=100).split(" ").length).toBeLessThanOrEqual(100);
    })
});
