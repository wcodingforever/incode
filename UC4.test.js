describe('Testing UC4, Deleting puzzles', () => {

    var deleteButtonElem = document.querySelector("deletebutton");
    var modalElem = document.querySelector("modal");
    var confirmButtonElem = document.querySelector("confirmbutton");
    var closeButtonElem = document.querySelector("closebutton");

    test('Does the delete button exist?', () => {
        expect(deleteButtonElem).toBeDefined();
    });

    test('Does the modal exist?', () => {
        expect(modalElem).toBeDefined();
    });

    test('Does the confisrmbutton exist?', () => {
        expect(confirmButtonElem).toBeDefined();
    });

    test('Does the close button exist?', () => {
        expect(closeButtonElem).toBeDefined();
    });

    test('Does this toggle the style attribute of the confirmation modal to display block?', () => {
        deleteButtonElem.click();
        expect(modalElem.style.display).toBe("block");
    });

    test('Does this toggle the style attribute of the confirmation modal to display none?', () => {
        closeButtonElem.click();
        expect(modalElem.style.display).toBe("none");
    });

    test('Does this toggle the style attribute of the confirmation modal to display block?', () => {
        deleteButtonElem.click();
        expect(modalElem.style.display).toBe("block");
    });

    test('Does this toggle the style attribute of the confirmation modal to display none?', () => {
        confirmButtonElem.click();
        expect(modalElem.style.display).toBe("none");
    });

});