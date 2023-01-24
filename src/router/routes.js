import {CityInfo,Home}  from "../Views"

const routes = [
  { path: "/", component: Home },
  {
    path: "/weather/:city",
    component: CityInfo,
    props: true,
  },
];
export{routes};