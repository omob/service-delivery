import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dns: "https://3af2b9ed01b34a348406cbede132e4f9@sentry.io/2600057"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
