import axios, { AxiosInstance, AxiosResponse } from "axios";
import _ from "lodash";
import { onValidationError } from "../main";
const API_URL = process.env.REACT_APP_API_URL
export type RequestMethods = "get" | "post" | "patch" | "delete";

const Request = async (method: RequestMethods, endpoint: string, data = {}) => {
    const API: AxiosInstance = axios.create({
        baseURL: API_URL,
        params: {
            token: localStorage.getItem("token") || null
        }
    });
    try {
        const response = await API[method].call(API, endpoint, data) as AxiosResponse;
        return response.data.data;
    } catch (error) {
        const err = error as {response: AxiosResponse};
        if(err?.response?.data){
            const e = _.has(err, "response.data.message") ? err.response.data.message : error;
            if(e === "Validation Error"){
                onValidationError(err.response.data)
            }
            return Promise.reject(e);
        }
    }
}


export default {
    App: {
        statistics: async () => await Request("get", "app/statistics")
    },
    APIKeys: {
        find: async () => await Request("get", "apiKeys/find")
    },
    Users: {
        find: async (data) => await Request("post", "user/find", data),
        create: async (data) => await Request("post", "user/create", data),
        update: async (id, data) => await Request("post", `user/update/${id}`, data),
    },
    Auth: {
        login: async (data) => await Request("post", "auth/login", data),
        me: async () => await Request("get", "auth/me"),
        selfEdit: async (data) => await Request("post", "auth/selfEdit", data),
    },
    Namespace: {
        find: async (data) =>  await Request("get", "namespace/find", data),
        update: async (slug, data) => await Request("post", `namespace/update/${slug}`, data),
        create: async (data) => await Request("post", `namespace/create`, data)
    },
    Language: {
        find: async (data) =>  await Request("get", "language/find", data),
        update: async (locale, data) => await Request("post", `language/update/${locale}`, data),
        create: async (data) => await Request("post", `language/create`, data)
    },
    Translation: {
        find: async (data) =>  await Request("post", "translation/find", data),
        bulkUpdate: async (data) =>  await Request("post", "translation/bulkUpdate", data),
        bulkCreate: async (data) =>  await Request("post", "translation/bulkCreate", data),
        bulkRemove: async (data) =>  await Request("post", "translation/bulkRemove", data),
    },
    Import: async (data) =>  await Request("post", "import", data)
}