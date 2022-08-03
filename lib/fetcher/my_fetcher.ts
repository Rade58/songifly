import fetcher from ".";

type params = Parameters<typeof fetcher>;

export default (...params: params) => {
  //

  return fetcher(...params).then((resp) => resp.json());
};
