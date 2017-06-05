var irc = require('irc');
var client = new irc.Client('irc.devel.redhat.com', 'statusbot', {
    channels: ['#customer-platform'],
});
