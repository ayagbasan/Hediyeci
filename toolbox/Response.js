const ResponseSuccess = data => {
  return {
    data: data,
    isSuccess: true
  };
};

const ResponseError2 = (errCode, errMsg) => {
  return {
    data: null,
    isSuccess: false,
    errorMessage: errMsg,
    errorCode: errCode
  };
};

const ResponseError = (err, ex) => {
  return {
    data: null,
    isSuccess: false,
    errorMessage: err.Msg,
    errorCode: err.Code,
    errorDetail: ex
  };
};

export { ResponseSuccess, ResponseError, ResponseError2 };
