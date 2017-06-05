var irc = require('irc');

var IrcPlugin = function (config) {
    config = config || {};

    var self = this;

    self.config = {
        host: config.host,
        nick: config.nick,
        channels: config.channels,
        prefix: config.prefix,
        duplicate_nick: config.duplicate_nick || false, // boolean to join if Nick already exists in channel
    };

    console.log('[IRC Plugin] connecting to: ', self.config.host, self.config);

    // Only connect
    self.client = new irc.Client(self.config.host, self.config.nick);

    self.joinChannels = function() {
        self.config.channels.forEach(function (channel) {
            console.log('[IRC Plugin] joining channel: ', channel);
            self.client.join(channel);
        });
    };

    // Once we've connected check nick for collision
    self.client.addListener('registered', function (message) {
        console.log('[IRC Plugin] registered: ' + JSON.stringify(message));
        console.log('[IRC Plugin] nick: ', self.client.nick);

        // Check for name collision, if so the name will have appended a number at the end e.g. "nick1"
        if (self.client.nick.length === self.config.nick.length) {
            // no name collision
            self.joinChannels();
        } else {
            console.error('[IRC Plugin] nick collision detected: ', self.client.nick, self.config.nick);

            if (self.config.duplicate_nick) {
                // this will join channel with a nick with a number appended
                self.joinChannels();
            }
        }
    });

    self.hookStatusChange = function (component, status, violation) {
        self.config.channels.forEach(function (channel) {

            //TODO: do something with violation, i.e. output incident id
            var msg = self.config.prefix + " changed status of component " + component.name + ": " + status;
            console.log('[IRC Plugin] sending irc message: ', msg, channel);
            self.client.say(channel, msg);
        });
    }

};



module.exports = IrcPlugin;
