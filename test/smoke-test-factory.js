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

    it('default isDown should be false', done => {
        var pen = _factory.create({});
        pen.isDown().should.eql(false);
        done();
    });

    it('isDown should be true after down', done => {
        var pen = _factory.create({});
        pen.down();
        pen.isDown().should.eql(true);
        done();
    });

    it('isDown should be false after up', done => {
        var pen = _factory.create({});
        pen.up();
        pen.isDown().should.eql(false);
        done();
    });

    it('goto while pen up should set path MoveTo (M) op', done => {
        var pen = _factory.create({});
        let px = 10, py = 20;
        pen.goto( { x: px, y: py } );
        let path = pen.path();
        // console.log(path);
        let el = path[0];
        el.op.should.eql("M");
        el.x.should.eql(px);
        el.y.should.eql(py);
        done();
    });

    it('goto while pen up with zero x should set path MoveTo (M) op', done => {
        var pen = _factory.create({});
        let px = 0, py = 20;
        pen.goto( { x: px, y: py } );
        let path = pen.path();
        // console.log(path);
        let el = path[0];
        el.op.should.eql("M");
        el.x.should.eql(px);
        el.y.should.eql(py);
        done();
    });

    it('goto while pen up with zero y should set path MoveTo (M) op', done => {
        var pen = _factory.create({});
        let px = 10, py = 0;
        pen.goto( { x: px, y: py } );
        let path = pen.path();
        // console.log(path);
        let el = path[0];
        el.op.should.eql("M");
        el.x.should.eql(px);
        el.y.should.eql(py);
        done();
    });

    it('goto while pen down should set path LineTo (L) op', done => {
        var pen = _factory.create({});
        let x1 = 10, y1 = 20;
        pen.goto( { x: x1, y: y1 } );
        pen.down();
        let x2 = 30, y2 = 40;
        pen.goto( { x: x2, y: y2 } );
        let path = pen.path();
        // console.log(path);
        let el = path[1];
        el.op.should.eql("L");
        el.x.should.eql(x2);
        el.y.should.eql(y2);
        done();
    });

    it('goto while pen down with zero x should set path LineTo (L) op', done => {
        var pen = _factory.create({});
        let x1 = 10, y1 = 20;
        pen.goto( { x: x1, y: y1 } );
        pen.down();
        let x2 = 0, y2 = 40;
        pen.goto( { x: x2, y: y2 } );
        let path = pen.path();
        // console.log(path);
        let el = path[1];
        el.op.should.eql("L");
        el.x.should.eql(x2);
        el.y.should.eql(y2);
        done();
    });

    it('goto while pen down with zero y should set path LineTo (L) op', done => {
        var pen = _factory.create({});
        let x1 = 10, y1 = 20;
        pen.goto( { x: x1, y: y1 } );
        pen.down();
        let x2 = 30, y2 = 0;
        pen.goto( { x: x2, y: y2 } );
        let path = pen.path();
        // console.log(path);
        let el = path[1];
        el.op.should.eql("L");
        el.x.should.eql(x2);
        el.y.should.eql(y2);
        done();
    });

    it('goto while pen down and path empty should inser MoveTo (M) op', done => {
        var pen = _factory.create({});
        pen.down();
        let px = 15, py = 25;
        pen.goto( { x: px, y: py } );
        let path = pen.path();
        // console.log(path);
        path.length.should.eql(2,"path should contain 2 operations");
        // Verify op[0]
        let el0 = path[0];
        el0.op.should.eql("M");
        el0.x.should.eql(0);
        el0.y.should.eql(0);
        // Verify op[1]
        let el1 = path[1];
        el1.op.should.eql("L");
        el1.x.should.eql(px);
        el1.y.should.eql(py);
        done();
    });

    it('xMin should equal minimum goto x position', done => {
        var pen = _factory.create({});
        pen.down();
        let px = -15.00, py = -25.00;
        pen.goto( { x: px, y: py } );
        pen.xMin().should.eql(px);
        done();
    });

    it('yMin should equal minimum goto y position', done => {
        var pen = _factory.create({});
        pen.down();
        let px = -15.00, py = -25.00;
        pen.goto( { x: px, y: py } );
        pen.yMin().should.eql(py);
        done();
    });

    it('xMax should equal maximum goto x position', done => {
        var pen = _factory.create({});
        pen.down();
        let px = 15.00, py = 25.00;
        pen.goto( { x: px, y: py } );
        pen.xMax().should.eql(px);
        done();
    });

    it('yMax should equal maximum goto y position', done => {
        var pen = _factory.create({});
        pen.down();
        let px = 15, py = 25;
        pen.goto( { x: px, y: py } );
        pen.yMax().should.eql(py);
        done();
    });
});
