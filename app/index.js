'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PresentationGenerator = module.exports = function PresentationGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PresentationGenerator, yeoman.generators.Base);

PresentationGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'presentationTitle',
            message: 'What is the title of this presentation?'
        }
    ];

    this.prompt(prompts, function (props) {
        this.presentationTitle = props.presentationTitle;

        cb();
    }.bind(this));
};

PresentationGenerator.prototype.app = function app() {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('gitignore', '.gitignore');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.template('_config.json', 'config.json');
    this.template('index.html', 'index.html');
    this.copy('main.scss', 'scss/main.scss');
    this.copy('main.js', 'js/main.js');
    this.copy('steps.json', 'steps/steps.json');
    this.template('start.md', 'steps/start.md');
};

PresentationGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};

PresentationGenerator.prototype.runtime = function runtime() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
};
