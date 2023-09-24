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
    const categoryDoc = await Category.create({
      name,
      parent: parentCategory,
    });
    res.json(categoryDoc);
  }
}
