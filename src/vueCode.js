import moment from 'moment'
import got from 'got'
import cheerio from 'cheerio'
import Promise from 'bluebird'
import urlJoin from 'url-join'
import { encode as urlEncode } from 'urlencode'
import request from 'request'
const r = Promise.promisifyAll(request.defaults());

import utils from './scripts/utils.js'
import parseResult from './scripts/parseResult'

const baseUrl = 'http://www.plivazdravlje.hr';
const searchUrl = '/prirucnik-bolesti?plivahealth%5BchAjaxQuery%5D=';
const proxy = 'http://cors-anywhere.herokuapp.com/';
var count = false;

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
          let parsed = JSON.parse(preParsed);
          this.$set(this, 'items', parsed);
          if (count === false) {
            document.getElementById('placeholder').style.display = 'none';
            document.getElementById('appTable').style.display = 'block';
            document.getElementById('illnessContent').style.display = 'none';
            document.getElementById('appTable').className = document.getElementById('appTable').className + ' fadeIn';
          }
          count = true;
        });
    },
    pickOne: function (illnessUrl) {
      r.getAsync(proxy + illnessUrl)
        .then(function ({body}) {
          if (count === true) {
            document.getElementById('illnessContent').style.display = 'block';
            document.getElementById('appTable').style.display = 'none';
            document.getElementById('illnessContent').innerHTML = getHtml(body);
          }
          count = false;
        })
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
    console.log('[{' + body.split('[{')[1].split(']}')[0]);
    return '[{' + body.split('[{')[1].split(']}')[0];
  } else {
    console.log('Pronađeno 0 rezultata');
    process.exit();
  }
}

function getHtml(body) {
  let $ = cheerio.load(body);
  let format = $('.article-container');
  return format;
}