/**
 * @file
 * Javascript for the theme settings preview.
 */
(function ($) {
  Backdrop.color = {
    logoChanged: false,
    callback: function(context, settings, form, farb, height, width) {
      // Change the logo to be the real one.
      if (!this.logoChanged) {
        $('#preview #preview-logo img').attr('src', Backdrop.settings.color.logo);
        this.logoChanged = true;
      }
      // Remove the logo if the setting is toggled off. 
      if (Backdrop.settings.color.logo == null) {
        $('div').remove('#preview-logo');
      }

      // Solid background.
      $('#preview', form).css('backgroundColor', $('#palette input[name="palette[bg]"]', form).val());

      // Text preview.
      $('#preview #preview-main h2, #preview .preview-content', form).css('color', $('#palette input[name="palette[text]"]', form).val());
      $('#preview #preview-content a', form).css('color', $('#palette input[name="palette[link]"]', form).val());

      // Sidebar block.
      $('#preview #preview-sidebar #preview-block', form).css('background-color', $('#palette input[name="palette[sidebar]"]', form).val());
      $('#preview #preview-sidebar #preview-block', form).css('border-color', $('#palette input[name="palette[sidebarborders]"]', form).val());

      // Footer wrapper background.
      $('#preview #preview-footer-wrapper', form).css('background-color', $('#palette input[name="palette[footer]"]', form).val());

      // CSS3 Gradients.
      var gradient_start = $('#palette input[name="palette[top]"]', form).val();
      var gradient_end = $('#palette input[name="palette[bottom]"]', form).val();

      $('#preview #preview-header', form).attr('style', "background-color: " + gradient_start + "; background-image: -webkit-gradient(linear, 0% 0%, 0% 100%, from(" + gradient_start + "), to(" + gradient_end + ")); background-image: -moz-linear-gradient(-90deg, " + gradient_start + ", " + gradient_end + ");");

      $('#preview #preview-site-name', form).css('color', $('#palette input[name="palette[titleslogan]"]', form).val());

      // Main menu
      $('#preview #preview-main-menu-links a', form).css('color', $('#palette input[name="palette[menu]"]', form).val());
      $('#preview #preview-main-menu-links a.active', form).css('color', $('#palette input[name="palette[activemenu]"]', form).val());

      checkTab();

      $('#edit-main-menu-tabs').find('input[type=radio]').on('change',function(){
        checkTab();
      });

      function checkTab() {
        var menuColor = $('#palette input[name="palette[menu]"]', form).val();
        var activeMenuColor = $('#palette input[name="palette[activemenu]"]', form).val();
        if ($('#edit-main-menu-tabs-no-tabs').is(':checked')) {
          updateTabs('none', 'none', 0, menuColor);
          $('#preview-main-menu-links a.active').css({'text-decoration': 'underline', 'color': activeMenuColor });
        }
        if ($('#edit-main-menu-tabs-rounded-tabs').is(':checked')) {
          updateTabs('rgba(255, 255, 255, 0.7)', '0 1px #eee', '8px', '#333');
          $('#preview-main-menu-links a.active').css({
            'text-decoration': 'none',
            'background': '#ffffff'
          });
        }
        if ($('#edit-main-menu-tabs-square-tabs').is(':checked')) {
          updateTabs('rgba(255, 255, 255, 0.7)', '0 1px #eee', 0, '#333');
          $('#preview-main-menu-links a.active').css({
            'text-decoration': 'none',
            'background': '#ffffff'
          });
        }
      }

      function updateTabs(bg, shadow, radius, menuColor) {
        $('#preview #preview-main-menu-links a').css({
          'background': bg,
          'text-shadow': shadow,
          'border-top-left-radius': radius,
          'border-top-right-radius': radius,
          'color': menuColor
        });
      }
    }
  };
})(jQuery);
;
/**
 * @file
 * Attaches the behaviors for the Color module.
 */

