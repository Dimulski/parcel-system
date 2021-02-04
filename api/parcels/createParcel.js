// eslint-disable-next-line @typescript-eslint/no-var-requires
const faunadb = require("faunadb");
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const { Create, Collection } = faunadb.query;

export default async (req, res) => {
  try {
    const { body } = req;
    const parsedBody = JSON.parse(body);

    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");

    client
      .query(Create(Collection("parcels"), { data: parsedBody }))
      .then((newParcelResponse) => {
        const parcel = newParcelResponse.data;
        parcel["ref"] = newParcelResponse.ref.id;
        res.json(parcel);
      });
  } catch (error) {
    res.status(500).json({ error });
  }
};
