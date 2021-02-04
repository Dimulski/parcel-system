// eslint-disable-next-line @typescript-eslint/no-var-requires
const faunadb = require("faunadb");
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const { Create, Collection } = faunadb.query;

export default async (req, res) => {
  try {
    const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const { body } = req;
    const parsedBody = JSON.parse(body);
    // TODO: Basic validation, find a framework that does this properly
    const isBillValid =
      parsedBody.description.length >= 5 &&
      parsedBody.description.length <= 200 &&
      parsedBody.weight >= 0.1 &&
      parsedBody.weight <= 80 &&
      parsedBody.packages >= 1 &&
      parsedBody.packages <= 10 &&
      parsedBody.senderName.length >= 5 &&
      parsedBody.senderName.length <= 50 &&
      parsedBody.senderAddress.length >= 5 &&
      parsedBody.senderAddress.length <= 200 &&
      dateRegex.test(parsedBody.deliveryDate) &&
      parsedBody.receiverName.length >= 5 &&
      parsedBody.receiverName.length <= 50 &&
      parsedBody.receiverAddress.length >= 5 &&
      parsedBody.receiverAddress.length <= 200;

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.json(isBillValid);
    return;
    // if (isBillValid) {
    //   client
    //     .query(Create(Collection("bills_of_lading"), { data: body }))
    //     .then((newBillResponse) => {
    //       const bill = newBillResponse.data;
    //       bill["ref"] = newBillResponse.ref.id;
    //       res.json(bill);
    //     });
    // } else {
    //   res.json("Incorrect Bill of Lading information");
    // }
  } catch (error) {
    res.status(501).json({ error });
  }
};
