var irc = require('irc');

var IrcPlugin = function (config) {
    config = config || {};

    var self = this;

    self.config = {
        host: config.host,
        nick: config.nick,
        channels: config.channels,
        prefix: config.prefix,
        duplicate_user: config.duplicate_user || false, // boolean to join if Nick already exists in channel
    };

    console.log('[IRC Plugin] connecting to: ', self.config.host, self.config);

    self.client = new irc.Client(self.config.host, self.config.nick);

    // self.joinedChannels = [];

    // self.nickInUse = function (channel) {
    //     var nicks = self.client.
    // };

    // join channels
    // self.config.channels.forEach(function (channel) {
    //     var nickInUse = self.nickInUse(channel);
    //
    //     if (nickInUse && self.config.duplicate_user) {
    //         self.client.join(channel);
    //         self.joinedChannels.push(channel);
    //     }
    //     else if (!nickInUse) {
    //         self.client.join(channel);
    //         self.joinedChannels.push(channel);
    //     }
    // };

    self.hookStatusChange = function (component, status, violation) {
        self.config.channels.forEach(function (channel) {
            if (!self.nickInUse(channel)) {

            }
            else if (self.config.duplicate_user) {

            }

            //TODO: do something with violation, i.e. output incident id
            var msg = self.config.prefix + " changed status of component " + component.name + ": " + status;
            console.log('[IRC Plugin] sending irc message: ', msg, channel);
            self.client.say(channel, msg);
        });
    }

};



module.exports = IrcPlugin;
