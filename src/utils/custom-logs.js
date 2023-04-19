/* eslint-disable */
const logStyles = {
  msg: "background: #2596be; border-radius: 0.5em; color: white; font-weight: bold; padding: 2px 0.5em;",
  warn: "background: #F6cf4d; border-radius: 0.5em; color: black; font-weight: bold; padding: 2px 0.5em;",
  error:
    "background: #Fa7950; border-radius: 0.5em; color: black; font-weight: bold; padding: 2px 0.5em;",
};
const NODE_ENV = process.env.NODE_ENV;

export default {
  // Logs a message with custom styling if mode is not 'production'
  msg: (...args) => {
    if (NODE_ENV && NODE_ENV !== "production") {
      console.log("%c" + "[view-3d-model]", logStyles.msg, ...args);
    }
  },
  // Logs a warning with custom styling if mode is not 'production'
  warn: (...args) => {
    if (NODE_ENV && NODE_ENV !== "production") {
      console.log("%c" + "[view-3d-model] Warning", logStyles.warn, ...args);
    }
  },
  // Logs an error with custom styling if mode is not 'production'
  error: (...args) => {
    if (NODE_ENV && NODE_ENV !== "production") {
      console.log("%c" + "[view-3d-model] Error", logStyles.error, ...args);
    }
  },
};
