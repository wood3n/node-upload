export interface Options {
  type: "GET" | "POST";
  url: string;
  async?: boolean;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
  withCredentials?: boolean;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  data?: Document | XMLHttpRequestBodyInit | null;
  onProgress: (e: ProgressEvent) => void;
}

export default function request({
  type,
  url,
  async = true,
  responseType = "json",
  withCredentials = true,
  timeout,
  headers,
  params,
  data,
  onProgress,
  ...rest
}: Options) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, async);
    xhr.responseType = responseType;

    let queryString = "";
    if (params) {
      if (URLSearchParams || window.URLSearchParams) {
        queryString = new URLSearchParams(params).toString();
      } else {
        queryString = Object.keys(params).reduce((result, key) => {
          return `${result}&${key}=${params[key]}`;
        }, "");
      }
    }

    if (queryString) {
      url += url.endsWith("?")
        ? encodeURIComponent(queryString)
        : `?${encodeURIComponent(queryString)}`;
    }

    if (headers) {
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });
    }

    if (timeout) {
      xhr.timeout = timeout;
    }

    xhr.withCredentials = withCredentials;

    xhr.onprogress = onProgress;

    xhr.onloadend = () => {
      // HTTP status code
    };

    xhr.send(data);
  });
}
