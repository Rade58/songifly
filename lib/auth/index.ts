import fetcher from "../fetcher";

// DON'T KNOW IF I USED THIS ANYWHERE
/**
 *
 * @description call this on signup or signin
 */
export const auth = (
  mode: "signin" | "signup",
  data: { email: string; password: string; username?: string }
) => {
  if (data.username && mode === "signin") {
    throw new Error("Provide username only for 'signup' mode!");
  }

  return fetcher(`/${mode}`, data);
};
