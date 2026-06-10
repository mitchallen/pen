/**
    Module: @mitchallen/pen
      Test: smoke-test-factory
    Author: Mitch Allen
*/

"use strict";

const { describe, it, before, after, beforeEach, afterEach } = require('node:test');
const assert = require('node:assert/strict');

const modulePath = "../index-factory";

describe('module factory smoke test', () => {

    var _factory = null;

    before(() => {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
    });

    after(() => {
        // Call after all tests
    });

    beforeEach(() => {
        // Call before each test
    });

    afterEach(() => {
        // Call after each test
    });

    it('module should exist', () => {
        assert.ok(_factory);
    });

    describe('create', () => {
        it('create method with no spec should return null', () => {
            var pen = _factory.create();
            assert.equal(pen, null);
        });

        it('create method with spec should return pen', () => {
            var pen = _factory.create({});
            assert.ok(pen);
        });
    });

    it('health method should return ok', () => {
        var pen = _factory.create({});
        assert.ok(pen);
        assert.equal(pen.health(), "OK");
    });

    describe('color', () => {
        it('default pen color should be black (0x000000)', () => {
            var pen = _factory.create({});
            assert.equal(pen.color(), 0x000000);
        });

        it('should be able to set pen color', () => {
            let TEST_COLOR = 0x00FF00;
            var pen = _factory.create({
                color: TEST_COLOR,
            });
            assert.equal(pen.color(), TEST_COLOR);
        });
    });

    describe('fill', () => {
        it('default pen fill should be undefined', () => {
            var pen = _factory.create({});
            assert.equal(pen.fill(), undefined);
        });

        it('should be able to set pen fill', () => {
            let TEST_FILL = 0x00FF00;
            var pen = _factory.create({
                fill: TEST_FILL,
            });
            assert.equal(pen.fill(), TEST_FILL);
        });

        it('should be able to set pen fill to 0x00000', () => {
            let TEST_FILL = 0x000000;
            var pen = _factory.create({
                fill: TEST_FILL,
            });
            assert.equal(pen.fill(), TEST_FILL);
        });
    });

    it('default pen width should be one (1)', () => {
        var pen = _factory.create({});
        assert.equal(pen.width(), 1);
    });

    it('default pen alpha should be one (1.0)', () => {
        var pen = _factory.create({});
        assert.equal(pen.alpha(), 1.0);
    });

    describe('chaining', () => {
        it('goto can chain', () => {
            var pen = _factory.create({});
            let x1 = 10, y1 = 20;
            let x2 = 30, y2 = 40;
            pen.goto({ x: x1, y: y1 })
                .down()
                .goto({ x: x2, y: y2 });
            let path = pen.path();
            let el = path[1];
            assert.equal(el.op, "L");
            assert.equal(el.x, x2);
            assert.equal(el.y, y2);
        });
    });

    describe('isDown', () => {
        it('default isDown should be false', () => {
            var pen = _factory.create({});
            assert.equal(pen.isDown(), false);
        });

        it('isDown should be true after down', () => {
            var pen = _factory.create({});
            pen.down();
            assert.equal(pen.isDown(), true);
        });

        it('isDown should be false after up', () => {
            var pen = _factory.create({});
            pen.up();
            assert.equal(pen.isDown(), false);
        });
    });

    describe('goto', () => {
        it('goto while pen up should set path MoveTo (M) op', () => {
            var pen = _factory.create({});
            let px = 10, py = 20;
            pen.goto({ x: px, y: py });
            let path = pen.path();
            let el = path[0];
            assert.equal(el.op, "M");
            assert.equal(el.x, px);
            assert.equal(el.y, py);
        });

        it('goto while pen up with zero x should set path MoveTo (M) op', () => {
            var pen = _factory.create({});
            let px = 0, py = 20;
            pen.goto({ x: px, y: py });
            let path = pen.path();
            let el = path[0];
            assert.equal(el.op, "M");
            assert.equal(el.x, px);
            assert.equal(el.y, py);
        });

        it('goto while pen up with zero y should set path MoveTo (M) op', () => {
            var pen = _factory.create({});
            let px = 10, py = 0;
            pen.goto({ x: px, y: py });
            let path = pen.path();
            let el = path[0];
            assert.equal(el.op, "M");
            assert.equal(el.x, px);
            assert.equal(el.y, py);
        });

        it('goto while pen down should set path LineTo (L) op', () => {
            var pen = _factory.create({});
            let x1 = 10, y1 = 20;
            pen.goto({ x: x1, y: y1 });
            pen.down();
            let x2 = 30, y2 = 40;
            pen.goto({ x: x2, y: y2 });
            let path = pen.path();
            let el = path[1];
            assert.equal(el.op, "L");
            assert.equal(el.x, x2);
            assert.equal(el.y, y2);
        });

        it('goto while pen down with zero x should set path LineTo (L) op', () => {
            var pen = _factory.create({});
            let x1 = 10, y1 = 20;
            pen.goto({ x: x1, y: y1 });
            pen.down();
            let x2 = 0, y2 = 40;
            pen.goto({ x: x2, y: y2 });
            let path = pen.path();
            let el = path[1];
            assert.equal(el.op, "L");
            assert.equal(el.x, x2);
            assert.equal(el.y, y2);
        });

        it('goto while pen down with zero y should set path LineTo (L) op', () => {
            var pen = _factory.create({});
            let x1 = 10, y1 = 20;
            pen.goto({ x: x1, y: y1 });
            pen.down();
            let x2 = 30, y2 = 0;
            pen.goto({ x: x2, y: y2 });
            let path = pen.path();
            let el = path[1];
            assert.equal(el.op, "L");
            assert.equal(el.x, x2);
            assert.equal(el.y, y2);
        });

        it('goto while pen down and path empty should inser MoveTo (M) op', () => {
            var pen = _factory.create({});
            pen.down();
            let px = 15, py = 25;
            pen.goto({ x: px, y: py });
            let path = pen.path();
            assert.equal(path.length, 2, "path should contain 2 operations");
            // Verify op[0]
            let el0 = path[0];
            assert.equal(el0.op, "M");
            assert.equal(el0.x, 0);
            assert.equal(el0.y, 0);
            // Verify op[1]
            let el1 = path[1];
            assert.equal(el1.op, "L");
            assert.equal(el1.x, px);
            assert.equal(el1.y, py);
        });
    });

    it('xMin should equal minimum goto x position', () => {
        var pen = _factory.create({});
        var pt = [
            { x: 15.00, y: 25 },
            { x: 5.00, y: 30 },
        ];
        for (var i = 0; i < pt.length; i++) {
            var p = pt[i];
            if (i == 1) {
                pen.down();
            }
            pen.goto({ x: p.x, y: p.y });
        }
        var vp = pen.viewPort();
        assert.equal(vp.xMin, pt[1].x);
    });

    it('yMin should equal minimum goto y position', () => {
        var pen = _factory.create({});
        var pt = [
            { x: 15.00, y: 25 },
            { x: 5.00, y: 30 },
        ];
        for (var i = 0; i < pt.length; i++) {
            var p = pt[i];
            if (i == 1) {
                pen.down();
            }
            pen.goto({ x: p.x, y: p.y });
        }
        var vp = pen.viewPort();
        assert.equal(vp.yMin, pt[0].y);
    });

    it('xMax should equal maximum goto x position', () => {
        var pen = _factory.create({});
        var pt = [
            { x: 15.00, y: 25 },
            { x: 5.00, y: 30 },
        ];
        for (var i = 0; i < pt.length; i++) {
            var p = pt[i];
            if (i == 1) {
                pen.down();
            }
            pen.goto({ x: p.x, y: p.y });
        }
        var vp = pen.viewPort();
        assert.equal(vp.xMax, pt[0].x);
    });

    it('yMax should equal maximum goto y position', () => {
        var pen = _factory.create({});
        var pt = [
            { x: 15.00, y: 25 },
            { x: 5.00, y: 30 },
        ];
        for (var i = 0; i < pt.length; i++) {
            var p = pt[i];
            if (i == 1) {
                pen.down();
            }
            pen.goto({ x: p.x, y: p.y });
        }
        var vp = pen.viewPort();
        assert.equal(vp.yMax, pt[1].y);
    });

    describe('chaining', () => {
        it('up can chain', () => {
            var pen = _factory.create({});
            let x1 = 10, y1 = 20;
            let x2 = 30, y2 = 40;
            pen.up()
               .goto({ x: x1, y: y1 })
               .down()
               .goto({ x: x2, y: y2 })
               .up();
            let path = pen.path();
            let el = path[1];
            assert.equal(el.op, "L");
            assert.equal(el.x, x2);
            assert.equal(el.y, y2);
        });
        it('down can chain', () => {
            var pen = _factory.create({});
            let x1 = 10, y1 = 20;
            let x2 = 30, y2 = 40;
            pen.goto({ x: x1, y: y1 })
               .down()
               .goto({ x: x2, y: y2 });
            let path = pen.path();
            let el = path[1];
            assert.equal(el.op, "L");
            assert.equal(el.x, x2);
            assert.equal(el.y, y2);
        });
        it('goto can chain', () => {
            var pen = _factory.create({});
            let x1 = 10, y1 = 20;
            let x2 = 30, y2 = 40;
            pen.goto({ x: x1, y: y1 })
               .down()
               .goto({ x: x2, y: y2 });
            let path = pen.path();
            let el = path[1];
            assert.equal(el.op, "L");
            assert.equal(el.x, x2);
            assert.equal(el.y, y2);
        });
    });
});
