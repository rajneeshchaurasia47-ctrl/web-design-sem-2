const display = document.getElementById('display');

// Button dabane par value display mein jodna
function appendToDisplay(value) {
    display.value += value;
}

// Screen clear (C button)
function clearDisplay() {
    display.value = '';
}

// irage Last digit (DEL button)
function deleteLast() {
    display.value = display.value.toString().slice(0, -1);
}

// Result calculate (= button)
function calculateResult() {
    try {
        // eval() string ko math mein badal deta hai
        display.value = eval(display.value);
    } catch (error) {
        display.value = 'Error';
        // 1.5 second baad clear ho jayega
        setTimeout(() => clearDisplay(), 1500);
    }
}