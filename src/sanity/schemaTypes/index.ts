import { type SchemaTypeDefinition } from 'sanity'

import { heroSettings } from "./heroSettings";
import { manifestoSettings } from "./manifestoSettings";
import { projectsSettings } from "./projectsSettings";
import { profileSettings } from "./profileSettings";
import { footerSettings } from "./footerSettings";
import { contactPageSettings } from './contactPageSettings';
import service from "./service"; 

export const schemaTypes: SchemaTypeDefinition[] = [
  heroSettings,
  manifestoSettings,
  projectsSettings,
  profileSettings,
  footerSettings,
  contactPageSettings,
  service,
];