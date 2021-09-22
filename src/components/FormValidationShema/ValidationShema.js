import * as yup from "yup";

const commonErrorMessages = {
  emailNotValid: "Email is not valid!",
  emailRequired: "Email is required!",
  passwordRequired: "Password is required!",
  passwordMinLength: "Password should be at least 8 characters!",
  passwordMaxLength: "Password should be maximum of 20 characters!",
  usernameRequired: "Username is required!",
  usernameMaxLength: "Password should be maximum of 30 characters!",
  bioMaxLength: "Bio should be maximum of 100 characters",
  imageurlNotValid: "Url is not valid",
  imageurlRequired: "Url is required",
  articleTitleRequired: "Title required",
  articleTitleMaxLength: "Title should be maximum of 20 characters",
  articleTitleMinLength: "Title should be at least 3 characters",
  descriptionRequired: "Description is required",
  descriptionMaxLength: "Description should be maximum of 20 characters",
  descriptionMinLength: "Description should be at least 3 characters",
  articleBodyRequired: "Write your article",
  articleBodyMaxLength: "Your post is huge. Make it less",
  articleTagsMaxLength: "Tags should be maximum of 100 characters",
};

export const FormSchemaLogin = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(() => commonErrorMessages.emailNotValid)
    .required(() => commonErrorMessages.emailRequired),
  password: yup
    .string()
    .trim()
    .required(() => commonErrorMessages.passwordRequired)
    .max(20, () => commonErrorMessages.passwordMaxLength)
    .min(8, () => commonErrorMessages.passwordMinLength),
  bio: yup.string().max(100, () => commonErrorMessages.bioMaxLength),
});

export const FormSchemaSignUp = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(() => commonErrorMessages.emailNotValid)
    .required(() => commonErrorMessages.emailRequired),
  password: yup
    .string()
    .trim()
    .required(() => commonErrorMessages.passwordRequired)
    .min(8, () => commonErrorMessages.passwordMinLength)
    .max(20, () => commonErrorMessages.passwordMaxLength),
  username: yup
    .string()
    .trim()
    .required(() => commonErrorMessages.usernameRequired),
});

export const FormSchemaEditProfile = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email(() => commonErrorMessages.emailNotValid)
    .required(() => commonErrorMessages.emailRequired),
  password: yup
    .string()
    .trim()
    .required(() => commonErrorMessages.passwordRequired)
    .max(20, () => commonErrorMessages.passwordMaxLength)
    .min(8, () => commonErrorMessages.passwordMinLength),
  username: yup
    .string()
    .trim()
    .max(30, () => commonErrorMessages.usernameMaxLength)
    .required(() => commonErrorMessages.usernameRequired),
  bio: yup.string().max(100, () => commonErrorMessages.bioMaxLength),
});

export const FormSchemaNewArticle = yup.object().shape({
  title: yup
    .string()
    .trim()
    .max(20, () => commonErrorMessages.articleTitleMaxLength)
    .min(3, () => commonErrorMessages.articleTitleMinLength)
    .required(() => commonErrorMessages.articleTitleRequired),
  description: yup
    .string()
    .trim()
    .required(() => commonErrorMessages.descriptionRequired)
    .min(3, () => commonErrorMessages.descriptionMinLength)
    .max(20, () => commonErrorMessages.descriptionMaxLength),
  body: yup
    .string()
    .trim()
    .max(1000, () => commonErrorMessages.articleBodyMaxLength)
    .required(() => commonErrorMessages.articleBodyRequired),
  tagList: yup
    .string()
    .trim()
    .max(100, () => commonErrorMessages.articleTagsMaxLength),
});
