import f from "../fetcher";

type params = Parameters<typeof f>;

const fetcher = (...[url, data]: params) => {
  return new Promise((res, rej) => {
    f(url, data)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log({ data });

        if (data.errors) {
          rej({ errors: data.errors });
        } else {
          res(data.user);
        }
      })
      .catch(() => {
        rej({ errors: ["Something went wrong!"] });
      });
  });
};
export default fetcher;
