'use strict';

var nodemailer = require('nodemailer');
var _ = require('lodash');
var fs = require('fs');
var config = require('../config/config');

/*
 * A class for building an email template with specified options and data
 * This class requires the email settings in the config file located at /server/config/config.js
 *
 * @constructor
 * @param {Object} [options] A hash of options to define email behavior
 * @param {String} [options.template] The template used in the email.  ".html" is automatically appended.
 * @param {String} [options.subject] The subject of the email being sent.
 * @param {Object} [options.to] A hash of the options related to the email recipient.
 * @param {String} [options.to.name] The recipient's name
 * @param {String} [options.to.email] The recipient's email address
 * @param {Object} [data] A hash of any data you wish to pass to the template.
 */
var Emailer = function(options, data) {
	this.options = options || {};
	this.data = data || {};
};

Emailer.prototype.getTransport = function() {
	return nodemailer.createTransport({
		service: config.email.service,
		auth: {
			user: config.email.auth.username,
			pass: config.email.auth.password
		}
	});
};

Emailer.prototype.getHTML = function(templateName, data) {
	var templatePath = config.root + '/server/views/email/' + templateName + '.html';
	var templateContent = fs.readFileSync(templatePath, { encoding: 'utf8' });
	return _.template(templateContent, data, { interpolate: /\{\{(.+?)\}\}/g });
};

Emailer.prototype.send = function(cb) {
	var html = this.getHTML(this.options.template, this.data);
	this.getTransport().sendMail({
		from: '"' + config.email.name + '" <' + config.email.address + '>',
		to: '"' + this.options.to.name + '" <' + this.options.to.email + '>',
		subject: this.options.subject,
		html: html,
		generateTextFromHTML: true
	}, cb);
};

module.exports = Emailer;
