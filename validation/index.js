/* eslint-disable no-prototype-builtins */

const minLength = (value, validMinLength) => value.trim().length >= validMinLength;

const maxLength = (value, validMaxLength) => value.trim().length <= validMaxLength;

const isGmailEmail = email => {
  const reg = /^[a-z0-9]((\.|\+)?[a-z0-9]){5,63}@gmail\.com$/i;

  return email.match(reg);
};

const isPhoneNumber = phone => {
  const reg = /^\+380[0-9]{9}$/;

  return phone.match(reg);
};

const userExists = (service, id) => service.search(id);

const uniqueEmail = (service, email) => !service.search({ email });

const fieldsValidation = (service, user) => {
  const errors = [];

  if (user.hasOwnProperty('email')) {
    if (!isGmailEmail(user.email)) {
      errors.push('Please enter a valid email @gmail.com.');
    }

    if (!uniqueEmail(service, user.email)) {
      errors.push('The email is already registered. Please sign in.');
    }
  }

  if (user.hasOwnProperty('phoneNumber')) {
    if (!isPhoneNumber(user.phoneNumber)) {
      errors.push('Please enter a valid phone number (+380*********).');
    }
  }

  if (user.hasOwnProperty('firstName')) {
    if (!minLength(user.firstName, 2) || !maxLength(user.firstName, 46)) {
      errors.push('Please enter a correct first name.');
    }
  }

  if (user.hasOwnProperty('lastName')) {
    if (!minLength(user.lastName, 2) || !maxLength(user.lastName, 46)) {
      errors.push('Please enter a correct last name.');
    }
  }

  if (user.hasOwnProperty('password')) {
    if (!minLength(user.password, 3) || !maxLength(user.password, 128)) {
      errors.push('Please enter a password of 3 - 128 characters.');
    }
  }
  return errors;
};

exports.userExists = userExists;
exports.uniqueEmail = uniqueEmail;
exports.fieldsValidation = fieldsValidation;
