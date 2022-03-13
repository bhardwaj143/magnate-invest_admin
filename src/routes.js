import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() =>
  import("./component/Dashboard/Default")
);

const UIBasicButton = React.lazy(() =>
  import("./component/UIElements/Basic/Button")
);
const UIBasicBadges = React.lazy(() =>
  import("./component/UIElements/Basic/Badges")
);
const UIBasicBreadcrumbPagination = React.lazy(() =>
  import("./component/UIElements/Basic/BreadcrumbPagination")
);

const UIBasicCollapse = React.lazy(() =>
  import("./component/UIElements/Basic/Collapse")
);
const UIBasicTabsPills = React.lazy(() =>
  import("./component/UIElements/Basic/TabsPills")
);
const UIBasicBasicTypography = React.lazy(() =>
  import("./component/UIElements/Basic/Typography")
);

const FormsElements = React.lazy(() =>
  import("./component/Forms/FormsElements")
);

const BootstrapTable = React.lazy(() =>
  import("./component/User/Tables/UserTable")
);

const Nvd3Chart = React.lazy(() =>
  import("./component/Charts/Nvd3Chart/index")
);

const GoogleMap = React.lazy(() => import("./component/Maps/GoogleMap/index"));

const OtherSamplePage = React.lazy(() =>
  import("./component/Other/SamplePage")
);
const OtherDocs = React.lazy(() => import("./component/Other/Docs"));
const ChangePassword = React.lazy(() =>
  import("./component/Authentication/ChangePassword/ChangePassword")
);
const User = React.lazy(() => import("./component/User/Tables/User"));
const UpdateUser = React.lazy(() =>
  import("./component/User/Update/update")
);
const AddUser = React.lazy(() => import("./component/User/Add/add"));


const Category = React.lazy(() => import("./component/Category/Tables/UserTable"));
const UpdateCategory = React.lazy(() =>
  import("./component/Category/Update/update")
);
const AddCategory = React.lazy(() => import("./component/Category/Add/add"));


const Setting = React.lazy(() => import("./component/Settings/Tables/UserTable"));
const UpdateSetting = React.lazy(() =>
  import("./component/Settings/Update/update")
);
const AddSetting = React.lazy(() => import("./component/Settings/Add/add"));



const ShowAnimal = React.lazy(() => import("./component/Animal/Show/Animal"));

const AnimalTable = React.lazy(() => import("./component/Animal/Table/table"));

const routes = [
  {
    path: "/dashboard",
    exact: true,
    name: "Default",
    component: DashboardDefault,
  },
  {
    path: "/basic/button",
    exact: true,
    name: "Basic Button",
    component: UIBasicButton,
  },
  {
    path: "/basic/badges",
    exact: true,
    name: "Basic Badges",
    component: UIBasicBadges,
  },
  {
    path: "/basic/breadcrumb-paging",
    exact: true,
    name: "Basic Breadcrumb Pagination",
    component: UIBasicBreadcrumbPagination,
  },
  {
    path: "/basic/collapse",
    exact: true,
    name: "Basic Collapse",
    component: UIBasicCollapse,
  },
  {
    path: "/basic/tabs-pills",
    exact: true,
    name: "Basic Tabs & Pills",
    component: UIBasicTabsPills,
  },
  {
    path: "/basic/typography",
    exact: true,
    name: "Basic Typography",
    component: UIBasicBasicTypography,
  },
  {
    path: "/forms/form-basic",
    exact: true,
    name: "Forms Elements",
    component: FormsElements,
  },
  {
    path: "/tables/bootstrap/:page",
    exact: true,
    name: "Bootstrap Table",
    component: BootstrapTable,
  },
  {
    path: "/blog/:page/:search?",
    exact: true,
    name: "Users Table",
    component: BootstrapTable,
  },
  {
    path: "/charts/nvd3",
    exact: true,
    name: "Nvd3 Chart",
    component: Nvd3Chart,
  },
  {
    path: "/maps/google-map",
    exact: true,
    name: "Google Map",
    component: GoogleMap,
  },
  {
    path: "/sample-page",
    exact: true,
    name: "Sample Page",
    component: OtherSamplePage,
  },
  { path: "/docs", exact: true, name: "Documentation", component: OtherDocs },
  {
    path: "/change-password",
    exact: true,
    name: "Change Password",
    component: ChangePassword,
  },
  {
    path: "/blog-detail/:id",
    exact: true,
    name: "User",
    component: User,
  },
  {
    path: "/update-blog/:id",
    exact: true,
    name: "Update User",
    component: UpdateUser,
  },
  { path: "/add-blog", exact: true, name: "Add User", component: AddUser },
  {
    path: "/update-category/:id",
    exact: true,
    name: "Update Category",
    component: UpdateCategory,
  },
  { path: "/add-category", exact: true, name: "Add Category", component: AddCategory },
  {
    path: "/category/:page/:search?",
    exact: true,
    name: "Category Table",
    component: Category,
  },


  {
    path: "/update-setting/:id",
    exact: true,
    name: "Update Setting",
    component: UpdateSetting,
  },
  { path: "/add-setting", exact: true, name: "Add Setting", component: AddSetting },
  {
    path: "/setting/:page/:search?",
    exact: true,
    name: "Setting Table",
    component: Setting,
  },


  {
    path: "/animal-detail/:id",
    exact: true,
    name: "Show Animal",
    component: ShowAnimal,
  },
  {
    path: "/animals/:page/:search?",
    exact: true,
    name: "Animals Table",
    component: AnimalTable,
  },
];

export default routes;
