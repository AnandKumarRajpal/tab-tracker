const Joi = require('joi')

module.exports = {
    register (req, res, next) {
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
        })

        const {error, value} = schema.validate(req.body)
        
        if (error) {
            switch(error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: "Please enter a valid email."
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: "The password should be atleast 8 charaters."
                    })
                    break
                default:
                    res.status(400).send({
                        error: "Invalid registration details."
                    })
            }
        } else {
            next()
        }
    }
}