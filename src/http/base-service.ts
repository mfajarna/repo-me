import axios, { Method } from 'axios';

type BaseServiceType = {
  path: string;
  method: Method;
  bodyReq?: unknown;
  params?: unknown;
  signal?: AbortSignal;
  timeout?: number;
};

const instance = axios.create({
  timeout: 10000,
});

export default async function BaseService({
  path,
  method,
  bodyReq,
  signal,
  timeout,
  params,
}: BaseServiceType) {
  const url = 'https://api.github.com' + path;

  return instance
    .request({
      method,
      url,
      params,
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
      data: bodyReq,
      signal,
      timeout,
    })
    .then((res) => {
      const result = res.data;

      return result;
    });
}
