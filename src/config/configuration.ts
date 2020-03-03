// import { registerAs } from "@nestjs/config";

export default () => ({
    secret: process.env.SECRETKEY,
    token_ttl: process.env.TOKEN_TTL,
});