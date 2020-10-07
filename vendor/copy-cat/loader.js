requirejs.config({
    urlArgs: (_, url) => url.startsWith("https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0") || url.includes("-")
        ? ""
        : "?v=b9a7ca29b6ccf3969aa20255c433f72941cde64a",
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min/vs",
    },
});
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.MonacoEnvironment = {
    getWorkerUrl: (_workerId, _label) => `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.MonacoEnvironment = {
        baseUrl: "https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min/"
      };
      importScripts("https://cdn.jsdelivr.net/npm/monaco-editor@0.20.0/min/vs/base/worker/workerMain.js");
    `)}`,
};
/* tslint:disable:no-var-requires */
require(["./main"], (main) => main());
