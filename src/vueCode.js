import moment from 'moment'
import got from 'got'
import cheerio from 'cheerio'
import utils from './utils.js'
import urlJoin from 'url-join'

const baseUrl = 'https://community.linuxmint.com/software/search';

export default {
  name: 'app',
  data() {
    return {
      footer: baseUrl,
      items: []
    }
  },
  methods: {
    populate: function () {
      searchPackages().then(result => {
        this.$set(this, 'items', result.packages)
        document.getElementById('placeholder').style.display = 'none';
        document.getElementById('appTable').style.opacity = '1';
      });
    }
  }
}

function searchPackages() {
  var url = urlJoin('http://cors-anywhere.herokuapp.com/', baseUrl);
  var data = {
    search_software_name: document.getElementById('searchField').value,
    search: 'Search'
  };

  return got.post(url, { body: data })
    .then(function complete(resp) {
      return {
        success: true,
        packages: parsePackageListing(resp.body)
      };
    });
}

function parsePackageListing(html) {
  var $ = cheerio.load(html);
  debugger;
  var $packageRows = $('tbody tr').slice(1);

  var packages = [];
  $packageRows.each(function (i, el) {
    var $this = $(this);
    var pkg = {
      score: $this['0'].children['0'].children['0'].children['0'].data,
      name: $this['0'].children['1'].children['0'].children['0'].children['0'].data,
      description: $this['0'].children['1'].children['2'].children['0'].children['0'].data,
      link: urlJoin('https://community.linuxmint.com/software/view/', $this['0'].children['1'].children['0'].children['0'].children['0'].data)
    };

    packages.push(pkg);
  });
  return packages;
}