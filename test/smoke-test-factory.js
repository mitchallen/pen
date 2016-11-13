/**
    Module: @mitchallen/pen
      Test: smoke-test-factory
    Author: Mitch Allen
*/

"use strict";

var request = require('supertest'),
    should = require('should'),
    modulePath = "../index-factory";

describe('module factory smoke test', () => {

    var _factory = null;

    before( done => {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
        done();
    });

    after( done => {
        // Call after all tests
        done();
    });

    beforeEach( done => {
        // Call before each test
        done();
    });

    afterEach( done => {
        // Call after eeach test
        done();
    });

    it('module should exist', done => {
        should.exist(_factory);
        done();
    })

    it('create method with no spec should return null', done => {
        var pen = _factory.create();
        should.not.exist(pen);
        done();
    });

    it('create method with spec should return pen', done => {
        var pen = _factory.create({});
        should.exist(pen);
        done();
    });

    it('health method should return ok', done => {
        var pen = _factory.create({});
        should.exist(pen);
        pen.health().should.eql("OK");
        done();
    });

    it('default pen color should be black (0x000000)', done => {
        var pen = _factory.create({});
        pen.color().should.eql(0x000000);
        done();
    });

    it('default pen width should be one (1)', done => {
        var pen = _factory.create({});
        pen.width().should.eql(1);
        done();
    });

    it('default pen alpha should be one (1.0)', done => {
        var pen = _factory.create({});
        pen.alpha().should.eql(1.0);
        done();
    });

    it('default isPenDown should be false', done => {
        var pen = _factory.create({});
        pen.isPenDown().should.eql(false);
        done();
    });

    it('isPenDown should be true after penDown', done => {
        var pen = _factory.create({});
        pen.penDown();
        pen.isPenDown().should.eql(true);
        done();
    });

    it('isPenDown should be false after penUp', done => {
        var pen = _factory.create({});
        pen.penUp();
        pen.isPenDown().should.eql(false);
        done();
    });
});
