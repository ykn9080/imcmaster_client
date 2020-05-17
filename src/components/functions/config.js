const server_url = {
  dockermachine: "http://192.168.99.100:3001/",
  local: "http://localhost:3001/",
  docean: "http://imcmaster.pro:3001/",
  namubuntu: "http://imcmaster.iptime.org:3001/",
};
const current_url = server_url.docean;
const currentsetting = {
  passporturl: current_url,
  webserviceprefix: current_url,
  googlekey: "AIzaSyBIJnp5VXSiVEAr8xPM7-OWAYRfdYtlbV0",
};

//collection of global variable for Redux store initvalue
const globalVar = {
  googlekey: currentsetting.googlekey, //"AIzaSyBIJnp5VXSiVEAr8xPM7-OWAYRfdYtlbV0"
  passporturl: currentsetting.passporturl, //"http://localhost:3001",
  webserviceprefix: currentsetting.webserviceprefix, //"http://localhost:3001/",//"http://www.imcmaster.co.kr/webservice.asmx/",
  fixedStr: ["$comp", "$name", "$id", "$boss", "$division", "$position"],
  fixedPeriod: [
    "$thisYear",
    "$thisQuarter",
    "$thisMonth",
    "$thisWeek",
    "$thisWeednumber",
    "$Today",
    "$Yesterday",
    "$Tomorrow",
  ],
  
  convertlist: ["en:us", "cn:zh-cn", "cn:zh-tw", "jp:ja"],
  connecthead: [
    "code",
    "dbtype",
    "server",
    "database",
    "port",
    "user",
    "password",
  ],
  openDialog: false,
  openDialog1: false,
  formEdit: false,
  elementData: "",
  formData: [],
  currentData: "",
  treeData: "",
  login: "",
  token: "",
  selectedKey: "",
  currentPage: "",
  tempMenu: [],
  menu: [],
  adminmenu: [],
  openmenu: [],
  menuedit: false,
  showSidebar: true,
  apiUrl: "",
};

export { currentsetting, globalVar };
