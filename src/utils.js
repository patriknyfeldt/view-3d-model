const logStyles = {
  msg: "background: #2596be; border-radius: 0.5em; color: white; font-weight: bold; padding: 2px 0.5em;",
  warn: "background: #F6cf4d; border-radius: 0.5em; color: white; font-weight: bold; padding: 2px 0.5em;",
  error:
    "background: #Fa7950; border-radius: 0.5em; color: black; font-weight: bold; padding: 2px 0.5em;",
};
export default {
  msg: (...args) => {
    console.log("%c" + "[view-3d-model]", logStyles.msg, ...args);
  },
  warn: (...args) => {
    console.log("%c" + "[view-3d-model] Warning", logStyles.warn, ...args);
  },
  error: (...args) => {
    console.log("%c" + "[view-3d-model] Error", logStyles.error, ...args);
  },
};
