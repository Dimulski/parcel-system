import { Ref, ref } from "vue";
import useApi from "./api";
import ParcelItem from "@/models/ParcelItem";

export type UsableParcels = Promise<{ parcels: Ref<ParcelItem[] | undefined> }>;

export default async function useParcels(): UsableParcels {
  const { request, response: parcels } = useApi<ParcelItem[]>(
    "https://parcel-system.vercel.app/api/parcels/getParcels/"
  );

  const loaded = ref(false);

  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { parcels };
}
