const handleMongooseError = (err, data, next) => {
    const {name, code} = error; 
    const status = (name === "MongoServerError" && code === 11000) ? 409 : 400;
    err.status = status;
    next()
}

export default handleMongooseError;