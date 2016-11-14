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

    var _down = false,
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

        down: () => _down = true,
        up: () => _down = false,
        isDown: () => _down,

        xMin: () => _xMin,
        yMin: () => _yMin,
        xMax: () => _xMax,
        yMax: () => _yMax,

        goto: (point) => {
            
            if(!point) {
                return null;
            }

            if( point.x === null || point.y === null) {
                return null;
            }

            var op = _down ? "L" : "M";

            if(_path.length === 0 && op != "M" ) {
                // Insert starting point
                _path.push( { op: "M", x: 0, y: 0 } );
                _xMin = _xMax = _yMin = _yMax = 0;
            }

            _path.push( { op: op, x: point.x, y: point.y } ); 

            var px = Math.round(point.x)
            var py = Math.round(point.y)

            if( _path.length === 1 ) {

                _xMin = _xMax = px;
                _yMin = _yMax = py;

            } else {
                _xMin = px < _xMin ? px : _xMin;
                _yMin = py < _yMin ? py : _yMin;
                _xMax = px > _xMax ? px : _xMax;
                _yMax = py > _yMax ? py : _yMax;
            }

        }
    };
};
