import ClientAddBlog from "../Container/Client/ClientBlogs/ClientAddBlog/ClientAddBlog";
import ClientAddProduct from "../Container/Client/ClientProducts/ClientAddProduct/ClientAddProduct";
import ClientBlog from "../Container/Client/ClientBlogs/ClientBlog/ClientBlog";
import ClientEditBlog from "../Container/Client/ClientBlogs/ClientEditBlog/ClientEditBlog";
import ClientEditProduct from "../Container/Client/ClientProducts/ClientEditProduct/ClientEditProduct";
import ClientHome from "../Container/Client/ClientHome/ClientHome";
import ClientProduct from "../Container/Client/ClientProducts/ClientProduct/ClientProduct";
import ClientCategory from "../Container/Client/ClientProducts/ClientCategory/ClientCategory";
import ClientUser from "../Container/Client/ClientUser/ClientUser";
import ClientMenu from "../Container/Client/ClientMenu/ClientMenu";
import ClientMail from "../Container/Client/ClientMail/ClientMail";
import ClientShowCategory from "../Container/Client/ClientCategories/ClientShowCategory/ClientShowCategory";
import ClientAddCategory from "../Container/Client/ClientCategories/ClientAddCategory/ClientAddCategory";
import ClientEditCategory from "../Container/Client/ClientCategories/ClientEditCategory/ClientEditCategory";
import ClientBlogList from "../Container/Client/ClientBlogs/ClientBlogList/ClientBlogList";
import ClientShowListBlogs from "../Container/Client/ClientListBlog/ClientShowListBlogs/ClientShowListBlogs";
import ClientAddListBlog from "../Container/Client/ClientListBlog/ClientAddListBlog/ClientAddListBlog";
import ClientEditListBlog from "../Container/Client/ClientListBlog/ClientEditListBlog/ClientEditListBlog";
import ClientShowNews from "../Container/Client/ClientNews/ClientShowNews/ClientShowNews";
import ClientAddNews from "../Container/Client/ClientNews/ClientAddNews/ClientAddNews";
import ClientEditNews from "../Container/Client/ClientNews/ClientEditNews/ClientEditNews";

export const ClientRoutes = [
  // Home

  {
    index: true,
    element: <ClientHome />,
    path: "/",
  },

  //   Product

  {
    index: true,
    element: <ClientProduct />,
    path: "/product",
  },
  {
    index: true,
    element: <ClientEditProduct />,
    path: "/product/edit/id=:id",
  },
  {
    index: true,
    element: <ClientAddProduct />,
    path: "/product/add",
  },
  {
    index: true,
    element: <ClientCategory />,
    path: "/product/category_id=:id",
  },

  //   Edit Product By Category

  {
    index: true,
    element: <ClientEditProduct />,
    path: "/product/category/edit/id=:id",
  },

  //   Category

  {
    index: true,
    element: <ClientShowCategory />,
    path: "/category",
  },
  {
    index: true,
    element: <ClientAddCategory />,
    path: "/category/add",
  },
  {
    index: true,
    element: <ClientEditCategory />,
    path: "/category/edit/:id",
  },

  //   BLog

  {
    index: true,
    element: <ClientBlog />,
    path: "/blog",
  },
  {
    index: true,
    element: <ClientAddBlog />,
    path: "/blog/add",
  },
  {
    index: true,
    element: <ClientEditBlog />,
    path: "/blog/edit/id=:id",
  },
  {
    index: true,
    element: <ClientBlogList />,
    path: "blog/bloglist_id=:id",
  },
  {
    index: true,
    element: <ClientEditBlog />,
    path: "blog/bloglist_id=:idcate/edit/id=:id",
  },

  //   BlogList

  {
    index: true,
    element: <ClientShowListBlogs />,
    path: "/listblog/",
  },
  {
    index: true,
    element: <ClientAddListBlog />,
    path: "/listblog/add",
  },
  {
    index: true,
    element: <ClientEditListBlog />,
    path: "/listblog/edit/:id",
  },

  //   User

  {
    index: true,
    element: <ClientUser />,
    path: "/user",
  },

  //   Menu

  {
    index: true,
    element: <ClientMenu />,
    path: "/menu",
  },

  // Mail

  {
    index: true,
    element: <ClientMail />,
    path: "/mail",
  },

  // News
  {
    index: true,
    element: <ClientShowNews />,
    path: "/news",
  },

  {
    index: true,
    element: <ClientAddNews />,
    path: "/news/add",
  },

  {
    index: true,
    element: <ClientShowNews />,
    path: "/news",
  },

  {
    index: true,
    element: <ClientEditNews />,
    path: "/news/edit/id=:id",
  },
];
