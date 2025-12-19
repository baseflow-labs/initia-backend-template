type RelationsListing = {
    oneToOne: string[];
    oneToMany: string[];
    manyToOne: string[];
    manyToMany: string[];
};

type Tables<T> = {
    notification: T;
    tableOneName: T;
    role: T;
    permission: T;
    metadata: T;
    user: T;
    auditEvent: T;
    file: T;

    form: T;
    formSection: T;
    formSectionInput: T;
    formAnswer: T;

    faq: T;
    supportTicket: T;
    userManualSection: T;
    userManualSubsection: T;
    userManualContent: T;
    appEvaluation: T;

    userMessaging: T;
    userMessagingParticipant: T;
    userMessagingMessage: T;
    userMessagingMessageRecipient: T;
    userMessagingMessageReaction: T;

    logging: T;
};

const RELATIONS: Tables<RelationsListing> = {
    notification: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    tableOneName: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    role: {
        oneToOne: [],
        oneToMany: ["permissions"],
        manyToOne: [],
        manyToMany: [],
    },
    permission: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: ["role"],
        manyToMany: [],
    },
    metadata: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    auditEvent: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    user: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    file: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },

    form: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    formAnswer: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    formSection: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    formSectionInput: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },

    faq: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    supportTicket: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    userManualSection: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    userManualSubsection: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    userManualContent: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    appEvaluation: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },

    userMessaging: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    userMessagingParticipant: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    userMessagingMessage: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    userMessagingMessageRecipient: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
    userMessagingMessageReaction: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },

    logging: {
        oneToOne: [],
        oneToMany: [],
        manyToOne: [],
        manyToMany: [],
    },
};

