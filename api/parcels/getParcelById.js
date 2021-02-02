// eslint-disable-next-line @typescript-eslint/no-var-requires
const faunadb = require("faunadb");
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const { Get, Match, Index } = faunadb.query;

export default async (req, res) => {
  try {
    const doc = await client.query(
      Get(Match(Index("parcel_by_id"), req.query.id))
    );
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error });
  }
};