(function ($) {

Backdrop.behaviors.color = {
  attach: function (context, settings) {
    var i, j, colors;
    // This behavior attaches by ID, so is only valid once on a page.
    var form = $('#system-theme-settings .color-form', context).once('color');
    if (form.length == 0) {
      return;
    }
    var inputs = [];
    var hooks = [];
    var locks = [];
    var focused = null;

    // Add Farbtastic.
    $(form).find('#palette').after('<div id="placeholder"></div>').addClass('color-processed');
    var farb = $.farbtastic('#placeholder');

    // Decode reference colors to HSL.
    var reference = settings.color.reference;
    for (i in reference) {
      if (reference.hasOwnProperty(i)) {
        reference[i] = farb.RGBToHSL(farb.unpack(reference[i]));
      }
    }

    // Build a preview.
    var height = [];
    var width = [];
    // Loop through all defined gradients.
    for (i in settings.gradients) {
      if (settings.gradients.hasOwnProperty(i)) {
         // Add element to display the gradient.
         $('#preview').once('color').append('<div id="gradient-' + i + '"></div>');
         var gradient = $('#preview #gradient-' + i);
         // Add height of current gradient to the list (divided by 10).
         height.push(parseInt(gradient.css('height'), 10) / 10);
         // Add width of current gradient to the list (divided by 10).
         width.push(parseInt(gradient.css('width'), 10) / 10);
         // Add rows (or columns for horizontal gradients).
         // Each gradient line should have a height (or width for horizontal
         // gradients) of 10px (because we divided the height/width by 10 above).
         for (j = 0; j < (settings.gradients[i].direction === 'vertical' ? height[i] : width[i]); ++j) {
           gradient.append('<div class="gradient-line"></div>');
         }
      }
    }

    // Set up colorScheme selector.
    $('#edit-scheme', form).change(function () {
      var schemes = settings.color.schemes, colorScheme = this.options[this.selectedIndex].value;
      if (colorScheme != '' && schemes[colorScheme]) {
        // Get colors of active scheme.
        colors = schemes[colorScheme];
        for (var fieldName in colors) {
          if (colors.hasOwnProperty(fieldName)) {
            callback($('#edit-palette-' + fieldName), colors[fieldName], false, true);
          }
        }
        preview();
      }
    });

    /**
     * Renders the preview.
     */
    function preview() {
      Backdrop.color.callback(context, settings, form, farb, height, width);
    }

    /**
     * Shifts a given color, using a reference pair (ref in HSL).
     *
     * This algorithm ensures relative ordering on the saturation and luminance
     * axes is preserved, and performs a simple hue shift.
     *
     * It is also symmetrical. If: shift_color(c, a, b) == d, then
     * shift_color(d, b, a) == c.
     */
    function shift_color(given, ref1, ref2) {
      var d;
      // Convert to HSL.
      given = farb.RGBToHSL(farb.unpack(given));

      // Hue: apply delta.
      given[0] += ref2[0] - ref1[0];

      // Saturation: interpolate.
      if (ref1[1] == 0 || ref2[1] == 0) {
        given[1] = ref2[1];
      }
      else {
        d = ref1[1] / ref2[1];
        if (d > 1) {
          given[1] /= d;
        }
        else {
          given[1] = 1 - (1 - given[1]) * d;
        }
      }

      // Luminance: interpolate.
      if (ref1[2] == 0 || ref2[2] == 0) {
        given[2] = ref2[2];
      }
      else {
        d = ref1[2] / ref2[2];
        if (d > 1) {
          given[2] /= d;
        }
        else {
          given[2] = 1 - (1 - given[2]) * d;
        }
      }

      return farb.pack(farb.HSLToRGB(given));
    }

    /**
     * Callback for Farbtastic when a new color is chosen.
     */
    function callback(input, color, propagate, colorScheme) {
      var matched;
      // Set background/foreground colors.
      $(input).css({
        backgroundColor: color,
        'color': farb.RGBToHSL(farb.unpack(color))[2] > 0.5 ? '#000' : '#fff'
      });

      // Change input value.
      if ($(input).val() && $(input).val() != color) {
        $(input).val(color);

        // Update locked values.
        if (propagate) {
          i = input.i;
          for (j = i + 1; ; ++j) {
            if (!locks[j - 1] || $(locks[j - 1]).is('.unlocked')) {
              break;
            }
            matched = shift_color(color, reference[input.key], reference[inputs[j].key]);
            callback(inputs[j], matched, false);
          }
          for (j = i - 1; ; --j) {
            if (!locks[j] || $(locks[j]).is('.unlocked')) {
              break;
            }
            matched = shift_color(color, reference[input.key], reference[inputs[j].key]);
            callback(inputs[j], matched, false);
          }

          // Update preview.
          preview();
        }

        // Reset colorScheme selector.
        if (!colorScheme) {
          resetScheme();
        }
      }
    }

    /**
     * Resets the color scheme selector.
     */
    function resetScheme() {
      $('#edit-scheme', form).each(function () {
        this.selectedIndex = this.options.length - 1;
      });
    }

    /**
     * Focuses Farbtastic on a particular field.
     */
    function focus(e) {
      var input = e.target;
      // Remove old bindings.
      if (focused) {
        $(focused).unbind('keyup', farb.updateValue)
          .unbind('keyup', preview).unbind('keyup', resetScheme)
          .parent().removeClass('item-selected');
      }

      // Add new bindings.
      focused = input;
      farb.linkTo(function (color) { callback(input, color, true, false); });
      farb.setColor(input.value);
      $(focused).keyup(farb.updateValue).keyup(preview).keyup(resetScheme)
        .parent().addClass('item-selected');
    }

    // Initialize color fields.
    $('#palette input.form-text', form)
    .each(function () {
      // Extract palette field name
      this.key = this.id.substring(13);

      // Link to color picker temporarily to initialize.
      farb.linkTo(function () {}).setColor('#000').linkTo(this);

      // Add lock.
      var i = inputs.length;
      if (inputs.length) {
        var lock = $('<div class="lock"></div>').bind('click', function() {
          if (!$(this).hasClass('unlocked')) {
            $(this).addClass('unlocked');
            $(hooks[i - 1]).attr('class',
              locks[i - 2] && $(locks[i - 2]).is(':not(.unlocked)') ? 'hook up' : 'hook'
            );
            $(hooks[i]).attr('class',
              locks[i] && $(locks[i]).is(':not(.unlocked)') ? 'hook down' : 'hook'
            );
          }
          else {
            $(this).removeClass('unlocked');
            $(hooks[i - 1]).attr('class',
              locks[i - 2] && $(locks[i - 2]).is(':not(.unlocked)') ? 'hook both' : 'hook down'
            );
            $(hooks[i]).attr('class',
              locks[i] && $(locks[i]).is(':not(.unlocked)') ? 'hook both' : 'hook up'
            );
          }
        });
        $(this).after(lock);
        locks.push(lock);
      }

      // Add hook.
      var hook = $('<div class="hook"></div>');
      $(this).after(hook);
      hooks.push(hook);

      $(this).parent().find('.lock').click();
      this.i = i;
      inputs.push(this);
    })
    .focus(focus);

    $('#palette label', form);

    // Focus first color.
    inputs[0].focus();

    // Render preview.
    preview();
  }
};

})(jQuery);
;
