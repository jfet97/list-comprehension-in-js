module.exports = {
  presets: [
    ["@babel/env"],
    ["minify", {
      "keepFnName": true
    }]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime"]
  ]
};