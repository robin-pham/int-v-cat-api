export const errorHandler = async (err, ctx) => {
  ctx.status = err.statusCode || err.status || 500;
  ctx.body = {
    error: err.data || err.message || 'Unhandled error',
  };
};
