import {
    AuthModule,
    FilesModule,
    MetadataModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
    NotificationsModule,
    TableOneNamesModule,
} from "@/schemas";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Permission, Role } from "./entities";
import { AuthGuard, PermissionGuard } from "./guards";
import { InitialDataSeederService } from "./helpers/seeders/initialData";
import { RequestSeedMiddleware } from "./middlewares/request-seed.middleware";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ClsModule } from "nestjs-cls";

import { FormOfFormsModule } from "./schemas/forms/formOfForms.module";
import { SupportModule } from "./schemas/support/support.module";
import { UserMessagingModule } from "./schemas/messaging/messaging.module";

import { AllExceptionsFilter } from "./schemas/loggings/allExceptionsFilter";

import { HealthCheckModule } from "./schemas/health-check/health-check.module";

import { DailySeederService } from "./helpers/seeders/dummyData/dailyDummyDataSeed.service";
import { DummyDataSeederService } from "./helpers/seeders/dummyData/seeder";
import { GenericDataSeederService } from "./helpers/seeders/dummyData/tools/genericDataSeeder";
import { DatabaseResetService } from "./helpers/seeders/dummyData/tools/resetDatabase";
import { TableOneNameDummyDataGeneratorService } from "src/helpers/seeders/dummyData/tableOneNames/dataGenerator";
import { TableOneNameDataSeederService } from "src/helpers/seeders/dummyData/tableOneNames/seeder";

import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "./entities/entities";
import { MailerModule } from "@nestjs-modules/mailer";
import { AuditModule } from "./schemas/audits";
import { LoggingModule } from "./schemas/loggings";

@Module({
    imports: [
        // ===== configs =====

        // --- database ---
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: "postgres",
                host: configService.get("DATABASE_HOST"),
                port: +(configService.get<number>("DATABASE_PORT") || ""),
                username: configService.get("POSTGRES_USER"),
                password: configService.get("POSTGRES_PASSWORD"),
                database: configService.get("POSTGRES_DB"),
                entities: entities,
                synchronize: true,
                autoLoadEntities: true,
                ssl: false,
            }),
            inject: [ConfigService],
        }),

        // ===== tables =====
        // --- base tables (never delete them) ---
        HealthCheckModule,
        ClsModule.forRoot({
            global: true,
            middleware: { mount: true }, // attach CLS store to each request
        }),
        // --- app tables ---

        AuthModule,
        FilesModule,
        MetadataModule,
        PermissionsModule,
        RolesModule,
        UsersModule,
        NotificationsModule,
        TableOneNamesModule,
        // --- app repositories ---
        TypeOrmModule.forFeature([Role]),
        TypeOrmModule.forFeature([Permission]),
        // ===== services =====

        // --- mailer ---
        NotificationsModule,

        FormOfFormsModule,
        SupportModule,
        UserMessagingModule,
        AuditModule,
        LoggingModule,

        // --- mailer ---
        MailerModule.forRoot({
            transport: {
                service: process.env.MAILER_SERVICE_PROVIDER,
                auth: {
                    user: process.env.OFFICIAL_EMAIL,
                    pass: process.env.OFFICIAL_EMAIL_PASSWORD,
                },
            },
        }),

        // --- jwt ---
        AuthModule,
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1d" },
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: PermissionGuard,
        },
        { provide: APP_FILTER, useClass: AllExceptionsFilter },

        // Seeders
        DailySeederService,
        DummyDataSeederService,
        GenericDataSeederService,
        DatabaseResetService,
        TableOneNameDummyDataGeneratorService,
        TableOneNameDataSeederService,

        AppService,
        InitialDataSeederService,
    ],
    controllers: [AppController],
    exports: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(RequestSeedMiddleware).forRoutes("*");
    }
}
