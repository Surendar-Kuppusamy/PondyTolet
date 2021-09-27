import mongoose from 'mongoose';

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    console.log('Hanler==>'+err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    if(err instanceof mongoose.Error.ValidationError) {
        let errorMessage = 'Something went wrong';
        Object.entries(err).forEach(([key, value]) => {
            if(key == 'errors') {
                Object.entries(value).every(([subkey, subvalue]) => {
                    errorMessage = subvalue.message;
                    if(errorMessage != 'Something went wrong') {
                        return false;
                    }
                });
            }
        });
        res.status(200).json({
            message: errorMessage,
            status: 'error',
            code: 404,
            mongosse:err
        })
    } else {
        res.status(statusCode).json({
            message: err.message,
            status: 'error',
            code: 500
        })
    }
}

export { notFound, errorHandler }