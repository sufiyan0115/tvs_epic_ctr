import { API_URL } from "../../config/constants";

export const UrlGenerator = (
  page: number,
  name: string,
  limit: number = 10
) => {
  return `${API_URL}template/${name}?page=${page}&limit=${limit}`;
};

export const navigateUrlGenerator = (page: number) => {
  return `/template/draft/preview?page=${page}`;
};
