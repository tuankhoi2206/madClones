'use strict';

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const chai     = require('chai');

const log	= require ('../../src/libs/winston')(module);

const organizationModel = require('../../src/models/organizations/organizationModel');
const boardModel			  = require('../../src/models/boards/boardModel');
const userModel 				= require('../../src/models/users/userModel');
const app 							= require('../../src/index');

chai.use(chaiHttp);

const usersUrl = '/api/v1/users/';
const assert   = chai.assert;

describe('User controller testing ' , function () {
	let users = [];

	describe('POST', function () {
		const userTest = {
			name: 'userTestName',
			fullname: 'userTestFullName',
			password: 'usertestPassword',
			initials: 'userTestInitials',
			email: 'userTestEmail@email.com'
		};

		const userOrgTest = {
			name: 'orgName',
			displayName: 'orgDisplayName'
		};

		let objectId = null;
		let users 	 = [];

		it (usersUrl, function (done) {
			const userTest = {};

			chai.request(app)
				.post(usersUrl)
				.send(userTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl, function (done) {
			chai.request(app)
				.post(usersUrl)
				.send(userTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'status equals 200');

					objectId = res.res.body.response.data.id;

					done();
				});
		});

		it (usersUrl, function (done) {

			chai.request(app)
				.post(usersUrl)
				.send(userTest)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + '7fgdgfdg' + '/organizations')
				.send(userOrgTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + mongoose.Types.ObjectId() + '/organizations')
				.send(userOrgTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + objectId + '/organizations')
				.send(userOrgTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});
	});

	describe('GET ', function () {

		it (usersUrl, function (done) {
			chai.request(app)
				.get(usersUrl)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode is 200');
					
					users = res.res.body.data.users;

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.get(usersUrl + 'fsfesf')
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.get(usersUrl + mongoose.Types.ObjectId())
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.get(usersUrl + users[0]._id)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode is 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.get(usersUrl + 'fsfesf' + '/organizations')
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.get(usersUrl + mongoose.Types.ObjectId() + '/organizations')
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.get(usersUrl + users[0]._id + '/organizations')
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode is 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					'fsfesf' + 
					'/organizations/' +
					users[0].organizations[0]._id +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					mongoose.Types.ObjectId() + 
					'/organizations/' +
					users[0].organizations[0]._id +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					users[0]._id + 
					'/organizations/' +
					'fdgggfdg' +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					users[0]._id + 
					'/organizations/' +
					mongoose.Types.ObjectId() +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					users[0]._id + 
					'/organizations/' +
					users[0].organizations[0]._id +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '200', 'statusCode is 200');

					done();
				});
		});
	});

	describe('PUT', function () {

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.put(usersUrl + 'fsfesf')
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.put(usersUrl + mongoose.Types.ObjectId())
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl, function (done) {
			chai.request(app)
				.put(usersUrl + users[0]._id)
				.send({name : 'chaiTestUserModified'})
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode equals 200');

					done();
				});
		});
	});

	describe('Delete', function () {

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.delete(usersUrl + 'fsfesf')
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.delete(usersUrl + mongoose.Types.ObjectId())
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl, function (done) {
			chai.request(app)
				.delete(usersUrl + users[0]._id)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode equals 200');

					done();
				});
		});
	});

	before(function(done) {
		const userTest = new userModel({
			name: 'testName',
			fullname: 'testFullname',
			password: 'testPassword',
			initials: 'testInitials',
			email: 'testEmail@email.com'
		});

		const organization = new organizationModel({
			name: 'orgName',
			displayName: 'orgDisplayName',
		});

		const board = new boardModel({
			name: 'boardName'
		});

		userTest.save(function(err) {

			if (!err) {
				userModel.findOne({name: userTest.name}, (err, user) => {

					if (!err) {
						user.organizations.push(organization);

						user.save(function(err) {

							if (!err) {
								userModel.findById(userTest._id, (err, user) => {
									user.organizations[0].boards.push(board);
									user.save();
								});
							}
						});
					}
				});
			}
		});

		done();
	});

	after(function(done) {
		userModel.find().remove().exec();

		done();
	});
});