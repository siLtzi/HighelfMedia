import { type SchemaTypeDefinition } from "sanity";
import service from "./service";
import pricingCalculator from "./pricingCalculator";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    service,
    pricingCalculator,
    // add more types here later if you want
  ],
};
