import { badRequest } from '@hapi/boom';

export function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];

    const { error } = schema.validate(data);
    if (error) {
      next(badRequest(error));
    }
    next();
  };
}
export default validatorHandler;
