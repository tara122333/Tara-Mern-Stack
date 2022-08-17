import mailgun from 'mailgun-js';

export function initializeMailgun(){
    return mailgun({
        apiKey : process.env.MAILGUN__API,
        domain : process.env.MAILGUN__domain
    });
}