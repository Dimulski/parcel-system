// eslint-disable-next-line @typescript-eslint/no-var-requires
const faunadb = require("faunadb");
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const { Create, Collection } = faunadb.query;

export default async (req, res) => {
  try {
    const bill = req.body;
    const { body } = req;
    // TODO: validate request
    // if (bill.description.length)

    const newBillOfLading = client.query(
      Create(Collection("bills_of_lading"), { data: body })
    );

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.json(body);
  } catch (error) {
    res.status(500).json({ error });
  }
};
