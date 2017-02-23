import cheerio from 'cheerio'
import Promise from 'bluebird'
import { encode as urlEncode } from 'urlencode'
import request from 'request'
const r = Promise.promisifyAll(request.defaults());

const baseUrl = 'http://www.plivazdravlje.hr';
const searchUrl = '/prirucnik-bolesti?plivahealth%5BchAjaxQuery%5D=';
const proxy = 'http://cors-anywhere.herokuapp.com/';

export default {
  name: 'app',
  data() {
    return {
      footer: baseUrl,
      items: [],
    }
  },
  methods: {
    populate: function () {
      getSearchResults()
        .then(({body}) => {
          let preParsed = preParse(body);
            if (preParsed) {
            let parsed = JSON.parse(preParsed);
            this.$set(this, 'items', parsed);
            document.getElementById('placeholder').style.display = 'none';
            document.getElementById('illnessContent').style.display = 'none';
            document.getElementById('appTable').style.display = 'block';
            document.getElementById('appTable').className = document.getElementById('appTable').className + ' fadeIn';
          } else {
            document.getElementById('placeholder').style.display = 'block';
            document.getElementById('placeholder').textContent = '0 rezultata';
            document.getElementById('illnessContent').style.display = 'none';
            document.getElementById('appTable').style.display = 'none';
          }
        });
    },
    pickOne: function (illnessUrl) {
      r.getAsync(proxy + illnessUrl)
        .then(function ({body}) {
          document.getElementById('illnessContent').style.display = 'block';
          document.getElementById('illnessContent').innerHTML = getHtml(body);
          document.getElementById('appTable').style.display = 'none';
        })
    },
    resetState: function () {
      document.getElementById('placeholder').style.display = 'block';
      document.getElementById('placeholder').textContent = 'Rezultati pretrage';
      document.getElementById('illnessContent').style.display = 'none';
      document.getElementById('appTable').style.display = 'none';
    }
  }
}

function getSearchResults() {
  let searchQuery = urlEncode(document.getElementById('searchField').value);
  let url = proxy + baseUrl + searchUrl + searchQuery;
  return r.getAsync(url);
}

function preParse(body) {
  if (body.includes('[{')) {
    return '[{' + body.split('[{')[1].split(']}')[0];
  }
}

function getHtml(body) {
  let $ = cheerio.load(body);
  let format = $('.article-container');
  return format;
}