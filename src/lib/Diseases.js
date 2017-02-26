'use strict';

import request from 'request';
import urlJoin from 'url-join';
import { stringify } from 'qs';
import Promise from 'bluebird';

const r = Promise.promisifyAll(request);

const baseUrl = 'http://www.plivazdravlje.hr';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

const proxy = (...url) => urlJoin(proxyUrl, ...url);

class Diseases {
  static getDescription(disease={}) {
    let url = proxy(disease.url);
    return r.getAsync(url)
      .then(({ body }) => extractDescription(body));
  }

  static search(query='') {
    let url = proxy(baseUrl, '/prirucnik-bolesti');
    let qs = stringify({ plivahealth: { chAjaxQuery: query }});
    return r.getAsync({ url, qs })
      .then(({ body }) => {
        let diseases = parseSearchResults(body);
        diseases.forEach(it => it.url = urlJoin(baseUrl, it.url));
        return diseases;
      });
  }
}

Diseases.baseUrl = baseUrl;
export default Diseases;

function parseSearchResults(body) {
  let jsonStr = body.split(/\n(?=\[)/g)[1] || '[]';
  return JSON.parse(jsonStr);
}

function extractDescription(body) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(body, 'text/html');
  let $desc = doc.querySelector('.article-container');
  return $desc ? $desc.innerHTML : '';
}
