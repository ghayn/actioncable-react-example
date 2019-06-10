import JsonApiResponseParser from "../utils/jsonApiResponseParser";

const executeRequest = (request, reduceType) => {
  request().then(({ response, error }) => {
    if (error) {
      return error;
    }
    console.log(response);
    if (reduceType) {
      window.app.dispatch(reduceType, JsonApiResponseParser(response))
    };
  });
}

export { executeRequest };
