import { Notification } from "./notification.entity";
import { TableOneName } from "./tableOneName.entity";
import { File } from "./file.entity";
import { Metadata } from "./metadata.entity";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";
import { User } from "./user.entity";

import { Form } from "./formOfForms/form.entity";
import { FormSection } from "./formOfForms/formSection.entity";
import { FormSectionInput } from "./formOfForms/formSectionInput.entity";
import { FormAnswer } from "./formOfForms/formAnswer.entity";

import { Faq } from "./support/faq.entity";
import { SupportTicket } from "./support/supportTicket.entity";
import { UserManualSection } from "./support/userManualSection.entity";
import { UserManualSubsection } from "./support/userManualSubsection.entity";
import { UserManualContent } from "./support/userManualContent.entity";
import { AppEvaluation } from "./support/appEvaluation.entity";

import { UserMessaging } from "./messaging/userMessaging.entity";
import { UserMessagingMessage } from "./messaging/userMessagingMessage.entity";
import { UserMessagingMessageReaction } from "./messaging/userMessagingMessageReaction.entity";
import { UserMessagingMessageRecipient } from "./messaging/userMessagingMessageRecipient.entity";
import { UserMessagingParticipant } from "./messaging/userMessagingParticipant.entity";

import { AuditEvent } from "./audit.entity";
import { Log } from "./logging.entity";

const entities = [
    Notification,
    TableOneName,
    User,
    Role,
    Permission,
    Metadata,
    File,
    Notification,

    Form,
    FormSection,
    FormSectionInput,
    FormAnswer,

    Faq,
    SupportTicket,
    AppEvaluation,
    UserManualSection,
    UserManualSubsection,
    UserManualContent,

    UserMessaging,
    UserMessagingParticipant,
    UserMessagingMessage,
    UserMessagingMessageReaction,
    UserMessagingMessageRecipient,

    Log,
    AuditEvent,
];

export default entities;
