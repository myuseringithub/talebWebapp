 let settingProperty = { 
  location: {
    routeBasePath: "https://taleb.io"
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