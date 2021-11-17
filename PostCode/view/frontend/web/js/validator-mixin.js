define([
    'jquery'
], function ($) {
    'use strict';

    return function (validator) {

        validator.addRule(
            'validate-first-postcode',
            function (value) {
                return value.length === 3 && /^-?\d+$/.test(value);
            },
            $.mage.__('Please enter exactly three numeric characters')
        );

        validator.addRule(
            'validate-last-postcode',
            function (value) {
                return value.length === 4 && /^-?\d+$/.test(value);
            },
            $.mage.__('Please enter exactly four numeric characters')
        );

        return validator;
    }
});
