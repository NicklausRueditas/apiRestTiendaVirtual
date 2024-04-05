import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        mongo: {
            mongo_uri: process.env.MONGO_URI,
            db: process.env.DB
        }
    }
})