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
    // some pen properties can't be changed once set
    let _color = spec.color || 0x000000;
    let _width = spec.width || 1;
    let _alpha = spec.alpha || 1.0;

    var _penDown = false;

    return {
        // public 
        package: () => _package,
        health: () => "OK",
        
        color: () => _color,
        width: () => _width,
        alpha: () => _alpha,

        penDown: () => _penDown = true,
        penUp: () => _penDown = false,
        isPenDown: () => _penDown,
    };
};
