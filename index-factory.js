/**
    Module: @mitchallen/pen
    Author: Mitch Allen
*/

/*jshint esversion: 6 */

"use strict";

module.exports.create = (spec) => {
    if(!spec) {
        return null;
    }
    // private 
    let _package = "@mitchallen/pen";
    let _verbose = spec.verbose || false;
    // some pen properties can't be changed once set
    let _color = spec.color || 0x000000;
    let _width = spec.width || 1;
    let _alpha = spec.alpha || 1.0;

    var _penDown = false,
        _path = [],
        _xMin = 0, 
        _yMin = 0,
        _xMax = 0,
        _yMax = 0;

    return {
        // public 
        package: () => _package,
        health: () => "OK",

        color: () => _color,
        width: () => _width,
        alpha: () => _alpha,
        path: () => _path,

        penDown: () => _penDown = true,
        penUp: () => _penDown = false,
        isPenDown: () => _penDown,

        xMin: () => _xMin,
        yMin: () => _yMin,
        xMax: () => _xMax,
        yMax: () => _yMax,

        goto: (point) => {
            if(!point) {
                return null;
            }
            if(!point.x || !point.y) {
                console.error("pen.goto: point must contain x and y values");
                return null;
            }

            var op = _penDown ? "L" : "M";

            if(_path.length === 0 && op != "M" ) {
                if(_verbose) {
                    // Insert starting point
                    console.warn("pen.goto inserting default MoveTo starting point");
                }
                _path.push( { op: "M", x: 0, y: 0 } );
            }

            _path.push( { op: op, x: point.x, y: point.y } ); 

            _xMin = point.x < _xMin ? point.x : _xMin;
            _yMin = point.y < _yMin ? point.y : _yMin;
            _xMax = point.x > _xMax ? point.x : _xMax;
            _yMax = point.y > _yMax ? point.y : _yMax;
        }
    };
};
