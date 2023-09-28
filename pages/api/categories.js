import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  await mongooseConnect();
  const { method } = req;
  await isAdminRequest(req, res);

  if (method === "GET") {
    const categories = await Category.find().populate("parent");
    res.json(categories);
  }

  if (method === "POST") {
    const { name, parentCategory, properties } = req.body;
    const propertiesArr = properties.map((p) => ({
      name: p.name,
      values: p.values.split(","),
    }));
    const data = {
      name,
      parent: parentCategory || null,
      properties: propertiesArr,
    };
    const categoryDoc = await Category.create(data);
    res.json(categoryDoc);
  }

  if (method === "PUT") {
    const { name, parentCategory, properties, _id } = req.body;
    const propertiesArr = properties.map((p) => ({
      name: p.name,
      values: p.values.split(","),
    }));
    const data = {
      name,
      parent: parentCategory || null,
      properties: propertiesArr,
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
