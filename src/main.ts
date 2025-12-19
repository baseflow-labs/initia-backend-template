import { AppModule } from "./app.module";
import { APP_VERSION } from "./version";
import { InitialDataSeederService } from "./helpers/seeders/initialData";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { join } from "path";

import { DbLogger } from "src/schemas/loggings/logger";

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        bufferLogs: true,
    });

    const dbLogger = app.get(DbLogger);
    app.useLogger(dbLogger);

    app.setGlobalPrefix("api", {
        exclude: ["'',"],
    });

    // allow static html files to be rendered
    app.useStaticAssets(join(__dirname, "..", "public"));
    app.setBaseViewsDir(join(__dirname, "..", "views"));
    app.setViewEngine("hbs");

    // initial data seeder service
    const seeder = app.get(InitialDataSeederService);
    await seeder.seed();

    // configure swagger
    const config = new DocumentBuilder()
        .setTitle("Initia Backend Template DB")
        .setDescription("The API of the Initia Backend Template DB website")
        .setVersion(APP_VERSION)
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup("api-docs", app, document, {
        swaggerOptions: {
            tryItOutEnabled: true,
        },
    });

    // allow the front end to sign in and reach the data
    app.enableCors({
        origin: process.env.FRONTEND_URLS?.split(","),
        credentials: true,
    });

    await app.listen(process.env.PORT || "8000");
}

bootstrap();
