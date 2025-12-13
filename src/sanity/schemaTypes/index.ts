import { type SchemaTypeDefinition } from 'sanity'

// Check your files: These must use 'export const', NOT 'export default'
import { heroSettings } from "./heroSettings";
import { manifestoSettings } from "./manifestoSettings";
import { projectsSettings } from "./projectsSettings";
import { profileSettings } from "./profileSettings";
import { footerSettings } from "./footerSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  heroSettings,
  manifestoSettings,
  projectsSettings,
  profileSettings,
  footerSettings,
];