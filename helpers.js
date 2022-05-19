// this will contain functions that we reuse over and over again in our project
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async url => {
  try {// will do fetching and converting to JSON all in one step
  const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);// there'll be a race between this fetch function and the timeout function
  // as soon as a promise in the race rejects or fulfills, that promise becomes the winner
  const data = await res.json(); // json returns another promise which we would have to await again

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;//data will be the resolved value of the promise that getJSON returns
  } catch(err) {
    // rethrow the error to catch it somewhere else
    throw err;
    // now the promise that's being returned from getJSON will reject
    // we've propagated the error down from one async function to the other by rethrowing the error 
  }
};
