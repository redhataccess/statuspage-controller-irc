# statuspage-controller-irc
IRC plugin for [statuspage-controller](https://github.com/redhataccess/statuspage-controller)

This plugin will broadcast statuspage.io component status updates to IRC channels

Useful if your company hosts an internal IRC server.

## Usage

    var StatuspageController = require('statuspage-controller');
    var IrcPlugin = require('statuspage-controller-irc');
    
    var plugin_config = {
        host: 'irc.host',
        nick: 'Statuspage',
        prefix: '[test status page]',
        channels: [
            '#mychannel'
        ]
    };
    
    var spc = new StatuspageController();
    
    spc.addPlugin(new IrcPlugin(plugin_config));
    
    spc.start();
