import zod from "zod";

export default zod.object({
  first_name: zod.string().min(2).max(15),
  last_name: zod.string().min(2).max(15),
  email: zod.string().email(),
  password: zod.string().min(8).max(15),
});
