/**
 * Created by bdunn on 18/09/2014.
 */
var Validator = require('../lib/modelValidator');
var validator = new Validator();

module.exports.validationTests = {
    validateDate: function(test) {
        var data = {
            travis: 'test',
            dob: '2014-02-01'
        };
        var model = {
            properties: {
                dob: {
                    type: 'string',
                    format: 'date'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(errors.valid);

        test.done();
    },
    validateNotADate: function(test) {
        var data = {
            travis: 'test',
            dob: 'This is NOt a Date'
        };
        var model = {
            properties: {
                dob: {
                    type: 'string',
                    format: 'date'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(!errors.valid);

        test.done();
    },
    validateNumberAsDateFails: function(test) {
        var data = {
            travis: 'test',
            dob: '3456'
        };
        var model = {
            properties: {
                dob: {
                    type: 'string',
                    format: 'date'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(!errors.valid);

        test.done();
    },
    validateDateTime: function(test) {
        var data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        var model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date-time'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(errors.valid);

        test.done();
    },
    validateDateFormatOk: function(test) {
        var data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01"
        };
        var model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(errors.valid);

        test.done();
    },
    validateDateFormatFailed: function(test) {
        var data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-1-1"
        };
        var model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(1);
        test.ok(!errors.valid);

        test.done();
    },

    validateDateTime: function(test) {
        var data = {
            "salutation": "Mr Death",
            "dateOfBirth": "2014-01-01T12:00:00"
        };
        var model = {
            properties: {
                dateOfBirth: {
                    type: "string",
                    format: 'date'
                }
            }
        };

        var errors = validator.validate(data, model);

        test.expect(3);
        test.ok(!errors.valid);
        test.ok(errors.errorCount === 1);
        test.ok(errors.errors[0].message === 'dateOfBirth (2014-01-01T12:00:00) is not a type of date', errors.errors[0].message);

        test.done();
    }
};