const MyUtils = (() => {
    'use strict';

    const my_utils = {};

    my_utils.isEmpty = (obj) => {
        return isEmpty(obj);
    }

    return init();


    function init() {
        console.log("MyUtils Initialized.");
        return my_utils;
    }

    // Returns true if obj is empty else false
    function isEmpty(obj) {    
        if (obj === '' || obj === null || obj === undefined ||(obj !== null && typeof obj === 'object' && !Object.keys(obj).length)) {
            return true            
        }
        else {
            return false
        }
    }

})();

export default MyUtils
