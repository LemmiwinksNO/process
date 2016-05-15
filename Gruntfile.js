
module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Empty and remove 'dist/' directory
		clean: ['dist'],

		// Runs the application JavaScript through JSHint with the defaults.
		jshint: {
			files: ['asset/js/**/*.js']
		},

		browserify: {
			dist: {
				options: {
					transform: [
						['babelify']
					]
				},
				files: {
					'dist/bundle.js': ['asset/js/main.js']
				}
			}
		},

		watch: {
			browserify: {
				files: ['./asset/js/**/*.js'],
				tasks: ['default']
			}
		}

	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['clean', 'browserify']);
	// grunt.registerTask('browserify', ['browserify']);
};