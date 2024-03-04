export class Templates extends Realm.Object {
    static schema = {
      name: 'Template',
      properties: {
        templateId: 'string?',
        template:'string?'
      },
    };
  }

  export class Providers extends Realm.Object {
    static schema = {
      name: 'Provider',
      properties: {
        providerId: 'string?',
        provider:'string?'
      },
    };
  }