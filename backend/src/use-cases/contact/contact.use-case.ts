import { Injectable } from '@nestjs/common';

import { IMailService } from '@core/abstracts/mail-services.abstract';
import { CreateContactDto } from '@core/dtos/contact.dto';
import { genericError } from '@helpers/errors';
import { getEmailTemplatePath } from '@helpers/getEmailTemplatePath';

@Injectable()
export class ContactUseCases {
  constructor(private mailService: IMailService) {}

  async execute(createContactDto: CreateContactDto): Promise<void> {
    try {
      const templatePath = getEmailTemplatePath('contact-us.hbs');

      await this.mailService.sendEmail({
        to: 'ramonliranidev@gmail.com',
        subject: 'Contato via site',
        variables: {
          name: createContactDto.name,
          email: createContactDto.email,
          phoneNumber: createContactDto.phoneNumber,
          message: createContactDto.message,
        },
        path: templatePath,
      });
    } catch (error) {
      throw genericError;
    }
  }
}
