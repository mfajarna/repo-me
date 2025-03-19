import z from 'zod';

export const filterUsernameSchema = z.object({
  username: z.string(),
});
