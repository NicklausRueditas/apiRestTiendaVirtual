import { registerAs } from "@nestjs/config";

export default registerAs('config', () => {
    return {
        mongo: {
            mongo_db_uri: process.env.MONGO_DB_URI,
            db: process.env.DB
        }
    }
})