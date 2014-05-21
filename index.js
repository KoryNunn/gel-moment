var moment = require('moment');

module.exports = function(scope){
    scope.date = function(scope, args){
        var all = args.all();
        return moment(all)._d;
    };

    function createMomentFunction(key){
        return function(scope, args){
            var all = args.all(),
                momentDate = moment(all.shift()),
                result = momentDate[key].apply(momentDate, all);

            return moment.isMoment(result) ? result._d : result;
        };
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

