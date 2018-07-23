export default {

  user: {

    code: '',

    name: '',

    email: '',

    password: '',

    type: '',

    items: [

      {text: 'Professor', value: 'professor'},
      {text: 'Aluno', value: 'aluno'},
      {text: 'Funcionário', value: 'funcinário'}

    ],

    alternative_email: '',

    usp_email: '',

    phone: '',

    extra: {}

  },

  rules: {

    code: [valid => !!valid || 'The code is required.'],

    name: [valid => !!valid || 'The name field is required.'],

    email: [valid => !!valid || 'E-mail is required.'],

    type: [valid => !!valid || 'Type is required.'],

    phone: [valid => !!valid || 'Phone is required.']

  }

}
