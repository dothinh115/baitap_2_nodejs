//200, 400, 500

const successCode = (res, data, message) => {
  res.status(200).json({
    message,
    ...(data && { content: data }),
  });
};

const failCode = (res, data, message) => {
  res.status(400).json({
    message,
    ...(data && { content: data }),
  });
};

const errorCode = (res, data, message) => {
  res.status(500).json({
    message,
    ...(data && { content: data }),
  });
};

module.exports = {
  successCode,
  failCode,
  errorCode,
};
