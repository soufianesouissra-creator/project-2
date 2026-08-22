import { jobSchema, type Job } from "./schema";
import { z } from "zod";

/** Empty until real openings are provided (TODO.md). */
export const jobs: Job[] = z.array(jobSchema).parse([]);
