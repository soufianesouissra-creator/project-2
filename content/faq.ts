import { faqSchema, type Faq } from "./schema";
import { z } from "zod";

/** Filled in Phase 4 with questions the planning desk actually receives. */
export const faq: Faq[] = z.array(faqSchema).parse([]);
