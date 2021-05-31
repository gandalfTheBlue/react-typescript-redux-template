// @ts-nocheck
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';

const methods = ['get', 'head', 'post', 'put', 'delete', 'options', 'patch'];
const paramsMethods = ['get'];
const ResponseOKCode = 0;

type Params =
  | {
      [params: string]: unknown;
    }
  | undefined
  | FormData;

interface Headers {
  'Content-Type': 'application/x-www-form-urlencoded' | 'application/json';
}

const defaultHeaders = {
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

class Api {
  constructor() {
    methods.forEach(
      (method) =>
        (this[method] = (path, data = {}, headers = {}) =>
          new Promise((resolve, reject) => {
            const config = {
              headers: {
                ...defaultHeaders,
                ...headers,
              },
            };
            data =
              paramsMethods.indexOf(method) !== -1
                ? { params: data, ...config }
                : data;

            if (
              config.headers['Content-Type'] ===
              'application/x-www-form-urlencoded'
            ) {
              data = qs.stringify(data);
            }

            this.doFetch(method, path, data, config, resolve, reject);
          }))
    );
  }

  doFetch(method, path, requestData, config, resolve, reject) {
    config.headers.Authorization = localStorage.getItem('Authorization') ?? '';
    let payload = requestData;
    if (method === 'delete') {
      payload = { data: requestData, headers: config.headers };
    }

    axios[method](this.buildPath(path), payload, config)
      .then(({ data }) => {
        if (data.code === ResponseOKCode) {
          resolve(data.data);
        } else {
          message.error(data.msg);
          reject(data);
        }
      })
      .catch(async (error) => {
        if (error.response) {
          const {
            response: { data },
          } = error;

          if (data.status === 401) {
            // @todo logout
            return;
          }

          if (data.status >= 500) {
            const errorMsg = data.message || `Server error[${data.status}]`;
            reject({
              message: errorMsg,
            });
            message.error(errorMsg);
            return;
          }

          reject(data);
          return;
        }

        reject(error);
      });
  }

  /**
   * To switch the endpoint from different env, we use the apiTag to represent api calls for backend.
   * And here replace the apiTag by current env's endpoint url
   *
   * @param path relative api path
   * @returns real endpoint path
   */
  buildPath(path: string) {
    const apiTag = '/api';
    return `${process.env.REACT_APP_API_URL}${path.replace(apiTag, '')}`;
  }
}

function generalApi(method: string) {
  return function <K>(path: string, params?: Params, headers?: Headers): K {
    return new Api()[method](path, params, headers);
  };
}

const api = {
  get: generalApi('get'),
  put: generalApi('put'),
  post: generalApi('post'),
  delete: generalApi('delete'),
};

export default api;
