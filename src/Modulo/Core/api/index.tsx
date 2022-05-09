import axios, { AxiosInstance } from "axios";

export type ApiResponseMensageError = {
  type: string;
  description: string | object;
};

export type ApiResponseError = {
  statusCode?: number;
  error: ApiResponseMensageError | null;
};

export const ApiFetchInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: "http://site.cms.it",
  });
};

export const ApiSite = (): AxiosInstance => {
  return axios.create({
    baseURL: "http://site.cms.it",
  });
};
