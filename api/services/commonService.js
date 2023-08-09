const EmailService = require('./emailService');
const TemplateService = require('./template.service');

class CommonService extends EmailService {
  constructor() {
    super();
    this.EmailService = new EmailService();
    this.TemplateService = TemplateService;
  }

  static stringToSlug(refStr) {
    let str = refStr;
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
    // remove accents, swap ñ for n, etc
    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    for (let i = 0, l = from.length; i < l; i += 1) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes
    return str;
  }

  static capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static generateUsernameFromEmail() {
    return `user${Math.floor(Date.now() + Math.random())}`;
  }

  static generateHash(email = '') {
    const crypto = require('crypto');
    const currentDate = new Date().valueOf().toString();
    const random = Math.random().toString();
    const hash = crypto
      .createHash('sha1')
      .update(currentDate + random + email)
      .digest('hex');
    return hash;
  }

  static generateOtp(sequenceLength = 4) {
    let text = '';
    const possible = '0123456789';
    for (let i = 0; i < sequenceLength; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  static generateRandom(sequenceLength = 6) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQbRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < sequenceLength; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async reisterEmail(postBody) {
    console.log("Email Sent to", postBody.email);
    const { email, username, otp } = postBody;
    const templateObject = await this.TemplateService.fetch('USER_REGISTER');
    let { template } = templateObject;
    template = template.replace('{{COMPANY_NAME}}', '');
    template = template.replace('{{COMPANY_URL}}', '');
    template = template.replace('{{OTP}}', otp);
    template = template.replace('{{USERNAME}}', username);
    template = template.replace('{{COMPANY_TAG_LINE}}', '');
    const mailOptions = {
      from: 'bitwizorg@gmail.com',
      html: template,
      subject: templateObject.subject,
      to: email,
    };
    return new Promise((resolve, reject) => {
      this.EmailService.send(mailOptions).then(
        () => resolve(true),
        err => reject(err),
      );
    });
  }


  async updateEmail(postBody) {
    console.log("Email Sent to", postBody.email);
    const { email, username, otp } = postBody;
    const templateObject = await this.TemplateService.fetch('EMAIL_CHANGE');
    let { template } = templateObject;
    template = template.replace('{{COMPANY_NAME}}', '');
    template = template.replace('{{COMPANY_URL}}', '');
    template = template.replace('{{OTP}}', otp);
    template = template.replace('{{USERNAME}}', username);
    template = template.replace('{{COMPANY_TAG_LINE}}', '');
    const mailOptions = {
      from: 'bitwizorg@gmail.com',
      html: template,
      subject: templateObject.subject,
      to: email,
    };
    return new Promise((resolve, reject) => {
      this.EmailService.send(mailOptions).then(
        () => resolve(true),
        err => reject(err),
      );
    });
  }

}

module.exports = CommonService;
