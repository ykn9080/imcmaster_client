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
  imapp: true,
  googlekey: currentsetting.googlekey, //"AIzaSyBIJnp5VXSiVEAr8xPM7-OWAYRfdYtlbV0"
  passporturl: currentsetting.passporturl, //"http://localhost:3001",
  webserviceprefix: currentsetting.webserviceprefix, //"http://localhost:3001/",//"http://www.imcmaster.co.kr/webservice.asmx/",
  output: 0,
  contType: "afterlogin",
  menuid: "1",
  subid: "",
  umenuid: "",
  usubid: "",
  omenuid: "",
  osubid: "",
  mtogg: "",
  hpcd: "",
  pfx: "./js/",
  extlink: [],
  jsonlang: "",
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
  mycomp: "",
  jsonlist: "",
  cnt: 0,
  evval: eval,
  datareturn: "",
  status: false,
  ctrcode: "",
  datacode: "",
  dfilter: "",
  readydt: "",
  dlistsrc: "",
  myDiagram: "",
  objectfinder: "",
  pstatus: "",
  cdbmap: {},
  rtndata: "",
  onlyonce: 0,
  exceldatalist: "",
  inputobj: {},
  inputlist: [],
  alaobject: {},
  btntype: "",
  // ,axios.defaults.headers.common:{
  // Authorization:`bearer`+localStorage.getItem("token")
  // },
  ajaxrtn: "",
  ajaxconsolertn: "",
  defconnect: "", //accessweb.configconnectionstrandfectchinpageInit(
  datartnctr: "", //controlthatcanreturndatacode
  pinstatus: false,
  numcnt: 0,
  fullwin: false,
  cursor: [0, 0],
  originopt: "",
  elementparent: "",
  originw: "",
  originh: "",
  eventregister: [],
  originaldialogcss: "",
  isorigin: true,
  delsure: false,
  menutoggle: "",
  modulearray: [],
  moduleobj: { code: "basic", name: "basic" },
  DELAY: 700,
  clicks: 0,
  timer: null,
  umenuid: "",
  usubid: "",
  omenuid: "",
  osubid: "",
  mtogg: "",
  hpcd: "",
  timestamp: "",
  mycompmodule: "basic",
  wordlist: [],
  tranresult: [],
  selecticon: "",
  isoflag: [],
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
  clientid: "",
  selcode: "",
  hlist: [],
  eventparam: {},
  helpdiagramobj: "",
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
