export enum TableOneNameFields {
    ID = "id",

    PROPERTY_ONE_NAME = "propertyOneName",

    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum RoleFields {
    ID = "id",
    NAME = "name",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum PermissionFields {
    ID = "id",
    DESCRIPTION = "description",
    ACTION = "action",
    TABLE = "table",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum UserFields {
    ID = "id",
    EMAIL = "email",
    PHONE_NUMBER = "phoneNumber",
    ROLE = "role",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum MetadataFields {
    ID = "id",
    NAME = "name",
    LOGO = "logo",
    PHONE_NUMBER = "phoneNumber",
    SLOGAN = "slogan",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum FileFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum NotificationFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    TITLE = "title",
    MESSAGE = "message",
    SERVICE = "service",
    IS_READ = "isRead",
    IMPORTANT = "important",
    CHANNEL = "channel",
}

export enum FormFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum FormSectionFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum FormSectionInputFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum FormAnswerFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum FaqFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    TITLE = "title",
    CONTENT = "content",
    LINK = "link",
}

export enum SupportTicketFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    TYPE = "type",
    TITLE = "title",
    URGENT = "urgent",
    CONTENT = "content",
}

export enum UserManualSectionFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    TITLE = "title",
    DESCRIPTION = "description",
}

export enum UserManualSubsectionFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    TITLE = "title",
    DESCRIPTION = "description",
}

export enum UserManualContentFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    TITLE = "title",
    DESCRIPTION = "description",
}

export enum AppEvaluationFields {
    ID = "id",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",

    UI = "ui",
    COMPREHENSIVENESS = "comprehensiveness",
    PERFORMANCE = "performance",
    DATA_ACCURACY = "dataAccuracy",
    OVERALL = "overall",
    NOTES = "notes",
}

export enum UserMessagingFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum UserMessagingParticipantFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum UserMessagingMessageFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum UserMessagingMessageRecipientFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum UserMessagingMessageReactionFields {
    ID = "id",
    TABLE_NAME = "tableName",
    PROP_NAME = "propName",
    ROW_ID = "rowId",
    FILE_PATH = "filePath",
    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum LoggingFields {
    ID = "id",
    NAME = "name",
    LEVEL = "level",
    MESSAGE = "message",
    CONTEXT = "context",
    STACK = "stack",
    META = "meta",
}

export enum AuditEventFields {
    ID = "id",

    ACTOR_ID = "actorId",
    ACTOR_TYPE = "actorType",
    ACTION = "action",
    RESOURCE_TYPE = "resourceType",
    RESOURCE_ID = "resourceId",
    SUCCESS = "success",
    STATUS_CODE = "statusCode",
    ERROR_MESSAGE = "errorMessage",
    REQUEST_ID = "requestId",
    SESSION_ID = "sessionId",
    IP = "ip",
    USER_AGENT = "userAgent",
    METHOD = "method",
    PATH = "path",
    SOURCE = "source",
    BEFORE = "before",
    AFTER = "after",
    DIFF = "diff",

    CREATED_AT = "createdAt",
    UPDATED_AT = "updatedAt",
}

export enum TablesNames {
    NOTIFICATION = "notification",
    TABLE_ONE_NAME = "tableOneName",
    USER = "user",
    ROLE = "role",
    PERMISSION = "permission",
    METADATA = "metadata",
    FILE = "file",
    AUTH = "auth",

    FORM = "form",
    FORM_SECTION = "formSection",
    FORM_SECTION_INPUT = "formSectionInput",
    FORM_ANSWER = "formAnswer",

    FAQ = "faq",
    SUPPORT_TICKET = "supportTicket",
    USER_MANUAL_SECTION = "userManualSection",
    USER_MANUAL_SUB_SECTION = "userManualSubsection",
    USER_MANUAL_CONTENT = "userManualContent",
    APP_EVALUATION = "appEvaluation",

    USER_MESSAGING = "userMessaging",
    USER_MESSAGING_PARTICIPANT = "userMessagingParticipant",
    USER_MESSAGING_MESSAGE = "userMessagingMessage",
    USER_MESSAGING_MESSAGE_RECIPIENT = "userMessagingMessageRecipient",
    USER_MESSAGING_MESSAGE_REACTION = "userMessagingMessageReaction",

    LOGGING = "logging",
    AUDIT_EVENT = "auditEvent",
    HEALTH_CHECK = "health-check",
}

export type AllTablesColumns =
    | NotificationFields
    | TableOneNameFields
    | FormFields
    | FormSectionFields
    | FormSectionInputFields
    | FormAnswerFields
    | FaqFields
    | SupportTicketFields
    | UserManualSectionFields
    | UserManualSubsectionFields
    | UserManualContentFields
    | UserMessagingFields
    | UserMessagingParticipantFields
    | UserMessagingMessageFields
    | UserMessagingMessageRecipientFields
    | UserMessagingMessageReactionFields
    | LoggingFields
    | AuditEventFields
    | RoleFields
    | PermissionFields
    | UserFields
    | MetadataFields
    | FileFields;
