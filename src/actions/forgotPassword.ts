"use server";

import { OutputType } from "@/types/outputType";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

const { MAIL_USERNAME, MAIL_API_KEY, MY_EMAIL } = process.env;

export type ForgotPasswordArgType = {
	recipientEmail: string;
};

export default async function forgotPassword({ recipientEmail }: ForgotPasswordArgType): Promise<OutputType<string>> {
	try {
		if (MAIL_USERNAME === undefined || MAIL_API_KEY === undefined || MY_EMAIL === undefined) {
			return { error: "MAIL details missing", result: "" };
		}
	
		const mailerSend = new MailerSend({
			apiKey: MAIL_API_KEY,
		});
		const sender = new Sender(MAIL_USERNAME, "MSIT Grievance Mailer Send");
		const recipients = [new Recipient(recipientEmail)];
		const OTP = (new Array(10).fill(0)).map(() => Math.floor(Math.random() * 9)).join("");
		const emailParams = new EmailParams()
			.setFrom(sender)
			.setTo(recipients)
			.setReplyTo(new Recipient(MY_EMAIL, "MSIT Grievance"))
			.setSubject("New Password")
			.setHtml(`Your new password is <strong>${OTP}</strong><br />For any further query mail at <a href="mailto:${MY_EMAIL}">${MY_EMAIL}</a>`);
	
		await mailerSend.email.send(emailParams);

		return { error: null, result: OTP };
	} catch (error) {
		console.error(error);
		return { error: "Something went wrong", result: "" };
	}
};