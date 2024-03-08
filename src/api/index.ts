import http from "@/utils/http";

type Response = {
  result: any;
  status: string;
  messag: string;
};

export const getInviteByAddress = (account: string): Promise<Response> =>
  http.get(`/invite/${account}`);

export const BASE_URL_API = '/api'
export const BASE_URL_POINTS = '/points'

export type BindInviteCodeWithAddressParams = {
  address: string;
  code?: string | null;
  signature: string;
  twitterName: string;
  twitterHandler: string;
};
export const bindInviteCodeWithAddress = (
  data: BindInviteCodeWithAddressParams
) => {
  console.log(data);
  if (!data.code) {
    delete data.code;
  }
  return http.post("/api/invite/bind/twitter", {
    ...data,
  });
};

export const checkInviteCode = (code: string): Promise<Response> => {
  return http.get(`/api/invite/validCode`, {
    params: {
      code,
    },
  });
};


export const getInvite = (address: string): Promise<Response> => http.get(`${BASE_URL_API}/invite/${address}`)

export const getReferrer = (address: string): Promise<Response> => http.get(`${BASE_URL_API}/referrer/${address}`)

export const getAccounTvl = (address: string): Promise<Response> => http.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccounTvl`, {
    params: { address }
})

export const getAccountPoint = (address: string): Promise<Response> => http.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccountPoint`, {
    params: { address }
})

export const getTotalTvl = (): Promise<Response> => http.get(`${BASE_URL_POINTS}/addressTokenTvl/getTotalTvl`)
export const getActiveAccounts = (): Promise<Response> => http.get(`${BASE_URL_API}/invite/getActiveAccounts`)

export const getAccountTvl = (address: string): Promise<Response> => http.get(`${BASE_URL_POINTS}/addressTokenTvl/getAccounTvl`, {
    params: {
        address
    }
})

export const getGroupTvl = (address: string): Promise<Response> => http.get(`${BASE_URL_POINTS}/addressTokenTvl/getGroupTvl`, {
    params: {
      address,
    },
  });

export const getTotalTvlByToken = (): Promise<Response> => http.get(`${BASE_URL_POINTS}/addressTokenTvl/getTotalTvlByToken`)

export const getReferralTvl = (address: string): Promise<Response> => http.get(`${BASE_URL_POINTS}/addressTokenTvl/getReferralTvl`, {
    params: { address }
})