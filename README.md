# gel-moment

moment functions for gel

# usage

    var gelMoment = require('gel-moment');

Call the gelMoment function on your gel instances scope:

    gelMoment(gel.scope);

Now you can use moment functions in gel expressions:

    (date.add
        (date)
        1
        "days"
    )