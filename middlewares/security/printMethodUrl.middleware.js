const printMethodUrl = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);

    // Pasamos el control al siguiente Middleware
    next();
}

export default printMethodUrl;