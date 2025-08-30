const urlInput = document.getElementById("js-url--input");
const parseBtn = document.getElementById("js-url--parse-btn");

const urlHash = document.getElementById("js-url--hash");
const urlHost = document.getElementById("js-url--host");
const urlHostname = document.getElementById("js-url--hostname");
const urlHref = document.getElementById("js-url--href");
const urlOrigin = document.getElementById("js-url--origin");
const urlPathname = document.getElementById("js-url--pathname");
const urlProtocol = document.getElementById("js-url--protocol");
const urlSearch = document.getElementById("js-url--search");

parseBtn.addEventListener("click", function () {
  const hasSupport = () => Boolean("URL" in window);

  if (!hasSupport()) {
    console.error("URL API is not supported by this browser");
    return;
  }

  let inputValue = urlInput?.value?.trim();

  if (!inputValue) {
    urlHash.value = "";
    urlHost.value = "";
    urlHostname.value = "";
    urlHref.value = "";
    urlOrigin.value = "";
    urlPathname.value = "";
    urlProtocol.value = "";
    urlSearch.value = "";
    return;
  }

  let urlString = inputValue.match(/^https?:\/\//i)
    ? inputValue
    : `https://${inputValue}`;

  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    urlHash.value = "URL inválida";
    urlHost.value = "";
    urlHostname.value = "";
    urlHref.value = "";
    urlOrigin.value = "";
    urlPathname.value = "";
    urlProtocol.value = "";
    urlSearch.value = "";
    return;
  }

  urlHash.value = url.hash;
  urlHost.value = url.host;
  urlHostname.value = url.hostname;
  urlHref.value = url.href;
  urlOrigin.value = url.origin;
  urlPathname.value = url.pathname;
  urlProtocol.value = url.protocol;
  urlSearch.value = url.search;
});
