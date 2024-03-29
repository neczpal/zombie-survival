// Extend Classes
function extend (child, parent) {
    child.prototype = parent.prototype;
    child.prototype = new parent ();
    child.prototype.constructor = child;
}

// Create n-dimensional arrays
function createArray (length) {
    let arr = new Array (length || 0),
        i = length;

    if (arguments.length > 1) {
        let args = Array.prototype.slice.call (arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply (this, args);
    }

    return arr;
}