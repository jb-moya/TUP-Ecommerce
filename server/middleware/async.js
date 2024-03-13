const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            // this, i don't understand fully
            await fn(req, res, next);
        } catch (error) {
            next(error);
            // where this is going
        }
    };
};

export default asyncWrapper;
