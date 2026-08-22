import { teamMemberSchema, type TeamMember } from "./schema";
import { z } from "zod";

/** Empty until real names and roles are provided (TODO.md). */
export const team: TeamMember[] = z.array(teamMemberSchema).parse([]);
