import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;

  if (method === "GET") {
    const categories = await Category.find().populate("parent");
    res.json(categories);
  }

  if (method === "POST") {
    const { name, parentCategory } = req.body;
    const data = {
      name,
      parent: parentCategory || null,
    };
    const categoryDoc = await Category.create(data);
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, parentCategory, _id } = req.body;
    const data = {
      name,
      parent: parentCategory || null,
    };
    const categoryDoc = await Category.updateOne({ _id }, data);
    res.json(categoryDoc);
  }

  if (method === "DELETE") {
    const { _id } = req.query;
    await Category.deleteOne({ _id });
    res.json("OK");
  }
}
