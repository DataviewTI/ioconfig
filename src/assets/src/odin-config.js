new IOService(
  {
    name: "Config",
    dfId: "odin-default-form",
    wz: $("#odin-default-wizard").wizard(),
  },
  function(self) {
    self.toView = self.config.default;
    $("#odin-cpf_cnpj").mask($.jMaskGlobals.CPFCNPJMaskBehavior, {
      onKeyPress: function(val, e, field, options) {
        var args = Array.from(arguments);
        args.push((iscpf) => {
          if (self.fv !== null) {
            if (iscpf) {
              self.fv[0]
                .disableValidator("odin-cpf_cnpj", "vat")
                .enableValidator("odin-cpf_cnpj", "id")
                .revalidateField("odin-cpf_cnpj");
            } else {
              self.fv[0]
                .disableValidator("odin-cpf_cnpj", "id")
                .enableValidator("odin-cpf_cnpj", "vat")
                .revalidateField("odin-cpf_cnpj");
            }
          }
        });
        field.mask($.jMaskGlobals.CPFCNPJMaskBehavior.apply({}, args), options);
      },
      onComplete: function(val, e, field) {},
    });

    $("#odin-phone, #odin-mobile").mask($.jMaskGlobals.SPMaskBehavior, {
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
      },
    });

    $("#odin-mainColor").minicolors({
      defaultValue:
        self.config.default.colors.mainColor !== undefined
          ? self.config.default.colors.mainColor
          : "#333",
      opacity: false,
      change: function(value, opacity) {
        //hover uses currentColor
        $(".app-heading").css({ "background-color": value });
        $(".dash-menu li a").css({ color: value });
      },
    });

    $("#odin-zipCode").mask("00000-000");

    let form = document.getElementById(self.dfId);

    let fv1 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="1"]'),
      {
        fields: {
          "odin-name": {
            validators: {
              notEmpty: {
                message: "O nome/título do slide é obrigatório!",
              },
            },
          },
          "odin-cpf_cnpj": {
            validators: {
              notEmpty: {
                message: "O cpf/cnpj é obrigatório",
              },
              vat: {
                enabled: false,
                country: "BR",
                message: "cnpj inválido",
              },
              id: {
                country: "BR",
                message: "cpf inválido",
              },
            },
          },
          "odin-phone": {
            validators: {
              phone: {
                country: "BR",
                message: "Telefone Inválido",
              },
            },
          },
          "odin-mobile": {
            validators: {
              phone: {
                country: "BR",
                message: "Mobile Inválido",
              },
            },
          },
          "odin-email": {
            validators: {
              notEmpty: {
                message: "O email principal é obrigatório",
              },
              emailAddress: {
                message: "email Inválido",
              },
            },
          },
          "odin-pathStorage": {
            validators: {
              notEmpty: {
                message: "informe o pathStorage",
              },
            },
          },
          "odin-zipCode": {
            validators: {
              promise: {
                notEmpty: {
                  message: "The avatar is required",
                },
                enabled: true,
                promise: function(input) {
                  return new Promise(function(resolve, reject) {
                    if (input.value.replace(/\D/g, "").length < 8)
                      resolve({
                        valid: false,
                        message: "Cep Inválido!",
                        meta: {
                          data: null,
                        },
                      });
                    else {
                      delete $.ajaxSettings.headers["X-CSRF-Token"];

                      $.ajax({
                        headers: {
                          "Content-Type": "application/json",
                        },
                        complete: (jqXHR) => {
                          $.ajaxSettings.headers[
                            "X-CSRF-Token"
                          ] = laravel_token;
                        },
                        url: `https://viacep.com.br/ws/${$(
                          "#odin-zipCode"
                        ).cleanVal()}/json`,
                        success: (data) => {
                          if (data.erro == true) {
                            resolve({
                              valid: false,
                              message: "Cep não encontrado!",
                              meta: {
                                data: null,
                              },
                            });
                          } else
                            resolve({
                              valid: true,
                              meta: {
                                data,
                              },
                            });
                        },
                      });
                    }
                  });
                },
              },
            },
          },
          "odin-address": {
            validators: {
              notEmpty: {
                message: "O endereço é obrigatório",
              },
            },
          },
          "odin-address2": {
            validators: {
              notEmpty: {
                message: "O bairro é obrigatório",
              },
            },
          },
          hasImages: {
            validators: {
              callback: {
                message: "Insira a logo da empresa!",
                callback: function(input) {
                  if (self.dz.files.length == 0) {
                    toastr["error"]("Insira a logo da empresa!");
                    return false;
                  }
                  $("#hasImages").val(true);
                  return true;
                },
              },
            },
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: "fv-ico ico-check",
            invalid: "fv-ico ico-close",
            validating: "fv-ico ico-gear ico-spin",
          }),
        },
      }
    )
      .setLocale("pt_BR", FormValidation.locales.pt_BR)
      .on("core.validator.validated", function(e) {
        if (e.field === "odin-zipCode" && e.validator === "promise") {
          setCEP(e.result.meta.data, self);
        }
      });

    self.fv = [fv1];

    //Dropzone initialization
    // Dropzone.autoDiscover = false;
    self.dz = new DropZoneLoader({
      el: "#odin-custom-dropzone",
      class: ["m-auto"],
      maxFiles: 1,
      mainImage: false,
      copy_params: {
        original: true,
        sizes: {},
      },
      crop: {
        aspect_ratio_x: 27,
        aspect_ratio_y: 8,
      },
      buttons: {
        reorder: false,
      },
      onPreviewLoad: function(_t) {
        if (self.toView !== null) {
          let _conf = self.config.default;
          self.dz.removeAllFiles(true);
          self.dz.reloadImages(self.config.default);
          self.fv[0].validate();
        }
      },
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
        cpf_cnpj: $("#odin-cpf_cnpj").val(),
        name: $("#odin-name").val(),
        systemName: $("#odin-systemName").val(),
        phone: $("#odin-phone").val(),
        mobile: $("#odin-mobile").val(),
        email: $("#odin-email").val(),
        pathStorage: $("#odin-pathStorage").val(),
        zipCode: $("#odin-zipCode").val(),
        address: $("#odin-address").val(),
        address2: $("#odin-address2").val(),
        city: $("#odin-city").val(),
        state: $("#odin-state").val(),
        uf: $("#odin-uf").val(),
        socialMedia: {
          facebook: {
            appID: $("#odin-fb-id").val(),
            appVersion: $("#odin-fb-version").val(),
            page: $("#odin-fb-page").val(),
            locale: $("#odin-fb-locale").val(),
            longToken: $("#odin-fb-longToken").val(),
          },
        },
        colors: {
          mainColor: $("#odin-mainColor").minicolors("value"),
        },
      };

      $("[name='odin-__configuration']").val(JSON.stringify(conf_obj));

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
        },
      });
    };

    self.callbacks.create.onSuccess = () => {};

    self.callbacks.unload = (self) => {
      $(
        "#odin-cpf_cnpj, #odin-name, #odin-systemName, #odin-phone, #odin-mobile, #odin-email, #odin-pathStorage, #odin-address, #odin-address2, #odin-city, #odin-state"
      ).val("");
      $(
        "#odin-fb-id, #odin-fb-version, #odin-fb-locale, #odin-fb-longToken"
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

      $("#odin-cpf_cnpj")
        .val(
          _conf.cpf_cnpj.length == 11 ? "000.000.000-00" : "00.000.000/0000-00"
        )
        .trigger("input")
        .attr("readonly", true)
        .val($("#odin-cpf_cnpj").masked(_conf.cpf_cnpj));

      $("#odin-name").val(_conf.name);
      $("#odin-systemName").val(_conf.systemName);
      $("#odin-phone").val(_conf.phone);
      $("#odin-mobile").val(_conf.mobile);
      $("#odin-email").val(_conf.email);
      $("#odin-pathStorage").val(_conf.pathStorage);
      $("#odin-zipCode").val(_conf.zipCode);

      //fb-data
      $("#odin-fb-id").val(_conf.socialMedia.facebook.appID);
      $("#odin-fb-version").val(_conf.socialMedia.facebook.appVersion);
      $("#odin-fb-locale").val(_conf.socialMedia.facebook.locale);
      $("#odin-fb-page").val(_conf.socialMedia.facebook.page);
      $("#odin-fb-longToken").val(_conf.socialMedia.facebook.longToken);

      try {
        if (self.config.user.configuration.colors.mainColor == undefined)
          if (data.colors.mainColor !== undefined)
            $("#odin-mainColor").minicolors("value", data.colors.mainColor);
      } catch (err) {}
    }, //sasas
    onError: function(self) {
      console.log("executa algo no erro do callback");
    },
  };
}

function setCEP(data, self) {
  const _conf = self.toView;

  if (self.toView !== null && $("#odin-zipCode").val() == _conf.zipCode) {
    if ($("#odin-address").val() == "" && _conf.address !== "") {
      $("#odin-address").val(_conf.address);
    }

    if ($("#odin-address2").val() == "" && _conf.address2 !== "")
      $("#odin-address2").val(_conf.address2);

    $("#odin-city").val(data.localidade);
    $("#odin-state").val(data.uf);
    $("#odin-address").focus();
  } else {
    if (data !== null) {
      //com logradouro
      if (data.logradouro !== "") {
        $("#odin-address").val(
          `${data.logradouro}${
            data.complemento != "" ? ", " + data.complemento : ""
          }`
        );
        $("#odin-address2").val(data.bairro);
      }

      $("#odin-city").val(data.localidade);
      $("#odin-state").val(data.uf);
      $("#odin-address").focus();
    } else $("#odin-address, #odin-address2, #odin-city, #odin-state").val("");
  }

  self.fv[0].revalidateField("odin-address");
  self.fv[0].revalidateField("odin-address2");
}
