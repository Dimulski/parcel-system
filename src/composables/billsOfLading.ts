import { Ref, ref } from "vue";
import useApi from "./api";
import BillOfLading from "@/models/BillOfLading";

export type UsableBill = Promise<{ bill: Ref<BillOfLading | undefined> }>;
export type UsableCreateBillOfLading = Promise<{ bill: Ref<BillOfLading | undefined> }>;

export async function useBillOfLading(id: string): UsableBill {
  const { request, response: bill } = useApi<BillOfLading>(
    `https://parcel-system.vercel.app/api/billsOfLading/getBillById?id=${id}`
  );

  const loaded = ref(false);

  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { bill };
}

export async function useCreateBillOfLading(billInfo: BillOfLading): UsableCreateBillOfLading {
  const { request, response: bill } = useApi<BillOfLading>(
    "https://parcel-system.vercel.app/api/billsOfLading/createBillOfLading", {
    method: 'POST',
    body: JSON.stringify(billInfo)
  });

  const loaded = ref(false);

  if (loaded.value === false) {
    await request();
    loaded.value = true;
  }

  return { bill };
}
