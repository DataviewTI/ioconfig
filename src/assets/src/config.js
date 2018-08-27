new IOService({
    name:'Config',
  },
  function(self){

  let form = document.getElementById(self.dfId);
    let fv1 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="1"]'),
      {
        fields: {
          name:{
            validators:{
              notEmpty:{
                message: 'O nome/título do slide é obrigatório!'
              }
            }
          },
        },
        plugins:{
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: 'fv-ico ico-check',
            invalid: 'fv-ico ico-close',
            validating: 'fv-ico ico-gear ico-spin'
          }),
        },
    }).setLocale('pt_BR', FormValidation.locales.pt_BR);

    self.fv = [fv1];

    //Dropzone initialization
    Dropzone.autoDiscover = false;
    self.dz = new DropZoneLoader({
      id:'#custom-dropzone',
      autoProcessQueue	: false,
      thumbnailWidth: 610,
      thumbnailHeight: 222,
      mainImage:false,
      copy_params:{
        original:true,
        sizes:{
         }
      },
      crop:{ 
        ready:(cr)=>{
            cr.aspect_ratio_x = 1;
            cr.aspect_ratio_y = 1;
          }
      },
      buttons:{
        edit:false
      },
      onSuccess:function(file,ret){
        self.fv[0].revalidateField('has_images');
      }
    });

    
    //need to transform wizardActions in a method of Class
    self.wizardActions(function(){ 
      //self.dz.copy_params.sizes.default = {"w":$('#width').val(),"h":$('#height').val()}
      $("[name='__dz_images']").val(JSON.stringify(self.dz.getOrderedDataImages()));
      $("[name='__dz_copy_params']").val(JSON.stringify(self.dz.copy_params));
    });

    self.callbacks.view = view(self);
    self.callbacks.update.onSuccess = ()=>{
//      self.tabs['listar'].tab.tab('show');
    }

    self.callbacks.create.onSuccess = ()=>{
//      self.tabs['listar'].tab.tab('show');
    }

    self.callbacks.unload = self=>{
      self.dz.removeAllFiles(true);
    }

});//the end ??


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                                                                                                            
  ██╗      ██████╗  ██████╗ █████╗ ██╗         ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
  ██║     ██╔═══██╗██╔════╝██╔══██╗██║         ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
  ██║     ██║   ██║██║     ███████║██║         ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
  ██║     ██║   ██║██║     ██╔══██║██║         ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
  ███████╗╚██████╔╝╚██████╗██║  ██║███████╗    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
  ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function view(self){
  return{
      onSuccess:function(data){
        $("[name='name']").val(data.name);
        //reload imagens 
        self.dz.removeAllFiles(true);

        if(data.group!=null){
          self.dz.reloadImages(data);
        }
      },
      onError:function(self){
        console.log('executa algo no erro do callback');
      }
    }
}