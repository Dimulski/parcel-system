import { Ref, ref } from "vue";
import useApi from "./api";
import ParcelItem from "@/models/ParcelItem";

export type UsableParcels = Promise<{ parcels: Ref<ParcelItem[] | undefined> }>;
export type UsableParcel = Promise<{ parcel: Ref<ParcelItem | undefined> }>;
export type UsableCreateParcel = Promise<{ parcel: Ref<ParcelItem | undefined> }>;

export async function useParcels(): UsableParcels {
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

export async function useParcel(id: string): UsableParcel {
  const { request, response: parcel } = useApi<ParcelItem>(
    `https://parcel-system.vercel.app/api/parcels/getParcelById?id=${id}`
  );

  const loaded = ref(false);

  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { parcel };
}

export async function useCreateParcel(parcelInfo: ParcelItem): UsableCreateParcel {
  const { request, response: parcel } = useApi<ParcelItem>(
    "https://parcel-system.vercel.app/api/parcels/createParcel/", {
    method: 'POST',
    body: JSON.stringify(parcelInfo)
  });

  const loaded = ref(false);

  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { parcel };
}

export async function useDeleteParcel(id: string): UsableParcel {
  const { request, response: parcel } = useApi<ParcelItem>(
    `https://parcel-system.vercel.app/api/parcels/deleteParcelById?id=${id}`
  );

  const loaded = ref(false);

  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { parcel };
}
