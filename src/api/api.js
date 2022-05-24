import { callApi } from "../config/configApi";
const server = "http://localhost:8000/api/";
// import { useSelector } from "react-redux";

// const access_token = localStorage.getItem("token");

export const clientApi = {
  // Api Product
  productShow() {
    return callApi(`${server}product/index`);
  },
  productShowById(id) {
    return callApi(`${server}product/show/${id}`);
  },
  productShowByCategoryId(id) {
    return callApi(`${server}product/show/category/${id}`);
  },
  productEdit(id, data) {
    return callApi(`${server}product/update/${id}`, "POST", data);
  },
  productAdd(data) {
    return callApi(`${server}product/store`, "POST", data);
  },
  productDelete(id) {
    return callApi(`${server}product/delete/${id}`, "DELETE");
  },
  productPagination(page, limit) {
    return callApi(`${server}product/paginate/${limit}?page=${page}`);
  },
  productPaginationByCategoryId(id, page, limit) {
    return callApi(
      `${server}product/category/${id}/paginate-${limit}?page=${page}`
    );
  },

  // End Api Product

  // Api Category
  categoryShow() {
    return callApi(`${server}category/index`);
  },
  categoryShowById(id) {
    return callApi(`${server}category/show/${id}`);
  },
  categoryEdit(id, data) {
    return callApi(`${server}category/update/${id}`, "POST", data);
  },
  categoryAdd(data) {
    return callApi(`${server}category/store`, "POST", data);
  },
  categoryDelete(id) {
    return callApi(`${server}category/delete/${id}`, "DELETE");
  },

  // End Api Category

  // Api Blog
  blogShow() {
    return callApi(`${server}blog/index`);
  },
  blogShowById(id) {
    return callApi(`${server}blog/show/${id}`);
  },
  blogShowByListBlogId(id) {
    return callApi(`${server}blog/show/listblog/${id}`);
  },
  blogEdit(id, data) {
    return callApi(`${server}blog/update/${id}`, "POST", data);
  },
  blogDisplay(id, display) {
    return callApi(`${server}blog/updateDisplay/${id}`, "POST", display);
  },
  blogAdd(data) {
    return callApi(`${server}blog/store`, "POST", data);
  },
  blogDelete(id) {
    return callApi(`${server}blog/delete/${id}`, "DELETE");
  },
  blogPagination(page, limit) {
    return callApi(`${server}blog/paginate/limit-${limit}?page=${page}`);
  },
  blogPaginationByBlogListId(id, page, limit) {
    return callApi(`${server}blog/list-${id}/paginate-${limit}?page=${page}`);
  },

  // End Api Blog

  // Api List Blog

  listBlogShow() {
    return callApi(`${server}listblog/index`);
  },
  listBlogShowById(id) {
    return callApi(`${server}listblog/show/${id}`);
  },
  listBlogAdd(data) {
    return callApi("${server}listblog/store", "POST", data);
  },
  listBlogEdit(id, data) {
    return callApi(`${server}listblog/update/${id}`, "POST", data);
  },
  listBlogDelete(id) {
    return callApi(`${server}listblog/delete/${id}`, "DELETE");
  },

  // End Api List Blog

  // Api Menu

  menuShow() {
    return callApi(`${server}menu/index`);
  },
  menuShowId(id) {
    return callApi(`${server}menu/show/${id}`);
  },
  menuEdit(id, data) {
    return callApi(`${server}menu/update/${id}`, "POST", data);
  },
  menuShowAdd(data) {
    return callApi(`${server}menu/store`, data);
  },
  menuShowDelete(id) {
    return callApi(`${server}menu/delete/${id}`, "DELETE");
  },

  // End Api Menu

  // Api Message

  // Api Message

  messageShow() {
    return callApi(`${server}client-message`);
  },
  messageShowById(id) {
    return callApi(`${server}client-message/${id}`);
  },
  messageUpdateStatus(id, status) {
    return callApi(`${server}client-message/update/${id}`, "POST", status);
  },
  messagePagination(page, limit) {
    return callApi(
      `${server}client-message/paginate/limit/${limit}?page=${page}`
    );
  },

  // End Api Message

  // Api News

  newsShow() {
    return callApi(`${server}news/index`);
  },
  newsDisplay(id, data) {
    return callApi(`${server}news/${id}`, "POST", data);
  },
  newsDelete(id) {
    return callApi(`${server}news/${id}`, "DELETE");
  },
  listNewsShow() {
    return callApi(`${server}listNews/index`);
  },

  // End Api News
};
