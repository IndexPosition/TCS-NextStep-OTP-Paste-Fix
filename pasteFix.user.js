// ==UserScript==
// @name         TCS NextStep OTP Paste Fix
// @version      1.0
// @description  Enables OTP pasting
// @author       IndexPosition
// @match        https://nextstep.tcs.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function removeRestrictions(element) {
        if (!element) return;

        const events = [
            'onpaste', 'oncopy', 'oncut',
            'ondragstart', 'ondrop',
            'onselectstart', 'onkeypress'
        ];

        events.forEach(event => {
            element.removeAttribute(event);
        });

        element.style.userSelect = 'auto';
        element.style.webkitUserSelect = 'auto';
    }

    function removeOTPWarning() {
        // Removing the unwanted warning.
        const xpath = "//label[contains(text(), 'OTP manually')]";
        const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        if (result.singleNodeValue) {
            result.singleNodeValue.parentElement.remove();
        }
    }

    function checkAndFixFields() {
        const otpInput = document.getElementById('loginOtp');
        removeRestrictions(otpInput);
        removeOTPWarning();
    }

    checkAndFixFields();

    const observer = new MutationObserver(checkAndFixFields);
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    });

    setInterval(checkAndFixFields, 1000);
})();
