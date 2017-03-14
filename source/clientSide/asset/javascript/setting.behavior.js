 let settingProperty = { 
  location: {
    routeBasePath: "http://localhost"
  }
}
 
 const settingBehavior = {
    properties: {
      setting: {
        type: Object,
        value: () => settingProperty
      },
    },
};

export default settingBehavior