import fetcher from ".";

type params = Parameters<typeof fetcher>;

export default (...params: params) => {
  //

  return fetcher(...params).then((resp) => {
    if (resp.status > 399 && resp.status < 200) {
      return resp.json();
    }
  });
};
