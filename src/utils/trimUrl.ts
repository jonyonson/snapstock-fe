export default function (url: string) {
  url = url.replace(/(^\w+:|^)\/\//, ''); // remove `http(s)://`
  url = url.replace('www.', ''); // remove www.
  url = url.replace(/\/$/, ''); // remove trailing slash
  return url;
}
