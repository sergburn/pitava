import { FileSystem } from 'expo';

export default class Playlist {

  static loadPlaylistAsync = async function ( file ) {
    try {
      let { uri, status } = await FileSystem.downloadAsync(file.url, FileSystem.documentDirectory + file.file);
      console.log('Download of', file.name, 'ready! Status:', status, ', file:', uri);

      let content = await FileSystem.readAsStringAsync(uri);
      console.log('Reading of ', file.name, 'ready! Size:', content.length);

      let playlist = Playlist._parseChannelList(content);
      playlist.name = file.name;
      return playlist;
    } catch (e) {
      console.error(error);
    }
  };

  static _parseChannelList = function(m3u) {
    const KDefaultGroup = 'Другие каналы';

    let obj = {};
    let groups = {};
    let chan = null;
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
        chan = {
          title: m[4],
          parentCode: m[3]
        };
      } else if (chan && line.match(/^http:.*m3u8?$/)) {
        chan.url = line;
        chan.key = line.substring(line.lastIndexOf('/'));

        if (!(groupName in groups)) {
          groups[groupName] = [];
        }
        groups[groupName].push(chan);

        groupName = KDefaultGroup;
        chan = null;
      }

      s = e + 1;
      e = m3u.indexOf('\n', s);
    }

    obj.groups = [];
    for (const grp in groups) {
      if (groups.hasOwnProperty(grp)) {
        obj.groups.push({
          groupName: grp,
          channels: groups[grp]
        });
        console.log('Group', grp, 'has', groups[grp].length, 'channels');
      }
    }
    console.log('Found', obj.groups.length, 'groups');

    //console.log(obj);
    return obj;
  };
};
