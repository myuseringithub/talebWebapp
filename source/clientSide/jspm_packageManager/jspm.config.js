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
    "justinfagnani/mixwith.js": "github:justinfagnani/mixwith.js@master"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "css": "github:systemjs/plugin-css@0.1.32",
    "html": "github:Hypercubed/systemjs-plugin-html@0.0.8",
    "json": "github:systemjs/plugin-json@0.3.0",
    "underscore": "npm:underscore@1.8.3"
  },
  packages: {
    "github:Hypercubed/systemjs-plugin-html@0.0.8": {
      "map": {
        "webcomponentsjs": "github:webcomponents/webcomponentsjs@0.7.24"
      }
    }
  }
});
