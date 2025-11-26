import { type SchemaTypeDefinition } from "sanity";
import service from "./service";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    service,
    // add more types here later if you want
  ],
};
