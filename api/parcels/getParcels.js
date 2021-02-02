// eslint-disable-next-line @typescript-eslint/no-var-requires
const faunadb = require("faunadb");
const client = new faunadb.Client({ secret: process.env.FAUNADB_SECRET });
const { Paginate, Match, Index, Map, Lambda, Var } = faunadb.query;

export default async (req, res) => {
  try {
    const docs = await client.query(
      Map(
        Paginate(Match(Index("parcels"))),
        Lambda(["id", "description", "delivery_date"], {
          ref: Var("id"),
          description: Var("description"),
          // eslint-disable-next-line @typescript-eslint/camelcase
          delivery_date: Var("delivery_date"),
        })
      )
    );
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error });
  }
};
