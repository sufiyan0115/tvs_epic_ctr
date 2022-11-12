import { API_URL } from "../../config/constants";

export const UrlGenerator = (
  page: number,
  name: string,
  search: string,
  limit: number = 10
) => {
  return `${API_URL}template/${name}?page=${page}&limit=${limit}&search=${search}`;
};

export const navigateUrlGenerator = (page: number, search: string = "") => {
  return `/template/draft/preview?page=${page}&search=${search}`;
};
