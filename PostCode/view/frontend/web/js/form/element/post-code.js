define([
    'Magento_Ui/js/form/element/post-code',
    'ko',
    'Magento_Ui/js/lib/validation/validator'
], function (PostCodeComponent, ko, validator) {
    'use strict';

    return PostCodeComponent.extend({

        initialize: function () {
            this._super();

            let value = this.value();
            if (value) {
                this.first(value.slice(0, 3));
                this.last(value.slice(3));
            }
            return this;
        },

        initObservable: function () {
            var self = this;
            this._super();
            this.first = ko.observable('');
            this.last = ko.observable('');

            this.first.subscribe(function (first) {
                self.value(first + self.last());
            });

            this.last.subscribe(function (last) {
                self.value(self.first() + last);
            });

            return this;
        },

        validate: function () {
            var messages = [],
                message = '',
                validation = this.validation;
            validation['validate-first-postcode'] = true;
            validation['validate-last-postcode'] = false;
            var firstResult = validator(validation, this.first());
            validation['validate-first-postcode'] = false;
            validation['validate-last-postcode'] = true;
            var lastResult = validator(validation, this.last());

            if (!this.disabled() && this.visible()) {
                if (firstResult.message) {
                    messages.push(firstResult.message);
                }

                if (lastResult.message) {
                    messages.push(lastResult.message);
                }
            }
            if (messages.length) {
                message = messages[0];
            }

            var isValid = this.disabled() || !this.visible() || firstResult.passed && lastResult.passed;

            this.error(message);
            this.error.valueHasMutated();
            this.bubble('error', message);

            //TODO: Implement proper result propagation for form
            if (this.source && !isValid) {
                this.source.set('params.invalid', true);
            }

            return {
                valid: isValid,
                target: this
            };
        },
    });
});
