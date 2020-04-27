new IOService(
  {
    name: "Config",
    dfId: "admin-default-form",
    wz: $("#admin-default-wizard").wizard()
  },
  function(self) {
    self.toView = self.config.default;
    $("#admin-cpf_cnpj").mask($.jMaskGlobals.CPFCNPJMaskBehavior, {
      onKeyPress: function(val, e, field, options) {
        var args = Array.from(arguments);
        args.push(iscpf => {
          if (self.fv !== null) {
            if (iscpf) {
              self.fv[0]
                .disableValidator("admin-cpf_cnpj", "vat")
                .enableValidator("admin-cpf_cnpj", "id")
                .revalidateField("admin-cpf_cnpj");
            } else {
              self.fv[0]
                .disableValidator("admin-cpf_cnpj", "id")
                .enableValidator("admin-cpf_cnpj", "vat")
                .revalidateField("admin-cpf_cnpj");
            }
          }
        });
        field.mask($.jMaskGlobals.CPFCNPJMaskBehavior.apply({}, args), options);
      },
      onComplete: function(val, e, field) {}
    });

    $("#admin-phone, #admin-mobile").mask($.jMaskGlobals.SPMaskBehavior, {
      onKeyPress: function(val, e, field, options) {
        self.fv[0].revalidateField($(field).attr("id"));
        field.mask($.jMaskGlobals.SPMaskBehavior.apply({}, arguments), options);
      },
      onComplete: function(val, e, field) {
        $(field)
          .parent()
          .parent()
          .next()
          .find("input")
          .first()
          .focus();
      }
    });

    $("#admin-mainColor").minicolors({
      defaultValue:
        self.config.default.colors.mainColor !== undefined
          ? self.config.default.colors.mainColor
          : "#333",
      opacity: false,
      change: function(value, opacity) {
        //hover uses currentColor
        $(".app-heading").css({ "background-color": value });
        $(".dash-menu li a").css({ color: value });
      }
    });

    $("#admin-zipCode").mask("00000-000");

    let form = document.getElementById(self.dfId);

    let fv1 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="1"]'),
      {
        fields: {
          "admin-name": {
            validators: {
              notEmpty: {
                message: "O nome/título da entidade é obrigatório!"
              }
            }
          },
          "admin-cpf_cnpj": {
            validators: {
              notEmpty: {
                message: "O cpf/cnpj é obrigatório"
              },
              vat: {
                enabled: false,
                country: "BR",
                message: "cnpj inválido"
              },
              id: {
                country: "BR",
                message: "cpf inválido"
              }
            }
          },
          "admin-phone": {
            validators: {
              phone: {
                country: "BR",
                message: "Telefone Inválido"
              }
            }
          },
          "admin-mobile": {
            validators: {
              phone: {
                country: "BR",
                message: "Mobile Inválido"
              }
            }
          },
          "admin-email": {
            validators: {
              notEmpty: {
                message: "O email principal é obrigatório"
              },
              emailAddress: {
                message: "email Inválido"
              }
            }
          },
          "admin-pathStorage": {
            validators: {
              notEmpty: {
                message: "informe o pathStorage"
              }
            }
          },
          "admin-zipCode": {
            validators: {
              promise: {
                notEmpty: {
                  message: "The avatar is required"
                },
                enabled: true,
                promise: function(input) {
                  return new Promise(function(resolve, reject) {
                    if (input.value.replace(/\D/g, "").length < 8)
                      resolve({
                        valid: false,
                        message: "Cep Inválido!",
                        meta: {
                          data: null
                        }
                      });
                    else {
                      delete $.ajaxSettings.headers["X-CSRF-Token"];

                      $.ajax({
                        headers: {
                          "Content-Type": "application/json"
                        },
                        complete: jqXHR => {
                          $.ajaxSettings.headers[
                            "X-CSRF-Token"
                          ] = laravel_token;
                        },
                        url: `https://viacep.com.br/ws/${$(
                          "#admin-zipCode"
                        ).cleanVal()}/json`,
                        success: data => {
                          if (data.erro == true) {
                            resolve({
                              valid: false,
                              message: "Cep não encontrado!",
                              meta: {
                                data: null
                              }
                            });
                          } else
                            resolve({
                              valid: true,
                              meta: {
                                data
                              }
                            });
                        }
                      });
                    }
                  });
                }
              }
            }
          },
          "admin-address": {
            validators: {
              notEmpty: {
                message: "O endereço é obrigatório"
              }
            }
          },
          "admin-address2": {
            validators: {
              notEmpty: {
                message: "O bairro é obrigatório"
              }
            }
          },
          has_images: {
            validators: {
              callback: {
                message: "Insira a logo da empresa!",
                callback: function(input) {
                  if (self.dz.files.length == 0) {
                    toastr["error"]("Insira a logo da empresa!");
                    return false;
                  }
                  $("#has_images").val(true);
                  return true;
                }
              }
            }
          }
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: "fv-ico ico-check",
            invalid: "fv-ico ico-close",
            validating: "fv-ico ico-gear ico-spin"
          })
        }
      }
    )
      .setLocale("pt_BR", FormValidation.locales.pt_BR)
      .on("core.validator.validated", function(e) {
        if (e.field === "admin-zipCode" && e.validator === "promise") {
          setCEP(e.result.meta.data, self);
        }
      });

    self.fv = [fv1];

    //Dropzone initialization
    Dropzone.autoDiscover = false;
    self.dz = new DropZoneLoader({
      id: "#admin-custom-dropzone",
      autoProcessQueue: false,
      thumbnailWidth: 270,
      thumbnailHeight: 80,
      class: "m-auto",
      maxFiles: 1,
      mainImage: false,
      copy_params: {
        original: true,
        sizes: {}
      },
      crop: {
        ready: cr => {
          cr.aspect_ratio_x = 27;
          cr.aspect_ratio_y = 8;
        }
      },
      buttons: {
        reorder: false
      },
      onSuccess: function(file, ret) {
        //self.fv[0].revalidateField('has_images');
      },
      onPreviewLoad: function(_t) {
        if (self.toView !== null) {
          let _conf = self.config.default;
          self.dz.removeAllFiles(true);
          self.dz.reloadImages(self.config.default);
          self.fv[0].validate();
          //aa
        }
      }
    });

    //need to transform wizardActions in a method of Class
    self.wizardActions(function() {
      //self.dz.copy_params.sizes.default = {"w":$('#width').val(),"h":$('#height').val()}
      document
        .getElementById(self.dfId)
        .querySelector("[name='__dz_images']").value = JSON.stringify(
        self.dz.getOrderedDataImages()
      );
      document
        .getElementById(self.dfId)
        .querySelector("[name='__dz_copy_params']").value = JSON.stringify(
        self.dz.copy_params
      );

      const conf_obj = {
        cpf_cnpj: $("#admin-cpf_cnpj").val(),
        name: $("#admin-name").val(),
        systemName: $("#admin-systemName").val(),
        phone: $("#admin-phone").val(),
        mobile: $("#admin-mobile").val(),
        email: $("#admin-email").val(),
        pathStorage: $("#admin-pathStorage").val(),
        zipCode: $("#admin-zipCode").val(),
        address: $("#admin-address").val(),
        address2: $("#admin-address2").val(),
        city: $("#admin-city").val(),
        state: $("#admin-state").val(),
        uf: $("#admin-uf").val(),
        socialMedia: {
          facebook: {
            appID: $("#admin-fb-id").val(),
            appVersion: $("#admin-fb-version").val(),
            page: $("#admin-fb-page").val(),
            locale: $("#admin-fb-locale").val(),
            longToken: $("#admin-fb-longToken").val()
          }
        },
        colors: {
          mainColor: $("#admin-mainColor").minicolors("value")
        }
      };

      $("[name='admin-__configuration']").val(JSON.stringify(conf_obj));

      return false;
    });

    self.callbacks.view = view(self);
    self.callbacks.view.onSuccess(self.config.default);

    self.callbacks.update.onSuccess = () => {
      swal({
        title: "Sucesso",
        text: "Configurações atualizadas com sucesso!",
        type: "success",
        confirmButtonText: "OK",
        onClose: function() {
          self.unload(self);
          location.reload();
        }
      });
    };

    self.callbacks.create.onSuccess = () => {};

    self.callbacks.unload = self => {
      $(
        "#admin-cpf_cnpj, #admin-name, #admin-systemName, #admin-phone, #admin-mobile, #admin-email, #admin-pathStorage, #admin-address, #admin-address2, #admin-city, #admin-state"
      ).val("");
      $(
        "#admin-fb-id, #admin-fb-version, #admin-fb-locale, #admin-fb-longToken"
      ).val("");

      self.dz.removeAllFiles(true);
    };
  }
); //the end ??

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                                                                                            
  ██╗      ██████╗  ██████╗ █████╗ ██╗         ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
  ██║     ██╔═══██╗██╔════╝██╔══██╗██║         ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
  ██║     ██║   ██║██║     ███████║██║         ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
  ██║     ██║   ██║██║     ██╔══██║██║         ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
  ███████╗╚██████╔╝╚██████╗██║  ██║███████╗    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
  ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function view(self) {
  return {
    onSuccess: function(data) {
      const _conf = data;

      $("#admin-cpf_cnpj").val(_conf.cpf_cnpj);

      if ($("#admin-cpf_cnpj").cleanVal().length == 11) {
        self.fv[0]
          .disableValidator("admin-cpf_cnpj", "vat")
          .enableValidator("admin-cpf_cnpj", "id")
          .revalidateField("admin-cpf_cnpj");
      } else {
        self.fv[0]
          .disableValidator("admin-cpf_cnpj", "id")
          .enableValidator("admin-cpf_cnpj", "vat")
          .revalidateField("admin-cpf_cnpj");
      }

      $("#admin-name").val(_conf.name);
      $("#admin-systemName").val(_conf.systemName);
      $("#admin-phone").val(_conf.phone);
      $("#admin-mobile").val(_conf.mobile);
      $("#admin-email").val(_conf.email);
      $("#admin-pathStorage").val(_conf.pathStorage);
      $("#admin-zipCode").val(_conf.zipCode);

      //fb-data
      $("#admin-fb-id").val(_conf.socialMedia.facebook.appID);
      $("#admin-fb-version").val(_conf.socialMedia.facebook.appVersion);
      $("#admin-fb-locale").val(_conf.socialMedia.facebook.locale);
      $("#admin-fb-page").val(_conf.socialMedia.facebook.page);
      $("#admin-fb-longToken").val(_conf.socialMedia.facebook.longToken);

      try {
        if (self.config.user.configuration.colors.mainColor == undefined)
          if (data.colors.mainColor !== undefined)
            $("#admin-mainColor").minicolors("value", data.colors.mainColor);
      } catch (err) {}
    }, //sasas
    onError: function(self) {}
  };
}

function setCEP(data, self) {
  const _conf = self.toView;

  if (self.toView !== null && $("#admin-zipCode").val() == _conf.zipCode) {
    if ($("#admin-address").val() == "" && _conf.address !== "") {
      $("#admin-address").val(_conf.address);
    }

    if ($("#admin-address2").val() == "" && _conf.address2 !== "")
      $("#admin-address2").val(_conf.address2);

    $("#admin-city").val(data.localidade);
    $("#admin-state").val(data.uf);
    $("#admin-address").focus();
  } else {
    if (data !== null) {
      //com logradouro
      if (data.logradouro !== "") {
        $("#admin-address").val(
          `${data.logradouro}${
            data.complemento != "" ? ", " + data.complemento : ""
          }`
        );
        $("#admin-address2").val(data.bairro);
      }

      $("#admin-city").val(data.localidade);
      $("#admin-state").val(data.uf);
      $("#admin-address").focus();
    } else
      $("#admin-address, #admin-address2, #admin-city, #admin-state").val("");
  }

  self.fv[0].revalidateField("admin-address");
  self.fv[0].revalidateField("admin-address2");
}
