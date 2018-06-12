/**
 * @file layout.admin.js
 *
 * Behaviors for editing a layout.
 */

(function ($) {

"use strict";

/**
 * Behavior for showing a list of layouts.
 *
 * Detect flexbox support for displaying our list of layouts with vertical
 * height matching for each row of layout template icons.
 */
Backdrop.behaviors.layoutList = {
  attach: function(context) {
    var $element = $(context).find('.layout-options');
    if ($element.length) {
      if (Backdrop.featureDetect.flexbox()) {
        $element.addClass('flexbox');
      }
      else {
        $element.addClass('no-flexbox');
      }
    }
  }
};

/**
 * Behavior for creating/configuring layout settings.
 */
Backdrop.behaviors.layoutConfigure = {
  attach: function(context) {
    var $form = $('.layout-settings-form').once('layout-settings');
    if ($form.length && Backdrop.ajax) {
      var ajax = Backdrop.ajax['edit-path-update'];
      var updateContexts = function() {
        // Cancel existing AJAX requests and start a new one.
        for (var n = 0; n < ajax.currentRequests.lenth; n++) {
          ajax.currentRequests[n].abort();
          ajax.cleanUp(ajax.currentRequests[n]);
        }
        $('input[data-layout-path-update]').triggerHandler('mousedown');
      };
      // Update contexts after a slight typing delay.
      var timer = 0;
      $('input[name="path"]').on('keyup', function(e) {
        clearTimeout(timer);
        timer = setTimeout(updateContexts, 200);
      });
    }

    // Convert AJAX buttons to links.
    var $linkButtons = $(context).find('.layout-link-button').once('link-button');
    if ($linkButtons.length) {
      $linkButtons.each(function() {
        var $self = $(this).addClass('js-hide');
        $('<a class="layout-button-link" href="#"></a>')
          .insertBefore(this)
          // Copy over the title of the button as the link text.
          .text(this.value)
          // Copy over classes.
          .addClass(this.className)
          .removeClass('layout-link-button form-submit ajax-processed link-button-processed js-hide')
          .on('click', function(event) {
            $self.triggerHandler('mousedown');
            event.preventDefault();
          });
      });
    }
  }
};

/**
 * Behavior for editing layouts.
 */
Backdrop.behaviors.layoutDisplayEditor = {
  attach: function(context) {
    // Apply drag and drop to regions.
    var $regions = $('.layout-editor-region-content').once('layout-sortable');
    if ($regions.length) {
      $regions.sortable({
        connectWith: '.layout-editor-region-content',
        tolerance: 'pointer',
        update: Backdrop.behaviors.layoutDisplayEditor.updateLayout,
        items: '.layout-editor-block',
        placeholder: 'layout-editor-placeholder layout-editor-block',
        forcePlaceholderSize: true
      });

      // Open a dialog if editing a particular block.
      var blockUuid = window.location.hash.replace(/#configure-block:/, '');
      if (blockUuid) {
        window.setTimeout(function() {
          $('[data-block-id="' + blockUuid + '"]').find('li.configure > a').triggerHandler('click');
          // Clear out the hash. Use history if available, preventing another
          // entry (which would require two back button clicks). Fallback to
          // directly updating the URL in the location bar.
          if (window.history && window.history.replaceState) {
            window.history.replaceState({}, '', '#');
          }
          else {
            window.location.hash = '';
          }
        }, 100);
      }
    }

    // Detect the addition of new blocks.
    if ($(context).hasClass('layout-editor-block')) {
      var regionName = $(context).closest('.layout-editor-region').data('regionName');
      var positions = $('input[name="content[positions][' + regionName + ']"]').get(0);
      var blockId = $(context).data('blockId');
      if (positions.value.indexOf(blockId) === -1) {
        positions.value += ',' + $(context).data('blockId');
      }
    }
  },
  /**
   * jQuery UI sortable update callback.
   */
  updateLayout: function(event, ui) {
    var regionName = $(this).closest('.layout-editor-region').data('regionName');
    var blockList = [];
    $(this).find('.layout-editor-block').each(function() {
      blockList.push($(this).data('blockId'));
    });
    $('input[name="content[positions][' + regionName + ']"]').val(blockList.join(','));
  }
};

/**
 * Filters the 'Add block' list by a text input search string.
 */
Backdrop.behaviors.blockListFilterByText = {
  attach: function (context, settings) {
    var $input = $('input#layout-block-list-search').once('layout-block-list-search');
    var $form = $('.layout-block-list');
    var $rows, zebraClass;
    var zebraCounter = 0;

    // Filter the list of layouts by provided search string.
    function filterBlockList() {
      var query = $input.val().toLowerCase();

      function showBlockItem(index, row) {
        var $row = $(row);
        var $sources = $row.find('.block-item, .description');
        var textMatch = $sources.text().toLowerCase().indexOf(query) !== -1;
        var $match = $row.closest('div.layout-block-add-row');
        $match.toggle(textMatch);
        if (textMatch) {
          stripeRow($match);
        }
      }

      // Reset the zebra striping for consistent even/odd classes.
      zebraCounter = 0;
      $rows.each(showBlockItem);

      if ($('div.layout-block-add-row:visible').length === 0) {
        if ($('.filter-empty').length === 0) {
          $('.layout-block-list').append('<p class="filter-empty">' + Backdrop.t('No blocks match your search.') + '</p>');
        }
      }
      else {
        $('.filter-empty').remove();
      }
    }

    function stripeRow($match) {
      zebraClass = (zebraCounter % 2) ? 'odd' : 'even';
      $match.removeClass('even odd');
      $match.addClass(zebraClass);
      zebraCounter++;
    }

    if ($form.length && $input.length) {
      $rows = $form.find('div.layout-block-add-row');
      $rows.each(function () {
        stripeRow($(this));
      });

      // @todo Use autofocus attribute when possible.
      $input.focus().on('keyup', filterBlockList);
    }
  }
}

})(jQuery);
;
(function ($) {

/**
 * A progressbar object. Initialized with the given id. Must be inserted into
 * the DOM afterwards through progressBar.element.
 *
 * method is the function which will perform the HTTP request to get the
 * progress bar state. Either "GET" or "POST".
 *
 * e.g. pb = new progressBar('myProgressBar');
 *      some_element.appendChild(pb.element);
 */
Backdrop.progressBar = function (id, updateCallback, method, errorCallback) {
  this.id = id;
  this.method = method || 'GET';
  this.updateCallback = updateCallback;
  this.errorCallback = errorCallback;

  // The WAI-ARIA setting aria-live="polite" will announce changes after users
  // have completed their current activity and not interrupt the screen reader.
  this.element = $('<div class="progress" aria-live="polite"></div>').attr('id', id);
  this.element.html('<div class="bar"><div class="filled"></div></div>' +
                    '<div class="percentage"></div>' +
                    '<div class="message">&nbsp;</div>');
};

/**
 * Set the percentage and status message for the progressbar.
 */
Backdrop.progressBar.prototype.setProgress = function (percentage, message) {
  if (percentage >= 0 && percentage <= 100) {
    $('div.filled', this.element).css('width', percentage + '%');
    $('div.percentage', this.element).html(percentage + '%');
  }
  $('div.message', this.element).html(message);
  if (this.updateCallback) {
    this.updateCallback(percentage, message, this);
  }
};

/**
 * Start monitoring progress via Ajax.
 */
Backdrop.progressBar.prototype.startMonitoring = function (uri, delay) {
  this.delay = delay;
  this.uri = uri;
  this.sendPing();
};

/**
 * Stop monitoring progress via Ajax.
 */
Backdrop.progressBar.prototype.stopMonitoring = function () {
  clearTimeout(this.timer);
  // This allows monitoring to be stopped from within the callback.
  this.uri = null;
};

/**
 * Request progress data from server.
 */
Backdrop.progressBar.prototype.sendPing = function () {
  if (this.timer) {
    clearTimeout(this.timer);
  }
  if (this.uri) {
    var pb = this;
    // When doing a post request, you need non-null data. Otherwise a
    // HTTP 411 or HTTP 406 (with Apache mod_security) error may result.
    $.ajax({
      type: this.method,
      url: this.uri,
      data: '',
      dataType: 'json',
      success: function (progress) {
        // Display errors.
        if (progress.status == 0) {
          pb.displayError(progress.data);
          return;
        }
        // Update display.
        pb.setProgress(progress.percentage, progress.message);
        // Schedule next timer.
        pb.timer = setTimeout(function () { pb.sendPing(); }, pb.delay);
      },
      error: function (xmlhttp) {
        pb.displayError(Backdrop.ajaxError(xmlhttp, pb.uri));
      }
    });
  }
};

/**
 * Display errors on the page.
 */
Backdrop.progressBar.prototype.displayError = function (string) {
  var error = $('<div class="messages error"></div>').html(string);
  $(this.element).before(error).hide();

  if (this.errorCallback) {
    this.errorCallback(this);
  }
};

})(jQuery);
;
