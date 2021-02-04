// eslint-disable-next-line @typescript-eslint/no-var-requires
const faunadb = require("faunadb");
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const { Create, Collection } = faunadb.query;

export default async (req, res) => {
  try {
    const dateRegex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const { body } = req;

    // TODO: Basic validation, find a framework that does this properly
    const isBillValid =
      body.description.length >= 5 &&
      body.description.length <= 200 &&
      body.weight >= 0.1 &&
      body.weight <= 80 &&
      body.packages >= 1 &&
      body.packages <= 10 &&
      body.senderName.length >= 5 &&
      body.senderName.length <= 50 &&
      body.senderAddress.length >= 5 &&
      body.senderAddress.length <= 200 &&
      dateRegex.test(body.deliveryDate) &&
      body.receiverName.length >= 5 &&
      body.receiverName.length <= 50 &&
      body.receiverAddress.length >= 5 &&
      body.receiverAddress.length <= 200;

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

    if (isBillValid) {
      client
        .query(Create(Collection("bills_of_lading"), { data: body }))
        .then((newBillResponse) => {
          const bill = newBillResponse.data;
          bill["ref"] = newBillResponse.ref;
          res.json(bill);
        });
    } else {
      res.json("Incorrect Bill of Lading information");
    }
  } catch (error) {
    res.status(500).json(error ? { error } : { error: "Something went wrong" });
  }
};
