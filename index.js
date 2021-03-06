var moment = require('moment');

module.exports = function(scope){
    scope.date = function(scope, args){
        var all = args.all();
        if(all.length === 0){
            return new Date();
        }else if(all.length === 1){
            all = all.pop();
        }
        return moment(all)._d;
    };

    // gel is a stateless language, and all moment functions return Dates,
    // not moment instances.
    // This means we can use the same instance of moment for every call, which,
    // due to moment being absurdy slow, is a very helpful thing.

    var momentInstance = moment();

    function createMomentFunction(key){
        var fn = function(scope, args){
            var all = args.all(),
                dateArg = all.shift();

            momentInstance._d = new Date(dateArg);
            momentInstance._isValid = null;

            var result = momentInstance[key].apply(momentInstance, all);

            return moment.isMoment(result) ? result._d : result;
        };

        return fn;
    }

    for(var key in moment.fn){
        if(
            typeof moment.fn[key] !== 'function' ||
            key === 'valueOf' ||
            key === 'toString'
        ){
            continue;
        }

        scope.date[key] = createMomentFunction(key);
    }
}

