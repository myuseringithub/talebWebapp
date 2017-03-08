SystemJS.config({
  paths: {
    "npm:": "jspm_packages/npm/",
    "github:": "jspm_packages/github/",
    "bower:": "jspm_packages/bower/",
    "app/": ""
  },
  devConfig: {
    "map": {
      "plugin-babel": "npm:systemjs-plugin-babel@0.0.21"
    }
  },
  transpiler: "plugin-babel",
  packages: {
    "app": {
      "main": "app.js",
      "meta": {
        "*.js": {
          "loader": "plugin-babel"
        }
      }
    }
  },
  map: {
    "webcomponents/webcomponentsjs": "github:webcomponents/webcomponentsjs@1.0.0-rc.4",
    "Polymer/polymer": "github:Polymer/polymer@2.0-preview"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "polymer@2.0-preview": "github:Polymer/polymer@2.0-preview",
    "css": "github:systemjs/plugin-css@0.1.32",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "json": "github:systemjs/plugin-json@0.3.0",
    "underscore": "npm:underscore@1.8.3",
    "webcomponentsjs": "github:webcomponents/webcomponentsjs@1.0.0-rc.4"
  },
  packages: {
    "github:Hypercubed/systemjs-plugin-html@0.0.8": {
      "map": {
        "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.24"
      }
    }
  }
});
