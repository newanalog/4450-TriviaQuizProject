/*
    Common.js
    Class to hold functions used across project
*/

// function to make element creation less verbose
export function createElement(tagName, attributes, styles) {
    let el = document.createElement(tagName);
    el = Object.assign(el, attributes)
    return Object.assign(el, styles);
}
