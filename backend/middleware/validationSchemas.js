import validator from 'express-validator';

const { validationResult, checkSchema } = validator

const testSchema = checkSchema({
    id: {
        isString:true,
        isArray:true,
        errorMessage: 'Testing'
    },
    user: {
        custom: {
            options: (value, { req, location, path }) => {
                if(req.params.id == 'one') {
                    if(req.params.user == '') {
                        return false;
                    } else {
                        return true;
                    }
                }
            },
        },
    }
})

export { testSchema }