import { FileSystem } from 'expo';
const parser = require('react-native-xml2js');

/*::
   type Playlist = {
    title: string;
    url: string;
    type: 'xml' | 'm3u' | 'stream' | 'folder';
    icon?: string;
    info?: string;
    accessCode?: string;
    items?: Array<Playlist>;
  }
*/
export default class Playlist {
  constructor(title, url) {
    this.title = title;
    this.url = url;
  }

  static loadAsync = async function ( url, type ) {
    try {
      // let { uri, status } = await FileSystem.downloadAsync(url, FileSystem.documentDirectory + 'file.' + type);
      // console.log('Download of', url, 'ready! Status:', status, ', file:', uri);

      // let content = await FileSystem.readAsStringAsync(uri);
      // console.log('Reading of', uri, 'ready! Size:', content.length);

      let response = await fetch(url);
      console.log('Download of', url, 'ready! Status:', response.status);

      let content = await response.text();
      console.log('Reading of response ready! Size:', content.length);

      if (type === 'm3u') {
        return Playlist._parseM3U(content);
      } if (type  === 'xml') {
        let catalog = await new Promise((resolve, reject) => {
          parser.parseString(content, function (err, result) {
            if (err) {
              console.log('XML parser failed with', err);
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
        return Playlist._parseCatalog(catalog);
      }
    } catch (e) {
      console.error(e);
    }
  };

  static _parseM3U = function(m3u) {
    const KDefaultGroup = 'Другие каналы';

    let playlist = {
      title: 'Каналы',
      items: []
    };
    let groups = {};
    let channel = null;
    let groupName = KDefaultGroup;

    let s = 0;
    let e = m3u.indexOf('\n');
    while (e != -1) {
      let line = m3u.substring(s, e);
      //console.log(line);

      // #EXTINF:0 group-title="Общероссийские",Первый канал'
      let m = line.match(/^#EXTINF:0\s+group-title=\"([^\"]*)\"\s*(parent-code=\"([^\"]*)\")?.*,\s*(.*)\s*$/)
      if (m) {
        groupName = m[1];
        channel = {
          title: m[4],
          type: 'stream',
          accessCode: m[3],
        };
      } else if (channel && line.match(/^http:.*m3u8?$/)) {
        channel.url = line;

        if (!(groupName in groups)) {
          groups[groupName] = [];
        }
        groups[groupName].push(channel);

        groupName = KDefaultGroup;
        channel = null;
      }

      s = e + 1;
      e = m3u.indexOf('\n', s);
    }

    for (const grp in groups) {
      if (groups.hasOwnProperty(grp)) {
        playlist.items.push({
          title: grp,
          items: groups[grp],
          type: 'folder',
        });
        console.log('Group', grp, 'has', groups[grp].length, 'channels');
      }
    }
    console.log('Found', playlist.items.length, 'groups');

    //console.log(obj);
    return playlist;
  };

  static _parseCatalog = async function(catalog) {
    let playlist = {
      title: catalog.items.playlist_name[0].trim(),
      items: []
    };

    catalog.items.channel.map((channel) => {
      let item = {
        title: channel.title[0].trim(),
        icon: channel.logo_30x30[0],
        info: channel.description[0],
      };

      if (channel.playlist_url) {
        item.url = channel.playlist_url[0];
        item.type = 'xml';
      } else if (channel.stream_url) {
        item.url = channel.stream_url[0];
        item.type = 'stream';
      }

      playlist.items.push(item);
    });

    return playlist;
  }
};
