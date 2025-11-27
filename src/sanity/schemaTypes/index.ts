import { type SchemaTypeDefinition } from "sanity";
import service from "./service";
import pricingCalculator from "./pricingCalculator";
import heroSettings from "./heroSettings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    service,
    pricingCalculator,
    heroSettings,
  ],
};
