class AppError extends Error {
  constructor(data, status) {
    super(data);
    this.message = data.message || data;
    this.status = status;
  }
}

module.exports = AppError;
