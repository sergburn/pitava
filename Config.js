import { SecureStore } from 'expo';
import validator from 'validator';

const KEY_NAME = "pitava.settings";

const LibraryRoot = {
  title: 'Медиатека',
  url: '',
  type: 'xml'
};

const ChannelsRoot = {
  title: 'Каналы',
  url: '',
  type: 'm3u'
};

const DEFAULT = {
  playlists: [],
  library: {},
  epg: '',
};

let Config = {

  settings: null,

  loadAsync: function() {
    SecureStore.getItemAsync(KEY_NAME)
    .then((json) => {
      if (!!json && json.length) {
        Config.settings = JSON.parse(json);
      } else {
        Config.settings = Object.assign({}, DEFAULT);
      }
    })
    .catch((err) => {
      console.log('Error loading settings:', err);
      return Config.resetAsync();
    })
  },

  saveAsync: function() {
    return SecureStore.setItemAsync(KEY_NAME, JSON.stringify(Config.settings));
  },

  resetAsync: function() {
    Config.settings = Object.assign({}, DEFAULT);
    return SecureStore.deleteItemAsync(KEY_NAME);
  },

  addPlaylist: ({title, url}) => {
    console.log('Config.addPlaylist:', {title, url});

    // Is URL good?
    if (!validator.isURL(url, {
        protocols: ['http', 'https'],
        require_tld: true,
        require_protocol: true,
        require_host: true,
        require_valid_protocol: true,
        allow_underscores: true,
        allow_trailing_dot: true
      })) {
      throw Error('Неверный URL!');
    }

    // Is it a duplicate ?
    let dup = Config.settings.playlists.find((item) => {
      return item.url === url;
    });

    if (!!dup) {
      throw Error('Такой URL уже есть!');
    }

    // everything seems to be OK
    Config.settings.playlists.push({title, url});
    Config.saveAsync();
  },

};

export default Config;
