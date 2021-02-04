export default interface BillOfLading {
  ref?: string;
  description: string;
  weight: number;
  packages: number;
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  deliveryDate: Date;
  receiverName: string;
  receiverEmail: string;
  receiverAddress: string;
}
