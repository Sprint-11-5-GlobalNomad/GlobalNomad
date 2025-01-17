import axios, {
  AxiosError,
  AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import { GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession, signIn } from "next-auth/react";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      refreshToken?: string;
    };
  }
}

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export const requestor: AxiosInstance = axios.create(axiosRequestConfig);

let context = <GetServerSidePropsContext>{};

export const setContext = (_context: GetServerSidePropsContext) => {
  context = _context;
};

const updateSession = async (data: {
  accessToken: string;
  refreshToken: string;
  user: Session["user"];
}) => {
  await signIn("credentials", {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
    id: data.user?.id,
    image: data.user?.image,
    name: data.user?.name,
    email: data.user?.email,
    redirect: false,
  });
};

requestor.interceptors.request.use(
  async (config) => {
    const session = await getSession(context);

    if (!session || !session.user?.accessToken) {
      return config;
    }

    config.headers.Authorization = `Bearer ${session.user.accessToken}`;

    return config;
  },
  (error: AxiosError) => {
    // 요청 에러 처리
    console.log(error.message);
    return Promise.reject(error);
  }
);

requestor.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const { config, response } = error;

    if (
      response &&
      response.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      const originalRequest = config;
      const session = await getSession(context);

      try {
        if (!session) throw new Error();
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}auth/tokens`,
          {},
          {
            headers: {
              Authorization: `Bearer ${session?.user?.refreshToken}`,
            },
          }
        );

        updateSession({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: session.user,
        });

        originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
        return axios(originalRequest);
      } catch (e) {
        window.location.replace("/auth/sign-in");
      }
    }

    console.log(error.message);
    return Promise.reject(error);
  }
);

export const requestorWithFormData: AxiosInstance = axios.create({
  ...axiosRequestConfig,
  headers: {
    ...axiosRequestConfig.headers,
    "Content-Type": "multipart/form-data",
  },
});

requestorWithFormData.interceptors.request.use(async (config) => {
  if (config.headers.Authorization) return config;

  const session = await getSession(context);
  if (session?.user?.accessToken) {
    config.headers["Authorization"] = `Bearer ${session?.user?.accessToken}`;
  }
  return config;
});

requestorWithFormData.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const session = await getSession(context);
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      session?.user?.refreshToken
    ) {
      const res = await requestorWithFormData.post(
        "/auth/tokens",
        {},
        {
          headers: {
            Authorization: `Bearer ${session?.user?.refreshToken}`,
            _retry: true,
          },
        }
      );
      const accessToken = res.data.accessToken;
      const nextRefreshToken = res.data.refreshToken;

      updateSession({
        accessToken,
        refreshToken: nextRefreshToken,
        user: session.user,
      });
      originalRequest._retry = true;

      return requestorWithFormData(originalRequest);
    }
    return Promise.reject(error);
  }
);
