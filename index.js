var moment = require('moment');

function memoise(){

}

module.exports = function(scope){
    scope.date = function(scope, args){
        var all = args.all();
        return moment(all)._d;
    };

    function createMomentFunction(key){
        var fn = function(scope, args){
            var all = args.all(),
                dateArg = all.shift(),
                momentDate;

            if(fn._memoisedDates[''+dateArg]){
                momentDate = fn._memoisedDates[''+dateArg].clone();
            }else{
                momentDate = fn._memoisedDates[''+dateArg] = moment(dateArg);
            }

            var result = momentDate[key].apply(momentDate, all);

            return moment.isMoment(result) ? result._d : result;
        };

        fn._memoisedDates = {};

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

