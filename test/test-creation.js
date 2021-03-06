/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('presentation generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('impressive:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            // add files you expect to exist here.
            '.jshintrc',
            '.editorconfig',
            '.gitignore',
            '.bowerrc',
            'config.json',
            'gulpfile.js',
            'index.html',
            'scss/main.scss',
            'js/main.js',
            'steps/start.md',
            'steps/steps.json',
            'js/impressConsole.js',
            'scss/console.scss',
            'impressConsole.license.txt'
        ];

        helpers.mockPrompt(this.app, {
            'presentationTitle': 'My First Presentation'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
