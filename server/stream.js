var stream = require('getstream');

// instantiate a new client (server side)
var client = stream.connect('mudfge4hyvhm', 'eqjfxdm8fue25c35vd5k4b8xbums5dy2kpg38ct9yu4vbqh92dzpv5sufuuww83s', '38490');

var megaFeed = client.feed('user', null, 'mega' )

megaFeed.addActivity({
  actor: 'mega',
  tweet: "yo",
  verb: 'tweet',
  object: 1
});

