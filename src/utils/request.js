import { config } from "../config";

const { API_KEY, API_URL } = config;

export const objectToParams = (params) => {
  if (params !== null)
    return Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");
  else return "";
};

export async function client(
  endpoint,
  { body, params, url, ...customConfig } = {}
) {
  let headers = {};
  let finalEndpoint = endpoint;
  let finalUrl = API_URL;
  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  if (params) {
    finalEndpoint = `${endpoint}?${objectToParams({
      ...params,
      appid: API_KEY,
    })}`;
  }

  if (url) {
    finalUrl = url;
  }
  let data;
  try {
    const response = await window.fetch(`${finalUrl}${finalEndpoint}`, config);
    data = await response.json();
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      };
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};
