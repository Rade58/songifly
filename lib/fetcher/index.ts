// THIS IS INDTENDED FOR SWR
/**
 *
 * @param url string
 * @param data any
 * @returns Promise<Response>
 * @description fetcher argument for useSWR hook
 */
const fetcher = function <T = undefined>(
  url: string,
  data: T | undefined = undefined
) {
  return fetch(`${window.location.origin}/api${url}`, {
    //
    method: data ? "POST" : "GET",
    // MEANS THAT WE ARE GOING TO "RESEND" COOKIES
    // WE ALREADY HAVE
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export default fetcher;
