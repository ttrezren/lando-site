/*!
 * jQuery Form Plugin
 * version: 4.2.1
 * Requires jQuery v1.7 or later
 * Copyright 2017 Kevin Morris
 * Copyright 2006 M. Alsup
 * Project repository: https://github.com/jquery-form/form
 * Dual licensed under the MIT and LGPLv3 licenses.
 * https://github.com/jquery-form/form#license
 */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof module&&module.exports?module.exports=function(b,c){return void 0===c&&(c="undefined"!=typeof window?require("jquery"):require("jquery")(b)),a(c),c}:a(jQuery)}(function(a){"use strict";function b(b){var c=b.data;b.isDefaultPrevented()||(b.preventDefault(),a(b.target).closest("form").ajaxSubmit(c))}function c(b){var c=b.target,d=a(c);if(!d.is("[type=submit],[type=image]")){var e=d.closest("[type=submit]");if(0===e.length)return;c=e[0]}var f=c.form;if(f.clk=c,"image"===c.type)if(void 0!==b.offsetX)f.clk_x=b.offsetX,f.clk_y=b.offsetY;else if("function"==typeof a.fn.offset){var g=d.offset();f.clk_x=b.pageX-g.left,f.clk_y=b.pageY-g.top}else f.clk_x=b.pageX-c.offsetLeft,f.clk_y=b.pageY-c.offsetTop;setTimeout(function(){f.clk=f.clk_x=f.clk_y=null},100)}function d(){if(a.fn.ajaxSubmit.debug){var b="[jquery.form] "+Array.prototype.join.call(arguments,"");window.console&&window.console.log?window.console.log(b):window.opera&&window.opera.postError&&window.opera.postError(b)}}var e={};e.fileapi=void 0!==a('<input type="file">').get(0).files,e.formdata=void 0!==window.FormData;var f=!!a.fn.prop;a.fn.attr2=function(){if(!f)return this.attr.apply(this,arguments);var a=this.prop.apply(this,arguments);return a&&a.jquery||"string"==typeof a?a:this.attr.apply(this,arguments)},a.fn.ajaxSubmit=function(b,c,g,h){function i(c){var d,e,f=a.param(c,b.traditional).split("&"),g=f.length,h=[];for(d=0;d<g;d++)f[d]=f[d].replace(/\+/g," "),e=f[d].split("="),h.push([decodeURIComponent(e[0]),decodeURIComponent(e[1])]);return h}function j(c){for(var d=new FormData,e=0;e<c.length;e++)d.append(c[e].name,c[e].value);if(b.extraData){var f=i(b.extraData);for(e=0;e<f.length;e++)f[e]&&d.append(f[e][0],f[e][1])}b.data=null;var g=a.extend(!0,{},a.ajaxSettings,b,{contentType:!1,processData:!1,cache:!1,type:l||"POST"});b.uploadProgress&&(g.xhr=function(){var c=a.ajaxSettings.xhr();return c.upload&&c.upload.addEventListener("progress",function(a){var c=0,d=a.loaded||a.position,e=a.total;a.lengthComputable&&(c=Math.ceil(d/e*100)),b.uploadProgress(a,d,e,c)},!1),c}),g.data=null;var h=g.beforeSend;return g.beforeSend=function(a,c){b.formData?c.data=b.formData:c.data=d,h&&h.call(this,a,c)},a.ajax(g)}function k(c){function e(a){var b=null;try{a.contentWindow&&(b=a.contentWindow.document)}catch(a){d("cannot get iframe.contentWindow document: "+a)}if(b)return b;try{b=a.contentDocument?a.contentDocument:a.document}catch(c){d("cannot get iframe.contentDocument: "+c),b=a.document}return b}function g(){function b(){try{var a=e(q).readyState;d("state = "+a),a&&"uninitialized"===a.toLowerCase()&&setTimeout(b,50)}catch(a){d("Server abort: ",a," (",a.name,")"),h(2),w&&clearTimeout(w),w=void 0}}var c=o.attr2("target"),f=o.attr2("action"),g=o.attr("enctype")||o.attr("encoding")||"multipart/form-data";x.setAttribute("target",n),l&&!/post/i.test(l)||x.setAttribute("method","POST"),f!==k.url&&x.setAttribute("action",k.url),k.skipEncodingOverride||l&&!/post/i.test(l)||o.attr({encoding:"multipart/form-data",enctype:"multipart/form-data"}),k.timeout&&(w=setTimeout(function(){v=!0,h(1)},k.timeout));var i=[];try{if(k.extraData)for(var j in k.extraData)k.extraData.hasOwnProperty(j)&&(a.isPlainObject(k.extraData[j])&&k.extraData[j].hasOwnProperty("name")&&k.extraData[j].hasOwnProperty("value")?i.push(a('<input type="hidden" name="'+k.extraData[j].name+'">',z).val(k.extraData[j].value).appendTo(x)[0]):i.push(a('<input type="hidden" name="'+j+'">',z).val(k.extraData[j]).appendTo(x)[0]));k.iframeTarget||p.appendTo(A),q.attachEvent?q.attachEvent("onload",h):q.addEventListener("load",h,!1),setTimeout(b,15);try{x.submit()}catch(a){var m=document.createElement("form").submit;m.apply(x)}}finally{x.setAttribute("action",f),x.setAttribute("enctype",g),c?x.setAttribute("target",c):o.removeAttr("target"),a(i).remove()}}function h(b){if(!r.aborted&&!F){if(E=e(q),E||(d("cannot access response document"),b=2),1===b&&r)return r.abort("timeout"),void y.reject(r,"timeout");if(2===b&&r)return r.abort("server abort"),void y.reject(r,"error","server abort");if(E&&E.location.href!==k.iframeSrc||v){q.detachEvent?q.detachEvent("onload",h):q.removeEventListener("load",h,!1);var c,f="success";try{if(v)throw"timeout";var g="xml"===k.dataType||E.XMLDocument||a.isXMLDoc(E);if(d("isXml="+g),!g&&window.opera&&(null===E.body||!E.body.innerHTML)&&--G)return d("requeing onLoad callback, DOM not available"),void setTimeout(h,250);var i=E.body?E.body:E.documentElement;r.responseText=i?i.innerHTML:null,r.responseXML=E.XMLDocument?E.XMLDocument:E,g&&(k.dataType="xml"),r.getResponseHeader=function(a){return{"content-type":k.dataType}[a.toLowerCase()]},i&&(r.status=Number(i.getAttribute("status"))||r.status,r.statusText=i.getAttribute("statusText")||r.statusText);var j=(k.dataType||"").toLowerCase(),l=/(json|script|text)/.test(j);if(l||k.textarea){var n=E.getElementsByTagName("textarea")[0];if(n)r.responseText=n.value,r.status=Number(n.getAttribute("status"))||r.status,r.statusText=n.getAttribute("statusText")||r.statusText;else if(l){var o=E.getElementsByTagName("pre")[0],s=E.getElementsByTagName("body")[0];o?r.responseText=o.textContent?o.textContent:o.innerText:s&&(r.responseText=s.textContent?s.textContent:s.innerText)}}else"xml"===j&&!r.responseXML&&r.responseText&&(r.responseXML=H(r.responseText));try{D=J(r,j,k)}catch(a){f="parsererror",r.error=c=a||f}}catch(a){d("error caught: ",a),f="error",r.error=c=a||f}r.aborted&&(d("upload aborted"),f=null),r.status&&(f=r.status>=200&&r.status<300||304===r.status?"success":"error"),"success"===f?(k.success&&k.success.call(k.context,D,"success",r),y.resolve(r.responseText,"success",r),m&&a.event.trigger("ajaxSuccess",[r,k])):f&&(void 0===c&&(c=r.statusText),k.error&&k.error.call(k.context,r,f,c),y.reject(r,"error",c),m&&a.event.trigger("ajaxError",[r,k,c])),m&&a.event.trigger("ajaxComplete",[r,k]),m&&!--a.active&&a.event.trigger("ajaxStop"),k.complete&&k.complete.call(k.context,r,f),F=!0,k.timeout&&clearTimeout(w),setTimeout(function(){k.iframeTarget?p.attr("src",k.iframeSrc):p.remove(),r.responseXML=null},100)}}}var i,j,k,m,n,p,q,r,t,u,v,w,x=o[0],y=a.Deferred();if(y.abort=function(a){r.abort(a)},c)for(j=0;j<s.length;j++)i=a(s[j]),f?i.prop("disabled",!1):i.removeAttr("disabled");k=a.extend(!0,{},a.ajaxSettings,b),k.context=k.context||k,n="jqFormIO"+(new Date).getTime();var z=x.ownerDocument,A=o.closest("body");if(k.iframeTarget?(p=a(k.iframeTarget,z),u=p.attr2("name"),u?n=u:p.attr2("name",n)):(p=a('<iframe name="'+n+'" src="'+k.iframeSrc+'" />',z),p.css({position:"absolute",top:"-1000px",left:"-1000px"})),q=p[0],r={aborted:0,responseText:null,responseXML:null,status:0,statusText:"n/a",getAllResponseHeaders:function(){},getResponseHeader:function(){},setRequestHeader:function(){},abort:function(b){var c="timeout"===b?"timeout":"aborted";d("aborting upload... "+c),this.aborted=1;try{q.contentWindow.document.execCommand&&q.contentWindow.document.execCommand("Stop")}catch(a){}p.attr("src",k.iframeSrc),r.error=c,k.error&&k.error.call(k.context,r,c,b),m&&a.event.trigger("ajaxError",[r,k,c]),k.complete&&k.complete.call(k.context,r,c)}},m=k.global,m&&0==a.active++&&a.event.trigger("ajaxStart"),m&&a.event.trigger("ajaxSend",[r,k]),k.beforeSend&&k.beforeSend.call(k.context,r,k)===!1)return k.global&&a.active--,y.reject(),y;if(r.aborted)return y.reject(),y;(t=x.clk)&&(u=t.name)&&!t.disabled&&(k.extraData=k.extraData||{},k.extraData[u]=t.value,"image"===t.type&&(k.extraData[u+".x"]=x.clk_x,k.extraData[u+".y"]=x.clk_y));var B=a("meta[name=csrf-token]").attr("content"),C=a("meta[name=csrf-param]").attr("content");C&&B&&(k.extraData=k.extraData||{},k.extraData[C]=B),k.forceSync?g():setTimeout(g,10);var D,E,F,G=50,H=a.parseXML||function(a,b){return window.ActiveXObject?(b=new ActiveXObject("Microsoft.XMLDOM"),b.async="false",b.loadXML(a)):b=(new DOMParser).parseFromString(a,"text/xml"),b&&b.documentElement&&"parsererror"!==b.documentElement.nodeName?b:null},I=a.parseJSON||function(a){return window.eval("("+a+")")},J=function(b,c,d){var e=b.getResponseHeader("content-type")||"",f=("xml"===c||!c)&&e.indexOf("xml")>=0,g=f?b.responseXML:b.responseText;return f&&"parsererror"===g.documentElement.nodeName&&a.error&&a.error("parsererror"),d&&d.dataFilter&&(g=d.dataFilter(g,c)),"string"==typeof g&&(("json"===c||!c)&&e.indexOf("json")>=0?g=I(g):("script"===c||!c)&&e.indexOf("javascript")>=0&&a.globalEval(g)),g};return y}if(!this.length)return d("ajaxSubmit: skipping submit process - no element selected"),this;var l,m,n,o=this;"function"==typeof b?b={success:b}:"string"==typeof b||b===!1&&arguments.length>0?(b={url:b,data:c,dataType:g},"function"==typeof h&&(b.success=h)):void 0===b&&(b={}),l=b.method||b.type||this.attr2("method"),m=b.url||this.attr2("action"),n="string"==typeof m?a.trim(m):"",n=n||window.location.href||"",n&&(n=(n.match(/^([^#]+)/)||[])[1]),b=a.extend(!0,{url:n,success:a.ajaxSettings.success,type:l||a.ajaxSettings.type,iframeSrc:/^https/i.test(window.location.href||"")?"javascript:false":"about:blank"},b);var p={};if(this.trigger("form-pre-serialize",[this,b,p]),p.veto)return d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"),this;if(b.beforeSerialize&&b.beforeSerialize(this,b)===!1)return d("ajaxSubmit: submit aborted via beforeSerialize callback"),this;var q=b.traditional;void 0===q&&(q=a.ajaxSettings.traditional);var r,s=[],t=this.formToArray(b.semantic,s,b.filtering);if(b.data){var u=a.isFunction(b.data)?b.data(t):b.data;b.extraData=u,r=a.param(u,q)}if(b.beforeSubmit&&b.beforeSubmit(t,this,b)===!1)return d("ajaxSubmit: submit aborted via beforeSubmit callback"),this;if(this.trigger("form-submit-validate",[t,this,b,p]),p.veto)return d("ajaxSubmit: submit vetoed via form-submit-validate trigger"),this;var v=a.param(t,q);r&&(v=v?v+"&"+r:r),"GET"===b.type.toUpperCase()?(b.url+=(b.url.indexOf("?")>=0?"&":"?")+v,b.data=null):b.data=v;var w=[];if(b.resetForm&&w.push(function(){o.resetForm()}),b.clearForm&&w.push(function(){o.clearForm(b.includeHidden)}),!b.dataType&&b.target){var x=b.success||function(){};w.push(function(c,d,e){var f=arguments,g=b.replaceTarget?"replaceWith":"html";a(b.target)[g](c).each(function(){x.apply(this,f)})})}else b.success&&(a.isArray(b.success)?a.merge(w,b.success):w.push(b.success));if(b.success=function(a,c,d){for(var e=b.context||this,f=0,g=w.length;f<g;f++)w[f].apply(e,[a,c,d||o,o])},b.error){var y=b.error;b.error=function(a,c,d){var e=b.context||this;y.apply(e,[a,c,d,o])}}if(b.complete){var z=b.complete;b.complete=function(a,c){var d=b.context||this;z.apply(d,[a,c,o])}}var A=a("input[type=file]:enabled",this).filter(function(){return""!==a(this).val()}),B=A.length>0,C="multipart/form-data",D=o.attr("enctype")===C||o.attr("encoding")===C,E=e.fileapi&&e.formdata;d("fileAPI :"+E);var F,G=(B||D)&&!E;b.iframe!==!1&&(b.iframe||G)?b.closeKeepAlive?a.get(b.closeKeepAlive,function(){F=k(t)}):F=k(t):F=(B||D)&&E?j(t):a.ajax(b),o.removeData("jqxhr").data("jqxhr",F);for(var H=0;H<s.length;H++)s[H]=null;return this.trigger("form-submit-notify",[this,b]),this},a.fn.ajaxForm=function(e,f,g,h){if(("string"==typeof e||e===!1&&arguments.length>0)&&(e={url:e,data:f,dataType:g},"function"==typeof h&&(e.success=h)),e=e||{},e.delegation=e.delegation&&a.isFunction(a.fn.on),!e.delegation&&0===this.length){var i={s:this.selector,c:this.context};return!a.isReady&&i.s?(d("DOM not ready, queuing ajaxForm"),a(function(){a(i.s,i.c).ajaxForm(e)}),this):(d("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)")),this)}return e.delegation?(a(document).off("submit.form-plugin",this.selector,b).off("click.form-plugin",this.selector,c).on("submit.form-plugin",this.selector,e,b).on("click.form-plugin",this.selector,e,c),this):this.ajaxFormUnbind().on("submit.form-plugin",e,b).on("click.form-plugin",e,c)},a.fn.ajaxFormUnbind=function(){return this.off("submit.form-plugin click.form-plugin")},a.fn.formToArray=function(b,c,d){var f=[];if(0===this.length)return f;var g,h=this[0],i=this.attr("id"),j=b||void 0===h.elements?h.getElementsByTagName("*"):h.elements;if(j&&(j=a.makeArray(j)),i&&(b||/(Edge|Trident)\//.test(navigator.userAgent))&&(g=a(':input[form="'+i+'"]').get(),g.length&&(j=(j||[]).concat(g))),!j||!j.length)return f;a.isFunction(d)&&(j=a.map(j,d));var k,l,m,n,o,p,q;for(k=0,p=j.length;k<p;k++)if(o=j[k],(m=o.name)&&!o.disabled)if(b&&h.clk&&"image"===o.type)h.clk===o&&(f.push({name:m,value:a(o).val(),type:o.type}),f.push({name:m+".x",value:h.clk_x},{name:m+".y",value:h.clk_y}));else if((n=a.fieldValue(o,!0))&&n.constructor===Array)for(c&&c.push(o),l=0,q=n.length;l<q;l++)f.push({name:m,value:n[l]});else if(e.fileapi&&"file"===o.type){c&&c.push(o);var r=o.files;if(r.length)for(l=0;l<r.length;l++)f.push({name:m,value:r[l],type:o.type});else f.push({name:m,value:"",type:o.type})}else null!==n&&void 0!==n&&(c&&c.push(o),f.push({name:m,value:n,type:o.type,required:o.required}));if(!b&&h.clk){var s=a(h.clk),t=s[0];m=t.name,m&&!t.disabled&&"image"===t.type&&(f.push({name:m,value:s.val()}),f.push({name:m+".x",value:h.clk_x},{name:m+".y",value:h.clk_y}))}return f},a.fn.formSerialize=function(b){return a.param(this.formToArray(b))},a.fn.fieldSerialize=function(b){var c=[];return this.each(function(){var d=this.name;if(d){var e=a.fieldValue(this,b);if(e&&e.constructor===Array)for(var f=0,g=e.length;f<g;f++)c.push({name:d,value:e[f]});else null!==e&&void 0!==e&&c.push({name:this.name,value:e})}}),a.param(c)},a.fn.fieldValue=function(b){for(var c=[],d=0,e=this.length;d<e;d++){var f=this[d],g=a.fieldValue(f,b);null===g||void 0===g||g.constructor===Array&&!g.length||(g.constructor===Array?a.merge(c,g):c.push(g))}return c},a.fieldValue=function(b,c){var d=b.name,e=b.type,f=b.tagName.toLowerCase();if(void 0===c&&(c=!0),c&&(!d||b.disabled||"reset"===e||"button"===e||("checkbox"===e||"radio"===e)&&!b.checked||("submit"===e||"image"===e)&&b.form&&b.form.clk!==b||"select"===f&&b.selectedIndex===-1))return null;if("select"===f){var g=b.selectedIndex;if(g<0)return null;for(var h=[],i=b.options,j="select-one"===e,k=j?g+1:i.length,l=j?g:0;l<k;l++){var m=i[l];if(m.selected&&!m.disabled){var n=m.value;if(n||(n=m.attributes&&m.attributes.value&&!m.attributes.value.specified?m.text:m.value),j)return n;h.push(n)}}return h}return a(b).val().replace(/\r?\n/g,"\r\n")},a.fn.clearForm=function(b){return this.each(function(){a("input,select,textarea",this).clearFields(b)})},a.fn.clearFields=a.fn.clearInputs=function(b){var c=/^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;return this.each(function(){var d=this.type,e=this.tagName.toLowerCase();c.test(d)||"textarea"===e?this.value="":"checkbox"===d||"radio"===d?this.checked=!1:"select"===e?this.selectedIndex=-1:"file"===d?/MSIE/.test(navigator.userAgent)?a(this).replaceWith(a(this).clone(!0)):a(this).val(""):b&&(b===!0&&/hidden/.test(d)||"string"==typeof b&&a(this).is(b))&&(this.value="")})},a.fn.resetForm=function(){return this.each(function(){var b=a(this),c=this.tagName.toLowerCase();switch(c){case"input":this.checked=this.defaultChecked;case"textarea":return this.value=this.defaultValue,!0;case"option":case"optgroup":var d=b.parents("select");return d.length&&d[0].multiple?"option"===c?this.selected=this.defaultSelected:b.find("option").resetForm():d.resetForm(),!0;case"select":return b.find("option").each(function(a){if(this.selected=this.defaultSelected,this.defaultSelected&&!b[0].multiple)return b[0].selectedIndex=a,!1}),!0;case"label":var e=a(b.attr("for")),f=b.find("input,select,textarea");return e[0]&&f.unshift(e[0]),f.resetForm(),!0;case"form":return("function"==typeof this.reset||"object"==typeof this.reset&&!this.reset.nodeType)&&this.reset(),!0;default:return b.find("form,input,label,select,textarea").resetForm(),!0}})},a.fn.enable=function(a){return void 0===a&&(a=!0),this.each(function(){this.disabled=!a})},a.fn.selected=function(b){return void 0===b&&(b=!0),this.each(function(){var c=this.type;if("checkbox"===c||"radio"===c)this.checked=b;else if("option"===this.tagName.toLowerCase()){var d=a(this).parent("select");b&&d[0]&&"select-one"===d[0].type&&d.find("option").selected(!1),this.selected=b}})},a.fn.ajaxSubmit.debug=!1});
;
(function ($) {

/**
 * The base States namespace.
 *
 * Having the local states variable allows us to use the States namespace
 * without having to always declare "Backdrop.states".
 */
var states = Backdrop.states = {
  // An array of functions that should be postponed.
  postponed: []
};

/**
 * Attaches the states.
 */
Backdrop.behaviors.states = {
  attach: function (context, settings) {
    var $context = $(context);
    for (var selector in settings.states) {
      if (settings.states.hasOwnProperty(selector)) {
        for (var state in settings.states[selector]) {
          if (settings.states[selector].hasOwnProperty(state)) {
            new states.Dependent({
              element: $context.find(selector),
              state: states.State.sanitize(state),
              constraints: settings.states[selector][state]
            });
          }
        }
      }
    }

    // Execute all postponed functions now.
    while (states.postponed.length) {
      (states.postponed.shift())();
    }
  }
};

/**
 * Object representing an element that depends on other elements.
 *
 * @param args
 *   Object with the following keys (all of which are required):
 *   - element: A jQuery object of the dependent element
 *   - state: A State object describing the state that is dependent
 *   - constraints: An object with dependency specifications. Lists all elements
 *     that this element depends on. It can be nested and can contain arbitrary
 *     AND and OR clauses.
 */
states.Dependent = function (args) {
  $.extend(this, { values: {}, oldValue: null }, args);

  this.dependees = this.getDependees();
  for (var selector in this.dependees) {
    if (this.dependees.hasOwnProperty(selector)) {
      this.initializeDependee(selector, this.dependees[selector]);
    }
  }
};

/**
 * Comparison functions for comparing the value of an element with the
 * specification from the dependency settings. If the object type can't be
 * found in this list, the === operator is used by default.
 */
states.Dependent.comparisons = {
  'RegExp': function (reference, value) {
    return reference.test(value);
  },
  'Function': function (reference, value) {
    // The "reference" variable is a comparison function.
    return reference(value);
  },
  'Number': function (reference, value) {
    // If "reference" is a number and "value" is a string, then cast reference
    // as a string before applying the strict comparison in compare(). Otherwise
    // numeric keys in the form's #states array fail to match string values
    // returned from jQuery's val().
    return (typeof value === 'string') ? compare(reference.toString(), value) : compare(reference, value);
  }
};

states.Dependent.prototype = {
  /**
   * Initializes one of the elements this dependent depends on.
   *
   * @param selector
   *   The CSS selector describing the dependee.
   * @param dependeeStates
   *   The list of states that have to be monitored for tracking the
   *   dependee's compliance status.
   */
  initializeDependee: function (selector, dependeeStates) {
    var state, self = this;

    function stateEventHandler(e) {
      self.update(e.data.selector, e.data.state, e.value);
    }

    // Cache for the states of this dependee.
    this.values[selector] = {};

    for (var i in dependeeStates) {
      if (dependeeStates.hasOwnProperty(i)) {
        state = dependeeStates[i];
        // Make sure we're not initializing this selector/state combination twice.
        if ($.inArray(state, dependeeStates) === -1) {
          continue;
        }

        state = states.State.sanitize(state);

        // Initialize the value of this state.
        this.values[selector][state.name] = null;

        // Monitor state changes of the specified state for this dependee.
        $(selector).bind('state:' + state, {selector: selector, state: state}, stateEventHandler);

        // Make sure the event we just bound ourselves to is actually fired.
        new states.Trigger({ selector: selector, state: state });
      }
    }
  },

  /**
   * Compares a value with a reference value.
   *
   * @param reference
   *   The value used for reference.
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   *
   * @return
   *   true or false.
   */
  compare: function (reference, selector, state) {
    var value = this.values[selector][state.name];
    if (reference.constructor.name in states.Dependent.comparisons) {
      // Use a custom compare function for certain reference value types.
      return states.Dependent.comparisons[reference.constructor.name](reference, value);
    }
    else {
      // Do a plain comparison otherwise.
      return compare(reference, value);
    }
  },

  /**
   * Update the value of a dependee's state.
   *
   * @param selector
   *   CSS selector describing the dependee.
   * @param state
   *   A State object describing the dependee's updated state.
   * @param value
   *   The new value for the dependee's updated state.
   */
  update: function (selector, state, value) {
    // Only act when the 'new' value is actually new.
    if (value !== this.values[selector][state.name]) {
      this.values[selector][state.name] = value;
      this.reevaluate();
    }
  },

  /**
   * Triggers change events in case a state changed.
   */
  reevaluate: function () {
    // Check whether any constraint for this dependent state is satisifed.
    var value = this.verifyConstraints(this.constraints);

    // Only invoke a state change event when the value actually changed.
    if (value !== this.oldValue) {
      // Store the new value so that we can compare later whether the value
      // actually changed.
      this.oldValue = value;

      // Normalize the value to match the normalized state name.
      value = invert(value, this.state.invert);

      // By adding "trigger: true", we ensure that state changes don't go into
      // infinite loops.
      this.element.trigger({ type: 'state:' + this.state, value: value, trigger: true });
    }
  },

  /**
   * Evaluates child constraints to determine if a constraint is satisfied.
   *
   * @param constraints
   *   A constraint object or an array of constraints.
   * @param selector
   *   The selector for these constraints. If undefined, there isn't yet a
   *   selector that these constraints apply to. In that case, the keys of the
   *   object are interpreted as the selector if encountered.
   *
   * @return
   *   true or false, depending on whether these constraints are satisfied.
   */
  verifyConstraints: function(constraints, selector) {
    var result;
    if ($.isArray(constraints)) {
      // This constraint is an array (OR or XOR).
      var hasXor = $.inArray('xor', constraints) === -1;
      for (var i = 0, len = constraints.length; i < len; i++) {
        if (constraints[i] != 'xor') {
          var constraint = this.checkConstraints(constraints[i], selector, i);
          // Return if this is OR and we have a satisfied constraint or if this
          // is XOR and we have a second satisfied constraint.
          if (constraint && (hasXor || result)) {
            return hasXor;
          }
          result = result || constraint;
        }
      }
    }
    // Make sure we don't try to iterate over things other than objects. This
    // shouldn't normally occur, but in case the condition definition is bogus,
    // we don't want to end up with an infinite loop.
    else if ($.isPlainObject(constraints)) {
      // This constraint is an object (AND).
      for (var n in constraints) {
        if (constraints.hasOwnProperty(n)) {
          result = ternary(result, this.checkConstraints(constraints[n], selector, n));
          // False and anything else will evaluate to false, so return when any
          // false condition is found.
          if (result === false) { return false; }
        }
      }
    }
    return result;
  },

  /**
   * Checks whether the value matches the requirements for this constraint.
   *
   * @param value
   *   Either the value of a state or an array/object of constraints. In the
   *   latter case, resolving the constraint continues.
   * @param selector
   *   The selector for this constraint. If undefined, there isn't yet a
   *   selector that this constraint applies to. In that case, the state key is
   *   propagates to a selector and resolving continues.
   * @param state
   *   The state to check for this constraint. If undefined, resolving
   *   continues.
   *   If both selector and state aren't undefined and valid non-numeric
   *   strings, a lookup for the actual value of that selector's state is
   *   performed. This parameter is not a State object but a pristine state
   *   string.
   *
   * @return
   *   true or false, depending on whether this constraint is satisfied.
   */
  checkConstraints: function(value, selector, state) {
    // Normalize the last parameter. If it's non-numeric, we treat it either as
    // a selector (in case there isn't one yet) or as a trigger/state.
    if (typeof state !== 'string' || (/[0-9]/).test(state[0])) {
      state = null;
    }
    else if (typeof selector === 'undefined') {
      // Propagate the state to the selector when there isn't one yet.
      selector = state;
      state = null;
    }

    if (state !== null) {
      // constraints is the actual constraints of an element to check for.
      state = states.State.sanitize(state);
      return invert(this.compare(value, selector, state), state.invert);
    }
    else {
      // Resolve this constraint as an AND/OR operator.
      return this.verifyConstraints(value, selector);
    }
  },

  /**
   * Gathers information about all required triggers.
   */
  getDependees: function() {
    var cache = {};
    // Swivel the lookup function so that we can record all available selector-
    // state combinations for initialization.
    var _compare = this.compare;
    this.compare = function(reference, selector, state) {
      (cache[selector] || (cache[selector] = [])).push(state.name);
      // Return nothing (=== undefined) so that the constraint loops are not
      // broken.
    };

    // This call doesn't actually verify anything but uses the resolving
    // mechanism to go through the constraints array, trying to look up each
    // value. Since we swivelled the compare function, this comparison returns
    // undefined and lookup continues until the very end. Instead of lookup up
    // the value, we record that combination of selector and state so that we
    // can initialize all triggers.
    this.verifyConstraints(this.constraints);
    // Restore the original function.
    this.compare = _compare;

    return cache;
  }
};

states.Trigger = function (args) {
  $.extend(this, args);

  if (this.state in states.Trigger.states) {
    this.element = $(this.selector);

    // Only call the trigger initializer when it wasn't yet attached to this
    // element. Otherwise we'd end up with duplicate events.
    if (!this.element.data('trigger:' + this.state)) {
      this.initialize();
    }
  }
};

states.Trigger.prototype = {
  initialize: function () {
    var trigger = states.Trigger.states[this.state];

    if (typeof trigger == 'function') {
      // We have a custom trigger initialization function.
      trigger.call(window, this.element);
    }
    else {
      for (var event in trigger) {
        if (trigger.hasOwnProperty(event)) {
          this.defaultTrigger(event, trigger[event]);
        }
      }
    }

    // Mark this trigger as initialized for this element.
    this.element.data('trigger:' + this.state, true);
  },

  defaultTrigger: function (event, valueFn) {
    var oldValue = valueFn.call(this.element);

    // Attach the event callback.
    this.element.bind(event, $.proxy(function (e) {
      var value = valueFn.call(this.element, e);
      // Only trigger the event if the value has actually changed.
      if (oldValue !== value) {
        this.element.trigger({ type: 'state:' + this.state, value: value, oldValue: oldValue });
        oldValue = value;
      }
    }, this));

    states.postponed.push($.proxy(function () {
      // Trigger the event once for initialization purposes.
      this.element.trigger({ type: 'state:' + this.state, value: oldValue, oldValue: null });
    }, this));
  }
};

/**
 * This list of states contains functions that are used to monitor the state
 * of an element. Whenever an element depends on the state of another element,
 * one of these trigger functions is added to the dependee so that the
 * dependent element can be updated.
 */
states.Trigger.states = {
  // 'empty' describes the state to be monitored
  empty: {
    // 'keyup' is the (native DOM) event that we watch for.
    'keyup': function () {
      // The function associated to that trigger returns the new value for the
      // state.
      return this.val() == '';
    }
  },

  checked: {
    'change': function () {
      // prop() and attr() only takes the first element into account. To support
      // selectors matching multiple checkboxes, iterate over all and return
      // whether any is checked.
      var checked = false;
      this.each(function () {
        // Use prop() here as we want a boolean of the checkbox state.
        // @see http://api.jquery.com/prop/
        checked = $(this).prop('checked');
        // Break the each() loop if this is checked.
        return !checked;
      });
      return checked;
    }
  },

  // For radio buttons, only return the value if the radio button is selected.
  value: {
    'keyup': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    },
    'change': function () {
      // Radio buttons share the same :input[name="key"] selector.
      if (this.length > 1) {
        // Initial checked value of radios is undefined, so we return false.
        return this.filter(':checked').val() || false;
      }
      return this.val();
    }
  },

  collapsed: {
    'collapsed': function(e) {
      return (typeof e !== 'undefined' && 'value' in e) ? e.value : this.is('.collapsed');
    }
  }
};


/**
 * A state object is used for describing the state and performing aliasing.
 */
states.State = function(state) {
  // We may need the original unresolved name later.
  this.pristine = this.name = state;

  // Normalize the state name.
  while (true) {
    // Iteratively remove exclamation marks and invert the value.
    while (this.name.charAt(0) == '!') {
      this.name = this.name.substring(1);
      this.invert = !this.invert;
    }

    // Replace the state with its normalized name.
    if (this.name in states.State.aliases) {
      this.name = states.State.aliases[this.name];
    }
    else {
      break;
    }
  }
};

/**
 * Creates a new State object by sanitizing the passed value.
 */
states.State.sanitize = function (state) {
  if (state instanceof states.State) {
    return state;
  }
  else {
    return new states.State(state);
  }
};

/**
 * This list of aliases is used to normalize states and associates negated names
 * with their respective inverse state.
 */
states.State.aliases = {
  'enabled': '!disabled',
  'invisible': '!visible',
  'invalid': '!valid',
  'untouched': '!touched',
  'optional': '!required',
  'filled': '!empty',
  'unchecked': '!checked',
  'irrelevant': '!relevant',
  'expanded': '!collapsed',
  'readwrite': '!readonly'
};

states.State.prototype = {
  invert: false,

  /**
   * Ensures that just using the state object returns the name.
   */
  toString: function() {
    return this.name;
  }
};

/**
 * Global state change handlers. These are bound to "document" to cover all
 * elements whose state changes. Events sent to elements within the page
 * bubble up to these handlers. We use this system so that themes and modules
 * can override these state change handlers for particular parts of a page.
 */

$(document).bind('state:disabled', function(e) {
  // Only act when this change was triggered by a dependency and not by the
  // element monitoring itself.
  if (e.trigger) {
    $(e.target)
      .prop('disabled', e.value)
        .closest('.form-item, .form-submit, .form-wrapper').toggleClass('form-disabled', e.value)
        .find('select, input, textarea').prop('disabled', e.value);

    // Note: WebKit nightlies don't reflect that change correctly.
    // See https://bugs.webkit.org/show_bug.cgi?id=23789
  }
});

$(document).bind('state:required', function(e) {
  if (e.trigger) {
    if (e.value) {
      var $label = $(e.target).closest('.form-item, .form-wrapper').find('label');
      // Avoids duplicate required markers on initialization.
      if (!$label.find('.form-required').length) {
        $label.append('<abbr class="form-required" title="' + Backdrop.t('This field is required.') + '">*</abbr>');
      }
    }
    else {
      $(e.target).closest('.form-item, .form-wrapper').find('label .form-required').remove();
    }
  }
});

$(document).bind('state:visible', function(e) {
  if (e.trigger) {
    $(e.target).closest('.form-item, .form-submit, .form-wrapper').toggle(e.value);
  }
});

$(document).bind('state:checked', function(e) {
  if (e.trigger) {
    $(e.target).prop('checked', e.value);
  }
});

$(document).bind('state:collapsed', function(e) {
  if (e.trigger) {
    if ($(e.target).is('.collapsed') !== e.value) {
      $('> legend a', e.target).click();
    }
  }
});


/**
 * These are helper functions implementing addition "operators" and don't
 * implement any logic that is particular to states.
 */

// Bitwise AND with a third undefined state.
function ternary (a, b) {
  return typeof a === 'undefined' ? b : (typeof b === 'undefined' ? a : a && b);
}

// Inverts a (if it's not undefined) when invertState is true.
function invert (a, invertState) {
  return (invertState && typeof a !== 'undefined') ? !a : a;
}

// Compares two values while ignoring undefined values.
function compare (a, b) {
  return (a === b) ? (typeof a === 'undefined' ? a : true) : (typeof a === 'undefined' || typeof b === 'undefined');
}

})(jQuery);
;
(function ($) {

/**
 * Retrieves the summary for the first element.
 */
$.fn.backdropGetSummary = function () {
  var callback = this.data('summaryCallback');
  return (this[0] && callback) ? $.trim(callback(this[0])) : '';
};

/**
 * Sets the summary for all matched elements.
 *
 * @param callback
 *   Either a function that will be called each time the summary is
 *   retrieved or a string (which is returned each time).
 */
$.fn.backdropSetSummary = function (callback) {
  var self = this;

  // To facilitate things, the callback should always be a function. If it's
  // not, we wrap it into an anonymous function which just returns the value.
  if (typeof callback != 'function') {
    var val = callback;
    callback = function () { return val; };
  }

  return this
    .data('summaryCallback', callback)
    // To prevent duplicate events, the handlers are first removed and then
    // (re-)added.
    .unbind('formUpdated.summary')
    .bind('formUpdated.summary', function () {
      self.trigger('summaryUpdated');
    })
    // The actual summaryUpdated handler doesn't fire when the callback is
    // changed, so we have to do this manually.
    .trigger('summaryUpdated');
};

/**
 * Sends a 'formUpdated' event each time a form element is modified.
 */
Backdrop.behaviors.formUpdated = {
  attach: function (context) {
    // These events are namespaced so that we can remove them later.
    var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
    $(context)
      // Since context could be an input element itself, it's added back to
      // the jQuery object and filtered again.
      .find(':input').addBack().filter(':input')
      // To prevent duplicate events, the handlers are first removed and then
      // (re-)added.
      .unbind(events).bind(events, function () {
        $(this).trigger('formUpdated');
      });
  }
};

/**
 * Prepopulate form fields with information from the visitor cookie.
 */
Backdrop.behaviors.fillUserInfoFromCookie = {
  attach: function (context, settings) {
    $('form.user-info-from-cookie').once('user-info-from-cookie', function () {
      var formContext = this;
      $.each(['name', 'mail', 'homepage'], function () {
        var $element = $('[name=' + this + ']', formContext);
        var cookie = $.cookie('Backdrop.visitor.' + this);
        if ($element.length && cookie) {
          $element.val(cookie);
        }
      });
    });
  }
};

})(jQuery);
;
