import { readFileSync } from "fs";
import { Eta } from "eta";
import mjml2html from "mjml";

export const getEmailVerificationHtmlTemplate = (
  username: string,
  verificationUrl: string
) => {
  try {
    const fileData = readFileSync(
      "src/utils/mjmlTemplates/emailVerification.mjml",
      "utf-8"
    );
    // if file doesn't have any data
    if (!fileData) return "";

    // otherwise parse mjml template to html
    const template = new Eta().renderString(fileData, {
      url: verificationUrl,
      username: username,
    });
    return mjml2html(template)?.html;
  } catch (error) {
    console.log("MJML Parsing Error: ", error);
    return "";
  }
};