export const RELATIONS_OBJECT: Tables<{
    ascendants: string[];
    descendants: string[];
}> = {
    // --- app relations ---
    notification: {
        descendants: [
            ...RELATIONS.notification.oneToMany,
            ...RELATIONS.notification.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.notification.manyToOne,
            ...RELATIONS.notification.oneToOne,
            ...RELATIONS.notification.manyToMany,
        ],
    },
    tableOneName: {
        descendants: [
            ...RELATIONS.tableOneName.oneToMany,
            ...RELATIONS.tableOneName.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.tableOneName.manyToOne,
            ...RELATIONS.tableOneName.oneToOne,
            ...RELATIONS.tableOneName.manyToMany,
        ],
    },
    // --- default relations ---
    role: {
        descendants: [
            ...RELATIONS.role.oneToMany,
            ...RELATIONS.role.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.role.manyToOne,
            ...RELATIONS.role.oneToOne,
            ...RELATIONS.role.manyToMany,
        ],
    },
    permission: {
        descendants: [
            ...RELATIONS.permission.oneToMany,
            ...RELATIONS.permission.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.permission.manyToOne,
            ...RELATIONS.permission.oneToOne,
            ...RELATIONS.permission.manyToMany,
        ],
    },
    metadata: {
        descendants: [
            ...RELATIONS.metadata.oneToMany,
            ...RELATIONS.metadata.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.metadata.manyToOne,
            ...RELATIONS.metadata.oneToOne,
            ...RELATIONS.metadata.manyToMany,
        ],
    },
    auditEvent: {
        descendants: [
            ...RELATIONS.auditEvent.oneToMany,
            ...RELATIONS.auditEvent.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.auditEvent.manyToOne,
            ...RELATIONS.auditEvent.oneToOne,
            ...RELATIONS.auditEvent.manyToMany,
        ],
    },
    file: {
        descendants: [
            ...RELATIONS.file.oneToMany,
            ...RELATIONS.file.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.file.manyToOne,
            ...RELATIONS.file.oneToOne,
            ...RELATIONS.file.manyToMany,
        ],
    },
    user: {
        descendants: [
            ...RELATIONS.user.oneToMany,
            ...RELATIONS.user.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.user.manyToOne,
            ...RELATIONS.user.oneToOne,
            ...RELATIONS.user.manyToMany,
        ],
    },
    form: {
        descendants: [
            ...RELATIONS.form.oneToMany,
            ...RELATIONS.form.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.form.manyToOne,
            ...RELATIONS.form.oneToOne,
            ...RELATIONS.form.manyToMany,
        ],
    },
    formSection: {
        descendants: [
            ...RELATIONS.formSection.oneToMany,
            ...RELATIONS.formSection.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.formSection.manyToOne,
            ...RELATIONS.formSection.oneToOne,
            ...RELATIONS.formSection.manyToMany,
        ],
    },
    formSectionInput: {
        descendants: [
            ...RELATIONS.formSectionInput.oneToMany,
            ...RELATIONS.formSectionInput.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.formSectionInput.manyToOne,
            ...RELATIONS.formSectionInput.oneToOne,
            ...RELATIONS.formSectionInput.manyToMany,
        ],
    },
    formAnswer: {
        descendants: [
            ...RELATIONS.formAnswer.oneToMany,
            ...RELATIONS.formAnswer.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.formAnswer.manyToOne,
            ...RELATIONS.formAnswer.oneToOne,
            ...RELATIONS.formAnswer.manyToMany,
        ],
    },

    faq: {
        descendants: [...RELATIONS.faq.oneToMany, ...RELATIONS.faq.manyToMany],
        ascendants: [
            ...RELATIONS.faq.manyToOne,
            ...RELATIONS.faq.oneToOne,
            ...RELATIONS.faq.manyToMany,
        ],
    },
    supportTicket: {
        descendants: [
            ...RELATIONS.supportTicket.oneToMany,
            ...RELATIONS.supportTicket.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.supportTicket.manyToOne,
            ...RELATIONS.supportTicket.oneToOne,
            ...RELATIONS.supportTicket.manyToMany,
        ],
    },
    userManualSection: {
        descendants: [
            ...RELATIONS.userManualSection.oneToMany,
            ...RELATIONS.userManualSection.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userManualSection.manyToOne,
            ...RELATIONS.userManualSection.oneToOne,
            ...RELATIONS.userManualSection.manyToMany,
        ],
    },
    userManualSubsection: {
        descendants: [
            ...RELATIONS.userManualSubsection.oneToMany,
            ...RELATIONS.userManualSubsection.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userManualSubsection.manyToOne,
            ...RELATIONS.userManualSubsection.oneToOne,
            ...RELATIONS.userManualSubsection.manyToMany,
        ],
    },
    userManualContent: {
        descendants: [
            ...RELATIONS.userManualContent.oneToMany,
            ...RELATIONS.userManualContent.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userManualContent.manyToOne,
            ...RELATIONS.userManualContent.oneToOne,
            ...RELATIONS.userManualContent.manyToMany,
        ],
    },
    appEvaluation: {
        descendants: [
            ...RELATIONS.appEvaluation.oneToMany,
            ...RELATIONS.appEvaluation.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.appEvaluation.manyToOne,
            ...RELATIONS.appEvaluation.oneToOne,
            ...RELATIONS.appEvaluation.manyToMany,
        ],
    },

    userMessaging: {
        descendants: [
            ...RELATIONS.userMessaging.oneToMany,
            ...RELATIONS.userMessaging.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userMessaging.manyToOne,
            ...RELATIONS.userMessaging.oneToOne,
            ...RELATIONS.userMessaging.manyToMany,
        ],
    },
    userMessagingParticipant: {
        descendants: [
            ...RELATIONS.userMessagingParticipant.oneToMany,
            ...RELATIONS.userMessagingParticipant.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userMessagingParticipant.manyToOne,
            ...RELATIONS.userMessagingParticipant.oneToOne,
            ...RELATIONS.userMessagingParticipant.manyToMany,
        ],
    },
    userMessagingMessage: {
        descendants: [
            ...RELATIONS.userMessagingMessage.oneToMany,
            ...RELATIONS.userMessagingMessage.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userMessagingMessage.manyToOne,
            ...RELATIONS.userMessagingMessage.oneToOne,
            ...RELATIONS.userMessagingMessage.manyToMany,
        ],
    },
    userMessagingMessageRecipient: {
        descendants: [
            ...RELATIONS.userMessagingMessageRecipient.oneToMany,
            ...RELATIONS.userMessagingMessageRecipient.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userMessagingMessageRecipient.manyToOne,
            ...RELATIONS.userMessagingMessageRecipient.oneToOne,
            ...RELATIONS.userMessagingMessageRecipient.manyToMany,
        ],
    },
    userMessagingMessageReaction: {
        descendants: [
            ...RELATIONS.userMessagingMessageReaction.oneToMany,
            ...RELATIONS.userMessagingMessageReaction.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.userMessagingMessageReaction.manyToOne,
            ...RELATIONS.userMessagingMessageReaction.oneToOne,
            ...RELATIONS.userMessagingMessageReaction.manyToMany,
        ],
    },

    logging: {
        descendants: [
            ...RELATIONS.logging.oneToMany,
            ...RELATIONS.logging.manyToMany,
        ],
        ascendants: [
            ...RELATIONS.logging.manyToOne,
            ...RELATIONS.logging.oneToOne,
            ...RELATIONS.logging.manyToMany,
        ],
    },
};
