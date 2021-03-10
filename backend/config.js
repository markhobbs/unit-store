module.exports = function () {

  switch (process.env.NODE_ENV) {
    case 'development' : return { serverMongoURL: "mongodb://mongodb:27017/DBSatDev" };
    case 'production' : return { serverMongoURL: "mongodb://mongodb:27017/DBSatProd" };
    case 'default' : return { serverMongoURL: "mongodb://mongodb:27017/DBSatDev" };
  }

};
