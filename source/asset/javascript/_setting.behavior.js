let settingProperty = {
  location: {
    routeBasePath: `${App.config.PROTOCOL}${App.config.HOST}`
  }
}

 const behavior = {
    properties: {
      setting: {
        type: Object,
        value: () => settingProperty
      },
    },
};

export default behavior