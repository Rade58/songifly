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
          setTimeout(() => {
            rej({ errors: data.errors });
          }, 3000);

          // rej({ errors: data.errors });
        } else {
          setTimeout(() => {
            res(data.user);
          }, 3000);

          // res(data.user);
        }
      })
      .catch(() => {
        rej({ errors: ["Something went wrong!"] });
      });
  });
};
export default fetcher;
