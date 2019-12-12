new IOService(
  {
    name: 'ConfigUser',
    dfId: 'user-default-form',
    path: 'config/user',
    wz: $('#user-default-wizard').wizard()
  },
  function(self) {
    //verifica se é necessário ativar a aba de user
    if (window.sessionStorage.getItem('setTabCallBack') !== null) {
      self.tabs['preferencias-do-usuario'].tab.tab('show');
      window.sessionStorage.removeItem('setTabCallBack');
    }

    if (!Array.isArray(self.config.user)) self.toView = self.config.user;

    // $('#user-cpf_cnpj').mask($.jMaskGlobals.CPFCNPJMaskBehavior,{
    //   onKeyPress: function(val, e, field, options){
    //       var args = Array.from(arguments);
    //       args.push(iscpf=>{
    //         if(self.fv!==null){
    //           if(iscpf){
    //             self.fv[0].disableValidator('user-cpf_cnpj', 'vat')
    //             .enableValidator('user-cpf_cnpj', 'id')
    //             .revalidateField('user-cpf_cnpj');
    //           }
    //           else{
    //             self.fv[0].disableValidator('user-cpf_cnpj', 'id')
    //             .enableValidator('user-cpf_cnpj', 'vat')
    //             .revalidateField('user-cpf_cnpj');
    //           }
    //         }
    //       });
    //       field.mask($.jMaskGlobals.CPFCNPJMaskBehavior.apply({},args), options);
    //     },
    // });

    let def_color = '#333';

    try {
      if (self.config.user.configuration.colors.mainColor !== undefined)
        def_color = self.config.user.configuration.colors.mainColor;
    } catch (err) {}

    $('#user-mainColor').minicolors({
      defaultValue: def_color,
      opacity: false,
      change: function(value, opacity) {
        //hover uses currentColor
        $('.app-heading').css({ 'background-color': value });
        $('.dash-menu li a').css({ color: value });
      }
    });

    let fvUser = FormValidation.formValidation(
      document
        .getElementById('user-default-form')
        .querySelector('.step-pane[data-step="1"]'),
      {
        fields: {
          // 'user-cpf_cnpj': {
          //   validators: {
          //     notEmpty: {
          //       message: 'O cpf/cnpj é obrigatório'
          //     },
          //     vat: {
          //       enabled: false,
          //       country: 'BR',
          //       message: 'cnpj inválido'
          //     },
          //     id: {
          //       country: 'BR',
          //       message: 'cpf inválido'
          //     }
          //   }
          // }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: 'fv-ico ico-check',
            invalid: 'fv-ico ico-close',
            validating: 'fv-ico ico-gear ico-spin'
          })
        }
      }
    ).setLocale('pt_BR', FormValidation.locales.pt_BR);

    self.fv = [fvUser];

    self.wizardActions(function() {
      const conf_obj = {
        // cpf_cnpj: $('#user-cpf_cnpj').val(),
        systemName: $('#user-systemName').val(),
        // socialMedia: {
        //   facebook: {
        //     appID: $('#user-fb-id').val(),
        //     page: $('#user-fb-page').val()
        //   }
        // },
        colors: {
          mainColor: $('#user-mainColor').minicolors('value')
        }
      };
      $("[name='__user-configuration']").val(JSON.stringify(conf_obj));

      return false;
    });

    if (!Array.isArray(self.config.user)) {
      self.callbacks.view = viewConfUser(self);
      self.callbacks.view.onSuccess(self.config.user);
    }

    self.callbacks.update.onSuccess = () => {
      swal({
        title: 'Sucesso',
        text: 'Configurações atualizadas com sucesso!',
        type: 'success',
        confirmButtonText: 'OK',
        onClose: function() {
          window.sessionStorage.setItem('setTabCallBack', true);
          location.reload();
        }
      });
    };

    self.callbacks.create.onSuccess = () => {
      window.sessionStorage.setItem('setTabCallBack', true);
    };

    self.callbacks.unload = self => {
      location.reload();
      // $('#user-cpf_cnpj, #user-systemName').val('');
      // $('#user-systemName').val('');
    };
  }
);

function viewConfUser(self) {
  return {
    onSuccess: function(data) {
      const _conf = data.configuration;

      // $('#user-cpf_cnpj').val(_conf.cpf_cnpj);

      // if ($('#user-cpf_cnpj').cleanVal().length == 11) {
      //   self.fv[0]
      //     .disableValidator('user-cpf_cnpj', 'vat')
      //     .enableValidator('user-cpf_cnpj', 'id')
      //     .revalidateField('user-cpf_cnpj');
      // } else {
      //   self.fv[0]
      //     .disableValidator('user-cpf_cnpj', 'id')
      //     .enableValidator('user-cpf_cnpj', 'vat')
      //     .revalidateField('user-cpf_cnpj');
      // }

      $('#user-systemName').val(_conf.systemName);

      // $('#user-fb-id').val(_conf.socialMedia.facebook.appID);
      // $('#user-fb-page').val(_conf.socialMedia.facebook.page);

      if (data.colors !== undefined)
        $('#user-mainColor').minicolors('value', data.colors.mainColor);
    },
    onError: function(self) {}
  };
}
