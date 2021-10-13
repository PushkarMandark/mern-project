// try catch alternative for async functions so we dont need to write try catch every time in our code
//insted we pass async fn in function exported from here.

module.exports = (theFun) => (req, res, next) => {
  Promise.resolve(theFun(req, res, next)).catch(next);
};
