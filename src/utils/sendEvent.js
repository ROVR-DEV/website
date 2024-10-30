import { getDeviceDate } from "./getDeviceDate";

export function sendEvent(eventName, additionalParams = {}) {
  const defaultParams = {
    os: "web",
    os_version: getOSVersion(),
    model: getDeviceModel(),
    gmt: getUserGMT(),
    device_date: getDeviceDate(),
    app_version: "",
    app_build: "",
    user_login: "",
    token: "1e10f824-8fb2-4951-9815-d84d7bb141f5",
    player_started: "",
    current_playing_stream: "",
    current_playing_program: "",
    current_playing_curator: "",
    current_playing_track: "",
    uptime: "",
  };

  const params = { ...defaultParams, ...additionalParams };
  console.log(params);
  // gtag('event', eventName, params);
}

function getUserGMT() {
  return new Date().toString().match(/GMT[+-]\d{2}/)[0];
}

function getOSVersion() {
  const userAgent = navigator.userAgent;
  let osVersion = "";

  if (/Windows/.test(userAgent)) {
    osVersion = /Windows NT ([\d.]+)/.exec(userAgent)?.[1] || "Unknown";
  } else if (/Mac OS X/.test(userAgent)) {
    osVersion = /Mac OS X ([\d_]+)/.exec(userAgent)?.[1].replace(/_/g, '.') || "Unknown";
  } else if (/Android/.test(userAgent)) {
    osVersion = /Android ([\d.]+)/.exec(userAgent)?.[1] || "Unknown";
  } else if (/iPhone OS/.test(userAgent)) {
    osVersion = /iPhone OS ([\d_]+)/.exec(userAgent)?.[1].replace(/_/g, '.') || "Unknown";
  } else {
    osVersion = "Unknown";
  }

  return osVersion;
}

function getDeviceModel() {
  const userAgent = navigator.userAgent;
  let model = "Unknown";

  if (/iPhone/.test(userAgent)) {
    model = "iPhone";
  } else if (/iPad/.test(userAgent)) {
    model = "iPad";
  } else if (/Android/.test(userAgent)) {
    model = "Android Device";
  } else if (/Windows/.test(userAgent)) {
    model = "Windows PC";
  } else if (/Macintosh/.test(userAgent)) {
    model = "Mac";
  }

  return model;
}
