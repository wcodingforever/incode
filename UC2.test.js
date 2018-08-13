describe('testing for UC2, Adding new puzzles', () => {
    var puzzleDates = document.querySelectorAll(".dateinput");
    var puzzleLevel = document.querySelector("#level");
    var submitButtonElem = document.querySelector("#submitbutton");
    var addNewPuzzle = document.querySelector("#addnewbutton");

    test('Checking that the dates are prefilled', () => {
        expect(puzzleDates.value).not.toBe("");
    });

    test('Checking that the level is selected', () => {
        expect(puzzleLevel.value).not.toBe("Difficulty");
    });

    test('Does the submit button exist?', () => {
        expect(submitButtonElem).toBeDefined();
    });

    test('Does the add new puzzlebutton exist?', () => {
        expect(addNewPuzzle).toBeDefined();
    });
});