// @ts-nocheck
import qs from "qs";
import { METHOD as baseMETHOD } from "./../constants";

export const fetchInstant = (url, method, payload, params, configHeader) => {
  /**
   *
   * @param {url} => router API muốn call
   * @param {payload} => dữ liệu muốn truyền lên API qua body
   * @param {configHeader} => các option cho header khi gọi API: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
   * @param {params} => param muốn truyền lên API cho method GET
   * @param {method} => phương thức muốn gọi lên API
   *
   *
   */
  const baseURL = process.env.REACT_APP_BASE_URL;
  let urlParse = baseURL + url;
  let METHOD = baseMETHOD.GET;
  let bodyJSON = {};
  let defaultHeader = {
    "Content-Type": "application/json",
    Accept:
      "text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": true,
  };

  switch (method) {
    case baseMETHOD.GET:
      urlParse += `?${qs.stringify(params)}`;
      break;
    case baseMETHOD.POST:
      METHOD = baseMETHOD.POST;
      bodyJSON = payload;
      break;
    case baseMETHOD.PUT:
      METHOD = baseMETHOD.PUT;
      bodyJSON = payload;
      break;
    case baseMETHOD.DELETE:
      METHOD = baseMETHOD.DELETE;
      bodyJSON = payload;
      break;

    default:
      break;
  }
  let bodyFetch = {
    method: METHOD,
    headers: { ...defaultHeader, ...configHeader },
  };
  if (METHOD !== baseMETHOD.GET) {
    bodyFetch["body"] = JSON.stringify(bodyJSON);
  }
  console.log(urlParse);

  const fetchRequest = fetch(urlParse, bodyFetch);

  return fetchRequest.then((res) => res.json());
};
