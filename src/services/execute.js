import JsonApiResponseParser from "../utils/jsonApiResponseParser";
import global from "../global";

const executeRequest = (request, reduceType) => {
  request().then(({ response, error }) => {
    if (error) {
      return error;
    }
    if (reduceType) {
      global.dispatch(reduceType, JsonApiResponseParser(response))
    };
  });
}

export { executeRequest };
