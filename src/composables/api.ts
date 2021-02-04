import { ref, Ref } from "vue";

export type ApiRequest = () => Promise<void>;

export interface UsableAPI<T> {
  request: ApiRequest;
  response: Ref<T | undefined>;
}

export default function useApi<T>(url: RequestInfo, options?: RequestInit): UsableAPI<T> {
  const response: Ref<T | undefined> = ref();

  const request: ApiRequest = async () => {
    const res = await fetch(url, options);
    const data = await res.json();

    response.value = data;
  };

  return { request, response };
}
