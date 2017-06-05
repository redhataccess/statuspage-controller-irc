var irc = require('irc');

var IrcPlugin = function (config) {
    config = config || {};

    var self = this;

    self.config = {
        host: config.host,
        nick: config.nick,
        channels: config.channels,
    };

    self.client = new irc.Client(self.config.host, self.config.nick, {
        channels: self.config.channels,
    });

    self.hookStatusChange = function (component, status, violation) {
        self.config.channels.forEach(function (channel) {
            var msg = "status.redhat.com changed status of component " + component.name + ": " + status;
            console.log('[IRC Plugin] sending irc message: ', msg);
            self.client.say(channel, msg);
        });
    }

};



module.exports = IrcPlugin;
