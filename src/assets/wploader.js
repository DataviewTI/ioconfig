"use strict";
let mix = require("laravel-mix");

function IOConfig(params = {}) {
  let $ = this;
  let dep = {
    config: "node_modules/intranetone-config/src/",
    moment: "node_modules/moment/",
    minicolors: "node_modules/@claviska/jquery-minicolors/",
    dropzone: "node_modules/dropzone/dist/",
    cropper: "node_modules/cropperjs/dist/",
    jquerycropper: "node_modules/jquery-cropper/dist/",
  };

  let config = {
    optimize: false,
    sass: false,
    fe: true,
    cb: () => {},
  };

  this.compile = (IO, callback = () => {}) => {
    //move minicolors.png
    mix.copy(
      dep.minicolors + "jquery.minicolors.png",
      IO.dest.io.root + "images/plugins/jquery.minicolors.png"
    );

    mix.styles(
      [
        IO.src.css + "helpers/dv-buttons.css",
        IO.src.io.css + "dropzone.css",
        IO.src.io.css + "dropzone-preview-template.css",
        IO.dep.io.toastr + "toastr.min.css",
        IO.src.io.css + "toastr.css",
        IO.src.io.vendors +
          "aanjulena-bs-toggle-switch/aanjulena-bs-toggle-switch.css",
        IO.src.io.css + "sortable.css",
        dep.fontselect + "styles/fontselect-alternate.css",
        dep.minicolors + "jquery.minicolors.css",
        dep.cropper + "cropper.css",
        dep.entity + "dropzone.css",
        dep.config + "config.css",
      ],
      IO.dest.io.root + "services/io-config.min.css"
    );

    mix.babel(
      [
        IO.src.js + "extensions/ext-jquery.js",
        IO.src.io.vendors +
          "aanjulena-bs-toggle-switch/aanjulena-bs-toggle-switch.js",
        IO.dep.io.toastr + "toastr.min.js",
        IO.src.io.js + "defaults/def-toastr.js",
        dep.dropzone + "dropzone.js",
        IO.src.io.js + "dropzone-loader.js",

        dep.moment + "min/moment.min.js",
        IO.src.io.vendors + "moment/moment-pt-br.js",
        dep.cropper + "cropper.js",
        dep.jquerycropper + "jquery-cropper.js",
        dep.minicolors + "jquery.minicolors.min.js",

        IO.dep.jquery_mask + "jquery.mask.min.js",
        IO.src.js + "extensions/ext-jquery.mask.js",
      ],
      IO.dest.io.root + "services/io-config-babel.min.js"
    );

    mix.babel([], IO.dest.io.root + "services/io-config-mix.min.js");

    //copy separated for compatibility
    mix.babel(
      dep.config + "odin-config.js",
      IO.dest.io.root + "services/io-odin-config.min.js"
    );
    mix.babel(
      dep.config + "admin-config.js",
      IO.dest.io.root + "services/io-admin-config.min.js"
    );
    mix.babel(
      dep.config + "user-config.js",
      IO.dest.io.root + "services/io-user-config.min.js"
    );

    callback(IO);
  };
}

module.exports = IOConfig;
