import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Setup
const app = express();
dotenv.config();

// Connect to database if not testing
if (process.env.NODE_ENV !== 'test') {
    const {
        MONGO_USERNAME: usr,
        MONGO_PASSWORD: pwd,
        MONGO_HOST: host,
        MONGO_PORT: port,
        MONGO_DATABASE: db
    } = process.env;

    // Connect to database
    mongoose.connect(
        `mongodb://${usr}:${pwd}@${host}:${port}/${db}?authSource=admin`,
        { useNewUrlParser: true, useUnifiedTopology: true}
    ).then(() => {
        console.log(`Connected to database ${host}:${port}/${db}`);
    }).catch(err => {
        console.log(`Failed to connect to database ${host}:${port}/${db}`);
        console.error(err);
    });
}

// Express configuration
app.use(express.json());
app.use('/', (req: Request, res: Response) => {
    res.send("Hello")
});

app.listen(process.env.PORT , () => console.log(`Server running on port ${process.env.PORT }`));

export default app;