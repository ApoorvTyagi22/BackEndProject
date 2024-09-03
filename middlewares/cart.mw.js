exports.verifyCart = (req, res, next) => {
  if (!req.body.items) {
    return res.status(400).send({
      message: "Items are required",
    });
  }

  if (!req.body.totalValue) {
    return res.status(400).send({
      message: "Total value is required",
    });
  }

  if (!req.body.status) {
    return res.status(400).send({
      message: "Status is required",
    });
  }

  if (!req.body.uniqueCartId) {
    return res.status(400).send({
      message: "Unique cart id is required",
    });
  }
  next();
};

exports.verifyCartRead = (req, res, next) => {
  if (!req.body.uniqueCartId) {
    return res.status(400).send({
      message: "Unique cart id is required",
    });
  }
  next();
};

exports.verifyCartUpdate = (req, res, next) => {
  if (!req.body.uniqueCartId) {
    return res.status(400).send({
      message: "Unique cart id is required",
    });
  }

  if (!req.body.items) {
    return res.status(400).send({
      message: "Items are required",
    });
  }

  if (!req.body.totalValue) {
    return res.status(400).send({
      message: "Total value is required",
    });
  }

  if (!req.body.status) {
    return res.status(400).send({
      message: "Status is required",
    });
  }

  next();
};

exports.verifyCartDelete = (req, res, next) => {
  if (!req.body.uniqueCartId) {
    return res.status(400).send({
      message: "Unique cart id is required",
    });
  }
  next();
};
