import 'dotenv/config';

const PORT = process.env.PORT || 3004;
const { MAIL_TOKEN } = process.env;

export { PORT, MAIL_TOKEN };
