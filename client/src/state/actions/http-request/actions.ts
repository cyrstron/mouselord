import axios, {AxiosRequestConfig} from 'axios';

export type HttpRequestOptions = AxiosRequestConfig;
export type RequestOptions = Omit<HttpRequestOptions, 'method'>;

export const httpRequest = async <Response>(
  options: HttpRequestOptions,
): Promise<Response> => {
  try {
    const {data} = await axios.request<Response>(options);

    return data;
  } catch (err) {
    const {data} = err.response;

    throw new Error(data);
  }
};

export const getRequest = <Response>(
  options: RequestOptions,
): Promise<Response> => httpRequest<Response>({
  ...options,
  method: 'GET',
});

export const postRequest = <Response>(
  options: HttpRequestOptions,
): Promise<Response> => httpRequest<Response>({
  ...options,
  method: 'POST',
});

export const putRequest = <Response>(
  options: HttpRequestOptions,
): Promise<Response> => httpRequest<Response>({
  ...options,
  method: 'PUT',
});

export const deleteRequest = <Response>(
  options: RequestOptions,
): Promise<Response> => httpRequest<Response>({
  ...options,
  method: 'DELETE',
});
